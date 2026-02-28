import type { QuizQuestion } from "@/types/quiz";

export const quantumThreatQuiz: readonly QuizQuestion[] = [
  {
    id: "qt-q1",
    topicId: "quantum-threat",
    lessonId: "qt-lesson-1",
    type: "multiple-choice",
    difficulty: "beginner",
    question: "量子ビット（qubit）の特徴として正しいものはどれですか？",
    options: [
      { id: "qt-q1-a", text: "0と1の2つの値を同時に保持する", isCorrect: false },
      { id: "qt-q1-b", text: "0と1の重ね合わせ状態を取ることができる", isCorrect: true },
      { id: "qt-q1-c", text: "古典ビットの2倍の情報を格納できる", isCorrect: false },
      { id: "qt-q1-d", text: "0、1、2の3つの値を取ることができる", isCorrect: false },
    ],
    explanation:
      "量子ビットは|ψ⟩ = α|0⟩ + β|1⟩という重ね合わせ状態を取れます。「同時に0と1を持つ」のではなく、測定するまで確率的に両方の状態にあります。測定すると一方に確定します。",
  },
  {
    id: "qt-q2",
    topicId: "quantum-threat",
    lessonId: "qt-lesson-1",
    type: "multiple-choice",
    difficulty: "intermediate",
    question: "量子コンピューティングの3つの基本原理はどれですか？",
    options: [
      { id: "qt-q2-a", text: "重ね合わせ、量子もつれ、量子干渉", isCorrect: true },
      { id: "qt-q2-b", text: "重ね合わせ、並列計算、量子トンネル効果", isCorrect: false },
      { id: "qt-q2-c", text: "量子もつれ、量子テレポーテーション、量子暗号", isCorrect: false },
      { id: "qt-q2-d", text: "重ね合わせ、デコヒーレンス、量子誤り訂正", isCorrect: false },
    ],
    explanation:
      "量子コンピューティングの3つの基本原理は、重ね合わせ（Superposition）、量子もつれ（Entanglement）、量子干渉（Interference）です。これらを組み合わせて特定の問題に対する高速化を実現します。",
  },
  {
    id: "qt-q3",
    topicId: "quantum-threat",
    lessonId: "qt-lesson-2",
    type: "multiple-choice",
    difficulty: "beginner",
    question: "Shorのアルゴリズムが直接破る暗号方式はどれですか？",
    options: [
      { id: "qt-q3-a", text: "AES-256", isCorrect: false },
      { id: "qt-q3-b", text: "SHA-256", isCorrect: false },
      { id: "qt-q3-c", text: "RSAとECC", isCorrect: true },
      { id: "qt-q3-d", text: "ChaCha20", isCorrect: false },
    ],
    explanation:
      "Shorのアルゴリズムは素因数分解と離散対数問題を多項式時間で解きます。これによりRSA（素因数分解）とECC（楕円曲線離散対数）が破られます。AES-256やSHA-256は影響を受けません。",
  },
  {
    id: "qt-q4",
    topicId: "quantum-threat",
    lessonId: "qt-lesson-2",
    type: "multiple-choice",
    difficulty: "intermediate",
    question:
      "Shorのアルゴリズムで整数Nを素因数分解する計算量のオーダーは？",
    options: [
      { id: "qt-q4-a", text: "O(N)", isCorrect: false },
      { id: "qt-q4-b", text: "O((log N)³)", isCorrect: true },
      { id: "qt-q4-c", text: "O(√N)", isCorrect: false },
      { id: "qt-q4-d", text: "O(2^N)", isCorrect: false },
    ],
    explanation:
      "Shorのアルゴリズムの計算量はO((log N)³)で、Nの桁数の3乗に比例します。古典最良アルゴリズム（一般数体篩法）のO(exp((log N)^(1/3)))と比べて指数関数的に高速です。",
  },
  {
    id: "qt-q5",
    topicId: "quantum-threat",
    lessonId: "qt-lesson-2",
    type: "multiple-choice",
    difficulty: "advanced",
    question:
      "Shorのアルゴリズムの中核で使用される量子演算は何ですか？",
    options: [
      { id: "qt-q5-a", text: "量子テレポーテーション", isCorrect: false },
      { id: "qt-q5-b", text: "量子フーリエ変換（QFT）", isCorrect: true },
      { id: "qt-q5-c", text: "Grover拡散演算子", isCorrect: false },
      { id: "qt-q5-d", text: "量子誤り訂正", isCorrect: false },
    ],
    explanation:
      "Shorのアルゴリズムは素因数分解を周期発見問題に帰着させ、量子フーリエ変換（QFT）で周期を効率的に求めます。QFTはO(n²)で計算可能で、これがShorの高速性の源です。",
  },
  {
    id: "qt-q6",
    topicId: "quantum-threat",
    lessonId: "qt-lesson-3",
    type: "multiple-choice",
    difficulty: "beginner",
    question:
      "Groverのアルゴリズムにより、N要素の探索はどの程度高速化されますか？",
    options: [
      { id: "qt-q6-a", text: "O(N) → O(1)", isCorrect: false },
      { id: "qt-q6-b", text: "O(N) → O(log N)", isCorrect: false },
      { id: "qt-q6-c", text: "O(N) → O(√N)", isCorrect: true },
      { id: "qt-q6-d", text: "O(N) → O(N/2)", isCorrect: false },
    ],
    explanation:
      "Groverのアルゴリズムは非構造的探索問題をO(√N)で解きます。これは二乗根の高速化であり、証明された最適値です。Shorのような指数関数的な高速化ではないため、鍵長を2倍にすれば対策可能です。",
  },
  {
    id: "qt-q7",
    topicId: "quantum-threat",
    lessonId: "qt-lesson-3",
    type: "true-false",
    difficulty: "intermediate",
    question:
      "Groverのアルゴリズムに対する対策として、AES-128をAES-256にアップグレードすれば十分である。",
    options: [
      { id: "qt-q7-a", text: "正しい", isCorrect: true },
      { id: "qt-q7-b", text: "誤り", isCorrect: false },
    ],
    explanation:
      "Groverのアルゴリズムは鍵空間の探索を二乗根に短縮するため、AES-256は128ビット相当の安全性になります。128ビットの安全性は依然として十分であるため、AES-256への移行で量子耐性を確保できます。",
  },
  {
    id: "qt-q8",
    topicId: "quantum-threat",
    lessonId: "qt-lesson-4",
    type: "multiple-choice",
    difficulty: "intermediate",
    question:
      "量子コンピュータでTLS通信が破られる際、最初に攻撃されるのはどの部分ですか？",
    options: [
      { id: "qt-q8-a", text: "AESによるデータ暗号化", isCorrect: false },
      { id: "qt-q8-b", text: "SHA-256によるハッシュ計算", isCorrect: false },
      {
        id: "qt-q8-c",
        text: "ECDHによる鍵交換とECDSAによる署名",
        isCorrect: true,
      },
      { id: "qt-q8-d", text: "HMACによるメッセージ認証", isCorrect: false },
    ],
    explanation:
      "TLSではECDH/DHが鍵交換に、ECDSA/RSAが署名に使用されます。これらはShorのアルゴリズムで破られます。鍵交換が破られるとAESの共通鍵が漏洩し、通信全体が解読されます。",
  },
  {
    id: "qt-q9",
    topicId: "quantum-threat",
    lessonId: "qt-lesson-4",
    type: "multiple-choice",
    difficulty: "advanced",
    question:
      "NISTがRSA-2048とECC P-256の非推奨化を予定しているのはいつ頃までですか？",
    options: [
      { id: "qt-q9-a", text: "2028年", isCorrect: false },
      { id: "qt-q9-b", text: "2030年", isCorrect: false },
      { id: "qt-q9-c", text: "2035年", isCorrect: true },
      { id: "qt-q9-d", text: "2040年", isCorrect: false },
    ],
    explanation:
      "NISTは2035年までにRSA-2048とECC P-256の非推奨化を予定しています。大規模システムの移行には5-10年かかるため、今から計画的に準備を進める必要があります。",
  },
  {
    id: "qt-q10",
    topicId: "quantum-threat",
    lessonId: "qt-lesson-4",
    type: "multiple-choice",
    difficulty: "beginner",
    question:
      "PQC移行コンサルティングの第一歩として推奨されるのは何ですか？",
    options: [
      {
        id: "qt-q10-a",
        text: "すべてのシステムを即座にPQCアルゴリズムに置き換える",
        isCorrect: false,
      },
      {
        id: "qt-q10-b",
        text: "暗号インベントリ（使用中の暗号方式の棚卸し）を作成する",
        isCorrect: true,
      },
      {
        id: "qt-q10-c",
        text: "量子コンピュータが実用化されるまで待つ",
        isCorrect: false,
      },
      {
        id: "qt-q10-d",
        text: "すべての通信をオフラインにする",
        isCorrect: false,
      },
    ],
    explanation:
      "PQC移行の第一歩は暗号インベントリの作成です。組織内で使用されている暗号方式、プロトコル、証明書、鍵を棚卸しし、量子脅威の影響範囲を特定することから始めます。",
  },
] as const satisfies readonly QuizQuestion[];
