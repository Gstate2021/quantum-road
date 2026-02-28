import type { QuizQuestion } from "@/types/quiz";

export const pqcStandardsQuiz: readonly QuizQuestion[] = [
  {
    id: "pqc-q1",
    topicId: "pqc-standards",
    lessonId: "pqc-lesson-1",
    type: "multiple-choice",
    difficulty: "beginner",
    question:
      "PQC（耐量子暗号）の特徴として正しいものはどれですか？",
    options: [
      {
        id: "pqc-q1-a",
        text: "量子コンピュータでしか実行できない",
        isCorrect: false,
      },
      {
        id: "pqc-q1-b",
        text: "古典コンピュータで実行でき、量子コンピュータでも破れない",
        isCorrect: true,
      },
      {
        id: "pqc-q1-c",
        text: "量子鍵配送（QKD）の別名である",
        isCorrect: false,
      },
      {
        id: "pqc-q1-d",
        text: "対称鍵暗号のみを対象とする",
        isCorrect: false,
      },
    ],
    explanation:
      "PQCは古典コンピュータで実行可能な暗号アルゴリズムで、量子コンピュータに対しても安全です。QKD（量子鍵配送）とは異なり、専用ハードウェアは不要で、既存インフラとの互換性を維持できます。",
  },
  {
    id: "pqc-q2",
    topicId: "pqc-standards",
    lessonId: "pqc-lesson-1",
    type: "multiple-choice",
    difficulty: "intermediate",
    question:
      "ML-KEMとML-DSAの安全性の根拠となっている数学的問題は何ですか？",
    options: [
      { id: "pqc-q2-a", text: "素因数分解問題", isCorrect: false },
      { id: "pqc-q2-b", text: "楕円曲線離散対数問題", isCorrect: false },
      {
        id: "pqc-q2-c",
        text: "Module-LWE（Learning With Errors）問題",
        isCorrect: true,
      },
      { id: "pqc-q2-d", text: "ハッシュ衝突問題", isCorrect: false },
    ],
    explanation:
      "ML-KEM（FIPS 203）とML-DSA（FIPS 204）はどちらもModule-LWE問題の困難性に基づいています。LWE問題はノイズ付き線形方程式から秘密ベクトルを復元する問題で、格子問題の困難性に帰着されます。",
  },
  {
    id: "pqc-q3",
    topicId: "pqc-standards",
    lessonId: "pqc-lesson-2",
    type: "multiple-choice",
    difficulty: "intermediate",
    question:
      "ML-KEM-768の公開鍵サイズはおよそ何バイトですか？",
    options: [
      { id: "pqc-q3-a", text: "64バイト", isCorrect: false },
      { id: "pqc-q3-b", text: "256バイト", isCorrect: false },
      { id: "pqc-q3-c", text: "1,184バイト", isCorrect: true },
      { id: "pqc-q3-d", text: "15,360バイト", isCorrect: false },
    ],
    explanation:
      "ML-KEM-768の公開鍵は1,184バイトです。ECDH P-256の公開鍵が64バイトであるのと比べると大幅に大きいですが、TLSなどのプロトコルでは実用上問題のないレベルです。",
  },
  {
    id: "pqc-q4",
    topicId: "pqc-standards",
    lessonId: "pqc-lesson-2",
    type: "multiple-choice",
    difficulty: "beginner",
    question: "KEM（Key Encapsulation Mechanism）の3つの操作は何ですか？",
    options: [
      {
        id: "pqc-q4-a",
        text: "Encrypt, Decrypt, Hash",
        isCorrect: false,
      },
      {
        id: "pqc-q4-b",
        text: "KeyGen, Encaps, Decaps",
        isCorrect: true,
      },
      {
        id: "pqc-q4-c",
        text: "Sign, Verify, KeyGen",
        isCorrect: false,
      },
      {
        id: "pqc-q4-d",
        text: "Exchange, Derive, Confirm",
        isCorrect: false,
      },
    ],
    explanation:
      "KEMはKeyGen（鍵ペア生成）、Encaps（公開鍵で共有秘密をカプセル化）、Decaps（秘密鍵でカプセルを開封）の3操作で構成されます。DH型の鍵交換とは異なるパラダイムです。",
  },
  {
    id: "pqc-q5",
    topicId: "pqc-standards",
    lessonId: "pqc-lesson-3",
    type: "multiple-choice",
    difficulty: "intermediate",
    question:
      "ML-DSAの署名生成で使用される「リジェクションサンプリング」の目的は何ですか？",
    options: [
      {
        id: "pqc-q5-a",
        text: "署名の計算速度を向上させるため",
        isCorrect: false,
      },
      {
        id: "pqc-q5-b",
        text: "署名から秘密鍵の情報がリークしないようにするため",
        isCorrect: true,
      },
      {
        id: "pqc-q5-c",
        text: "署名サイズを小さくするため",
        isCorrect: false,
      },
      {
        id: "pqc-q5-d",
        text: "量子コンピュータへの耐性を高めるため",
        isCorrect: false,
      },
    ],
    explanation:
      "リジェクションサンプリングは、署名値 z = y + c × s のノルムが大きい場合に再生成することで、署名から秘密鍵 s の情報がリークすることを防ぎます。ML-DSAの安全性を支える重要なメカニズムです。",
  },
  {
    id: "pqc-q6",
    topicId: "pqc-standards",
    lessonId: "pqc-lesson-4",
    type: "multiple-choice",
    difficulty: "intermediate",
    question:
      "SLH-DSA（旧SPHINCS+）の安全性の根拠は何に依存していますか？",
    options: [
      { id: "pqc-q6-a", text: "格子問題の困難性", isCorrect: false },
      { id: "pqc-q6-b", text: "素因数分解の困難性", isCorrect: false },
      {
        id: "pqc-q6-c",
        text: "ハッシュ関数の安全性のみ",
        isCorrect: true,
      },
      { id: "pqc-q6-d", text: "符号理論の困難性", isCorrect: false },
    ],
    explanation:
      "SLH-DSAはハッシュベースの署名アルゴリズムで、安全性がハッシュ関数（SHA-256/SHAKE）のみに依存しています。格子問題に未知の脆弱性が発見された場合のバックアップとして重要です。",
  },
  {
    id: "pqc-q7",
    topicId: "pqc-standards",
    lessonId: "pqc-lesson-4",
    type: "multiple-choice",
    difficulty: "advanced",
    question:
      "PQC署名アルゴリズムの中で、署名サイズが最小なのはどれですか？",
    options: [
      { id: "pqc-q7-a", text: "ML-DSA-65（約3,293バイト）", isCorrect: false },
      { id: "pqc-q7-b", text: "SLH-DSA-SHA2-128f（約17,088バイト）", isCorrect: false },
      { id: "pqc-q7-c", text: "FN-DSA-512（約666バイト）", isCorrect: true },
      { id: "pqc-q7-d", text: "ML-DSA-44（約2,420バイト）", isCorrect: false },
    ],
    explanation:
      "FN-DSA-512（旧FALCON-512）は署名サイズが約666バイトで、PQC署名の中で最小です。TLS証明書チェーンなど帯域幅がボトルネックになる場面で有利ですが、実装が複雑という課題があります。",
  },
  {
    id: "pqc-q8",
    topicId: "pqc-standards",
    lessonId: "pqc-lesson-5",
    type: "multiple-choice",
    difficulty: "beginner",
    question:
      "ハイブリッド鍵交換（X25519 + ML-KEM-768）の利点は何ですか？",
    options: [
      {
        id: "pqc-q8-a",
        text: "古典的鍵交換よりも高速になる",
        isCorrect: false,
      },
      {
        id: "pqc-q8-b",
        text: "どちらか一方が破られても安全性を維持できる",
        isCorrect: true,
      },
      {
        id: "pqc-q8-c",
        text: "鍵サイズが古典的方式より小さくなる",
        isCorrect: false,
      },
      {
        id: "pqc-q8-d",
        text: "量子コンピュータでのみ実行可能になる",
        isCorrect: false,
      },
    ],
    explanation:
      "ハイブリッド鍵交換は古典（X25519）とPQC（ML-KEM-768）の両方の共有秘密を組み合わせます。ML-KEMに未発見の脆弱性があってもX25519で保護され、量子コンピュータが実現してもML-KEMで保護されます。",
  },
  {
    id: "pqc-q9",
    topicId: "pqc-standards",
    lessonId: "pqc-lesson-5",
    type: "true-false",
    difficulty: "intermediate",
    question:
      "Chromeは2024年からTLS接続でX25519 + ML-KEM-768のハイブリッド鍵交換を有効にしている。",
    options: [
      { id: "pqc-q9-a", text: "正しい", isCorrect: true },
      { id: "pqc-q9-b", text: "誤り", isCorrect: false },
    ],
    explanation:
      "Google Chromeは2024年からTLS 1.3でX25519 + ML-KEM-768（旧X25519Kyber768）のハイブリッド鍵交換をデフォルトで有効にしています。PQC移行の最前線の実例です。",
  },
  {
    id: "pqc-q10",
    topicId: "pqc-standards",
    lessonId: "pqc-lesson-1",
    type: "multiple-choice",
    difficulty: "advanced",
    question:
      "NISTが最初のPQC標準（FIPS 203, 204, 205）を公開したのはいつですか？",
    options: [
      { id: "pqc-q10-a", text: "2022年", isCorrect: false },
      { id: "pqc-q10-b", text: "2023年", isCorrect: false },
      { id: "pqc-q10-c", text: "2024年8月", isCorrect: true },
      { id: "pqc-q10-d", text: "2025年", isCorrect: false },
    ],
    explanation:
      "NISTは2024年8月にFIPS 203（ML-KEM）、FIPS 204（ML-DSA）、FIPS 205（SLH-DSA）の3つのPQC標準を正式に公開しました。FIPS 206（FN-DSA）は2025年に公開予定です。",
  },
] as const satisfies readonly QuizQuestion[];
