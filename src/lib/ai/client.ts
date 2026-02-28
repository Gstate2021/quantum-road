import type { AiProvider } from "@/types/progress";

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

interface AiConfig {
  provider: AiProvider;
  model: string;
  apiKey: string;
  baseUrl?: string;
}

interface ProviderEndpoint {
  url: string;
  headers: Record<string, string>;
  buildBody: (messages: ChatMessage[], model: string) => unknown;
  parseStream: (reader: ReadableStreamDefaultReader<Uint8Array>) => AsyncGenerator<string>;
}

function getProviderEndpoint(config: AiConfig): ProviderEndpoint {
  switch (config.provider) {
    case "gemini":
      return {
        url: `https://generativelanguage.googleapis.com/v1beta/models/${config.model}:streamGenerateContent?alt=sse&key=${config.apiKey}`,
        headers: { "Content-Type": "application/json" },
        buildBody: (messages) => ({
          contents: messages
            .filter((m) => m.role !== "system")
            .map((m) => ({
              role: m.role === "assistant" ? "model" : "user",
              parts: [{ text: m.content }],
            })),
          systemInstruction: (() => {
            const sys = messages.find((m) => m.role === "system");
            return sys ? { parts: [{ text: sys.content }] } : undefined;
          })(),
        }),
        parseStream: geminiStreamParser,
      };

    case "openai":
      return {
        url: "https://api.openai.com/v1/chat/completions",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${config.apiKey}`,
        },
        buildBody: (messages, model) => ({
          model,
          messages: messages.map((m) => ({ role: m.role, content: m.content })),
          stream: true,
        }),
        parseStream: openAiStreamParser,
      };

    case "anthropic":
      return {
        url: "https://api.anthropic.com/v1/messages",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": config.apiKey,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        buildBody: (messages, model) => {
          const systemMsg = messages.find((m) => m.role === "system");
          return {
            model,
            max_tokens: 4096,
            stream: true,
            system: systemMsg?.content,
            messages: messages
              .filter((m) => m.role !== "system")
              .map((m) => ({ role: m.role, content: m.content })),
          };
        },
        parseStream: anthropicStreamParser,
      };

    case "openrouter":
      return {
        url: config.baseUrl || "https://openrouter.ai/api/v1/chat/completions",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${config.apiKey}`,
        },
        buildBody: (messages, model) => ({
          model,
          messages: messages.map((m) => ({ role: m.role, content: m.content })),
          stream: true,
        }),
        parseStream: openAiStreamParser,
      };

    case "custom":
      return {
        url: `${config.baseUrl || "http://localhost:11434"}/v1/chat/completions`,
        headers: {
          "Content-Type": "application/json",
          ...(config.apiKey ? { Authorization: `Bearer ${config.apiKey}` } : {}),
        },
        buildBody: (messages, model) => ({
          model,
          messages: messages.map((m) => ({ role: m.role, content: m.content })),
          stream: true,
        }),
        parseStream: openAiStreamParser,
      };
  }
}

// SSE line parser helper
function parseSseLine(line: string): string | null {
  if (line.startsWith("data: ")) {
    return line.slice(6);
  }
  return null;
}

async function* geminiStreamParser(
  reader: ReadableStreamDefaultReader<Uint8Array>
): AsyncGenerator<string> {
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";

    for (const line of lines) {
      const data = parseSseLine(line);
      if (!data || data === "[DONE]") continue;

      try {
        const parsed = JSON.parse(data);
        const text = parsed?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) yield text;
      } catch {
        // skip malformed JSON
      }
    }
  }
}

async function* openAiStreamParser(
  reader: ReadableStreamDefaultReader<Uint8Array>
): AsyncGenerator<string> {
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";

    for (const line of lines) {
      const data = parseSseLine(line);
      if (!data || data === "[DONE]") continue;

      try {
        const parsed = JSON.parse(data);
        const text = parsed?.choices?.[0]?.delta?.content;
        if (text) yield text;
      } catch {
        // skip malformed JSON
      }
    }
  }
}

async function* anthropicStreamParser(
  reader: ReadableStreamDefaultReader<Uint8Array>
): AsyncGenerator<string> {
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";

    for (const line of lines) {
      const data = parseSseLine(line);
      if (!data || data === "[DONE]") continue;

      try {
        const parsed = JSON.parse(data);
        if (parsed.type === "content_block_delta" && parsed.delta?.text) {
          yield parsed.delta.text;
        }
      } catch {
        // skip malformed JSON
      }
    }
  }
}

export async function* chatStream(
  messages: ChatMessage[],
  config: AiConfig
): AsyncGenerator<string> {
  const endpoint = getProviderEndpoint(config);
  const body = endpoint.buildBody(messages, config.model);

  const response = await fetch(endpoint.url, {
    method: "POST",
    headers: endpoint.headers,
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`AI API error (${response.status}): ${errorText}`);
  }

  if (!response.body) {
    throw new Error("No response body");
  }

  const reader = response.body.getReader();
  yield* endpoint.parseStream(reader);
}

export async function testConnection(config: AiConfig): Promise<{ ok: boolean; message: string }> {
  try {
    const messages: ChatMessage[] = [
      { role: "user", content: "Reply with exactly: OK" },
    ];

    let result = "";
    for await (const chunk of chatStream(messages, config)) {
      result += chunk;
      if (result.length > 20) break; // enough for a test
    }

    return { ok: true, message: `接続成功: "${result.trim().slice(0, 50)}"` };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return { ok: false, message: `接続失敗: ${msg}` };
  }
}
