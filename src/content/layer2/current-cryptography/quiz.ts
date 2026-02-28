import type { QuizQuestion } from "@/types/quiz";

export const currentCryptographyQuiz: readonly QuizQuestion[] = [
  {
    id: "cc-q1",
    topicId: "current-cryptography",
    lessonId: "cc-lesson-1",
    type: "multiple-choice",
    difficulty: "beginner",
    question: "AES-256の鍵長は何ビットですか？",
    options: [
      { id: "cc-q1-a", text: "128ビット", isCorrect: false },
      { id: "cc-q1-b", text: "192ビット", isCorrect: false },
      { id: "cc-q1-c", text: "256ビット", isCorrect: true },
      { id: "cc-q1-d", text: "512ビット", isCorrect: false },
    ],
    explanation:
      "AES-256は256ビットの鍵を使用します。AESはブロックサイズが128ビット固定で、鍵長として128/192/256ビットの3種類をサポートしています。",
  },
  {
    id: "cc-q2",
    topicId: "current-cryptography",
    lessonId: "cc-lesson-1",
    type: "true-false",
    difficulty: "intermediate",
    question:
      "AES-256は量子コンピュータのGroverのアルゴリズムにより、実効的な安全性が128ビット相当に低下するが、依然として安全とされている。",
    options: [
      { id: "cc-q2-a", text: "正しい", isCorrect: true },
      { id: "cc-q2-b", text: "誤り", isCorrect: false },
    ],
    explanation:
      "Groverのアルゴリズムは対称鍵暗号の鍵空間探索を二乗根に短縮します。AES-256は128ビット相当に低下しますが、128ビットの安全性は依然として十分です。",
  },
  {
    id: "cc-q3",
    topicId: "current-cryptography",
    lessonId: "cc-lesson-2",
    type: "multiple-choice",
    difficulty: "beginner",
    question: "RSAの安全性の根拠となっている数学的問題は何ですか？",
    options: [
      { id: "cc-q3-a", text: "離散対数問題", isCorrect: false },
      { id: "cc-q3-b", text: "素因数分解問題", isCorrect: true },
      { id: "cc-q3-c", text: "格子問題", isCorrect: false },
      { id: "cc-q3-d", text: "ハッシュ衝突問題", isCorrect: false },
    ],
    explanation:
      "RSAの安全性は、大きな合成数の素因数分解が計算量的に困難であるという仮定に基づいています。n = p × q のnからp, qを求めることが困難です。",
  },
  {
    id: "cc-q4",
    topicId: "current-cryptography",
    lessonId: "cc-lesson-2",
    type: "multiple-choice",
    difficulty: "intermediate",
    question:
      "RSA暗号化で推奨されるパディング方式はどれですか？",
    options: [
      { id: "cc-q4-a", text: "PKCS#1 v1.5", isCorrect: false },
      { id: "cc-q4-b", text: "OAEP", isCorrect: true },
      { id: "cc-q4-c", text: "PSS", isCorrect: false },
      { id: "cc-q4-d", text: "パディングなし", isCorrect: false },
    ],
    explanation:
      "OAEP（Optimal Asymmetric Encryption Padding）は選択暗号文攻撃に対する安全性を提供します。PSSは署名用のパディング方式です。PKCS#1 v1.5は古い方式で脆弱性が知られています。",
  },
  {
    id: "cc-q5",
    topicId: "current-cryptography",
    lessonId: "cc-lesson-3",
    type: "multiple-choice",
    difficulty: "beginner",
    question:
      "ECC-256ビットと同等の安全性を持つRSAの鍵長はおよそ何ビットですか？",
    options: [
      { id: "cc-q5-a", text: "256ビット", isCorrect: false },
      { id: "cc-q5-b", text: "1,024ビット", isCorrect: false },
      { id: "cc-q5-c", text: "3,072ビット", isCorrect: true },
      { id: "cc-q5-d", text: "15,360ビット", isCorrect: false },
    ],
    explanation:
      "ECC-256ビットはRSA-3,072ビットと同等のセキュリティレベル（128ビット安全性）を提供します。ECCはRSAの約1/12の鍵長で同等の安全性を実現できます。",
  },
  {
    id: "cc-q6",
    topicId: "current-cryptography",
    lessonId: "cc-lesson-3",
    type: "true-false",
    difficulty: "intermediate",
    question:
      "楕円曲線暗号（ECC）は量子コンピュータのShorのアルゴリズムに対して安全である。",
    options: [
      { id: "cc-q6-a", text: "正しい", isCorrect: false },
      { id: "cc-q6-b", text: "誤り", isCorrect: true },
    ],
    explanation:
      "ECCは楕円曲線上の離散対数問題に基づいていますが、Shorのアルゴリズムはこの問題も効率的に解くことができます。RSAと同様に量子コンピュータで破られます。",
  },
  {
    id: "cc-q7",
    topicId: "current-cryptography",
    lessonId: "cc-lesson-4",
    type: "multiple-choice",
    difficulty: "intermediate",
    question: "「Harvest Now, Decrypt Later」攻撃とは何ですか？",
    options: [
      {
        id: "cc-q7-a",
        text: "暗号化されたデータをリアルタイムで解読する攻撃",
        isCorrect: false,
      },
      {
        id: "cc-q7-b",
        text: "暗号通信を傍受・保存し、将来量子コンピュータで復号する攻撃戦略",
        isCorrect: true,
      },
      {
        id: "cc-q7-c",
        text: "暗号鍵を物理的に盗み出す攻撃",
        isCorrect: false,
      },
      {
        id: "cc-q7-d",
        text: "中間者攻撃の一種",
        isCorrect: false,
      },
    ],
    explanation:
      "HNDL攻撃は、現時点では解読できない暗号通信を傍受・保存しておき、量子コンピュータが実用化された将来に復号する戦略です。長期的な機密性が求められるデータに対して深刻な脅威です。",
  },
  {
    id: "cc-q8",
    topicId: "current-cryptography",
    lessonId: "cc-lesson-4",
    type: "multiple-choice",
    difficulty: "advanced",
    question:
      "NISTセキュリティレベル3に相当する対称鍵暗号はどれですか？",
    options: [
      { id: "cc-q8-a", text: "AES-128", isCorrect: false },
      { id: "cc-q8-b", text: "AES-192", isCorrect: true },
      { id: "cc-q8-c", text: "AES-256", isCorrect: false },
      { id: "cc-q8-d", text: "3DES", isCorrect: false },
    ],
    explanation:
      "NISTセキュリティレベル3はAES-192の全数探索と同等以上の安全性を要求します。Level 1はAES-128相当、Level 5はAES-256相当です。",
  },
  {
    id: "cc-q9",
    topicId: "current-cryptography",
    lessonId: "cc-lesson-4",
    type: "multiple-choice",
    difficulty: "advanced",
    question:
      "PQC移行において「Crypto Agility（暗号の俊敏性）」が重要な理由はどれですか？",
    options: [
      {
        id: "cc-q9-a",
        text: "暗号アルゴリズムの計算速度を向上させるため",
        isCorrect: false,
      },
      {
        id: "cc-q9-b",
        text: "暗号アルゴリズムを容易に切り替えられるシステム設計が必要なため",
        isCorrect: true,
      },
      {
        id: "cc-q9-c",
        text: "量子コンピュータの開発を加速させるため",
        isCorrect: false,
      },
      {
        id: "cc-q9-d",
        text: "古い暗号を永続的に使い続けるため",
        isCorrect: false,
      },
    ],
    explanation:
      "Crypto Agilityは暗号アルゴリズムの切り替えを容易にするシステム設計原則です。PQC標準が更新されたり、新たな脆弱性が発見された場合にも迅速に対応するために不可欠です。",
  },
  {
    id: "cc-q10",
    topicId: "current-cryptography",
    lessonId: "cc-lesson-1",
    type: "multiple-choice",
    difficulty: "intermediate",
    question:
      "TLS 1.3においてAESが担う役割はどれですか？",
    options: [
      { id: "cc-q10-a", text: "鍵交換", isCorrect: false },
      { id: "cc-q10-b", text: "デジタル署名", isCorrect: false },
      {
        id: "cc-q10-c",
        text: "バルク暗号化（データの暗号化）",
        isCorrect: true,
      },
      { id: "cc-q10-d", text: "ハッシュ計算のみ", isCorrect: false },
    ],
    explanation:
      "TLS 1.3ではAESはバルク暗号化（データの暗号化と完全性保証）に使用されます。鍵交換にはECDH、署名にはECDSAやRSA-PSSが使用されるハイブリッド構成です。",
  },
] as const satisfies readonly QuizQuestion[];
