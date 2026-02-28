import type { QuizQuestion } from "@/types/quiz";

export const hybridDesignQuiz: readonly QuizQuestion[] = [
  {
    id: "hd-q1",
    topicId: "hybrid-design",
    lessonId: "hd-lesson-1",
    type: "multiple-choice",
    difficulty: "beginner",
    question:
      "ハイブリッドアーキテクチャの基本構造として正しいものはどれですか？",
    options: [
      {
        id: "hd-q1-a",
        text: "量子前処理→古典コア→量子後処理",
        isCorrect: false,
      },
      {
        id: "hd-q1-b",
        text: "古典前処理→量子コア→古典後処理",
        isCorrect: true,
      },
      {
        id: "hd-q1-c",
        text: "量子のみで全処理を完結",
        isCorrect: false,
      },
      {
        id: "hd-q1-d",
        text: "古典のみで全処理を完結",
        isCorrect: false,
      },
    ],
    explanation:
      "ハイブリッドアーキテクチャは「古典前処理→量子コア→古典後処理」の3段パイプラインです。古典が問題のエンコードと結果の解釈を担当し、量子は得意な計算だけを実行します。",
  },
  {
    id: "hd-q2",
    topicId: "hybrid-design",
    lessonId: "hd-lesson-1",
    type: "multiple-choice",
    difficulty: "intermediate",
    question:
      "古典後処理フェーズの役割に含まれないものはどれですか？",
    options: [
      { id: "hd-q2-a", text: "測定結果の統計処理", isCorrect: false },
      { id: "hd-q2-b", text: "誤り緩和（ZNE等）の適用", isCorrect: false },
      { id: "hd-q2-c", text: "量子ゲートの物理的な実行", isCorrect: true },
      { id: "hd-q2-d", text: "変分パラメータの最適化", isCorrect: false },
    ],
    explanation:
      "量子ゲートの物理的な実行は量子コアフェーズの役割です。古典後処理は、測定結果の統計処理、誤り緩和、パラメータ最適化、ビジネスロジックへの接続を担当します。",
  },
  {
    id: "hd-q3",
    topicId: "hybrid-design",
    lessonId: "hd-lesson-1",
    type: "multiple-choice",
    difficulty: "intermediate",
    question:
      "NISQデバイスの測定結果が確率的である理由と、その対策はどれですか？",
    options: [
      {
        id: "hd-q3-a",
        text: "デバイスの故障が原因。修理が必要。",
        isCorrect: false,
      },
      {
        id: "hd-q3-b",
        text: "量子力学の性質により確率的。同じ回路を複数回実行（ショット）して統計を取る。",
        isCorrect: true,
      },
      {
        id: "hd-q3-c",
        text: "プログラミングのバグ。デバッグが必要。",
        isCorrect: false,
      },
      {
        id: "hd-q3-d",
        text: "古典コンピュータとの通信エラー。再送が必要。",
        isCorrect: false,
      },
    ],
    explanation:
      "量子力学の基本原理により、量子ビットの測定結果は確率的です。確率振幅の二乗に従って結果が得られるため、同じ回路を何千回も実行（ショット）して統計的に期待値を推定します。",
  },
  {
    id: "hd-q4",
    topicId: "hybrid-design",
    lessonId: "hd-lesson-2",
    type: "multiple-choice",
    difficulty: "intermediate",
    question:
      "QAOA・VQEで使われるハイブリッド設計パターンはどれですか？",
    options: [
      { id: "hd-q4-a", text: "Quantum Subroutine", isCorrect: false },
      { id: "hd-q4-b", text: "Variational Loop（変分ループ）", isCorrect: true },
      { id: "hd-q4-c", text: "Quantum-Inspired", isCorrect: false },
      { id: "hd-q4-d", text: "Embedding", isCorrect: false },
    ],
    explanation:
      "QAOA・VQEは「Variational Loop（変分ループ）」パターンを使用します。古典がパラメータを更新し、量子がコスト関数を評価する、という反復を収束まで繰り返します。NISQ時代の主流パターンです。",
  },
  {
    id: "hd-q5",
    topicId: "hybrid-design",
    lessonId: "hd-lesson-2",
    type: "multiple-choice",
    difficulty: "advanced",
    question:
      "パラメータシフト則で1パラメータの勾配を計算するために必要な量子回路の実行回数は？",
    options: [
      { id: "hd-q5-a", text: "1回", isCorrect: false },
      { id: "hd-q5-b", text: "2回", isCorrect: true },
      { id: "hd-q5-c", text: "パラメータ数と同じ回数", isCorrect: false },
      { id: "hd-q5-d", text: "ショット数と同じ回数", isCorrect: false },
    ],
    explanation:
      "パラメータシフト則では、パラメータを+π/2と-π/2にシフトした2回の回路実行で1つのパラメータの勾配を計算します。n個のパラメータの勾配には2n回の回路実行が必要です。",
  },
  {
    id: "hd-q6",
    topicId: "hybrid-design",
    lessonId: "hd-lesson-2",
    type: "multiple-choice",
    difficulty: "beginner",
    question:
      "ZNE（Zero-Noise Extrapolation）はどのフェーズで適用される手法ですか？",
    options: [
      { id: "hd-q6-a", text: "古典前処理", isCorrect: false },
      { id: "hd-q6-b", text: "量子コア", isCorrect: false },
      { id: "hd-q6-c", text: "古典後処理", isCorrect: true },
      { id: "hd-q6-d", text: "全フェーズ", isCorrect: false },
    ],
    explanation:
      "ZNE（Zero-Noise Extrapolation）は古典後処理で適用される誤り緩和手法です。複数のノイズレベルで量子回路を実行し、ゼロノイズへ外挿することで、追加の量子ビットなしにノイズの影響を軽減します。",
  },
  {
    id: "hd-q7",
    topicId: "hybrid-design",
    lessonId: "hd-lesson-3",
    type: "multiple-choice",
    difficulty: "intermediate",
    question:
      "ハイブリッドワークロードで通信レイテンシがボトルネックになりやすい理由は何ですか？",
    options: [
      {
        id: "hd-q7-a",
        text: "量子コンピュータの計算速度が遅いため",
        isCorrect: false,
      },
      {
        id: "hd-q7-b",
        text: "変分ループの反復ごとに古典→量子→古典のデータ転送が必要なため",
        isCorrect: true,
      },
      {
        id: "hd-q7-c",
        text: "古典コンピュータのメモリが不足するため",
        isCorrect: false,
      },
      {
        id: "hd-q7-d",
        text: "量子ビットのデコヒーレンス時間が短いため",
        isCorrect: false,
      },
    ],
    explanation:
      "変分ループでは各反復で古典→量子→古典のラウンドトリップが発生します。クラウド量子コンピュータの場合、1回の回路送信→実行→結果取得に50-200msかかることがあり、反復回数が多いと全体の支配的なコストになります。",
  },
  {
    id: "hd-q8",
    topicId: "hybrid-design",
    lessonId: "hd-lesson-3",
    type: "true-false",
    difficulty: "intermediate",
    question:
      "現時点（2025-2026年）では、ほとんどのビジネス最適化問題に対して古典的手法が量子を上回っている。",
    options: [
      { id: "hd-q8-a", text: "正しい", isCorrect: true },
      { id: "hd-q8-b", text: "誤り", isCorrect: false },
    ],
    explanation:
      "現在のNISQデバイスでは量子ビット数、ノイズレベル、回路深さの制約により、ほとんどのビジネス問題で古典的手法（SA、GA、CPLEX等）が量子を上回ります。量子実用優位性の境界はまだ確立されていません。しかしハイブリッド設計のスキルは将来への不可欠な準備です。",
  },
] as const satisfies readonly QuizQuestion[];
