const EXPECTED_HASH =
  "1f4d7a85f2cc19b378703e222af9048b4a2ecf7ced5fc4e79baa366314dd65a9";

const AUTH_STORAGE_KEY = "quantum-road-auth";

async function sha256(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function verifyCredentials(
  username: string,
  password: string
): Promise<boolean> {
  const hash = await sha256(`${username}:${password}`);
  return hash === EXPECTED_HASH;
}

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(AUTH_STORAGE_KEY) === "1";
}

export function setAuthenticated(): void {
  sessionStorage.setItem(AUTH_STORAGE_KEY, "1");
}

export function clearAuthenticated(): void {
  sessionStorage.removeItem(AUTH_STORAGE_KEY);
}
