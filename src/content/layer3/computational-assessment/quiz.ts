import type { QuizQuestion } from "@/types/quiz";

export const computationalAssessmentQuiz: readonly QuizQuestion[] = [
  {
    id: "comp-assess-q1",
    topicId: "computational-assessment",
    lessonId: "comp-assess-lesson1",
    type: "multiple-choice",
    difficulty: "beginner",
    question:
      "構造化ヒアリングの5つのカテゴリに含まれないものはどれか？",
    options: [
      {
        id: "comp-assess-q1-a",
        text: "ビジネスコンテキスト",
        isCorrect: false,
      },
      {
        id: "comp-assess-q1-b",
        text: "問題の構造",
        isCorrect: false,
      },
      {
        id: "comp-assess-q1-c",
        text: "競合他社の技術スタック",
        isCorrect: true,
      },
      {
        id: "comp-assess-q1-d",
        text: "現行ソリューション",
        isCorrect: false,
      },
    ],
    explanation:
      "構造化ヒアリングの5カテゴリは、ビジネスコンテキスト・問題の構造・データ・現行ソリューション・技術環境。競合他社の技術スタックは計算構造アセスメントの対象ではない。",
  },
  {
    id: "comp-assess-q2",
    topicId: "computational-assessment",
    lessonId: "comp-assess-lesson1",
    type: "multiple-choice",
    difficulty: "intermediate",
    question:
      "顧客が「シフトを自動で組みたい」と相談してきた。この課題の数理的定式化として最も適切なものはどれか？",
    options: [
      {
        id: "comp-assess-q2-a",
        text: "巡回セールスマン問題（TSP）",
        isCorrect: false,
      },
      {
        id: "comp-assess-q2-b",
        text: "制約充足問題（CSP）/ ナーススケジューリング問題",
        isCorrect: true,
      },
      {
        id: "comp-assess-q2-c",
        text: "線形回帰モデル",
        isCorrect: false,
      },
      {
        id: "comp-assess-q2-d",
        text: "グラフ彩色問題",
        isCorrect: false,
      },
    ],
    explanation:
      "シフト自動作成は、人員の労働時間制約、スキル要件、公平性等の多数の制約を満たしながらスケジュールを組む問題であり、制約充足問題（CSP）またはナーススケジューリング問題として定式化される。",
  },
  {
    id: "comp-assess-q3",
    topicId: "computational-assessment",
    lessonId: "comp-assess-lesson2",
    type: "multiple-choice",
    difficulty: "intermediate",
    question:
      "数理モデル化の4つのステップの正しい順序はどれか？",
    options: [
      {
        id: "comp-assess-q3-a",
        text: "目的関数構築 → 変数定義 → 制約記述 → 問題クラス分類",
        isCorrect: false,
      },
      {
        id: "comp-assess-q3-b",
        text: "変数定義 → 制約記述 → 目的関数構築 → 問題クラス分類",
        isCorrect: true,
      },
      {
        id: "comp-assess-q3-c",
        text: "問題クラス分類 → 変数定義 → 目的関数構築 → 制約記述",
        isCorrect: false,
      },
      {
        id: "comp-assess-q3-d",
        text: "制約記述 → 目的関数構築 → 変数定義 → 問題クラス分類",
        isCorrect: false,
      },
    ],
    explanation:
      "正しい順序は、(1) 変数定義: 何を決定するか明確にし、(2) 制約記述: 解が満たすべき条件を列挙し、(3) 目的関数構築: 最適化指標を定義し、(4) 問題クラス分類: LP/QP/MILP/QUBO等に分類する。変数が定義されないと制約も目的関数も書けない。",
  },
  {
    id: "comp-assess-q4",
    topicId: "computational-assessment",
    lessonId: "comp-assess-lesson2",
    type: "true-false",
    difficulty: "beginner",
    question:
      "すべての最適化問題はQUBO形式に自然に変換できるため、量子アニーリングで解くことが常に最適である。",
    options: [
      {
        id: "comp-assess-q4-a",
        text: "正しい",
        isCorrect: false,
      },
      {
        id: "comp-assess-q4-b",
        text: "誤り",
        isCorrect: true,
      },
    ],
    explanation:
      "すべての問題がQUBOに自然に変換できるわけではない。連続変数を含む問題や、複雑な非線形制約を持つ問題はQUBO変換のオーバーヘッドが大きく、かえってソリューション品質が下がることがある。問題の性質に応じた適切なアプローチ選択が重要。",
  },
  {
    id: "comp-assess-q5",
    topicId: "computational-assessment",
    lessonId: "comp-assess-lesson3",
    type: "multiple-choice",
    difficulty: "advanced",
    question:
      "50万個の連続変数を持つ線形計画問題（LP）に対して、最も適切なアプローチはどれか？",
    options: [
      {
        id: "comp-assess-q5-a",
        text: "量子アニーリング（D-Wave）で求解する",
        isCorrect: false,
      },
      {
        id: "comp-assess-q5-b",
        text: "量子インスパイアード手法でQUBO化して解く",
        isCorrect: false,
      },
      {
        id: "comp-assess-q5-c",
        text: "古典ソルバー（Gurobi/CPLEX）で厳密解を求める",
        isCorrect: true,
      },
      {
        id: "comp-assess-q5-d",
        text: "ゲート型量子コンピュータの商用化を待つ",
        isCorrect: false,
      },
    ],
    explanation:
      "LP（線形計画）で変数100万未満であれば、古典ソルバー（Gurobi/CPLEX）が最適解を効率的に求解できる。LPは多項式時間で解ける問題クラスであり、量子的アプローチは不要。古典ファースト原則の典型例。",
  },
  {
    id: "comp-assess-q6",
    topicId: "computational-assessment",
    lessonId: "comp-assess-lesson3",
    type: "multiple-choice",
    difficulty: "advanced",
    question:
      "3段階スクリーニングの Stage 3 で量子インスパイアード手法を推奨する条件として最も重要なものはどれか？",
    options: [
      {
        id: "comp-assess-q6-a",
        text: "顧客が量子コンピュータの利用を希望していること",
        isCorrect: false,
      },
      {
        id: "comp-assess-q6-b",
        text: "問題がQUBO形式に自然に変換でき、古典ヒューリスティクスでは目標精度または計算時間を満たせないこと",
        isCorrect: true,
      },
      {
        id: "comp-assess-q6-c",
        text: "問題の変数が1,000個以上であること",
        isCorrect: false,
      },
      {
        id: "comp-assess-q6-d",
        text: "プロジェクトの予算が十分に大きいこと",
        isCorrect: false,
      },
    ],
    explanation:
      "量子インスパイアード手法を推奨するのは、問題がQUBOに自然に変換でき（変換オーバーヘッドが小さく）、かつ古典ヒューリスティクスでは目標精度や計算時間の要件を満たせない場合。顧客の希望や予算ではなく、技術的適合性が判断基準。",
  },
  {
    id: "comp-assess-q7",
    topicId: "computational-assessment",
    lessonId: "comp-assess-lesson3",
    type: "multiple-choice",
    difficulty: "intermediate",
    question:
      "古典vs量子の判断における5つの基準に含まれないものはどれか？",
    options: [
      {
        id: "comp-assess-q7-a",
        text: "問題規模と変数型",
        isCorrect: false,
      },
      {
        id: "comp-assess-q7-b",
        text: "計算時間要件",
        isCorrect: false,
      },
      {
        id: "comp-assess-q7-c",
        text: "量子コンピュータのベンダー評価",
        isCorrect: true,
      },
      {
        id: "comp-assess-q7-d",
        text: "経済合理性",
        isCorrect: false,
      },
    ],
    explanation:
      "5つの判断基準は、(1)問題規模と変数型、(2)要求精度、(3)計算時間要件、(4)問題の反復性、(5)経済合理性。ベンダー評価はアプローチ決定後の実装フェーズで行うもので、判断基準には含まれない。",
  },
  {
    id: "comp-assess-q8",
    topicId: "computational-assessment",
    lessonId: "comp-assess-lesson3",
    type: "true-false",
    difficulty: "intermediate",
    question:
      "アセスメントで「この問題は古典計算で十分に解決できる」と報告することは、コンサルティングの価値を下げる。",
    options: [
      {
        id: "comp-assess-q8-a",
        text: "正しい",
        isCorrect: false,
      },
      {
        id: "comp-assess-q8-b",
        text: "誤り",
        isCorrect: true,
      },
    ],
    explanation:
      "古典計算で十分に解決できることを示し、無駄な量子投資を防ぐアドバイスは、顧客にとって高い価値がある。「最適な計算手法を提案する」姿勢は長期的な信頼関係を構築し、将来の案件につながる。手段を売るのではなく、課題解決を売るのがプロフェッショナル。",
  },
] as const satisfies readonly QuizQuestion[];
