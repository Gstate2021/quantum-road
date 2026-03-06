import type { QuizQuestion } from "@/types/quiz";

export const deloitteQuantumInsightsQuiz: readonly QuizQuestion[] = [
  {
    id: "dqi-q1",
    topicId: "deloitte-quantum-insights",
    lessonId: "dqi-lesson-1",
    type: "multiple-choice",
    difficulty: "beginner",
    question:
      "Deloitteの2024年調査によると、量子コンピューティングに投資した企業のうち「大きな価値を実感した」と回答した割合は？",
    options: [
      { id: "dqi-q1-a", text: "25%", isCorrect: false },
      { id: "dqi-q1-b", text: "52%", isCorrect: false },
      { id: "dqi-q1-c", text: "76%", isCorrect: true },
      { id: "dqi-q1-d", text: "90%", isCorrect: false },
    ],
    explanation:
      "Deloitteの調査では、量子コンピューティングに投資した企業の76%が「大きな、または非常に大きな価値を得ている」と回答した。投資率自体は25%で前年比3倍増。",
  },
  {
    id: "dqi-q2",
    topicId: "deloitte-quantum-insights",
    lessonId: "dqi-lesson-1",
    type: "multiple-choice",
    difficulty: "intermediate",
    question:
      "Deloitteが予測する、エンタープライズ導入の技術的閾値となる論理量子ビット数は？",
    options: [
      { id: "dqi-q2-a", text: "50〜100", isCorrect: false },
      { id: "dqi-q2-b", text: "200〜1,000", isCorrect: true },
      { id: "dqi-q2-c", text: "10,000〜100,000", isCorrect: false },
      { id: "dqi-q2-d", text: "100万以上", isCorrect: false },
    ],
    explanation:
      "現在の約50論理量子ビットから200〜1,000論理量子ビットへの到達がエンタープライズ採用の閾値とDeloitteは報告。100万は物理量子ビットの議論で登場する数。",
  },
  {
    id: "dqi-q3",
    topicId: "deloitte-quantum-insights",
    lessonId: "dqi-lesson-2",
    type: "multiple-choice",
    difficulty: "beginner",
    question:
      "DeloitteのTech Trends 2025で、PQC移行の規模をY2K問題と比較してどのように表現しているか？",
    options: [
      { id: "dqi-q3-a", text: "Y2Kと同等の規模", isCorrect: false },
      { id: "dqi-q3-b", text: "Y2Kの3倍の準備が必要", isCorrect: false },
      { id: "dqi-q3-c", text: "Y2Kの10倍の準備が必要", isCorrect: true },
      { id: "dqi-q3-d", text: "Y2Kの100倍の準備が必要", isCorrect: false },
    ],
    explanation:
      "Deloitte/Quantropi対談記事で「Y2Kの準備の10倍規模のセキュリティアップグレードサイクルを引き起こす」と表現されている。影響範囲がY2Kよりも広範であるため。",
  },
  {
    id: "dqi-q4",
    topicId: "deloitte-quantum-insights",
    lessonId: "dqi-lesson-2",
    type: "multiple-choice",
    difficulty: "intermediate",
    question:
      "Deloitteの4シナリオ分析で、「量子が予想より早く到来したが人材が未発達」というシナリオの名称は？",
    options: [
      { id: "dqi-q4-a", text: "EXPLOSION", isCorrect: false },
      { id: "dqi-q4-b", text: "SURPRISE", isCorrect: true },
      { id: "dqi-q4-c", text: "QUANDARY", isCorrect: false },
      { id: "dqi-q4-d", text: "LEAP", isCorrect: false },
    ],
    explanation:
      "SURPRISEシナリオは量子が早期到来×人材未発達の組み合わせ。早期投資者だけが大きな競争優位を獲得し、PQC移行が緊急課題になる。QUANDARYは両方遅延、EXPLOSIONは両方発展、LEAPは人材のみ発展。",
  },
  {
    id: "dqi-q5",
    topicId: "deloitte-quantum-insights",
    lessonId: "dqi-lesson-3",
    type: "true-false",
    difficulty: "beginner",
    question:
      "DeloitteによるとHNDL攻撃は「将来の脅威」ではなく「今日すでに進行中の脅威」である。",
    options: [
      { id: "dqi-q5-a", text: "正しい", isCorrect: true },
      { id: "dqi-q5-b", text: "誤り", isCorrect: false },
    ],
    explanation:
      "Deloitte Tech Trends 2025で「CRQCがまだ存在しなくても、組織のデータはすでにリスクにさらされている」と明言。攻撃者は今この瞬間も暗号化データを収集し、将来の復号に備えている。",
  },
  {
    id: "dqi-q6",
    topicId: "deloitte-quantum-insights",
    lessonId: "dqi-lesson-3",
    type: "multiple-choice",
    difficulty: "intermediate",
    question:
      "Deloitteが推奨するPQCマイグレーション5ステップの正しい順序は？",
    options: [
      { id: "dqi-q6-a", text: "Assess → Discover → Migrate → Govern → Sustain", isCorrect: false },
      { id: "dqi-q6-b", text: "Discover → Assess → Govern → Migrate → Sustain", isCorrect: true },
      { id: "dqi-q6-c", text: "Govern → Discover → Assess → Migrate → Sustain", isCorrect: false },
      { id: "dqi-q6-d", text: "Discover → Govern → Migrate → Assess → Sustain", isCorrect: false },
    ],
    explanation:
      "Deloitteの正しい順序はDiscover（発見）→ Assess（評価）→ Govern（ガバナンス）→ Migrate（移行）→ Sustain（持続）。まず暗号資産を発見し、リスクを評価してからガバナンスを確立する。",
  },
  {
    id: "dqi-q7",
    topicId: "deloitte-quantum-insights",
    lessonId: "dqi-lesson-4",
    type: "multiple-choice",
    difficulty: "intermediate",
    question:
      "デロイトトーマツとClassiqが三菱ケミカルとの実証で、有機EL材料探索の量子回路を最大何%圧縮したか？",
    options: [
      { id: "dqi-q7-a", text: "50%", isCorrect: false },
      { id: "dqi-q7-b", text: "75%", isCorrect: false },
      { id: "dqi-q7-c", text: "90%", isCorrect: false },
      { id: "dqi-q7-d", text: "97%", isCorrect: true },
    ],
    explanation:
      "2024年12月の発表で、三菱ケミカル×Classiq×デロイトトーマツの実証により、有機EL材料探索の量子回路を最大97%圧縮することに成功した。",
  },
  {
    id: "dqi-q8",
    topicId: "deloitte-quantum-insights",
    lessonId: "dqi-lesson-4",
    type: "multiple-choice",
    difficulty: "advanced",
    question:
      "Deloitteが挙げる量子×AI融合の2大ブレークスルー領域として正しい組み合わせは？",
    options: [
      { id: "dqi-q8-a", text: "暗号解読の高速化 と ブロックチェーンの最適化", isCorrect: false },
      { id: "dqi-q8-b", text: "データ拡張による適用領域拡大 と 学習の超効率化", isCorrect: true },
      { id: "dqi-q8-c", text: "センサー精度の向上 と 通信速度の改善", isCorrect: false },
      { id: "dqi-q8-d", text: "自然言語処理の高度化 と 画像認識の精度向上", isCorrect: false },
    ],
    explanation:
      "デロイトは「データ拡張による適用領域拡大」（量子乱数による高精度データ水増し）と「学習の超効率化」（量子アルゴリズムによるML効率化）の2つを挙げている。",
  },
  {
    id: "dqi-q9",
    topicId: "deloitte-quantum-insights",
    lessonId: "dqi-lesson-5",
    type: "multiple-choice",
    difficulty: "beginner",
    question:
      "WEF/Deloitte Quantum Readiness Toolkitの5つの基本原則に含まれないものは？",
    options: [
      { id: "dqi-q9-a", text: "シニアリーダーへの量子リスク教育", isCorrect: false },
      { id: "dqi-q9-b", text: "ガバナンス構造への量子リスク組み込み", isCorrect: false },
      { id: "dqi-q9-c", text: "量子コンピュータの自社開発", isCorrect: true },
      { id: "dqi-q9-d", text: "即時行動の開始", isCorrect: false },
    ],
    explanation:
      "5原則は教育・ガバナンス・テクノロジー選定・協力体制・即時行動。量子コンピュータの「自社開発」は含まれない。企業が取るべきは量子安全技術の「選定と実装」であり、ハードウェア開発ではない。",
  },
  {
    id: "dqi-q10",
    topicId: "deloitte-quantum-insights",
    lessonId: "dqi-lesson-5",
    type: "multiple-choice",
    difficulty: "advanced",
    question:
      "デロイトトーマツが日本企業に警告する3つのリスクとして正しくないものは？",
    options: [
      { id: "dqi-q10-a", text: "ハードウェアリソース枯渇", isCorrect: false },
      { id: "dqi-q10-b", text: "人材育成のリードタイム不足", isCorrect: false },
      { id: "dqi-q10-c", text: "量子コンピュータの価格高騰", isCorrect: true },
      { id: "dqi-q10-d", text: "パラダイムシフト対応の遅れ", isCorrect: false },
    ],
    explanation:
      "デロイトの3つのリスク警告は「ハードウェアリソース枯渇」「人材育成のリードタイム不足」「パラダイムシフト対応の遅れ」。価格高騰は直接の警告項目に含まれていない。",
  },
] as const satisfies readonly QuizQuestion[];
