import type { QuizQuestion } from "@/types/quiz";

export const mathematicalOptimizationQuiz = [
  {
    id: "mo-quiz-1",
    topicId: "mathematical-optimization",
    lessonId: "mo-lesson-1",
    type: "multiple-choice",
    difficulty: "beginner",
    question:
      "線形計画法（LP）の最適解が存在する場合、その解はどこに位置するか？",
    options: [
      {
        id: "mo-q1-a",
        text: "実行可能領域の頂点（端点）",
        isCorrect: true,
      },
      {
        id: "mo-q1-b",
        text: "実行可能領域の内部の任意の点",
        isCorrect: false,
      },
      {
        id: "mo-q1-c",
        text: "実行可能領域の外部",
        isCorrect: false,
      },
      {
        id: "mo-q1-d",
        text: "原点に最も近い点",
        isCorrect: false,
      },
    ],
    explanation:
      "LPの実行可能領域は凸多面体であり、線形の目的関数の最大値・最小値は必ず頂点に存在します。これがシンプレックス法の理論的根拠です。複数の頂点が同じ最適値を持つ場合（退化）は、それらを結ぶ辺上のすべての点が最適解になります。",
  },
  {
    id: "mo-quiz-2",
    topicId: "mathematical-optimization",
    lessonId: "mo-lesson-1",
    type: "multiple-choice",
    difficulty: "intermediate",
    question:
      "LPの双対変数（シャドウプライス）が0.8である制約について、正しい解釈はどれか？",
    options: [
      {
        id: "mo-q2-a",
        text: "その制約の右辺値を1単位緩和すると、目的関数が0.8改善する",
        isCorrect: true,
      },
      {
        id: "mo-q2-b",
        text: "その制約が0.8の確率で満たされている",
        isCorrect: false,
      },
      {
        id: "mo-q2-c",
        text: "その制約に関わる変数が0.8である",
        isCorrect: false,
      },
      {
        id: "mo-q2-d",
        text: "その制約を完全に除去すると目的関数が80%改善する",
        isCorrect: false,
      },
    ],
    explanation:
      "シャドウプライスは制約のRight-Hand Side（RHS）を1単位だけ緩和したときの目的関数の限界改善量です。0.8ならRHSを1増やすと目的関数が0.8増加します。ただし、この値は一定範囲内でのみ有効です（感度分析）。",
  },
  {
    id: "mo-quiz-3",
    topicId: "mathematical-optimization",
    lessonId: "mo-lesson-1",
    type: "true-false",
    difficulty: "beginner",
    question:
      "線形計画法は多項式時間で解けるため、計算量クラスPに属する。",
    options: [
      { id: "mo-q3-a", text: "正しい", isCorrect: true },
      { id: "mo-q3-b", text: "誤り", isCorrect: false },
    ],
    explanation:
      "正しいです。内点法や楕円体法により線形計画問題は多項式時間で解けます。シンプレックス法は最悪ケースでは指数時間ですが、実用上は非常に高速です。LPがPに属することは、整数計画法（NP困難）との本質的な違いです。",
  },
  {
    id: "mo-quiz-4",
    topicId: "mathematical-optimization",
    lessonId: "mo-lesson-2",
    type: "multiple-choice",
    difficulty: "intermediate",
    question:
      "分枝限定法でLP緩和を使う目的として最も適切なものはどれか？",
    options: [
      {
        id: "mo-q4-a",
        text: "整数最適値の上界（最大化問題）を求め、不要な部分問題を刈り込むため",
        isCorrect: true,
      },
      {
        id: "mo-q4-b",
        text: "整数制約を自動的に満たす解を求めるため",
        isCorrect: false,
      },
      {
        id: "mo-q4-c",
        text: "問題を線形計画問題に完全に変換するため",
        isCorrect: false,
      },
      {
        id: "mo-q4-d",
        text: "変数を連続値として固定するため",
        isCorrect: false,
      },
    ],
    explanation:
      "LP緩和は整数制約を外すことで、元の問題の最適値の上界（最大化問題の場合）を求めます。この上界が既知の整数解（下界）以下であれば、その部分木の探索は不要です。これが分枝限定法の「限定（Bound）」の部分であり、効率的な枝刈りの鍵です。",
  },
  {
    id: "mo-quiz-5",
    topicId: "mathematical-optimization",
    lessonId: "mo-lesson-2",
    type: "multiple-choice",
    difficulty: "advanced",
    question:
      "緩和ギャップ（Integrality Gap）が小さい定式化の利点はどれか？",
    options: [
      {
        id: "mo-q5-a",
        text: "分枝限定法での枝刈りが効率的になり、求解時間が短縮される",
        isCorrect: true,
      },
      {
        id: "mo-q5-b",
        text: "問題がPに属することが保証される",
        isCorrect: false,
      },
      {
        id: "mo-q5-c",
        text: "LP緩和の計算時間が短くなる",
        isCorrect: false,
      },
      {
        id: "mo-q5-d",
        text: "変数の数が自動的に削減される",
        isCorrect: false,
      },
    ],
    explanation:
      "緩和ギャップが小さいと、LP緩和の最適値が整数最適値に近くなります。これにより分枝限定法で早期に有効な枝刈りができ、探索すべきノード数が劇的に減少します。同じ問題でも定式化の工夫で緩和ギャップを縮め、求解時間を桁違いに改善できます。",
  },
  {
    id: "mo-quiz-6",
    topicId: "mathematical-optimization",
    lessonId: "mo-lesson-3",
    type: "multiple-choice",
    difficulty: "beginner",
    question:
      "制約充足問題（CSP）と最適化問題の最も本質的な違いはどれか？",
    options: [
      {
        id: "mo-q6-a",
        text: "CSPは「すべての制約を満たす解」を求め、最適化問題は「目的関数を最大化/最小化する解」を求める",
        isCorrect: true,
      },
      {
        id: "mo-q6-b",
        text: "CSPは多項式時間で解け、最適化問題はNP困難である",
        isCorrect: false,
      },
      {
        id: "mo-q6-c",
        text: "CSPは離散変数のみ、最適化問題は連続変数のみを扱う",
        isCorrect: false,
      },
      {
        id: "mo-q6-d",
        text: "CSPには変数がなく、最適化問題には変数がある",
        isCorrect: false,
      },
    ],
    explanation:
      "CSPの目的は制約を満たす解（実行可能解）を見つけることです。最適化問題は実行可能解の中で目的関数を最良にする解を求めます。CSPも一般にNP困難であり、離散変数に限定されるわけでもありません。",
  },
  {
    id: "mo-quiz-7",
    topicId: "mathematical-optimization",
    lessonId: "mo-lesson-3",
    type: "multiple-choice",
    difficulty: "intermediate",
    question:
      "CSPのバックトラッキングにおいて、MRV（Minimum Remaining Values）ヒューリスティクスが有効な理由はどれか？",
    options: [
      {
        id: "mo-q7-a",
        text: "ドメインが小さい変数を先に割り当てることで、失敗を早期に検出し、探索木を小さくできる",
        isCorrect: true,
      },
      {
        id: "mo-q7-b",
        text: "ランダム性を導入して局所最適から脱出できる",
        isCorrect: false,
      },
      {
        id: "mo-q7-c",
        text: "制約の数を減らすことができる",
        isCorrect: false,
      },
      {
        id: "mo-q7-d",
        text: "バックトラッキングを完全に不要にする",
        isCorrect: false,
      },
    ],
    explanation:
      "MRVは「失敗優先（fail-first）」の原則に基づきます。ドメインが最も小さい（選択肢が少ない）変数は制約が厳しく、早めに割り当てることで矛盾を早期発見できます。これにより無駄な探索を減らし、バックトラッキングの効率が大幅に向上します。",
  },
  {
    id: "mo-quiz-8",
    topicId: "mathematical-optimization",
    lessonId: "mo-lesson-4",
    type: "multiple-choice",
    difficulty: "beginner",
    question:
      "焼きなまし法で温度パラメータが高いときの挙動として正しいものはどれか？",
    options: [
      {
        id: "mo-q8-a",
        text: "目的関数が悪化する解も高い確率で受容し、広範囲を探索する",
        isCorrect: true,
      },
      {
        id: "mo-q8-b",
        text: "良い解のみを受容し、精密に探索する",
        isCorrect: false,
      },
      {
        id: "mo-q8-c",
        text: "アルゴリズムが停止する",
        isCorrect: false,
      },
      {
        id: "mo-q8-d",
        text: "解空間の1点に収束する",
        isCorrect: false,
      },
    ],
    explanation:
      "焼きなまし法では温度が高いほど受容確率 exp(-ΔE/T) が1に近づき、悪化する解も受け入れやすくなります。これにより局所最適解から脱出して広範囲を探索できます。温度が下がるにつれて良い解のみを受容するようになり、精密探索に移行します。",
  },
  {
    id: "mo-quiz-9",
    topicId: "mathematical-optimization",
    lessonId: "mo-lesson-4",
    type: "multiple-choice",
    difficulty: "intermediate",
    question:
      "遺伝的アルゴリズムで「交叉（Crossover）」操作が果たす役割はどれか？",
    options: [
      {
        id: "mo-q9-a",
        text: "2つの親の良い特徴を組み合わせて、新しい解候補を生成する",
        isCorrect: true,
      },
      {
        id: "mo-q9-b",
        text: "解の品質を評価する",
        isCorrect: false,
      },
      {
        id: "mo-q9-c",
        text: "ランダムに新しい解を生成する",
        isCorrect: false,
      },
      {
        id: "mo-q9-d",
        text: "集団の個体数を減らす",
        isCorrect: false,
      },
    ],
    explanation:
      "交叉は2つの親個体の遺伝子情報を組み合わせて子個体を生成します。各親が持つ良い部分構造を受け継ぐことで、親より優れた解が生まれる可能性があります。突然変異がランダムな変化なのに対し、交叉は既存の良い情報の再結合です。",
  },
  {
    id: "mo-quiz-10",
    topicId: "mathematical-optimization",
    lessonId: "mo-lesson-4",
    type: "true-false",
    difficulty: "advanced",
    question:
      "メタヒューリスティクスは最適解を保証しないため、近似アルゴリズムより常に劣る。",
    options: [
      { id: "mo-q10-a", text: "正しい", isCorrect: false },
      { id: "mo-q10-b", text: "誤り", isCorrect: true },
    ],
    explanation:
      "誤りです。メタヒューリスティクスは最適解も近似比も保証しませんが、実際のベンチマークでは近似アルゴリズムより良い解を返すことが多々あります。近似アルゴリズムは「最悪ケース」の品質を保証しますが、典型的なインスタンスではメタヒューリスティクスの方が高性能な場合があります。理論保証と実用性能は別の評価軸です。",
  },
] as const satisfies readonly QuizQuestion[];
