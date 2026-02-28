import type { QuizQuestion } from "@/types/quiz";

export const computationalComplexityQuiz = [
  {
    id: "cc-quiz-1",
    topicId: "computational-complexity",
    lessonId: "cc-lesson-1",
    type: "multiple-choice",
    difficulty: "beginner",
    question: "クラスPに属する問題の特徴として正しいものはどれか？",
    options: [
      {
        id: "cc-q1-a",
        text: "入力サイズnに対して多項式時間O(n^k)で解けるアルゴリズムが存在する",
        isCorrect: true,
      },
      {
        id: "cc-q1-b",
        text: "解の検証が多項式時間でできる",
        isCorrect: false,
      },
      {
        id: "cc-q1-c",
        text: "指数時間でしか解けない",
        isCorrect: false,
      },
      {
        id: "cc-q1-d",
        text: "量子コンピュータでのみ効率的に解ける",
        isCorrect: false,
      },
    ],
    explanation:
      "クラスPは多項式時間で「解ける」問題の集合です。選択肢Bは「検証」の話でNPの定義です。P ⊆ NP なので検証もできますが、Pの本質的な特徴は「解ける」ことです。",
  },
  {
    id: "cc-quiz-2",
    topicId: "computational-complexity",
    lessonId: "cc-lesson-1",
    type: "true-false",
    difficulty: "beginner",
    question: "P ⊆ NP である。つまり、クラスPに属するすべての問題はクラスNPにも属する。",
    options: [
      { id: "cc-q2-a", text: "正しい", isCorrect: true },
      { id: "cc-q2-b", text: "誤り", isCorrect: false },
    ],
    explanation:
      "正しいです。多項式時間で解ける問題は、当然その解を多項式時間で検証もできます。よって P ⊆ NP が成り立ちます。",
  },
  {
    id: "cc-quiz-3",
    topicId: "computational-complexity",
    lessonId: "cc-lesson-1",
    type: "multiple-choice",
    difficulty: "intermediate",
    question:
      "巡回セールスマン問題（TSP）の判定版「総距離X以下のルートが存在するか？」について正しい記述はどれか？",
    options: [
      {
        id: "cc-q3-a",
        text: "NPに属する。解の検証はO(n)でできるが、最適解を求めるのは指数時間",
        isCorrect: true,
      },
      {
        id: "cc-q3-b",
        text: "Pに属する。ダイクストラ法で多項式時間に解ける",
        isCorrect: false,
      },
      {
        id: "cc-q3-c",
        text: "NPに属さない。解の検証にも指数時間かかる",
        isCorrect: false,
      },
      {
        id: "cc-q3-d",
        text: "BPPに属するが、NPには属さない",
        isCorrect: false,
      },
    ],
    explanation:
      "TSPの判定版はNP完全です。与えられたルートの総距離を計算するのはO(n)なので、解の検証は多項式時間でできます。ダイクストラ法は最短経路問題を解くもので、TSPとは異なる問題です。",
  },
  {
    id: "cc-quiz-4",
    topicId: "computational-complexity",
    lessonId: "cc-lesson-2",
    type: "multiple-choice",
    difficulty: "intermediate",
    question:
      "問題AがNP完全であることを示すために必要な2つの条件は何か？",
    options: [
      {
        id: "cc-q4-a",
        text: "AがNPに属すること、および既知のNP完全問題BをAに多項式時間で帰着できること",
        isCorrect: true,
      },
      {
        id: "cc-q4-b",
        text: "AがPに属さないこと、およびAの解が指数個存在すること",
        isCorrect: false,
      },
      {
        id: "cc-q4-c",
        text: "AをNP完全問題Bに帰着できること、およびAが指数時間でしか解けないこと",
        isCorrect: false,
      },
      {
        id: "cc-q4-d",
        text: "AがNPに属すること、およびAを既知のNP完全問題Bに帰着できること",
        isCorrect: false,
      },
    ],
    explanation:
      "NP完全性の証明には (1) AがNPに属する（解の検証が多項式時間）と (2) 既知のNP完全問題BからAへの帰着（B ≤p A）が必要です。選択肢Dは帰着の方向が逆です。AをBに帰着するのではなく、BをAに帰着する必要があります。",
  },
  {
    id: "cc-quiz-5",
    topicId: "computational-complexity",
    lessonId: "cc-lesson-2",
    type: "multiple-choice",
    difficulty: "beginner",
    question: "最初にNP完全と証明された問題はどれか？",
    options: [
      {
        id: "cc-q5-a",
        text: "SAT（充足可能性問題）",
        isCorrect: true,
      },
      {
        id: "cc-q5-b",
        text: "巡回セールスマン問題",
        isCorrect: false,
      },
      {
        id: "cc-q5-c",
        text: "ナップサック問題",
        isCorrect: false,
      },
      {
        id: "cc-q5-d",
        text: "グラフ彩色問題",
        isCorrect: false,
      },
    ],
    explanation:
      "1971年にStephen CookがSATのNP完全性を証明しました（Cook-Levinの定理）。その後、SATからの帰着により他のNP完全問題が次々と発見されました。",
  },
  {
    id: "cc-quiz-6",
    topicId: "computational-complexity",
    lessonId: "cc-lesson-3",
    type: "multiple-choice",
    difficulty: "intermediate",
    question: "頂点被覆の2-近似アルゴリズムの近似比が2であることの意味として正しいものはどれか？",
    options: [
      {
        id: "cc-q6-a",
        text: "アルゴリズムが返す被覆のサイズは、最小頂点被覆のサイズの2倍以下であることが保証される",
        isCorrect: true,
      },
      {
        id: "cc-q6-b",
        text: "アルゴリズムの実行時間が最適アルゴリズムの2倍以下である",
        isCorrect: false,
      },
      {
        id: "cc-q6-c",
        text: "50%の確率で最適解が得られる",
        isCorrect: false,
      },
      {
        id: "cc-q6-d",
        text: "最適解とちょうど2個の差でしかずれない",
        isCorrect: false,
      },
    ],
    explanation:
      "近似比2は「比率」の保証です。最適解が100ならアルゴリズムの解は200以下。差が一定（加法的誤差）ではなく、比率が一定（乗法的誤差）です。",
  },
  {
    id: "cc-quiz-7",
    topicId: "computational-complexity",
    lessonId: "cc-lesson-3",
    type: "true-false",
    difficulty: "advanced",
    question:
      "集合被覆問題の貪欲アルゴリズムの近似比 O(ln n) は、P ≠ NP を仮定した場合にほぼ最良（(1-ε)ln n は NP困難）であることが知られている。",
    options: [
      { id: "cc-q7-a", text: "正しい", isCorrect: true },
      { id: "cc-q7-b", text: "誤り", isCorrect: false },
    ],
    explanation:
      "正しいです。集合被覆問題では、貪欲アルゴリズムの O(ln n) 近似比は本質的に最良です。これはPCP定理とその拡張から導かれる結果で、近似困難性理論の重要な成果です。",
  },
  {
    id: "cc-quiz-8",
    topicId: "computational-complexity",
    lessonId: "cc-lesson-4",
    type: "multiple-choice",
    difficulty: "beginner",
    question: "ラスベガスアルゴリズムとモンテカルロアルゴリズムの違いとして正しいものはどれか？",
    options: [
      {
        id: "cc-q8-a",
        text: "ラスベガスは常に正しい答えを返すが実行時間がランダム。モンテカルロは実行時間が確定的だが答えに誤りの可能性がある",
        isCorrect: true,
      },
      {
        id: "cc-q8-b",
        text: "ラスベガスは乱数を使い、モンテカルロは乱数を使わない",
        isCorrect: false,
      },
      {
        id: "cc-q8-c",
        text: "モンテカルロの方が常に高速である",
        isCorrect: false,
      },
      {
        id: "cc-q8-d",
        text: "ラスベガスはNP問題専用、モンテカルロはP問題専用",
        isCorrect: false,
      },
    ],
    explanation:
      "ラスベガスアルゴリズムは正確性を保証し実行時間がランダム（例: ランダムクイックソート）。モンテカルロアルゴリズムは時間を保証し正確性が確率的（例: Miller-Rabin素数判定）。どちらも乱数を使います。",
  },
  {
    id: "cc-quiz-9",
    topicId: "computational-complexity",
    lessonId: "cc-lesson-4",
    type: "multiple-choice",
    difficulty: "intermediate",
    question: "計算量クラスの包含関係として正しいものはどれか？",
    options: [
      {
        id: "cc-q9-a",
        text: "P ⊆ BPP ⊆ BQP ⊆ PSPACE",
        isCorrect: true,
      },
      {
        id: "cc-q9-b",
        text: "BQP ⊆ BPP ⊆ P ⊆ PSPACE",
        isCorrect: false,
      },
      {
        id: "cc-q9-c",
        text: "P ⊆ NP ⊆ BPP ⊆ BQP",
        isCorrect: false,
      },
      {
        id: "cc-q9-d",
        text: "BPP ⊆ P ⊆ BQP ⊆ NP",
        isCorrect: false,
      },
    ],
    explanation:
      "P ⊆ BPP（確率なしは確率ありの特殊ケース）、BPP ⊆ BQP（古典確率は量子の特殊ケース）、BQP ⊆ PSPACE（量子計算は多項式空間でシミュレート可能）。NP と BPP/BQP の関係は未解決です。",
  },
  {
    id: "cc-quiz-10",
    topicId: "computational-complexity",
    lessonId: "cc-lesson-4",
    type: "multiple-choice",
    difficulty: "advanced",
    question:
      "Miller-Rabin素数判定を k=20 回のイテレーションで実行したとき、合成数を「素数」と誤判定する確率の上界として最も適切なものはどれか？",
    options: [
      {
        id: "cc-q10-a",
        text: "(1/4)^20 ≈ 10^{-12}",
        isCorrect: true,
      },
      {
        id: "cc-q10-b",
        text: "1/20 = 0.05",
        isCorrect: false,
      },
      {
        id: "cc-q10-c",
        text: "(1/2)^20 ≈ 10^{-6}",
        isCorrect: false,
      },
      {
        id: "cc-q10-d",
        text: "0（絶対に誤判定しない）",
        isCorrect: false,
      },
    ],
    explanation:
      "Miller-Rabin テストの各イテレーションで合成数を見逃す確率は最大 1/4 です。k 回の独立なイテレーションで全て見逃す確率は (1/4)^k 以下。k=20 なら (1/4)^20 ≈ 10^{-12} で、実用上は無視できるレベルです。",
  },
] as const satisfies readonly QuizQuestion[];
