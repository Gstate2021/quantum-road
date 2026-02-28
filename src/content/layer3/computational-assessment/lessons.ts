import type { Lesson } from "@/types/content";

export const computationalAssessmentLessons: readonly Lesson[] = [
  {
    id: "comp-assess-lesson1",
    topicId: "computational-assessment",
    order: 1,
    title: "ヒアリング手法",
    estimatedMinutes: 45,
    sections: [
      {
        type: "text",
        content:
          "計算構造アセスメントの起点は、顧客のビジネス課題を正確に理解するヒアリングである。顧客は「量子コンピュータで何かできないか」という漠然とした期待で相談に来ることが多い。コンサルタントの仕事は、その期待を計算可能な問題に分解することだ。\n\nヒアリングの目的は3つある。(1) ビジネス課題の本質を把握する、(2) 課題を数理的にモデル化できるかを判断する、(3) 現行の解決方法とその限界を理解する。",
      },
      {
        type: "example",
        content:
          "【構造化ヒアリングシート — 5カテゴリ】\n\n■ ビジネスコンテキスト\n- 課題が発生する業務プロセスは何か？\n- この課題が解決されると、どの程度の経済効果があるか？\n- 意思決定のタイムリミットは？（リアルタイム/日次/週次/月次）\n\n■ 問題の構造\n- 決定すべき変数は何か？ 何個あるか？\n- 満たすべき制約条件は何か？（ハード制約/ソフト制約）\n- 目的関数は何か？（最小化？最大化？複数目的？）\n\n■ データ\n- 利用可能なデータの種類・量・品質は？\n- データの更新頻度は？\n- 機密性の要件は？\n\n■ 現行ソリューション\n- 現在どのように解いているか？（人手/Excel/専用ツール/AIエンジン）\n- 現行手法の限界は何か？（精度/速度/スケール）\n- 改善目標は定量的に定義できるか？\n\n■ 技術環境\n- 既存のIT基盤は？（クラウド/オンプレ/ハイブリッド）\n- 開発・運用チームのスキルレベルは？\n- 予算規模と期間の目安は？",
      },
      {
        type: "text",
        content:
          "ヒアリングで最も重要なスキルは「翻訳力」である。顧客の言葉を計算の言葉に置き換える能力だ。\n\n「配送ルートを効率化したい」→ 巡回セールスマン問題（TSP）または車両配送問題（VRP）\n「シフトを自動で組みたい」→ ナーススケジューリング問題（制約充足）\n「ポートフォリオを最適化したい」→ 二次計画問題（QUBO変換可能）\n「設備故障を予測したい」→ 分類問題（古典MLが最適解の可能性高）\n\nこの翻訳が正確でなければ、後工程のすべてが間違った方向に進む。ヒアリング段階での「問い方」が、プロジェクトの成否を決める。",
      },
      {
        type: "callout",
        content:
          "顧客が「量子コンピュータを使いたい」と言った場合でも、課題によっては古典計算や量子インスパイアード手法が最適解かもしれない。手段ありきではなく、課題の本質から最適なアプローチを提案するのが誠実なコンサルティング。",
        calloutType: "important",
      },
      {
        type: "code",
        content:
          "// Hearing result structure\ninterface HearingResult {\n  clientName: string;\n  businessDomain: string;\n  problemStatement: string;        // plain language\n  computationalFormulation: string; // mathematical formulation\n  variables: {\n    name: string;\n    type: \"binary\" | \"integer\" | \"continuous\";\n    estimatedCount: number;\n  }[];\n  constraints: {\n    description: string;\n    type: \"hard\" | \"soft\";\n    penalty?: number;               // for soft constraints\n  }[];\n  objectiveFunction: string;\n  currentSolution: {\n    method: string;\n    performance: string;\n    limitations: string[];\n  };\n  improvementTarget: string;        // quantitative target\n  decisionTimeframe: string;\n  dataAvailability: \"rich\" | \"moderate\" | \"sparse\";\n}",
        language: "typescript",
      },
    ],
    keyConcepts: [
      {
        term: "構造化ヒアリング",
        termEn: "Structured Hearing",
        definition:
          "ビジネスコンテキスト、問題構造、データ、現行ソリューション、技術環境の5カテゴリで体系的に顧客課題を把握する手法。",
      },
      {
        term: "問題翻訳",
        termEn: "Problem Translation",
        definition:
          "顧客のビジネス課題を数理最適化問題（TSP、VRP、制約充足等）として定式化すること。ヒアリングの最も重要なアウトプット。",
      },
      {
        term: "目的関数",
        termEn: "Objective Function",
        definition:
          "最適化問題で最小化または最大化したい評価指標。コスト最小化、利益最大化、誤差最小化など。複数目的の場合は重み付けが必要。",
      },
      {
        term: "制約条件",
        termEn: "Constraints",
        definition:
          "解が満たすべき条件。ハード制約（絶対に違反不可）とソフト制約（違反にペナルティ）に分類される。制約の数と種類が問題の難易度を大きく左右する。",
      },
    ],
  },
  {
    id: "comp-assess-lesson2",
    topicId: "computational-assessment",
    order: 2,
    title: "数理モデル化プロセス",
    estimatedMinutes: 55,
    sections: [
      {
        type: "text",
        content:
          "ヒアリング結果を受けて、ビジネス課題を数理モデルに変換する。数理モデル化とは、現実世界の問題を変数・制約・目的関数で表現し、計算機で解ける形に定式化するプロセスである。\n\nモデル化の精度がアセスメント全体の品質を決める。モデルが粗すぎれば現実と乖離し、精緻すぎれば計算爆発を起こす。顧客の意思決定に必要十分な粒度を見極めることがプロの仕事である。",
      },
      {
        type: "example",
        content:
          "【ケーススタディ: 物流会社の配送最適化】\n\nビジネス課題: 50台のトラックで300地点に1日以内に配送したい\n\n数理モデル化:\n- 問題タイプ: CVRP（容量制約付き車両配送問題）\n- 変数: x_ij ∈ {0,1} （トラックiが地点jに行くか）→ 50×300 = 15,000個のバイナリ変数\n- 制約:\n  (ハード) 各地点は1回だけ訪問される\n  (ハード) 各トラックの積載量上限\n  (ハード) 各トラックの稼働時間上限\n  (ソフト) 配送時間帯の希望\n- 目的: 総走行距離の最小化 + 時間帯違反ペナルティの最小化\n\n問題規模の評価:\n- 15,000個のバイナリ変数 → 大規模最適化\n- 厳密解は現実的な時間で求解困難\n- メタヒューリスティクスまたは量子インスパイアード手法の候補",
      },
      {
        type: "text",
        content:
          "モデル化のステップは以下の通りである。\n\n**Step 1: 変数定義** — 何を決定するのかを明確にし、変数の型（バイナリ/整数/連続）と数を確定する。変数の数は問題規模の最も重要な指標。\n\n**Step 2: 制約記述** — ハード制約とソフト制約を列挙し、数式で表現する。ソフト制約にはペナルティ重みを設定する。制約の線形性・非線形性を確認する。\n\n**Step 3: 目的関数構築** — 最小化/最大化する指標を定義する。複数目的がある場合は、重み付き和にするかパレート最適化にするかを決定する。\n\n**Step 4: 問題クラス分類** — LP（線形計画）、QP（二次計画）、MILP（混合整数線形計画）、QUBO（二次制約なしバイナリ最適化）のどれに分類されるかを特定する。この分類が次のステップ（古典vs量子の判断）の入力になる。",
      },
      {
        type: "code",
        content:
          "// Problem classification tree\ninterface ProblemClassification {\n  variableType: \"continuous\" | \"integer\" | \"binary\" | \"mixed\";\n  objectiveType: \"linear\" | \"quadratic\" | \"nonlinear\";\n  constraintType: \"linear\" | \"nonlinear\" | \"unconstrained\";\n  problemClass:\n    | \"LP\"    // Linear Programming\n    | \"QP\"    // Quadratic Programming\n    | \"MILP\"  // Mixed-Integer Linear Programming\n    | \"MIQP\"  // Mixed-Integer Quadratic Programming\n    | \"QUBO\"  // Quadratic Unconstrained Binary Optimization\n    | \"NLP\"   // Nonlinear Programming\n    | \"CSP\";  // Constraint Satisfaction Problem\n  variableCount: number;\n  constraintCount: number;\n  estimatedComplexity: \"polynomial\" | \"np-hard\" | \"unknown\";\n}\n\n// Scale assessment\nfunction assessScale(classification: ProblemClassification): string {\n  const { variableCount, problemClass } = classification;\n  if (problemClass === \"LP\" && variableCount < 1_000_000) {\n    return \"Classical solver (Gurobi/CPLEX) handles easily\";\n  }\n  if (problemClass === \"MILP\" && variableCount > 10_000) {\n    return \"Challenging for exact solvers; consider heuristics\";\n  }\n  if (problemClass === \"QUBO\" && variableCount < 5_000) {\n    return \"Quantum-inspired or quantum annealing candidate\";\n  }\n  return \"Requires detailed benchmarking\";\n}",
        language: "typescript",
      },
      {
        type: "callout",
        content:
          "QUBO形式への変換は量子アニーリングや量子インスパイアード手法の入口となる。制約条件をペナルティ項として目的関数に組み込む技法が鍵。ただし、すべての問題がQUBOに自然に変換できるわけではない。無理な変換はかえってソリューション品質を下げる。",
        calloutType: "warning",
      },
    ],
    keyConcepts: [
      {
        term: "数理モデル化",
        termEn: "Mathematical Modeling",
        definition:
          "現実のビジネス課題を変数・制約・目的関数で表現し、計算機で解ける形に定式化するプロセス。モデルの粒度が精度と計算コストのトレードオフを決める。",
      },
      {
        term: "QUBO変換",
        termEn: "QUBO Transformation",
        definition:
          "制約付き最適化問題を二次制約なしバイナリ最適化（Quadratic Unconstrained Binary Optimization）形式に変換する技法。量子アニーリング・量子インスパイアード手法の入力形式。",
      },
      {
        term: "問題クラス分類",
        termEn: "Problem Class Classification",
        definition:
          "変数の型・目的関数の型・制約の型からLP/QP/MILP/QUBO/NLP/CSPに分類すること。最適なソルバーやアプローチの選択に直結する。",
      },
      {
        term: "問題規模評価",
        termEn: "Problem Scale Assessment",
        definition:
          "変数の数、制約の数、変数の型から問題の計算的な規模を評価すること。古典ソルバーの限界と量子手法の適用可能性を判断する基礎データ。",
      },
    ],
  },
  {
    id: "comp-assess-lesson3",
    topicId: "computational-assessment",
    order: 3,
    title: "古典vs量子の判断基準",
    estimatedMinutes: 50,
    sections: [
      {
        type: "text",
        content:
          "数理モデル化が完了したら、そのモデルをどの計算パラダイムで解くのが最適かを判断する。これがアセスメントの核心である。判断を誤ると、古典で十分解ける問題に高額な量子サービスを適用したり、量子的アプローチが有効な問題を古典手法だけで無理に解こうとしたりする。\n\n判断の出発点は「古典ファースト」原則である。まず古典計算（厳密ソルバー、メタヒューリスティクス）で十分かを検証し、不十分な場合に初めて量子インスパイアードや量子コンピューティングを検討する。",
      },
      {
        type: "example",
        content:
          "【判断フロー: 3段階スクリーニング】\n\nStage 1: 古典厳密解は可能か？\n├ LP/QP で変数 < 100万 → Gurobi/CPLEX で解ける → 古典で十分\n├ MILP で変数 < 1万 → 古典ソルバーで現実的な時間で求解可能 → 古典で十分\n└ それ以外 → Stage 2 へ\n\nStage 2: 古典ヒューリスティクスで十分か？\n├ 遺伝的アルゴリズム、焼きなまし法等で\n│ 目標精度（最適解の95%以上等）を達成 → 古典で十分\n└ 達成困難 or 計算時間が要件を超える → Stage 3 へ\n\nStage 3: 量子/量子インスパイアードの適用判断\n├ QUBO変換が自然にできるか？\n│ ├ Yes → 量子インスパイアード（Simulated Bifurcation等）を検討\n│ └ No → QUBO変換のオーバーヘッドが大きい → 古典ヒューリスティクス改良が現実的\n├ 変数 < 5,000 でQUBO → 量子アニーリング（D-Wave）も選択肢\n└ ゲート型量子の量子優位性 → 現時点では基礎研究段階、商用適用は時期尚早",
      },
      {
        type: "text",
        content:
          "判断基準をまとめると以下の5つになる。\n\n**1. 問題規模と変数型**: LP/QPの連続変数問題は古典ソルバーが圧倒的に強い。バイナリ変数の組合せ爆発が起きる問題が量子的アプローチの主戦場。\n\n**2. 要求精度**: 最適解が必須か、近似解で十分か。近似解で十分なら古典ヒューリスティクスのコストパフォーマンスは高い。\n\n**3. 計算時間要件**: リアルタイム（秒単位）が必要か、バッチ処理（時間単位）でよいか。量子インスパイアード手法はミリ秒レベルの高速解を得られるケースがある。\n\n**4. 問題の反復性**: 同じ構造の問題を繰り返し解くか、一度きりか。反復的な問題は量子インスパイアードのチューニング投資を回収しやすい。\n\n**5. 経済合理性**: 量子サービスのAPIコストと、古典計算のインフラコストの比較。現時点では多くのケースで古典のほうがコスト効率が高い。",
      },
      {
        type: "code",
        content:
          "// Decision matrix for approach selection\ninterface ApproachDecision {\n  problemClass: string;\n  variableCount: number;\n  requiredAccuracy: \"optimal\" | \"near-optimal\" | \"good-enough\";\n  timeConstraint: \"realtime\" | \"minutes\" | \"hours\" | \"days\";\n  repetitive: boolean;\n}\n\ntype Approach =\n  | \"classical-exact\"         // Gurobi, CPLEX\n  | \"classical-heuristic\"     // GA, SA, tabu search\n  | \"quantum-inspired\"        // Simulated bifurcation, QAOA-inspired\n  | \"quantum-annealing\"       // D-Wave\n  | \"gate-quantum\"            // Future: fault-tolerant QC\n  | \"hybrid-classical-quantum\"; // Classical preprocessing + quantum core\n\nfunction recommendApproach(input: ApproachDecision): Approach[] {\n  const recommendations: Approach[] = [];\n\n  // Classical exact: LP/QP or small MILP\n  if (\n    (input.problemClass === \"LP\" || input.problemClass === \"QP\") &&\n    input.variableCount < 1_000_000\n  ) {\n    recommendations.push(\"classical-exact\");\n    return recommendations; // no need for quantum\n  }\n\n  if (input.problemClass === \"MILP\" && input.variableCount < 10_000) {\n    recommendations.push(\"classical-exact\");\n  }\n\n  // Classical heuristic: always a baseline\n  recommendations.push(\"classical-heuristic\");\n\n  // Quantum-inspired: QUBO-friendly, medium scale\n  if (\n    input.problemClass === \"QUBO\" &&\n    input.variableCount < 100_000\n  ) {\n    recommendations.push(\"quantum-inspired\");\n  }\n\n  // Quantum annealing: small QUBO\n  if (\n    input.problemClass === \"QUBO\" &&\n    input.variableCount < 5_000\n  ) {\n    recommendations.push(\"quantum-annealing\");\n  }\n\n  return recommendations;\n}",
        language: "typescript",
      },
      {
        type: "callout",
        content:
          "顧客への報告では「量子を使わない」という判断も価値がある。古典計算で十分に解決できることを示し、無駄な投資を防ぐアドバイスは、長期的な信頼関係を構築する。「量子を売りたい」のではなく「最適な計算手法を提案する」姿勢が重要。",
        calloutType: "tip",
      },
      {
        type: "text",
        content:
          "アセスメント報告書のアウトプットは以下を含む。\n\n1. 問題の定式化（数理モデル）\n2. 問題クラス分類結果\n3. 古典ベースラインの性能評価\n4. 量子的アプローチの適用可能性と期待される改善\n5. 推奨アプローチとロードマップ\n6. PoC計画（推奨アプローチの検証方法）\n\nアセスメントの成果物は、次のステップ（量子インスパイアード最適化の適用や、量子リテラシー研修の設計）への直接的なインプットとなる。",
      },
    ],
    keyConcepts: [
      {
        term: "古典ファースト原則",
        termEn: "Classical-First Principle",
        definition:
          "まず古典計算手法で十分かを検証し、不十分な場合にのみ量子的アプローチを検討する判断原則。コスト効率と信頼性の観点から推奨される。",
      },
      {
        term: "3段階スクリーニング",
        termEn: "Three-Stage Screening",
        definition:
          "古典厳密解→古典ヒューリスティクス→量子/量子インスパイアードの順にアプローチの適用可能性を判断するフロー。",
      },
      {
        term: "経済合理性評価",
        termEn: "Economic Feasibility Assessment",
        definition:
          "量子サービスのAPIコスト・開発コストと、古典計算のインフラコスト・人件費を比較し、投資対効果を判断する評価プロセス。",
      },
    ],
  },
] as const satisfies readonly Lesson[];
