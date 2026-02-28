import type { QuizQuestion } from "@/types/quiz";

export const pqcMigrationQuiz: readonly QuizQuestion[] = [
  {
    id: "pqc-mig-q1",
    topicId: "pqc-migration",
    lessonId: "pqc-mig-lesson1",
    type: "multiple-choice",
    difficulty: "beginner",
    question:
      "暗号棚卸し（Cryptographic Inventory）の主な目的として最も適切なものはどれか？",
    options: [
      {
        id: "pqc-mig-q1-a",
        text: "組織内のすべての暗号資産を特定・分類し、PQC移行の基盤を作る",
        isCorrect: true,
      },
      {
        id: "pqc-mig-q1-b",
        text: "量子コンピュータの開発状況を調査する",
        isCorrect: false,
      },
      {
        id: "pqc-mig-q1-c",
        text: "従業員のセキュリティ意識を測定する",
        isCorrect: false,
      },
      {
        id: "pqc-mig-q1-d",
        text: "暗号アルゴリズムの数学的安全性を証明する",
        isCorrect: false,
      },
    ],
    explanation:
      "暗号棚卸しは、組織内で使用されているすべての暗号アルゴリズム、鍵、証明書、プロトコルを網羅的に把握するプロセスであり、PQC移行計画の出発点となる。何を移行すべきかを知らずに移行はできない。",
  },
  {
    id: "pqc-mig-q2",
    topicId: "pqc-migration",
    lessonId: "pqc-mig-lesson1",
    type: "multiple-choice",
    difficulty: "intermediate",
    question:
      "CBOMに記録すべき情報として、最も重要度が低いものはどれか？",
    options: [
      {
        id: "pqc-mig-q2-a",
        text: "暗号アルゴリズムの理論的な数学的証明",
        isCorrect: true,
      },
      {
        id: "pqc-mig-q2-b",
        text: "使用されている暗号アルゴリズムと鍵長",
        isCorrect: false,
      },
      {
        id: "pqc-mig-q2-c",
        text: "量子脆弱性の有無と移行優先度",
        isCorrect: false,
      },
      {
        id: "pqc-mig-q2-d",
        text: "データの機密分類と資産オーナー",
        isCorrect: false,
      },
    ],
    explanation:
      "CBOMは実務的な棚卸しツールであり、アルゴリズム種別、鍵長、量子脆弱性、優先度、データ分類、オーナー情報を記録する。アルゴリズムの数学的証明は学術的な情報であり、移行管理には直接必要ない。",
  },
  {
    id: "pqc-mig-q3",
    topicId: "pqc-migration",
    lessonId: "pqc-mig-lesson2",
    type: "multiple-choice",
    difficulty: "intermediate",
    question:
      "Moscaの不等式でX=20年、Y=3年、Z=15年のとき、正しい判断はどれか？",
    options: [
      {
        id: "pqc-mig-q3-a",
        text: "X+Y=23 > Z=15 なので、即座に移行を開始すべき",
        isCorrect: true,
      },
      {
        id: "pqc-mig-q3-b",
        text: "Z=15年あるので、10年後に検討すればよい",
        isCorrect: false,
      },
      {
        id: "pqc-mig-q3-c",
        text: "Y=3年で移行できるので、Z-Y=12年後に開始すればよい",
        isCorrect: false,
      },
      {
        id: "pqc-mig-q3-d",
        text: "共通鍵暗号に切り替えれば対応不要",
        isCorrect: false,
      },
    ],
    explanation:
      "Moscaの不等式は、データ保持年数(X) + 移行所要年数(Y) > 量子実現年数(Z) の場合に即座の対策が必要であることを示す。20+3=23 > 15 なので、移行を今すぐ開始しないとデータが量子攻撃にさらされるリスクがある。",
  },
  {
    id: "pqc-mig-q4",
    topicId: "pqc-migration",
    lessonId: "pqc-mig-lesson2",
    type: "true-false",
    difficulty: "beginner",
    question:
      "HNDL攻撃は、データの機密保持期間が短いシステムほどリスクが高い。",
    options: [
      {
        id: "pqc-mig-q4-a",
        text: "正しい",
        isCorrect: false,
      },
      {
        id: "pqc-mig-q4-b",
        text: "誤り",
        isCorrect: true,
      },
    ],
    explanation:
      "HNDL（Harvest Now, Decrypt Later）攻撃は、現在傍受したデータを将来の量子コンピュータで復号する手法であるため、データの機密保持期間が長いほどリスクが高い。短期間で陳腐化するデータは量子コンピュータの実用化前に価値を失う。",
  },
  {
    id: "pqc-mig-q5",
    topicId: "pqc-migration",
    lessonId: "pqc-mig-lesson3",
    type: "multiple-choice",
    difficulty: "advanced",
    question:
      "PQC移行でハイブリッド暗号（従来+PQC併用）を採用する最大の利点はどれか？",
    options: [
      {
        id: "pqc-mig-q5-a",
        text: "パフォーマンスが向上する",
        isCorrect: false,
      },
      {
        id: "pqc-mig-q5-b",
        text: "PQCアルゴリズムに未知の脆弱性があっても従来暗号で安全性を維持でき、ロールバックも容易",
        isCorrect: true,
      },
      {
        id: "pqc-mig-q5-c",
        text: "暗号棚卸しが不要になる",
        isCorrect: false,
      },
      {
        id: "pqc-mig-q5-d",
        text: "規制要件を自動的に満たす",
        isCorrect: false,
      },
    ],
    explanation:
      "ハイブリッド暗号の最大の利点は安全なフォールバックパスの確保である。PQCアルゴリズムはまだ実績が浅く、未知の脆弱性が発見される可能性がある。従来暗号を併用することで、どちらか一方が破られても安全性を維持でき、問題時にはPQCを無効化するだけでロールバックできる。",
  },
  {
    id: "pqc-mig-q6",
    topicId: "pqc-migration",
    lessonId: "pqc-mig-lesson3",
    type: "multiple-choice",
    difficulty: "intermediate",
    question:
      "PQC移行計画のPhase 0（準備フェーズ）に含まれないものはどれか？",
    options: [
      {
        id: "pqc-mig-q6-a",
        text: "暗号棚卸しの実施",
        isCorrect: false,
      },
      {
        id: "pqc-mig-q6-b",
        text: "リスク評価と優先度決定",
        isCorrect: false,
      },
      {
        id: "pqc-mig-q6-c",
        text: "レガシー暗号の無効化",
        isCorrect: true,
      },
      {
        id: "pqc-mig-q6-d",
        text: "経営層へのブリーフィング",
        isCorrect: false,
      },
    ],
    explanation:
      "レガシー暗号の無効化はPhase 3（完全移行・検証フェーズ）で実施する。Phase 0は準備段階であり、棚卸し、リスク評価、経営層報告、移行チーム組成が含まれる。いきなりレガシー暗号を無効化するとシステム障害を引き起こす。",
  },
  {
    id: "pqc-mig-q7",
    topicId: "pqc-migration",
    lessonId: "pqc-mig-lesson4",
    type: "multiple-choice",
    difficulty: "advanced",
    question:
      "エンタープライズ顧客へのPQC移行提案で、最も効果的なアプローチはどれか？",
    options: [
      {
        id: "pqc-mig-q7-a",
        text: "量子コンピュータの脅威を最大限に強調し、危機感を煽る",
        isCorrect: false,
      },
      {
        id: "pqc-mig-q7-b",
        text: "技術的な詳細を網羅的に説明し、専門性をアピールする",
        isCorrect: false,
      },
      {
        id: "pqc-mig-q7-c",
        text: "顧客固有のリスクを事実に基づき提示し、小規模PoCから始める提案をする",
        isCorrect: true,
      },
      {
        id: "pqc-mig-q7-d",
        text: "全社一括移行の大規模プロジェクトを提案し、スケールメリットを訴求する",
        isCorrect: false,
      },
    ],
    explanation:
      "効果的な提案は、恐怖ではなく客観的事実に基づき、顧客固有のリスクに落とし込み、小さなPoCから始めて実績を作るアプローチ。過度な危機感の煽りは信頼を損ない、大規模一括提案は顧客のリスク許容度を超えやすい。",
  },
  {
    id: "pqc-mig-q8",
    topicId: "pqc-migration",
    lessonId: "pqc-mig-lesson4",
    type: "true-false",
    difficulty: "intermediate",
    question:
      "PQC移行提案のエグゼクティブサマリでは、暗号アルゴリズムの数学的な安全性証明を詳細に記述すべきである。",
    options: [
      {
        id: "pqc-mig-q8-a",
        text: "正しい",
        isCorrect: false,
      },
      {
        id: "pqc-mig-q8-b",
        text: "誤り",
        isCorrect: true,
      },
    ],
    explanation:
      "エグゼクティブサマリは経営層向けの1ページ要約であり、リスク概要・推奨アクション・費用対効果を凝縮して伝える。数学的詳細は付録に回し、経営判断に必要な情報だけを記載する。",
  },
] as const satisfies readonly QuizQuestion[];
