import type { QuizQuestion } from "@/types/quiz";

export const classicalAiHybridQuiz = [
  {
    id: "ah-quiz-1",
    topicId: "classical-ai-hybrid",
    lessonId: "ah-lesson-1",
    type: "multiple-choice",
    difficulty: "beginner",
    question:
      "Predict-then-Optimize パターンの2つのステージの正しい順序はどれか？",
    options: [
      {
        id: "ah-q1-a",
        text: "ステージ1: 機械学習で不確実パラメータを予測 → ステージ2: 予測値を入力として最適化問題を解く",
        isCorrect: true,
      },
      {
        id: "ah-q1-b",
        text: "ステージ1: 最適化問題を解く → ステージ2: 解を機械学習で改善する",
        isCorrect: false,
      },
      {
        id: "ah-q1-c",
        text: "ステージ1: データ収集 → ステージ2: 可視化",
        isCorrect: false,
      },
      {
        id: "ah-q1-d",
        text: "ステージ1: 最適化で学習データ生成 → ステージ2: 機械学習モデル訓練",
        isCorrect: false,
      },
    ],
    explanation:
      "Predict-then-Optimize は「まず予測、次に最適化」の2段階アプローチです。機械学習で需要やコストなどの不確実パラメータを予測し、その予測値を入力として最適化問題を解きます。選択肢Bは逆順、Dは目的が異なります。",
  },
  {
    id: "ah-quiz-2",
    topicId: "classical-ai-hybrid",
    lessonId: "ah-lesson-1",
    type: "multiple-choice",
    difficulty: "intermediate",
    question:
      "Smart Predict-then-Optimize（SPO）が従来のPredict-then-Optimizeより優れている点はどれか？",
    options: [
      {
        id: "ah-q2-a",
        text: "予測精度ではなく意思決定の質を直接最適化できる",
        isCorrect: true,
      },
      {
        id: "ah-q2-b",
        text: "予測モデルが不要になる",
        isCorrect: false,
      },
      {
        id: "ah-q2-c",
        text: "最適化ソルバーが不要になる",
        isCorrect: false,
      },
      {
        id: "ah-q2-d",
        text: "常にPredict-then-Optimizeより予測精度が高くなる",
        isCorrect: false,
      },
    ],
    explanation:
      "SPOの本質は、最適化結果を予測モデルの学習にフィードバックすることで、MSE等の予測精度メトリクスではなく「最適化後の意思決定の質」を直接改善する点です。予測モデルも最適化ソルバーも引き続き必要で、予測精度自体は下がることもあります。",
  },
  {
    id: "ah-quiz-3",
    topicId: "classical-ai-hybrid",
    lessonId: "ah-lesson-1",
    type: "multiple-choice",
    difficulty: "intermediate",
    question:
      "予測誤差が最適化結果に伝搬する問題への対策として適切なものはどれか？",
    options: [
      {
        id: "ah-q3-a",
        text: "ロバスト最適化（最悪ケースを考慮）や確率的最適化（分布を考慮）を使う",
        isCorrect: true,
      },
      {
        id: "ah-q3-b",
        text: "予測を行わず、すべてのパラメータを固定値にする",
        isCorrect: false,
      },
      {
        id: "ah-q3-c",
        text: "最適化を行わず、予測値をそのまま使う",
        isCorrect: false,
      },
      {
        id: "ah-q3-d",
        text: "予測モデルのレイヤーを増やして精度を100%にする",
        isCorrect: false,
      },
    ],
    explanation:
      "予測には必ず誤差が伴います。ロバスト最適化は不確実性の範囲内で最悪ケースでも実行可能な解を求め、確率的最適化はパラメータの分布を考慮して期待値を最適化します。予測精度100%は非現実的であり、不確実性を前提とした手法が実用的です。",
  },
  {
    id: "ah-quiz-4",
    topicId: "classical-ai-hybrid",
    lessonId: "ah-lesson-2",
    type: "multiple-choice",
    difficulty: "beginner",
    question:
      "数理モデル化パイプラインの4ステップの正しい順序はどれか？",
    options: [
      {
        id: "ah-q4-a",
        text: "問題の構造化 → モデルの選択 → 実装と検証 → 運用と改善",
        isCorrect: true,
      },
      {
        id: "ah-q4-b",
        text: "モデルの選択 → 問題の構造化 → 運用 → 実装",
        isCorrect: false,
      },
      {
        id: "ah-q4-c",
        text: "実装 → 検証 → 構造化 → 運用",
        isCorrect: false,
      },
      {
        id: "ah-q4-d",
        text: "運用 → 改善 → 構造化 → モデル選択",
        isCorrect: false,
      },
    ],
    explanation:
      "正しい順序は①問題の構造化（変数・目的・制約の特定）→②モデルの選択（LP/MIP/CSP等）→③実装と検証（コーディング+テスト）→④運用と改善（監視+更新）です。構造化を飛ばしてモデルを選ぶと、不適切な手法を選んでしまうリスクがあります。",
  },
  {
    id: "ah-quiz-5",
    topicId: "classical-ai-hybrid",
    lessonId: "ah-lesson-2",
    type: "true-false",
    difficulty: "intermediate",
    question:
      "感度分析は最適化モデル構築後の任意のステップであり、実務では省略しても大きな問題はない。",
    options: [
      { id: "ah-q5-a", text: "正しい", isCorrect: false },
      { id: "ah-q5-b", text: "誤り", isCorrect: true },
    ],
    explanation:
      "誤りです。感度分析は実務で極めて重要です。パラメータの不確実性が最適解にどの程度影響するかを分析しないと、わずかなパラメータ変動で解が大きく変わる脆弱なモデルになりかねません。特にシャドウプライスの分析はリソース投資の意思決定に直結します。",
  },
  {
    id: "ah-quiz-6",
    topicId: "classical-ai-hybrid",
    lessonId: "ah-lesson-3",
    type: "multiple-choice",
    difficulty: "beginner",
    question:
      "フィードバック学習ループの正しいサイクルはどれか？",
    options: [
      {
        id: "ah-q6-a",
        text: "予測 → 最適化 → 実行 → 観測 → 学習 → 予測に戻る",
        isCorrect: true,
      },
      {
        id: "ah-q6-b",
        text: "学習 → 実行 → 予測 → 最適化 → 観測",
        isCorrect: false,
      },
      {
        id: "ah-q6-c",
        text: "最適化 → 学習 → 予測 → 実行 → 観測",
        isCorrect: false,
      },
      {
        id: "ah-q6-d",
        text: "観測 → 予測 → 実行 → 最適化 → 学習",
        isCorrect: false,
      },
    ],
    explanation:
      "フィードバック学習ループは「予測→最適化→実行→観測→学習」のサイクルです。予測でパラメータを推定し、最適化で意思決定を行い、実行結果を観測し、その結果からモデルを更新（学習）して次の予測に活かします。",
  },
  {
    id: "ah-quiz-7",
    topicId: "classical-ai-hybrid",
    lessonId: "ah-lesson-3",
    type: "multiple-choice",
    difficulty: "intermediate",
    question:
      "多腕バンディット問題における「探索と活用のジレンマ」を最も正確に表しているのはどれか？",
    options: [
      {
        id: "ah-q7-a",
        text: "未知の選択肢を試す（情報獲得）と、既知の最良選択肢を使う（報酬最大化）のバランス",
        isCorrect: true,
      },
      {
        id: "ah-q7-b",
        text: "計算速度と解の精度のバランス",
        isCorrect: false,
      },
      {
        id: "ah-q7-c",
        text: "学習データの量と質のバランス",
        isCorrect: false,
      },
      {
        id: "ah-q7-d",
        text: "モデルの複雑さと過学習のバランス",
        isCorrect: false,
      },
    ],
    explanation:
      "多腕バンディットの核心は「探索（未知の選択肢を試し情報を得る）」と「活用（既知の最良選択肢を使い報酬を得る）」のジレンマです。探索しすぎると短期的な報酬を失い、活用しすぎると真の最良選択肢を見逃します。Thompson Samplingはこのバランスを自然に取ります。",
  },
  {
    id: "ah-quiz-8",
    topicId: "classical-ai-hybrid",
    lessonId: "ah-lesson-3",
    type: "multiple-choice",
    difficulty: "advanced",
    question:
      "強化学習×最適化のハイブリッドパターンとして実際に研究されているものはどれか？",
    options: [
      {
        id: "ah-q8-a",
        text: "RLでMIPソルバーの分枝戦略（変数選択・ノード選択）を学習する（learn-to-branch）",
        isCorrect: true,
      },
      {
        id: "ah-q8-b",
        text: "RLですべてのNP完全問題を多項式時間で解く",
        isCorrect: false,
      },
      {
        id: "ah-q8-c",
        text: "RLで線形計画法の内点法を不要にする",
        isCorrect: false,
      },
      {
        id: "ah-q8-d",
        text: "RLで計算量クラスの包含関係を変更する",
        isCorrect: false,
      },
    ],
    explanation:
      "learn-to-branchは実際に活発に研究されている分野です。MIPソルバーの分枝限定法で「どの変数で分枝するか」「どのノードを次に探索するか」という戦略をRLで学習し、ソルバーの性能を向上させます。NP完全問題の計算量クラス自体を変えることは不可能です。",
  },
] as const satisfies readonly QuizQuestion[];
