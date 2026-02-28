import type { QuizQuestion } from "@/types/quiz";

export const quantumAlgorithmsQuiz: readonly QuizQuestion[] = [
  {
    id: "qa-q1",
    topicId: "quantum-algorithms",
    lessonId: "qa-lesson-1",
    type: "multiple-choice",
    difficulty: "intermediate",
    question:
      "Shorのアルゴリズムで周期発見に使用される量子演算は何ですか？",
    options: [
      { id: "qa-q1-a", text: "量子ウォーク", isCorrect: false },
      { id: "qa-q1-b", text: "量子フーリエ変換（QFT）", isCorrect: true },
      { id: "qa-q1-c", text: "Grover拡散演算子", isCorrect: false },
      { id: "qa-q1-d", text: "量子位相推定（QPE）のみ", isCorrect: false },
    ],
    explanation:
      "Shorのアルゴリズムでは、f(x) = aˣ mod N の周期 r を求めるために逆量子フーリエ変換（QFT†）を使用します。QFTにより周期構造を振幅として効率的に抽出できます。",
  },
  {
    id: "qa-q2",
    topicId: "quantum-algorithms",
    lessonId: "qa-lesson-1",
    type: "multiple-choice",
    difficulty: "advanced",
    question:
      "QFTの測定結果から周期 r を復元するために使用される古典的手法は何ですか？",
    options: [
      { id: "qa-q2-a", text: "ニュートン法", isCorrect: false },
      { id: "qa-q2-b", text: "連分数展開", isCorrect: true },
      { id: "qa-q2-c", text: "ユークリッドの互除法のみ", isCorrect: false },
      { id: "qa-q2-d", text: "モンテカルロ法", isCorrect: false },
    ],
    explanation:
      "QFTの測定結果は k/r に近い値を与えます。連分数展開（Continued Fraction Expansion）を用いてこの値に近い有理数を求め、その分母として周期 r を復元します。",
  },
  {
    id: "qa-q3",
    topicId: "quantum-algorithms",
    lessonId: "qa-lesson-1",
    type: "true-false",
    difficulty: "intermediate",
    question:
      "Shorのアルゴリズムは決定論的アルゴリズムであり、常に正しい因数を返す。",
    options: [
      { id: "qa-q3-a", text: "正しい", isCorrect: false },
      { id: "qa-q3-b", text: "誤り", isCorrect: true },
    ],
    explanation:
      "Shorのアルゴリズムは確率的アルゴリズムです。ランダムな a の選択や、r が奇数になるケースにより失敗する可能性があります。ただし成功確率は高く、数回の試行で高確率で因数が見つかります。",
  },
  {
    id: "qa-q4",
    topicId: "quantum-algorithms",
    lessonId: "qa-lesson-2",
    type: "multiple-choice",
    difficulty: "intermediate",
    question: "Grover反復（Grover iteration）を構成する2つの操作は何ですか？",
    options: [
      { id: "qa-q4-a", text: "Hadamard変換とCNOTゲート", isCorrect: false },
      { id: "qa-q4-b", text: "オラクル反射と拡散反射", isCorrect: true },
      { id: "qa-q4-c", text: "QFTと逆QFT", isCorrect: false },
      { id: "qa-q4-d", text: "位相回転と振幅増幅", isCorrect: false },
    ],
    explanation:
      "Grover反復は、(1) オラクル反射: ターゲット状態の位相を反転、(2) 拡散反射: 全振幅の平均を軸に反射、の2つの操作で構成されます。これを√N回繰り返してターゲットの振幅を最大化します。",
  },
  {
    id: "qa-q5",
    topicId: "quantum-algorithms",
    lessonId: "qa-lesson-2",
    type: "multiple-choice",
    difficulty: "advanced",
    question:
      "Groverのアルゴリズムで反復回数が最適値を超えるとどうなりますか？",
    options: [
      { id: "qa-q5-a", text: "精度がさらに向上する", isCorrect: false },
      { id: "qa-q5-b", text: "結果は変わらない", isCorrect: false },
      {
        id: "qa-q5-c",
        text: "ターゲット状態の確率がかえって低下する（過回転）",
        isCorrect: true,
      },
      { id: "qa-q5-d", text: "量子ビットがデコヒーレンスを起こす", isCorrect: false },
    ],
    explanation:
      "Groverの回転は幾何学的には円上の回転であるため、最適回数（π√N/4回）を超えるとターゲット状態から遠ざかり確率が低下します。これを過回転（overshooting）と呼びます。",
  },
  {
    id: "qa-q6",
    topicId: "quantum-algorithms",
    lessonId: "qa-lesson-3",
    type: "multiple-choice",
    difficulty: "beginner",
    question: "QAOAが対象とする問題カテゴリはどれですか？",
    options: [
      { id: "qa-q6-a", text: "素因数分解", isCorrect: false },
      { id: "qa-q6-b", text: "組合せ最適化問題", isCorrect: true },
      { id: "qa-q6-c", text: "量子化学計算", isCorrect: false },
      { id: "qa-q6-d", text: "機械学習の分類", isCorrect: false },
    ],
    explanation:
      "QAOA（Quantum Approximate Optimization Algorithm）は組合せ最適化問題を対象とします。代表的なベンチマーク問題はMaxCut問題です。量子化学計算にはVQEが使用されます。",
  },
  {
    id: "qa-q7",
    topicId: "quantum-algorithms",
    lessonId: "qa-lesson-3",
    type: "multiple-choice",
    difficulty: "intermediate",
    question: "QAOAはどのような量子コンピュータを前提として設計されていますか？",
    options: [
      { id: "qa-q7-a", text: "完全な誤り訂正付き量子コンピュータ", isCorrect: false },
      { id: "qa-q7-b", text: "NISQデバイス（ノイズのある中規模量子コンピュータ）", isCorrect: true },
      { id: "qa-q7-c", text: "量子アニーラ", isCorrect: false },
      { id: "qa-q7-d", text: "トポロジカル量子コンピュータ", isCorrect: false },
    ],
    explanation:
      "QAOAはNISQ（Noisy Intermediate-Scale Quantum）デバイス向けに設計されています。誤り訂正なしの現在のハードウェアでも動作する変分量子アルゴリズムです。",
  },
  {
    id: "qa-q8",
    topicId: "quantum-algorithms",
    lessonId: "qa-lesson-4",
    type: "multiple-choice",
    difficulty: "intermediate",
    question: "VQEが利用する数学的原理は何ですか？",
    options: [
      { id: "qa-q8-a", text: "フェルマーの最終定理", isCorrect: false },
      { id: "qa-q8-b", text: "変分原理（⟨ψ|H|ψ⟩ ≥ E₀）", isCorrect: true },
      { id: "qa-q8-c", text: "不確定性原理", isCorrect: false },
      { id: "qa-q8-d", text: "ベルの不等式", isCorrect: false },
    ],
    explanation:
      "VQEは変分原理を利用します。任意の試行波動関数のハミルトニアン期待値は基底状態エネルギー E₀ 以上であるという性質を使い、パラメータを最適化して下界を改善します。",
  },
  {
    id: "qa-q9",
    topicId: "quantum-algorithms",
    lessonId: "qa-lesson-4",
    type: "multiple-choice",
    difficulty: "advanced",
    question:
      "VQEにおけるBarren Plateau問題とは何ですか？",
    options: [
      {
        id: "qa-q9-a",
        text: "量子ビット数の増加に伴い回路深さが指数的に増加する問題",
        isCorrect: false,
      },
      {
        id: "qa-q9-b",
        text: "パラメータ空間の勾配が指数関数的に小さくなり最適化が困難になる問題",
        isCorrect: true,
      },
      {
        id: "qa-q9-c",
        text: "量子デコヒーレンスにより計算結果が不正確になる問題",
        isCorrect: false,
      },
      {
        id: "qa-q9-d",
        text: "ハミルトニアンの項数が多すぎて測定が困難になる問題",
        isCorrect: false,
      },
    ],
    explanation:
      "Barren Plateau問題は、変分量子回路のパラメータ空間において勾配が指数関数的に小さくなる現象です。深い回路やランダムな初期化で発生しやすく、勾配ベースの最適化が実質的に不可能になります。",
  },
  {
    id: "qa-q10",
    topicId: "quantum-algorithms",
    lessonId: "qa-lesson-4",
    type: "true-false",
    difficulty: "intermediate",
    question:
      "現在のNISQデバイスでのVQEは、古典計算手法（CCSD(T)やDMRG）を常に上回る精度を達成している。",
    options: [
      { id: "qa-q10-a", text: "正しい", isCorrect: false },
      { id: "qa-q10-b", text: "誤り", isCorrect: true },
    ],
    explanation:
      "現在のNISQデバイスでは数十量子ビット程度の小分子しか扱えず、ノイズの影響もあり、多くのケースで古典計算手法（CCSD(T)、DMRG等）の方が精度が高いです。量子優位性はまだ実証されていません。",
  },
] as const satisfies readonly QuizQuestion[];
