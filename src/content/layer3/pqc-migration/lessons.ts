import type { Lesson } from "@/types/content";

export const pqcMigrationLessons: readonly Lesson[] = [
  {
    id: "pqc-mig-lesson1",
    topicId: "pqc-migration",
    order: 1,
    title: "暗号棚卸し手法",
    estimatedMinutes: 45,
    sections: [
      {
        type: "text",
        content:
          "PQC移行の第一歩は、顧客環境に存在する暗号資産の網羅的な把握である。暗号棚卸し（Cryptographic Inventory）とは、組織内で使用されているすべての暗号アルゴリズム、鍵長、証明書、プロトコルを特定・分類・記録するプロセスを指す。\n\nNIST SP 1800-38Bは暗号棚卸しのガイドラインを提供しており、この文書をベースにしたアプローチが業界標準となりつつある。棚卸しなしに移行計画を立てることは、地図なしで航海するに等しい。",
      },
      {
        type: "callout",
        content:
          "暗号棚卸しは技術的な作業だけでなく、ビジネスプロセスの理解も必要とする。顧客のIT部門だけでなく、事業部門へのヒアリングも欠かせない。",
        calloutType: "important",
      },
      {
        type: "example",
        content:
          "【棚卸し対象の分類】\n\n1. 通信プロトコル: TLS/SSL設定、VPN構成、SSH鍵\n2. データ暗号化: ストレージ暗号化、DB暗号化、ファイル暗号化\n3. 認証基盤: PKI証明書、電子署名、認証トークン\n4. アプリケーション組込み: ライブラリ依存（OpenSSL等）、ハードコード鍵\n5. IoT/OT機器: ファームウェア内の暗号実装、更新困難な組込み機器",
      },
      {
        type: "text",
        content:
          "棚卸しの実施手法は大きく3つに分かれる。\n\n**自動スキャン**: ネットワークスキャナやコード解析ツールを使い、暗号使用箇所を自動検出する。Venafi、KeyFactor、Crypto4Aなどの商用ツールや、OSSのcryptographic-bomツールがある。\n\n**手動監査**: 構成ファイル、ソースコード、設計書をレビューし、自動スキャンでは検出困難な暗号使用を特定する。レガシーシステムや独自プロトコルに有効。\n\n**ヒアリング調査**: システム管理者・開発者への聞き取りにより、ドキュメント化されていない暗号使用を発見する。「どこに秘密鍵があるか」を正確に答えられる担当者は驚くほど少ない。",
      },
      {
        type: "code",
        content:
          "// Cryptographic Bill of Materials (CBOM) の構造例\ninterface CryptographicAsset {\n  assetId: string;\n  system: string;\n  algorithm: string;        // e.g., \"RSA-2048\", \"AES-256-GCM\"\n  usage: \"encryption\" | \"signature\" | \"key-exchange\" | \"hashing\";\n  quantumVulnerable: boolean;\n  migrationPriority: \"critical\" | \"high\" | \"medium\" | \"low\";\n  dataClassification: \"public\" | \"internal\" | \"confidential\" | \"restricted\";\n  certExpiry?: string;      // ISO 8601\n  owner: string;\n  notes: string;\n}\n\n// 棚卸し結果サマリ\ninterface InventorySummary {\n  totalAssets: number;\n  quantumVulnerableCount: number;\n  criticalPriorityCount: number;\n  systemsCovered: string[];\n  gapAreas: string[];       // 調査が不十分な領域\n}",
        language: "typescript",
      },
      {
        type: "callout",
        content:
          "棚卸し結果はCBOM（Cryptographic Bill of Materials）としてJSON/CSV形式で管理する。SBOMの暗号版と考えるとわかりやすい。これがPQC移行の全工程を通じたベースラインとなる。",
        calloutType: "tip",
      },
    ],
    keyConcepts: [
      {
        term: "暗号棚卸し",
        termEn: "Cryptographic Inventory",
        definition:
          "組織内で使用されるすべての暗号アルゴリズム、鍵、証明書、プロトコルを特定・記録するプロセス。PQC移行の出発点となる。",
      },
      {
        term: "CBOM",
        termEn: "Cryptographic Bill of Materials",
        definition:
          "暗号資産の一覧表。SBOM（ソフトウェア部品表）の暗号版であり、各資産のアルゴリズム、用途、量子脆弱性、移行優先度を記録する。",
      },
      {
        term: "量子脆弱性",
        termEn: "Quantum Vulnerability",
        definition:
          "量子コンピュータにより突破可能な暗号方式の特性。RSA、ECC、DHなどの公開鍵暗号が該当し、AESなどの共通鍵暗号は鍵長倍増で対応可能。",
      },
      {
        term: "暗号アジリティ",
        termEn: "Crypto Agility",
        definition:
          "暗号アルゴリズムの切り替えを容易にするシステム設計原則。ハードコードされた暗号を避け、構成により切替可能にすることで、将来の移行コストを削減する。",
      },
    ],
  },
  {
    id: "pqc-mig-lesson2",
    topicId: "pqc-migration",
    order: 2,
    title: "リスク評価フレームワーク",
    estimatedMinutes: 50,
    sections: [
      {
        type: "text",
        content:
          "暗号棚卸しの結果を手にしたら、次は各暗号資産のリスクを評価し、移行の優先順位を決定する。ここでは「Harvest Now, Decrypt Later（HNDL）」脅威モデルを中心に据えたリスク評価フレームワークを構築する。\n\nHNDL攻撃とは、現時点で暗号化された通信を傍受・保存しておき、将来量子コンピュータが実用化された段階で復号する手法である。データの機密保持期間が長いほど、HNDL攻撃のリスクは高い。",
      },
      {
        type: "example",
        content:
          "【Mosca の不等式によるリスク判定】\n\nX + Y > Z の場合、今すぐ対策が必要\n\n- X = データの機密保持必要年数\n- Y = PQC移行に必要な年数\n- Z = 大規模量子コンピュータの実現までの年数\n\n例: 医療データ（X=30年）、移行に3年（Y=3）、量子実現まで15年（Z=15）\n→ 30 + 3 = 33 > 15 → 即座に移行開始すべき\n\n例: 社内連絡メール（X=1年）、移行に2年（Y=2）、量子実現まで15年（Z=15）\n→ 1 + 2 = 3 < 15 → 優先度は低い",
      },
      {
        type: "text",
        content:
          "リスク評価は以下の4軸で実施する。\n\n**1. 影響度（Impact）**: そのデータ・システムが侵害された場合のビジネスインパクト。財務損失、法的リスク、レピュテーション損害を考慮する。\n\n**2. 時間的切迫度（Urgency）**: Moscaの不等式に基づく。データの長期保持義務がある業界（金融、医療、防衛）ほど切迫度が高い。\n\n**3. 移行難易度（Migration Complexity）**: システムの複雑さ、レガシー依存度、暗号アジリティの有無。IoT機器やファームウェア内暗号は移行が困難。\n\n**4. 規制要件（Regulatory Requirements）**: NIST、金融庁、NISC等の規制・ガイドラインへの準拠要件。業界によっては移行期限が設定される可能性がある。",
      },
      {
        type: "code",
        content:
          "// リスクスコア算出モデル\ninterface RiskAssessment {\n  assetId: string;\n  impact: 1 | 2 | 3 | 4 | 5;           // 1=minimal, 5=catastrophic\n  urgency: 1 | 2 | 3 | 4 | 5;           // Mosca inequality score\n  migrationComplexity: 1 | 2 | 3 | 4 | 5; // 1=easy, 5=extremely hard\n  regulatoryPressure: 1 | 2 | 3 | 4 | 5;  // 1=none, 5=mandated deadline\n}\n\nfunction calculatePriority(assessment: RiskAssessment): number {\n  // Weight: impact and urgency are weighted more heavily\n  const score =\n    assessment.impact * 0.35 +\n    assessment.urgency * 0.30 +\n    assessment.regulatoryPressure * 0.20 +\n    assessment.migrationComplexity * 0.15;\n  return Math.round(score * 20); // 0-100 scale\n}\n\n// Priority bands\n// 80-100: Immediate action (Phase 1)\n// 60-79:  Near-term (Phase 2)\n// 40-59:  Medium-term (Phase 3)\n// 0-39:   Monitor and plan",
        language: "typescript",
      },
      {
        type: "callout",
        content:
          "リスク評価結果は経営層への報告にも使う。技術的な詳細よりも「何がいつまでに危険か」「対策しない場合の損害額」を明確に伝えることが、予算確保の鍵となる。",
        calloutType: "tip",
      },
    ],
    keyConcepts: [
      {
        term: "HNDL攻撃",
        termEn: "Harvest Now, Decrypt Later",
        definition:
          "現在の暗号化通信を傍受・保存し、将来の量子コンピュータで復号する攻撃手法。長期保持データほどリスクが高い。",
      },
      {
        term: "Moscaの不等式",
        termEn: "Mosca's Inequality",
        definition:
          "X + Y > Z（データ保持年数 + 移行所要年数 > 量子実現年数）の場合に即座の対策が必要であることを示す判定式。Michele Moscaが提唱。",
      },
      {
        term: "リスクスコアリング",
        termEn: "Risk Scoring",
        definition:
          "影響度、時間的切迫度、移行難易度、規制要件の4軸で暗号資産のリスクを定量評価し、移行優先度を決定する手法。",
      },
    ],
  },
  {
    id: "pqc-mig-lesson3",
    topicId: "pqc-migration",
    order: 3,
    title: "移行計画テンプレート",
    estimatedMinutes: 55,
    sections: [
      {
        type: "text",
        content:
          "リスク評価で優先度が決まったら、具体的な移行計画を策定する。PQC移行は数年にわたる長期プロジェクトであり、段階的なアプローチが不可欠である。ここでは、実際のコンサルティングで使える移行計画テンプレートを構築する。",
      },
      {
        type: "example",
        content:
          "【4フェーズ移行計画テンプレート】\n\nPhase 0: 準備（1-2ヶ月）\n- 暗号棚卸し実施\n- リスク評価・優先度決定\n- 経営層へのブリーフィング\n- 移行チーム組成\n\nPhase 1: ハイブリッド導入（3-6ヶ月）\n- 最優先システムにハイブリッド暗号（従来+PQC）を導入\n- TLS 1.3 + ML-KEM鍵交換のテスト展開\n- 性能ベンチマーク・互換性テスト\n\nPhase 2: 段階的移行（6-18ヶ月）\n- 優先度順にシステム移行を実施\n- 証明書・鍵管理基盤の更新\n- アプリケーション層の暗号ライブラリ更新\n- 社内PKIのPQC対応\n\nPhase 3: 完全移行・検証（3-6ヶ月）\n- レガシー暗号の無効化\n- 移行完了の検証テスト\n- 運用手順書・ドキュメント整備\n- 定期監査体制の構築",
      },
      {
        type: "text",
        content:
          "移行計画には以下の要素を必ず含める。\n\n**マイルストーン定義**: 各フェーズの完了条件を具体的に定義する。「TLS接続の80%がハイブリッドモードに移行」など定量的な基準が望ましい。\n\n**ロールバック計画**: PQC実装に問題が発生した場合の切り戻し手順。ハイブリッドモードであれば従来暗号へのフォールバックが可能。\n\n**テスト戦略**: 互換性テスト、性能テスト、セキュリティテストの3軸。特にPQCアルゴリズムは鍵サイズ・署名サイズが大きいため、パフォーマンス影響の測定が重要。\n\n**コスト見積もり**: ライセンス費用、人件費、ダウンタイムコストを含む。移行しない場合の潜在リスクコストとの比較も提示する。",
      },
      {
        type: "code",
        content:
          "// Migration plan structure for client deliverable\ninterface MigrationPlan {\n  clientName: string;\n  assessmentDate: string;\n  phases: readonly MigrationPhase[];\n  totalEstimatedCost: CostEstimate;\n  riskIfDelayed: string;\n}\n\ninterface MigrationPhase {\n  name: string;\n  duration: string;          // e.g., \"3-6 months\"\n  objectives: readonly string[];\n  deliverables: readonly string[];\n  milestones: readonly Milestone[];\n  estimatedCost: CostEstimate;\n  rollbackPlan: string;\n}\n\ninterface Milestone {\n  name: string;\n  criteria: string;          // quantitative completion criteria\n  targetDate: string;\n}\n\ninterface CostEstimate {\n  laborHours: number;\n  toolingCost: number;\n  trainingCost: number;\n  contingency: number;       // 15-20% buffer\n  total: number;\n}",
        language: "typescript",
      },
      {
        type: "callout",
        content:
          "移行計画は「完璧な計画」より「始められる計画」を重視する。最初の3ヶ月で棚卸しとPoC（概念実証）を完了させ、そこから得た知見で後続フェーズを精緻化する反復型アプローチが現実的。",
        calloutType: "warning",
      },
      {
        type: "text",
        content:
          "顧客に提示する際は、業界ごとのコンプライアンス要件を移行計画にマッピングする。金融業界であればFISC安全対策基準、医療であれば3省2ガイドライン、政府系であればNISCガイドラインとの整合を示す。これにより、移行が「あったらいいもの」から「やらなければならないもの」に格上げされる。",
      },
    ],
    keyConcepts: [
      {
        term: "ハイブリッド暗号",
        termEn: "Hybrid Cryptography",
        definition:
          "従来の暗号アルゴリズムとPQCアルゴリズムを併用する移行期の手法。両方が同時に破られない限り安全性を維持でき、ロールバックも容易。",
      },
      {
        term: "段階的移行",
        termEn: "Phased Migration",
        definition:
          "リスク優先度に基づき、準備・ハイブリッド導入・段階的移行・完全移行の4フェーズでPQC移行を進めるアプローチ。",
      },
      {
        term: "ロールバック計画",
        termEn: "Rollback Plan",
        definition:
          "PQC実装に問題が発生した場合に従来暗号へ切り戻す手順。ハイブリッドモードの採用により、安全なフォールバックパスを確保する。",
      },
      {
        term: "移行コスト対リスク分析",
        termEn: "Migration Cost vs. Risk Analysis",
        definition:
          "PQC移行にかかるコストと、移行しない場合の潜在的な損害（データ漏洩、コンプライアンス違反等）を比較する意思決定フレームワーク。",
      },
    ],
  },
  {
    id: "pqc-mig-lesson4",
    topicId: "pqc-migration",
    order: 4,
    title: "クライアント提案術",
    estimatedMinutes: 40,
    sections: [
      {
        type: "text",
        content:
          "優れた技術的知見も、顧客に伝わらなければ価値を生まない。PQC移行コンサルティングの成否は、技術を経営の言葉に翻訳する提案力にかかっている。ここでは、エンタープライズ顧客へのPQC移行提案の設計手法を学ぶ。",
      },
      {
        type: "example",
        content:
          "【提案書の構成テンプレート】\n\n1. エグゼクティブサマリ（1ページ）\n   - 量子脅威の概要（3行以内）\n   - 御社固有のリスク（棚卸し結果のハイライト）\n   - 推奨アクションと期待効果\n   - 概算費用とROI\n\n2. 背景：量子コンピュータの脅威\n   - HNDL攻撃の図解\n   - 主要国の動向（米NIST標準化、EU規制）\n   - 業界における先行事例\n\n3. 現状分析：御社の暗号リスク\n   - 棚卸し結果サマリ\n   - リスクヒートマップ（影響度×切迫度）\n   - 最も危険な上位5資産\n\n4. 移行計画案\n   - 4フェーズロードマップ\n   - マイルストーンとスケジュール\n   - 体制案（御社側・弊社側の役割分担）\n\n5. 費用・体制\n   - フェーズ別見積もり\n   - 移行しない場合のリスクコスト比較\n   - 投資回収シナリオ\n\n6. 付録：技術詳細",
      },
      {
        type: "text",
        content:
          "提案のポイントは以下の3つに集約される。\n\n**恐怖ではなく事実で語る**: 量子脅威を過度に煽ると信頼を失う。NISTの標準化スケジュール、各国政府のガイドライン、業界の動向という客観的事実を淡々と示す。\n\n**御社固有のリスクに落とし込む**: 一般論ではなく、棚卸し結果に基づく具体的なリスクを提示する。「御社のVPN基盤はRSA-2048に依存しており、HNDL攻撃の対象となりうる」のように。\n\n**小さく始めて実績を作る**: 全社一括移行ではなく、最優先システム1-2件でのPoCを提案する。成功実績が次のフェーズの予算獲得につながる。",
      },
      {
        type: "callout",
        content:
          "CISOやCTOへの提案では「セキュリティ投資のROI」を数値で示す。データ漏洩時の想定損害額（IBM Cost of Data Breachレポート参照）と移行コストの比較が効果的。日本企業の場合、個人情報保護法改正による罰則強化も論点になる。",
        calloutType: "tip",
      },
      {
        type: "text",
        content:
          "提案後のフォローアップも重要である。初回提案から受注まで3-6ヶ月かかることも珍しくない。その間、量子コンピューティングの最新ニュース（新しいアルゴリズムの発表、セキュリティインシデント等）を定期的に共有し、顧客の関心を維持する。「ニュースレター型フォロー」は低コストで継続的な関係構築に有効。",
      },
    ],
    keyConcepts: [
      {
        term: "エグゼクティブサマリ",
        termEn: "Executive Summary",
        definition:
          "提案書冒頭の1ページ要約。経営層が最初に（場合によっては唯一）読む部分であり、リスク・推奨アクション・費用対効果を凝縮して伝える。",
      },
      {
        term: "リスクヒートマップ",
        termEn: "Risk Heatmap",
        definition:
          "影響度と切迫度の2軸で暗号資産のリスクを可視化する図表。経営層への報告で直感的な理解を促す。",
      },
      {
        term: "PoC提案",
        termEn: "Proof of Concept Proposal",
        definition:
          "全社展開前に最優先システム1-2件で小規模実証を行う提案手法。リスクを限定しつつ実績を作り、次フェーズの予算確保につなげる。",
      },
    ],
  },
] as const satisfies readonly Lesson[];
