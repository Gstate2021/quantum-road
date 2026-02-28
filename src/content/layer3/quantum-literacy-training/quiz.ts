import type { QuizQuestion } from "@/types/quiz";

export const quantumLiteracyTrainingQuiz: readonly QuizQuestion[] = [
  {
    id: "ql-train-q1",
    topicId: "quantum-literacy-training",
    lessonId: "ql-train-lesson1",
    type: "multiple-choice",
    difficulty: "beginner",
    question:
      "経営層向け量子リテラシー研修で最も重視すべき情報はどれか？",
    options: [
      {
        id: "ql-train-q1-a",
        text: "量子力学のシュレディンガー方程式の導出",
        isCorrect: false,
      },
      {
        id: "ql-train-q1-b",
        text: "自社にとっての脅威と機会、いつまでに何をすべきか、投資判断の基準",
        isCorrect: true,
      },
      {
        id: "ql-train-q1-c",
        text: "量子ビットの物理的実装方式の比較",
        isCorrect: false,
      },
      {
        id: "ql-train-q1-d",
        text: "量子アルゴリズムの計算量解析",
        isCorrect: false,
      },
    ],
    explanation:
      "経営層が知るべきは自社への影響（脅威と機会）、タイムライン（いつまでに何を）、投資判断の基準の3点。技術的な詳細ではなく、経営判断に必要な情報に焦点を当てる。",
  },
  {
    id: "ql-train-q2",
    topicId: "quantum-literacy-training",
    lessonId: "ql-train-lesson1",
    type: "multiple-choice",
    difficulty: "intermediate",
    question:
      "経営層への説明の3つの鉄則に含まれないものはどれか？",
    options: [
      {
        id: "ql-train-q2-a",
        text: "具体的な数字で語る",
        isCorrect: false,
      },
      {
        id: "ql-train-q2-b",
        text: "身近なアナロジーを使う",
        isCorrect: false,
      },
      {
        id: "ql-train-q2-c",
        text: "最新の論文を引用して学術的権威を示す",
        isCorrect: true,
      },
      {
        id: "ql-train-q2-d",
        text: "行動可能な選択肢を提示する",
        isCorrect: false,
      },
    ],
    explanation:
      "経営層への説明の3つの鉄則は、(1)具体的な数字で語る、(2)身近なアナロジーを使う、(3)行動可能な選択肢を提示する。学術的権威の提示は経営判断には直接結びつかず、聴衆の関心を失わせるリスクがある。",
  },
  {
    id: "ql-train-q3",
    topicId: "quantum-literacy-training",
    lessonId: "ql-train-lesson1",
    type: "true-false",
    difficulty: "intermediate",
    question:
      "日本企業の経営層へのPQC提案では、他社動向（競合他社や規制当局の動き）が技術論より効果的な説得材料となることが多い。",
    options: [
      {
        id: "ql-train-q3-a",
        text: "正しい",
        isCorrect: true,
      },
      {
        id: "ql-train-q3-b",
        text: "誤り",
        isCorrect: false,
      },
    ],
    explanation:
      "日本企業の経営層は「他社がどう対応しているか」「規制はどう動いているか」に強く反応する傾向がある。「金融庁がPQC対応ガイドラインを策定中」「メガバンクA社は既にPoCを完了」といった情報は、技術論より経営判断を動かしやすい。",
  },
  {
    id: "ql-train-q4",
    topicId: "quantum-literacy-training",
    lessonId: "ql-train-lesson2",
    type: "multiple-choice",
    difficulty: "beginner",
    question:
      "量子ビットの「重ね合わせ」を非専門家に説明するアナロジーとして最も適切なものはどれか？",
    options: [
      {
        id: "ql-train-q4-a",
        text: "電球のON/OFF",
        isCorrect: false,
      },
      {
        id: "ql-train-q4-b",
        text: "回転中のコイン（表と裏の可能性が共存する状態）",
        isCorrect: true,
      },
      {
        id: "ql-train-q4-c",
        text: "二進法の数字",
        isCorrect: false,
      },
      {
        id: "ql-train-q4-d",
        text: "ルーレットの回転",
        isCorrect: false,
      },
    ],
    explanation:
      "回転中のコインは、表と裏の可能性が同時に存在し、観測（コインを止める）した瞬間に一方に確定するという量子ビットの重ね合わせの本質を直感的に伝えるアナロジー。電球のON/OFFは古典ビットの説明に適している。",
  },
  {
    id: "ql-train-q5",
    topicId: "quantum-literacy-training",
    lessonId: "ql-train-lesson2",
    type: "multiple-choice",
    difficulty: "advanced",
    question:
      "技術説明で避けるべき「3つの落とし穴」に該当しないものはどれか？",
    options: [
      {
        id: "ql-train-q5-a",
        text: "過度な単純化（「量子はすべてを高速化する」）",
        isCorrect: false,
      },
      {
        id: "ql-train-q5-b",
        text: "専門用語の乱用",
        isCorrect: false,
      },
      {
        id: "ql-train-q5-c",
        text: "量子優位性が特定問題に限定される点の正直な説明",
        isCorrect: true,
      },
      {
        id: "ql-train-q5-d",
        text: "時期の誤認（「まだ先」も「もうすぐ」も不正確）",
        isCorrect: false,
      },
    ],
    explanation:
      "量子優位性が特定の問題に限定される点を正直に説明することは、避けるべき落とし穴ではなく、むしろ信頼構築に必要な正確さ。3つの落とし穴は、(1)過度な単純化、(2)専門用語の乱用、(3)時期の誤認。",
  },
  {
    id: "ql-train-q6",
    topicId: "quantum-literacy-training",
    lessonId: "ql-train-lesson3",
    type: "multiple-choice",
    difficulty: "intermediate",
    question:
      "3層カリキュラムのTier 2（管理職/IT部門向け）の研修形式として最も適切なものはどれか？",
    options: [
      {
        id: "ql-train-q6-a",
        text: "eラーニング（30分の動画視聴）",
        isCorrect: false,
      },
      {
        id: "ql-train-q6-b",
        text: "ワークショップ（半日、グループディスカッション含む）",
        isCorrect: true,
      },
      {
        id: "ql-train-q6-c",
        text: "ハンズオン（1日、コーディング実習）",
        isCorrect: false,
      },
      {
        id: "ql-train-q6-d",
        text: "論文読解会（週1回、3ヶ月間）",
        isCorrect: false,
      },
    ],
    explanation:
      "Tier 2の管理職/IT部門向けはワークショップ形式（半日）が最適。PQC移行の必要性を理解し、自部門の対応計画を策定できるようになることが目的であり、グループディスカッションで自部門のリスクと優先度を議論させる。",
  },
  {
    id: "ql-train-q7",
    topicId: "quantum-literacy-training",
    lessonId: "ql-train-lesson3",
    type: "multiple-choice",
    difficulty: "advanced",
    question:
      "カークパトリックモデルのLevel 3（行動）で測定すべきものとして最も適切なのはどれか？",
    options: [
      {
        id: "ql-train-q7-a",
        text: "研修直後の参加者満足度アンケート",
        isCorrect: false,
      },
      {
        id: "ql-train-q7-b",
        text: "研修前後の理解度テストのスコア差",
        isCorrect: false,
      },
      {
        id: "ql-train-q7-c",
        text: "研修3ヶ月後の暗号棚卸しへの協力度やセキュリティポリシーの遵守率",
        isCorrect: true,
      },
      {
        id: "ql-train-q7-d",
        text: "研修で使用した教材の品質",
        isCorrect: false,
      },
    ],
    explanation:
      "カークパトリックモデルのLevel 3は「行動変容」を測定する。研修の知識が実際の業務行動に反映されているかを確認する。暗号棚卸しへの協力度やセキュリティポリシー遵守率は、研修内容が行動レベルで定着したかの指標。Level 1が満足度、Level 2が学習、Level 4がビジネス成果。",
  },
  {
    id: "ql-train-q8",
    topicId: "quantum-literacy-training",
    lessonId: "ql-train-lesson3",
    type: "true-false",
    difficulty: "intermediate",
    question:
      "量子リテラシー研修は初回の単発イベントとして設計し、継続プログラムにすべきではない。",
    options: [
      {
        id: "ql-train-q8-a",
        text: "正しい",
        isCorrect: false,
      },
      {
        id: "ql-train-q8-b",
        text: "誤り",
        isCorrect: true,
      },
    ],
    explanation:
      "量子リテラシー研修は単発イベントではなく継続プログラムとして設計すべき。初回研修→月次ニュースレター→四半期アップデート→年次フォローアップのサイクルが最も効果的。量子技術は急速に進化しているため、知識の陳腐化を防ぐ継続的な更新が必要であり、これは継続契約としてのビジネスにもなる。",
  },
] as const satisfies readonly QuizQuestion[];
