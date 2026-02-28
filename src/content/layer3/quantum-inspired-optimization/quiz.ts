import type { QuizQuestion } from "@/types/quiz";

export const quantumInspiredOptimizationQuiz: readonly QuizQuestion[] = [
  {
    id: "qi-opt-q1",
    topicId: "quantum-inspired-optimization",
    lessonId: "qi-opt-lesson1",
    type: "multiple-choice",
    difficulty: "beginner",
    question:
      "シミュレーテッドアニーリング（SA）で「温度」パラメータが果たす役割として正しいものはどれか？",
    options: [
      {
        id: "qi-opt-q1-a",
        text: "CPUの動作温度を制御する",
        isCorrect: false,
      },
      {
        id: "qi-opt-q1-b",
        text: "解の悪化を受け入れる確率を制御し、局所最適解からの脱出を可能にする",
        isCorrect: true,
      },
      {
        id: "qi-opt-q1-c",
        text: "変数の数を制限する",
        isCorrect: false,
      },
      {
        id: "qi-opt-q1-d",
        text: "目的関数の重みを調整する",
        isCorrect: false,
      },
    ],
    explanation:
      "SAの温度パラメータは、解が悪化する遷移を受け入れる確率を制御する。温度が高い段階では悪化も頻繁に受け入れ（探索フェーズ）、温度が下がるにつれて改善のみを受け入れる（収束フェーズ）。これにより局所最適解からの脱出を図る。",
  },
  {
    id: "qi-opt-q2",
    topicId: "quantum-inspired-optimization",
    lessonId: "qi-opt-lesson1",
    type: "multiple-choice",
    difficulty: "intermediate",
    question:
      "SAの性能に最も大きく影響するチューニング要素はどれか？",
    options: [
      {
        id: "qi-opt-q2-a",
        text: "プログラミング言語の選択",
        isCorrect: false,
      },
      {
        id: "qi-opt-q2-b",
        text: "初期温度の設定",
        isCorrect: false,
      },
      {
        id: "qi-opt-q2-c",
        text: "問題固有の近傍関数の設計",
        isCorrect: true,
      },
      {
        id: "qi-opt-q2-d",
        text: "乱数生成器の種類",
        isCorrect: false,
      },
    ],
    explanation:
      "SAの性能に最も大きく影響するのは近傍関数の設計である。TSPなら2-opt/3-opt、スケジューリングならスワップ/挿入など、問題の構造を活かした近傍定義が解の品質を左右する。初期温度や冷却スケジュールも重要だが、近傍設計が最も本質的。",
  },
  {
    id: "qi-opt-q3",
    topicId: "quantum-inspired-optimization",
    lessonId: "qi-opt-lesson2",
    type: "multiple-choice",
    difficulty: "intermediate",
    question:
      "Simulated Bifurcation（SB）の最大の特徴として正しいものはどれか？",
    options: [
      {
        id: "qi-opt-q3-a",
        text: "量子コンピュータ上でのみ実行可能",
        isCorrect: false,
      },
      {
        id: "qi-opt-q3-b",
        text: "行列-ベクトル積による超並列性でGPUとの相性が非常に良い",
        isCorrect: true,
      },
      {
        id: "qi-opt-q3-c",
        text: "あらゆる問題に対して最適解を保証する",
        isCorrect: false,
      },
      {
        id: "qi-opt-q3-d",
        text: "10変数以下の小規模問題に特化している",
        isCorrect: false,
      },
    ],
    explanation:
      "SBの最大の特徴は超並列性である。変数間の相互作用を行列-ベクトル積として計算するため、GPUの並列処理能力を最大限活用できる。100,000変数規模のQUBO問題に対してD-Wave量子アニーリングを上回る性能を古典GPUで達成した実績がある。",
  },
  {
    id: "qi-opt-q4",
    topicId: "quantum-inspired-optimization",
    lessonId: "qi-opt-lesson2",
    type: "true-false",
    difficulty: "beginner",
    question:
      "量子インスパイアード手法は量子コンピュータのハードウェアがなければ実行できない。",
    options: [
      {
        id: "qi-opt-q4-a",
        text: "正しい",
        isCorrect: false,
      },
      {
        id: "qi-opt-q4-b",
        text: "誤り",
        isCorrect: true,
      },
    ],
    explanation:
      "量子インスパイアード手法は量子力学の原理に「着想を得た」古典アルゴリズムであり、通常のCPU/GPUで実行できる。量子ハードウェアを必要としないため、今日から実ビジネスに適用可能。これが最大の実用的メリット。",
  },
  {
    id: "qi-opt-q5",
    topicId: "quantum-inspired-optimization",
    lessonId: "qi-opt-lesson2",
    type: "multiple-choice",
    difficulty: "advanced",
    question:
      "QAOA-Inspired手法が大規模問題に適さない理由として正しいものはどれか？",
    options: [
      {
        id: "qi-opt-q5-a",
        text: "GPUに対応していないから",
        isCorrect: false,
      },
      {
        id: "qi-opt-q5-b",
        text: "テンソルネットワークの計算コストが変数数に対して指数的に増加するため",
        isCorrect: true,
      },
      {
        id: "qi-opt-q5-c",
        text: "QUBO形式にしか適用できないから",
        isCorrect: false,
      },
      {
        id: "qi-opt-q5-d",
        text: "ライセンス料が変数数に比例して増加するから",
        isCorrect: false,
      },
    ],
    explanation:
      "QAOA-Inspiredはテンソルネットワーク（行列積状態等）で量子回路を古典シミュレートする手法であり、変数数が増えるとテンソルの次元が指数的に増加して計算コストが爆発する。数百変数程度が実用範囲であり、大規模問題にはSBのほうが適している。",
  },
  {
    id: "qi-opt-q6",
    topicId: "quantum-inspired-optimization",
    lessonId: "qi-opt-lesson3",
    type: "multiple-choice",
    difficulty: "advanced",
    question:
      "物流会社の配送ルート最適化（50台×200地点）を量子インスパイアード手法で解く際、最も重要なテクニックはどれか？",
    options: [
      {
        id: "qi-opt-q6-a",
        text: "変数をすべて連続変数に緩和する",
        isCorrect: false,
      },
      {
        id: "qi-opt-q6-b",
        text: "エリア分割でサブ問題に分解し、各サブ問題をGPU上で並列求解する",
        isCorrect: true,
      },
      {
        id: "qi-opt-q6-c",
        text: "制約条件をすべて無視して目的関数だけを最小化する",
        isCorrect: false,
      },
      {
        id: "qi-opt-q6-d",
        text: "ゲート型量子コンピュータの商用化を待つ",
        isCorrect: false,
      },
    ],
    explanation:
      "50台×200地点では変数数が数百万に達するため、直接QUBOとして解くことは困難。地理的クラスタリングでエリア分割し、各エリアを5,000-10,000変数のサブ問題としてGPU上のdSBで並列求解するアプローチが現実的。問題分割は大規模実問題の必須テクニック。",
  },
  {
    id: "qi-opt-q7",
    topicId: "quantum-inspired-optimization",
    lessonId: "qi-opt-lesson3",
    type: "multiple-choice",
    difficulty: "intermediate",
    question:
      "量子インスパイアード手法の実案件導入における「段階的導入」の正しい順序はどれか？",
    options: [
      {
        id: "qi-opt-q7-a",
        text: "本番切替 → バックテスト → シャドーモード",
        isCorrect: false,
      },
      {
        id: "qi-opt-q7-b",
        text: "バックテスト → シャドーモード → 本番切替",
        isCorrect: true,
      },
      {
        id: "qi-opt-q7-c",
        text: "シャドーモード → 本番切替 → バックテスト",
        isCorrect: false,
      },
      {
        id: "qi-opt-q7-d",
        text: "ベンチマーク → 本番切替 → 振り返り",
        isCorrect: false,
      },
    ],
    explanation:
      "安全な段階的導入の順序は、(1) バックテスト（過去データで検証）→ (2) シャドーモード（本番環境で並行稼働、既存手法の結果と比較）→ (3) 本番切替。顧客の業務リスクを最小化しながら手法の有効性を段階的に実証する。",
  },
  {
    id: "qi-opt-q8",
    topicId: "quantum-inspired-optimization",
    lessonId: "qi-opt-lesson3",
    type: "true-false",
    difficulty: "intermediate",
    question:
      "ポートフォリオ最適化（Markowitz型）は、二次の目的関数とバイナリ変数を持つためQUBO形式と相性が良い。",
    options: [
      {
        id: "qi-opt-q8-a",
        text: "正しい",
        isCorrect: true,
      },
      {
        id: "qi-opt-q8-b",
        text: "誤り",
        isCorrect: false,
      },
    ],
    explanation:
      "Markowitz型ポートフォリオ最適化は、リターン（線形項）とリスク（共分散行列による二次項）の重み付き和を最適化する問題。銘柄の選択/非選択をバイナリ変数で表現でき、目的関数が二次であるため、QUBO形式に自然にマッピングできる。SBの得意領域。",
  },
] as const satisfies readonly QuizQuestion[];
