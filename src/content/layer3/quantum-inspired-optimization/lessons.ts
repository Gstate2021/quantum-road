import type { Lesson } from "@/types/content";

export const quantumInspiredOptimizationLessons: readonly Lesson[] = [
  {
    id: "qi-opt-lesson1",
    topicId: "quantum-inspired-optimization",
    order: 1,
    title: "シミュレーテッドアニーリング深掘り",
    estimatedMinutes: 50,
    sections: [
      {
        type: "text",
        content:
          "シミュレーテッドアニーリング（SA）は、金属の焼きなまし過程に着想を得たメタヒューリスティクスであり、量子インスパイアード手法の理解の土台となる。SAは局所最適解に陥りにくい性質を持ち、NP困難な組合せ最適化問題に広く適用されてきた。\n\nSAの基本動作は単純である。現在の解に対して近傍解を生成し、改善する場合は必ず採用、悪化する場合でも「温度」パラメータに依存する確率で採用する。温度が高い初期段階では悪化も受け入れ（探索フェーズ）、温度が下がるにつれて改善のみを受け入れるようになる（収束フェーズ）。",
      },
      {
        type: "code",
        content:
          "// Simulated Annealing core algorithm\nfunction simulatedAnnealing(\n  initialSolution: Solution,\n  costFunction: (s: Solution) => number,\n  neighbor: (s: Solution) => Solution,\n  config: SAConfig\n): Solution {\n  let current = initialSolution;\n  let currentCost = costFunction(current);\n  let best = current;\n  let bestCost = currentCost;\n  let temperature = config.initialTemperature;\n\n  for (let i = 0; i < config.maxIterations; i++) {\n    const candidate = neighbor(current);\n    const candidateCost = costFunction(candidate);\n    const delta = candidateCost - currentCost;\n\n    // Accept if better, or with Boltzmann probability if worse\n    if (delta < 0 || Math.random() < Math.exp(-delta / temperature)) {\n      current = candidate;\n      currentCost = candidateCost;\n    }\n\n    if (currentCost < bestCost) {\n      best = current;\n      bestCost = currentCost;\n    }\n\n    // Cooling schedule\n    temperature *= config.coolingRate; // e.g., 0.9995\n  }\n\n  return best;\n}\n\ninterface SAConfig {\n  readonly initialTemperature: number;  // e.g., 1000\n  readonly coolingRate: number;          // e.g., 0.9995\n  readonly maxIterations: number;        // e.g., 1_000_000\n}",
        language: "typescript",
      },
      {
        type: "text",
        content:
          "SAの実務的なチューニングポイントは3つある。\n\n**初期温度**: 高すぎるとランダムウォークに近くなり収束が遅い。低すぎると局所最適解に即座に陥る。経験則として、初期のランダムな解変更の80%程度が受け入れられる温度を設定する。\n\n**冷却スケジュール**: 幾何冷却（T = T * alpha）が最も一般的だが、適応的冷却（改善がなくなったら温度を下げる）や再加熱（一定間隔で温度を上げる）も有効。問題の構造によって最適な冷却戦略が異なる。\n\n**近傍定義**: 解の品質に最も大きく影響するのが近傍関数。TSPなら2-opt/3-opt、スケジューリングならスワップ/挿入など、問題固有の近傍を設計する。複数の近傍を組み合わせるVNS（Variable Neighborhood Search）も強力。",
      },
      {
        type: "callout",
        content:
          "SAは「量子アニーリング」の理解の基礎でもある。SAが熱的揺らぎで局所最適解を脱出するのに対し、量子アニーリングは量子力学的トンネル効果でポテンシャル障壁を通り抜ける。この違いが量子アニーリングの（理論上の）優位性の源泉。",
        calloutType: "info",
      },
    ],
    keyConcepts: [
      {
        term: "シミュレーテッドアニーリング",
        termEn: "Simulated Annealing",
        definition:
          "金属の焼きなまし過程に着想を得たメタヒューリスティクス。温度パラメータにより解の悪化を確率的に受け入れることで、局所最適解からの脱出を図る。",
      },
      {
        term: "冷却スケジュール",
        termEn: "Cooling Schedule",
        definition:
          "SAの温度パラメータの低下戦略。幾何冷却（指数的減少）、適応的冷却、再加熱などの手法があり、探索と収束のバランスを制御する。",
      },
      {
        term: "近傍関数",
        termEn: "Neighborhood Function",
        definition:
          "現在の解から遷移可能な隣接解の集合を定義する関数。問題固有の近傍設計がSAの性能を大きく左右する。2-opt、スワップ、挿入が代表例。",
      },
      {
        term: "メタヒューリスティクス",
        termEn: "Metaheuristics",
        definition:
          "特定の問題に依存しない汎用的な最適化フレームワーク。SA、遺伝的アルゴリズム、タブーサーチ等が含まれる。厳密解の保証はないが、大規模問題に適用可能。",
      },
    ],
  },
  {
    id: "qi-opt-lesson2",
    topicId: "quantum-inspired-optimization",
    order: 2,
    title: "量子インスパイアード手法",
    estimatedMinutes: 55,
    sections: [
      {
        type: "text",
        content:
          "量子インスパイアード最適化とは、量子力学の原理（重ね合わせ、トンネル効果、干渉等）に着想を得つつ、古典コンピュータ上で実行するアルゴリズム群である。量子ハードウェアを必要としないため、今日から実ビジネスに適用できる点が最大の強み。\n\n代表的な手法を3つ紹介する。",
      },
      {
        type: "text",
        content:
          "**1. Simulated Bifurcation（SB）**\n\n東芝が開発した手法で、古典力学の分岐現象をシミュレートする。QUBO問題に対して、各変数を振り子の角度として表現し、連立微分方程式を並列的に時間発展させることで最適解を探索する。\n\nSBの最大の特徴は超並列性である。変数間の相互作用を行列-ベクトル積として計算するため、GPUとの相性が非常に良い。東芝のベンチマークでは、100,000変数規模のQUBO問題に対してD-Wave量子アニーリングを上回る性能を古典GPUで達成している。\n\nSBには3つのバリアントがある。adiabatic SB（aSB）、ballistic SB（bSB）、discrete SB（dSB）。bSBは運動項を追加して局所最適解からの脱出を強化し、dSBは変数を離散化して計算を単純化する。実用上はdSBが最も高速。",
      },
      {
        type: "text",
        content:
          "**2. Quantum-Inspired Evolutionary Algorithm（QIEA）**\n\n量子ビットの重ね合わせ状態を確率振幅で表現し、進化的操作（選択・交叉・突然変異に相当する操作）を適用する手法。各個体が量子ビット表現（確率振幅のベクトル）を持ち、観測操作で古典的な解を生成する。\n\n回転ゲートの角度を適応的に調整することで、探索空間を効率的に絞り込む。ナップサック問題や組合せ最適化に対して、従来の遺伝的アルゴリズムを上回る収束速度が報告されている。",
      },
      {
        type: "text",
        content:
          "**3. Quantum Approximate Optimization Algorithm Inspired（QAOA-Inspired）**\n\nQAOA（量子近似最適化アルゴリズム）のパラメータ化された量子回路を、テンソルネットワークや行列積状態（MPS）で古典的にシミュレートする手法。小-中規模の問題では量子ハードウェアなしにQAOAの恩恵を受けられる。\n\nただし、変数数が増えるとテンソルネットワークの計算コストが指数的に増加するため、数百変数程度までが実用範囲。大規模問題にはSBのほうが適している。",
      },
      {
        type: "code",
        content:
          "// Quantum-Inspired method selection guide\ninterface QIMethodSelection {\n  problemType: \"QUBO\" | \"TSP\" | \"scheduling\" | \"portfolio\";\n  variableCount: number;\n  hardwareAvailable: \"cpu-only\" | \"gpu\" | \"fpga\";\n  timeConstraint: \"realtime\" | \"batch\";\n}\n\nfunction selectQIMethod(input: QIMethodSelection): string {\n  // Simulated Bifurcation: best for large QUBO on GPU\n  if (\n    input.problemType === \"QUBO\" &&\n    input.variableCount > 1_000 &&\n    input.hardwareAvailable === \"gpu\"\n  ) {\n    return \"Simulated Bifurcation (dSB on GPU)\";\n  }\n\n  // SB also excellent for portfolio optimization (naturally QUBO)\n  if (input.problemType === \"portfolio\") {\n    return \"Simulated Bifurcation (bSB)\";\n  }\n\n  // QIEA: good for combinatorial problems with moderate scale\n  if (\n    (input.problemType === \"scheduling\" || input.problemType === \"TSP\") &&\n    input.variableCount < 5_000\n  ) {\n    return \"Quantum-Inspired Evolutionary Algorithm\";\n  }\n\n  // Small-scale: QAOA-inspired via tensor network\n  if (input.variableCount < 300) {\n    return \"QAOA-Inspired (tensor network simulation)\";\n  }\n\n  // Default: SA with problem-specific neighborhood\n  return \"Simulated Annealing with custom neighborhood\";\n}",
        language: "typescript",
      },
      {
        type: "callout",
        content:
          "量子インスパイアード手法は「銀の弾丸」ではない。すべての問題に対して古典ヒューリスティクスを上回るわけではなく、問題の構造（変数間の結合度、制約の疎密）によって性能差が変わる。ベンチマーク比較なしに手法を推奨してはならない。",
        calloutType: "warning",
      },
    ],
    keyConcepts: [
      {
        term: "Simulated Bifurcation",
        termEn: "Simulated Bifurcation",
        definition:
          "東芝が開発した量子インスパイアード手法。古典力学の分岐現象をシミュレートし、QUBO問題をGPU上で超並列に解く。aSB、bSB、dSBの3バリアント。",
      },
      {
        term: "量子インスパイアード進化アルゴリズム",
        termEn: "Quantum-Inspired Evolutionary Algorithm (QIEA)",
        definition:
          "量子ビットの確率振幅表現と回転ゲート操作を古典的にシミュレートする進化的手法。組合せ最適化で遺伝的アルゴリズムを上回る収束速度を持つ。",
      },
      {
        term: "QAOA-Inspired",
        termEn: "QAOA-Inspired Algorithm",
        definition:
          "量子近似最適化アルゴリズムをテンソルネットワークで古典シミュレートする手法。小-中規模（数百変数）の問題に有効だが、大規模ではスケールしない。",
      },
      {
        term: "GPU並列化",
        termEn: "GPU Parallelization",
        definition:
          "行列-ベクトル積を並列処理するGPUの特性を活用して量子インスパイアード手法を高速化する技術。SBの性能はGPU活用の有無で桁違いに変わる。",
      },
    ],
  },
  {
    id: "qi-opt-lesson3",
    topicId: "quantum-inspired-optimization",
    order: 3,
    title: "実案件での適用パターン",
    estimatedMinutes: 55,
    sections: [
      {
        type: "text",
        content:
          "量子インスパイアード最適化の真価は実ビジネスへの適用で発揮される。ここでは、B2Bコンサルティングで頻出する3つの適用パターン（物流最適化、スケジューリング、ポートフォリオ最適化）について、QUBO定式化から実装・提案までの全工程を解説する。",
      },
      {
        type: "example",
        content:
          "【パターン1: 物流最適化 — 配送ルート最適化】\n\nビジネス課題: 物流会社の日次配送ルート最適化（50台×200地点）\n\nQUBO定式化:\n- バイナリ変数 x_{v,i,k}: 車両vが順序iで地点kを訪問するか\n- 目的: Σ distance(k,l) × x_{v,i,k} × x_{v,i+1,l} を最小化\n- ペナルティ: 各地点は1回訪問 + 車両容量制約 + 時間窓制約\n\n適用手法: Simulated Bifurcation (dSB) on GPU\n- 変数数: 約50×200×200 = 2,000,000 → サブ問題分割が必要\n- クラスタリングでエリア分割 → 各エリア5,000-10,000変数のQUBO\n- GPU上でdSBを並列実行 → 各サブ問題を秒単位で求解\n\n期待効果: 総走行距離 10-15%削減 → 燃料コスト年間数千万円削減",
      },
      {
        type: "example",
        content:
          "【パターン2: スケジューリング — 製造ラインのジョブスケジューリング】\n\nビジネス課題: 5ラインで200ジョブを処理順序を含めて最適化\n\nQUBO定式化:\n- バイナリ変数 x_{j,l,t}: ジョブjをラインlで時刻tに開始するか\n- 目的: 全ジョブの完了時間（メイクスパン）の最小化\n- ペナルティ: 各ジョブは1回だけ実行 + ライン容量 + 前後関係制約\n\n適用手法: QIEA + 局所探索のハイブリッド\n- QIEAで大域的な探索 → 局所探索で精緻化\n- 制約充足の割合を適応的に監視\n\n期待効果: メイクスパン 8-12%短縮 → 生産性向上 + 残業削減",
      },
      {
        type: "example",
        content:
          "【パターン3: ポートフォリオ最適化 — 資産配分の最適化】\n\nビジネス課題: 100銘柄から20銘柄を選定し、リスク最小・リターン最大のポートフォリオを構築\n\nQUBO定式化（Markowitz型）:\n- バイナリ変数 x_i: 銘柄iを選択するか\n- 目的: -λ₁ Σ r_i × x_i + λ₂ ΣΣ σ_ij × x_i × x_j を最小化\n  （リターン最大化 + リスク最小化の重み付け）\n- ペナルティ: 選択銘柄数 = 20 の制約\n\n適用手法: Simulated Bifurcation (bSB)\n- 100変数のQUBO → SBの得意領域\n- リスク-リターンのパレートフロンティエをλの範囲で走査\n- ミリ秒レベルで多数のパラメータ組み合わせを評価可能\n\n期待効果: シャープレシオ 5-10%改善 → 運用パフォーマンス向上",
      },
      {
        type: "text",
        content:
          "実案件で成功するための3つの原則を押さえておく。\n\n**原則1: 問題分割**: 現実の問題は変数数百万に達することもある。地理的分割、時間分割、階層分割でサブ問題に分解し、各サブ問題を量子インスパイアード手法で解き、結果を統合する。\n\n**原則2: ベンチマーク比較**: 古典ソルバー（Gurobi）、古典ヒューリスティクス（SA、GA）、量子インスパイアード手法を同一条件で比較する。手法の優位性を数値で示すことが顧客への説得力につながる。\n\n**原則3: 段階的導入**: いきなり本番環境に投入せず、過去データで検証（バックテスト）→ 並行稼働（シャドーモード）→ 本番切替の順序で進める。顧客の業務リスクを最小化する。",
      },
      {
        type: "callout",
        content:
          "顧客への提案時、「量子インスパイアードで○○%改善」という数値には根拠が必要。必ず公平なベンチマーク（同一ハードウェア、同一時間制約）で比較し、改善の統計的有意性を示す。Cherry-pickingされた結果は信頼を損なう。",
        calloutType: "important",
      },
    ],
    keyConcepts: [
      {
        term: "問題分割",
        termEn: "Problem Decomposition",
        definition:
          "大規模な実問題を地理的・時間的・階層的にサブ問題に分解し、各サブ問題を独立に求解して統合するアプローチ。大規模QUBOの実用的な解法。",
      },
      {
        term: "ベンチマーク比較",
        termEn: "Benchmark Comparison",
        definition:
          "古典ソルバー、古典ヒューリスティクス、量子インスパイアード手法を同一条件（ハードウェア、時間制約、問題インスタンス）で比較評価すること。手法の優位性の客観的根拠。",
      },
      {
        term: "段階的導入",
        termEn: "Phased Deployment",
        definition:
          "バックテスト→シャドーモード（並行稼働）→本番切替の3段階で量子インスパイアード最適化を実業務に導入する安全なアプローチ。",
      },
      {
        term: "QUBO定式化パターン",
        termEn: "QUBO Formulation Patterns",
        definition:
          "物流（VRP/TSP）、スケジューリング（ジョブショップ）、ポートフォリオ（Markowitz型）など、業界共通のビジネス課題をQUBO形式に変換する定型的な手法。",
      },
    ],
  },
] as const satisfies readonly Lesson[];
