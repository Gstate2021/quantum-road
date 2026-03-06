import type { Lesson } from "@/types/content";

export const deloitteQuantumInsightsLessons: readonly Lesson[] = [
  {
    id: "dqi-lesson-1",
    topicId: "deloitte-quantum-insights",
    order: 1,
    title: "量子コンピューティング市場の全体像",
    estimatedMinutes: 35,
    sections: [
      {
        type: "text",
        content:
          "デロイトは量子コンピューティングの市場動向を継続的に調査・分析している。Deloitte Insightsの「Quantum Computing Futures」レポート（2025年8月）では、2024年に米国のビジネス・技術リーダー約400名を調査し、量子コンピューティング投資の急速な拡大を報告した。\n\n主要な数字を押さえておこう。",
      },
      {
        type: "diagram",
        content:
          "量子コンピューティング市場の主要指標（Deloitte調査）:\n\n指標                          | 数値\n──────────────────────────────────────────\n企業の投資率（2024年）         | 25%（前年比3倍増）\n投資企業の価値実感率           | 76%が「大きな価値」\n量子VC投資（2024年）           | 20億ドル\n量子市場成長率（2024-2032年）  | 年率約35%\n2030年市場規模予測             | 約650億ドル（CAGR 56%）\n2040年経済価値                 | 約120兆円\n必要人材数（2030年）           | 25万人\n正規訓練済み人材比率           | わずか12%\n量子特許出願数（過去5年）      | 1,100件以上\n\n出典: Deloitte Insights \"Quantum Computing Futures\" (2025)",
      },
      {
        type: "text",
        content:
          "特に注目すべきは「投資した企業の76%が大きな価値を実感している」という調査結果だ。量子コンピューティングは実験段階を脱し、具体的なビジネス価値を生み始めている。\n\n一方で、量子VC投資は2022年の22億ドルから2023年に12億ドルへ50%減少した後、2024年に20億ドルへ回復している。AI投資（1,320億ドル）と比較すると66分の1だが、成長率は量子の方が高い。",
      },
      {
        type: "callout",
        content:
          "世界各国の量子技術R&D公的資金は2023年末累計で420億ドルに達している（DTFA Institute調査）。米中が突出した投資規模で覇権を争い、EU・英国・カナダも2023年以降に国家レベル戦略と大規模資金投入を開始した。日本は欧州諸国と比較して小さくはないが、米中との差は大きい。",
        calloutType: "important",
      },
      {
        type: "text",
        content:
          "量子技術の実用化時期について、デロイトは**2030〜2040年**と予測している。2023-2024年の誤り訂正技術の進歩により、従来2050年と言われていた実用化が前倒しされた。\n\n現在の約50論理量子ビットから**200〜1,000論理量子ビット**への到達が、エンタープライズ導入の技術的閾値とされる。Lockheed Martinのシミュレーションでは、52量子ビットから1,000量子ビットで20倍以上のスケーリングポテンシャルが示されている。\n\nデロイトの寺部雅能氏（量子技術統括）は「実用化はIfからWhenへ転換した」と表現している。",
      },
      {
        type: "callout",
        content:
          "人材ギャップは深刻だ。2030年に25万人の量子人材が必要だが、正規訓練済みはわずか12%。育成には3〜5年のリードタイムが必要で、「様子見」では間に合わない。PQC/量子セキュリティのスキルは高い希少価値を持つ。",
        calloutType: "warning",
      },
    ],
    keyConcepts: [
      {
        term: "量子市場規模",
        termEn: "Quantum Computing Market Size",
        definition:
          "2030年までに約650億ドル（CAGR 56%）、2040年には経済価値約120兆円に達するとDeloitteは予測。2024年のVC投資は20億ドル。",
      },
      {
        term: "量子人材ギャップ",
        termEn: "Quantum Talent Gap",
        definition:
          "2030年に25万人必要だが正規訓練者は12%。育成に3〜5年を要し、2030年に向けて専門人材の奪い合いが予想される。",
      },
      {
        term: "Quantum Harbor",
        termEn: "Quantum Harbor Project",
        definition:
          "デロイトトーマツが2024年1月に始動した量子産業創出プロジェクト。技術研究・エコシステム形成・産業支援の3本柱で、日本がグローバル量子産業をリードすることを目指す。",
      },
    ],
  },
  {
    id: "dqi-lesson-2",
    topicId: "deloitte-quantum-insights",
    order: 2,
    title: "Q-Dayタイムラインとシナリオ分析",
    estimatedMinutes: 40,
    sections: [
      {
        type: "text",
        content:
          "「Q-Day」とは、暗号学的に意味のある量子コンピュータ（CRQC）が現行暗号を破れるようになる日を指す。Deloitteは複数のレポートでこのタイムラインを分析しており、Y2K問題との対比で「Y2Q（Year to Quantum）」という概念を提唱している。\n\nTech Trends 2025の「The New Math」章で、Deloitteは「本質的にY2Kの逆のケース：影響はさらに広範だが、日付が不明」と表現した。",
      },
      {
        type: "diagram",
        content:
          "Q-Dayタイムライン予測（ソース別比較）:\n\nソース                    | 予測\n──────────────────────────────────────────\nDeloitte Tech Trends 2025 | 5〜10年以内\nQuantropi CTO対談          | 10〜20年（ML併用で5年未満）\n北米大手銀行               | 2027年を臨界年と特定\nNIST                      | 約20年\nG7ステートメント（2024年9月）| 今後10年以内\n金融庁検討会               | 2030年代半ばまでにPQC利用可能状態に\n\n出典: Deloitte各レポートの横断分析",
      },
      {
        type: "callout",
        content:
          "Quantropi CTOのMichael Redding氏は「今日のノイジーな量子コンピュータでも、機械学習と組み合わせれば暗号を破ることに近づいている」と警告。Q-Dayまでの10〜20年という見積もりは、ML技術の進歩により5年未満に短縮される可能性がある。",
        calloutType: "warning",
      },
      {
        type: "text",
        content:
          "Deloitteの「Quantum Computing Futures」レポートでは、2030年に向けた**4つのシナリオ**を提示している。「スケーラビリティの到達時期」と「人材エコシステムの成熟度」の2軸で分類する。",
      },
      {
        type: "diagram",
        content:
          "Deloitte 4シナリオ分析（2025-2030年）:\n\n                    人材未発達          人材発達\n                ┌───────────────┬───────────────┐\n量子早期到来    │ 1. SURPRISE    │ 3. EXPLOSION  │\n                │ 早期投資者が    │ 量子優位確認   │\n                │ 大きな競争優位  │ VC資金殺到     │\n                │ PQC移行が緊急  │ テックスタック  │\n                │ 人材争奪戦     │ 標準化         │\n                ├───────────────┼───────────────┤\n量子遅延       │ 2. QUANDARY    │ 4. LEAP       │\n                │ 「量子の冬」   │ 人材は成長     │\n                │ VC→AIにシフト  │ 量子インスパイア│\n                │ 10年のギャップ │ ドで価値創出   │\n                └───────────────┴───────────────┘\n\n出典: Deloitte \"Quantum Computing Futures\" (2025)",
      },
      {
        type: "text",
        content:
          "**SURPRISEシナリオ**が最もリスクが高い。スケーラブル量子が予想より早く到来したが、多くの企業が準備不足という状況だ。2025年以前に投資した企業だけが大きなアドバンテージを獲得する。\n\nDeloitteの調査では、920人のグローバル回答者の**51%が量子は予想より速く進歩している**と回答し、**33%が自組織は不意を突かれる**と考えている。\n\nどのシナリオになっても、「今から準備する企業」が有利であることは変わらない。Deloitteは「スケーラブル量子コンピューティングの正確な転換点は、行動のトリガーであるべきではない」と明言している。",
      },
      {
        type: "callout",
        content:
          "Rigetti Computing CEOのMarco Paini氏は「企業がゼロから適切な量子コンピューティング組織を1年未満で構築するのは困難」と指摘。照明のスイッチを入れるように量子が「オン」になるわけではなく、裏の配線（人材・プロセス・インフラ）を事前に整える必要がある。",
        calloutType: "tip",
      },
    ],
    keyConcepts: [
      {
        term: "Q-Day / Y2Q",
        termEn: "Q-Day / Year to Quantum",
        definition:
          "CRQCが現行暗号を破れるようになる日。DeloitteはY2K問題との対比でY2Qと表現。「影響はY2Kより広範だが、日付が不明」という特殊な性質を持つ。",
      },
      {
        term: "4シナリオ分析",
        termEn: "Quantum Computing Futures Scenarios",
        definition:
          "Deloitteが提示する2030年の4つの将来像。SURPRISE（早期到来×人材未発達）、QUANDARY（遅延×未発達）、EXPLOSION（早期×発達）、LEAP（遅延×発達）。",
      },
      {
        term: "量子の冬",
        termEn: "Quantum Winter",
        definition:
          "QUANDARYシナリオで発生する可能性。技術進歩が期待を下回りVC資金がAIにシフト。しかし2030年以降のブレークスルー時に10年のナレッジギャップが生じるリスク。",
      },
    ],
  },
  {
    id: "dqi-lesson-3",
    topicId: "deloitte-quantum-insights",
    order: 3,
    title: "HNDL脅威とPQC移行フレームワーク",
    estimatedMinutes: 45,
    sections: [
      {
        type: "text",
        content:
          "Deloitteが最も強く警告するのが**HNDL（Harvest Now, Decrypt Later）攻撃**だ。Tech Trends 2025で「CRQCがまだ存在しなくても、組織のデータはすでにリスクにさらされている」と明言している。\n\nHNDL攻撃とは、攻撃者が現在の暗号化通信を傍受・大量に保存し、将来CRQCが利用可能になった段階で復号する手法だ。Quantropi CTO対談では「比較的容易かつ低コストで組織データを大量に盗み保存できる」と指摘されている。",
      },
      {
        type: "callout",
        content:
          "「問題は量子コンピュータが来る『かどうか』ではなく、『いつ』かだ」（Deloitte Tech Trends 2025）。HNDL攻撃は量子コンピュータの完成を待たずに今日すでに進行中の脅威である。何年・何十年も保護が必要な機密情報や企業秘密は、今この瞬間もリスクにさらされている。",
        calloutType: "warning",
      },
      {
        type: "text",
        content:
          "Deloitteの調査（Future of Cyber）によると:\n\n- **52%**の組織が量子リスク評価・戦略策定中\n- **30%**が対策実行中\n- **約18%**は何もしていない\n\nNISTは2024年8月にPQC標準を公開し、40以上の協力者が移行プロジェクトに参加している。Apple（iMessage）、Google（Chrome）、IBM、Microsoftは既にPQC実装を開始済みだ。",
      },
      {
        type: "text",
        content:
          "**Deloitte推奨のPQCマイグレーション5ステップ:**\n\nDeloitteのQuantum Cyber Readinessサービスでは、以下のフレームワークを使用している。",
      },
      {
        type: "diagram",
        content:
          "Deloitte PQCマイグレーション5ステップ:\n\n┌─────────────────────────────────────────┐\n│ Step 1: DISCOVER（発見）                  │\n│ 暗号インベントリの実施                    │\n│ CBOM + SBOMの同時作成                    │\n│ 暗号鍵の種類・特性・場所の特定           │\n├─────────────────────────────────────────┤\n│ Step 2: ASSESS（評価）                    │\n│ 量子リスクエクスポージャーの評価          │\n│ 優先順位付け（Mosca不等式の適用）        │\n│ インフラ制約（帯域幅/レイテンシ）の特定  │\n├─────────────────────────────────────────┤\n│ Step 3: GOVERN（ガバナンス）              │\n│ 暗号管理の役割・責任定義                 │\n│ ガバナンス構造への量子リスク組み込み     │\n│ 経営層のリーダーシップ確立               │\n├─────────────────────────────────────────┤\n│ Step 4: MIGRATE（移行）                   │\n│ PQCアルゴリズムのテスト・実装            │\n│ 相互運用性・パフォーマンス確認           │\n│ ベンダー契約に量子安全要件を組み込み     │\n├─────────────────────────────────────────┤\n│ Step 5: SUSTAIN（持続）                   │\n│ クリプトアジリティの確立                 │\n│ 継続的な暗号機能の更新能力構築           │\n│ 定期監査体制の運用                       │\n└─────────────────────────────────────────┘\n\n出典: Deloitte Quantum Cyber Readiness Services",
      },
      {
        type: "text",
        content:
          "デロイトトーマツの日本向けレポートでは、特に以下の日本固有の課題を指摘している:\n\n1. **金融分野**: PQC対応に着手している金融機関はごく少数。金融庁は2030年代半ばまでにPQC利用可能状態を推奨\n2. **人材不足**: 2030年に向けて専門会社や人材は奪い合いになると予想\n3. **情報格差**: 国内ではベンダー発信の情報が中心で、事業者観点の有用な情報が少ない\n4. **官民連携**: 移行は1企業だけで完結せず、社会全体で推進する必要がある\n5. **輸出規制**: 日本の量子関連輸出管理対象は21品目（2025年1月時点）",
      },
      {
        type: "callout",
        content:
          "DeloitteはPQC移行を「Y2Kの10倍の準備が必要」と表現している。SHA1→SHA2の移行でさえ数年を要した実績があり、PQCへの移行は組織の暗号インフラ全体に及ぶ。NISTは2030年にRSA/DH暗号の移行期限を設定しており、逆算すると猶予は限られている。",
        calloutType: "important",
      },
    ],
    keyConcepts: [
      {
        term: "HNDL攻撃",
        termEn: "Harvest Now, Decrypt Later",
        definition:
          "現在の暗号化データを収集し将来の量子コンピュータで復号する攻撃。Deloitteは「今日すでに進行中の脅威」と位置付け。長期保持データほどリスクが高い。",
      },
      {
        term: "5ステップ移行フレームワーク",
        termEn: "5-Step Migration Framework",
        definition:
          "Deloitte Quantum Cyber Readinessのフレームワーク。Discover（発見）→ Assess（評価）→ Govern（ガバナンス）→ Migrate（移行）→ Sustain（持続）の5段階。",
      },
      {
        term: "暗号レジリエンス",
        termEn: "Cryptographic Resilience",
        definition:
          "さまざまな種類の攻撃や障害から暗号システムを保護するための再現可能な一連の活動。Deloitteは2025年4月にNIST CSF 2.0ベースのCryptographic Resilience Community Profileを公開。",
      },
    ],
  },
  {
    id: "dqi-lesson-4",
    topicId: "deloitte-quantum-insights",
    order: 4,
    title: "産業別インパクトとユースケース",
    estimatedMinutes: 40,
    sections: [
      {
        type: "text",
        content:
          "デロイトは量子コンピューティングの産業別インパクトを詳細に分析している。「量子コンピューティングがAIの限界を打ち破る」（2026年1月）では、AI×量子の融合による2大ブレークスルー領域を提示した。\n\n**1. データ拡張による適用領域拡大**: 量子特有の性質を利用した超高精度の乱数生成によるデータ水増し。不正検知・異常検知・希少事象モデリングに活用。\n\n**2. 学習の超効率化**: 量子アルゴリズムによる機械学習の効率化。より少ないニューロン数でのモデル実現、学習時間短縮、消費電力削減。AIの電力問題への解決策にもなる。",
      },
      {
        type: "diagram",
        content:
          "産業別量子コンピューティングのインパクト（Deloitte分析）:\n\n産業           | 主要ユースケース                   | 具体例・実績\n────────────────────────────────────────────────────────────────────\n創薬・製薬     | 分子シミュレーション、薬物候補探索   | 中外製薬と実証開始\n素材・化学     | 新素材探索、材料開発               | 三菱ケミカル+Classiqで有機EL材料\n               |                                     | 量子回路を最大97%圧縮\n金融           | リスク管理、ポートフォリオ最適化    | モンテカルロ法の高速化\n               | PQC移行                            | 年間200億ドルの経済貢献（2030年予測）\n防衛           | 暗号解読、シミュレーション          | 年間100億ドルの経済貢献（2030年予測）\n物流・輸送     | ルート最適化、要員配置             | ExxonMobil: 5万隻+の商船最適化\n製造           | 生産計画最適化、品質管理           | 生産効率5%改善でも巨大な財務インパクト\nエネルギー     | 材料シミュレーション               | 肥料製造効率化で年間数十億ドル節約\n自動車         | バッテリー開発、車体設計           | 次世代バッテリー材料の分子設計\nヘルスケア     | MRI精度向上、がん治療追跡          | 量子センサーによる診断精度向上\n\n出典: Deloitte各レポートの横断分析",
      },
      {
        type: "text",
        content:
          "**デロイトトーマツの実証事例（日本）:**\n\n**1. 中外製薬×デロイトトーマツ（2024年11月）**\n創薬分野での量子コンピュータ実用化時期の見極めと早期化に向けた実証。従来の「実験と失敗」を高速・高精度計算に置き換えるアプローチ。\n\n**2. 三菱ケミカル×Classiq×デロイトトーマツ（2024年12月）**\n有機EL材料探索で量子回路を最大97%圧縮する実証に成功。Classiq（イスラエルの量子ソフトウェアスタートアップ）の回路最適化技術を活用。\n\n**3. QuEra Computing×デロイトトーマツ（2025年2月）**\n中性原子方式量子コンピュータの戦略的協業。共同研究論文「Robust Quantum Reservoir Computing for Molecular Property Prediction」で、小規模創薬データセットにおいて古典モデルを上回る成果。",
      },
      {
        type: "text",
        content:
          "**デロイトのグローバルパートナーシップ:**\n\nデロイトはグローバルで約700名、日本で約50名の量子技術専門チームを擁する。Ph.D.保有者（化学、金融工学、理論物理）とコンサルタントの混成チームで、技術と事業の両面をカバーする。\n\n- **QuEra Computing**: 中性原子量子コンピュータ（米国）\n- **Classiq Technologies**: 量子ソフトウェア（イスラエル）\n- **Quantonation Ventures**: 量子特化型VC（日本発ユニコーン輩出目指す）\n- **慶應義塾大学KQCC**: 量子技術の社会実装\n- **世界経済フォーラム（WEF）**: Quantum Cyber Readiness Toolkit共同開発",
      },
      {
        type: "callout",
        content:
          "デロイトの寺部雅能氏は「インターネット登場時にeコマースやクラウドを予見できなかったように、量子ネイティブなアプリケーションが誕生する」と述べている。現在の産業別ユースケースは序章に過ぎず、量子が普及した時代にはまだ想像できないアプリケーションが生まれる。",
        calloutType: "tip",
      },
    ],
    keyConcepts: [
      {
        term: "量子×AI融合",
        termEn: "Quantum-AI Convergence",
        definition:
          "量子コンピューティングとAIの統合。超高精度乱数生成によるデータ拡張と、量子アルゴリズムによる学習効率化の2つのブレークスルー領域がある。",
      },
      {
        term: "量子回路圧縮",
        termEn: "Quantum Circuit Compression",
        definition:
          "量子回路の冗長なゲート操作を最適化し回路サイズを削減する技術。三菱ケミカル×Classiq×デロイトの実証で最大97%の圧縮を達成。",
      },
      {
        term: "中性原子方式",
        termEn: "Neutral Atom Quantum Computing",
        definition:
          "QuEraが開発する量子コンピュータ方式。レーザーで捕捉した中性原子を量子ビットとして使用。スケーラビリティに優れ、デロイトトーマツと戦略的協業中。",
      },
    ],
  },
  {
    id: "dqi-lesson-5",
    topicId: "deloitte-quantum-insights",
    order: 5,
    title: "Quantum Readinessと企業アクション",
    estimatedMinutes: 40,
    sections: [
      {
        type: "text",
        content:
          "Deloitteは世界経済フォーラム（WEF）と共同で「Quantum Cyber Readiness Toolkit」を開発し、企業が今すぐ取るべきアクションを体系化している。Colin Soutar氏（Deloitte Global Quantum Cyber Readiness Leader）は「量子コンピュータがいつ暗号を破れるようになるかは誰にもわからない。だからこそ今日行動する時だ」と述べている。",
      },
      {
        type: "diagram",
        content:
          "WEF/Deloitte Quantum Readiness — 5つの基本原則:\n\n原則1: 教育\n  → シニアリーダーと運用チームへの量子リスク教育\n  → 量子は「IT部門の問題」ではなく「経営課題」\n\n原則2: ガバナンス\n  → ガバナンス構造への量子リスクマネジメント組み込み\n  → 役員レベルのスポンサーを特定\n\n原則3: テクノロジー\n  → 量子安全技術の選定と実装\n  → NIST PQC標準に基づくアルゴリズム選択\n\n原則4: 協力体制\n  → 組織横断・業界横断の協力\n  → 社会全体で推進（1企業で完結しない）\n\n原則5: 即時行動\n  → 量子安全化は複数年かかる\n  → 待つことのコスト＞今始めるコスト\n\n出典: WEF/Deloitte Quantum Cyber Readiness Toolkit",
      },
      {
        type: "text",
        content:
          "**企業が今すぐ取るべき4つのアクション（Deloitte推奨）:**\n\n**1. リーダーシップ**: 量子の変革的可能性を認識するエグゼクティブスポンサーを特定する。「技術的転換点を待つべきではない」とDeloitteは明言している。\n\n**2. オペレーティングモデル**: 量子ロードマップを策定する。量子アニーリングや量子インスパイアードプロジェクトから探索を開始し、「手触り感」を得る。\n\n**3. 人材**: 量子情報科学の基礎教育を始める。既存のAIサイエンティストに量子力学のクロストレーニングを実施。1〜2名のエンジニア＋1名のビジネス人材で小規模チームを組成。\n\n**4. 小規模PoC**: 概念実証を今すぐ開始する。クラウド経由の量子コンピュータ体験から始め、段階的に10〜50名規模へ拡大。",
      },
      {
        type: "text",
        content:
          "**デロイトの量子実用化ロードマップ（段階的アプローチ）:**\n\n**Phase 1（今〜）**: 小規模チームで市場調査と戦略構築。数名規模でクラウド経由の量子コンピュータ体験。\n\n**Phase 2（〜2030年）**: 10〜50名規模で実証を通じたケイパビリティ蓄積。単発PoCではなく「戦略と実践の往復運動」による仮説検証サイクル。\n\n**Phase 3（2030年代〜）**: 本格的な産業応用。ハードウェアリソースの確保が競争要因に。",
      },
      {
        type: "callout",
        content:
          "JP Morganは「包括的な暗号インベントリからイニシアティブを開始し、クリプトアジャイルプロセスを通じてセキュリティを近代化するPQCソリューションの開発に拡張」している。大手企業の先行事例はPQC移行コンサルティングの説得材料として有効。",
        calloutType: "tip",
      },
      {
        type: "text",
        content:
          "**3つのリスク警告（デロイトトーマツが日本企業に発信）:**\n\n**1. ハードウェアリソース枯渇**: 2030年頃に量子コンピューティングリソースの供給不足が予測される。早期に確保しないと利用機会を逃す。\n\n**2. 人材育成のリードタイム不足**: 3〜5年必要な育成を「様子見」で先送りすると、2030年に追いつけない。デジタル革命でクラウド・AIに後れを取った教訓の再来。\n\n**3. パラダイムシフト対応の遅れ**: 「実用化されてから考える」スタンスは致命的。先を読む企業のみが新たな競争優位を築ける。\n\nDeloitteのメッセージは一貫している: **「10年後の勝者は、今決まる」**。",
      },
      {
        type: "callout",
        content:
          "Quantropi CTOの言葉: 「量子コンピューティングは歴史上最大のコンピューティング能力の飛躍となる。一度離陸したら、クラウドよりも速く広く採用されるだろう」。Deloitteのインサイトを学ぶことは、この変革に備える最良の出発点である。",
        calloutType: "important",
      },
    ],
    keyConcepts: [
      {
        term: "Quantum Readiness",
        termEn: "Quantum Readiness",
        definition:
          "量子コンピューティングの脅威と機会に対する組織の準備状態。Deloitte/WEFのツールキットでは教育・ガバナンス・技術・協力・即時行動の5原則で評価する。",
      },
      {
        term: "クリプトアジリティ",
        termEn: "Crypto Agility",
        definition:
          "暗号機能を迅速かつシームレスに追加・交換する能力。Deloitteは「暗号アルゴリズムの切り替えに必要な筋力を養うこと」と表現。PQC時代の必須能力。",
      },
      {
        term: "戦略と実践の往復運動",
        termEn: "Strategy-Practice Loop",
        definition:
          "デロイトが推奨する量子投資アプローチ。単発PoCではなく、戦略構築→実証→学習→戦略修正のサイクルを回し、段階的にケイパビリティを蓄積する。",
      },
    ],
  },
] as const satisfies readonly Lesson[];
