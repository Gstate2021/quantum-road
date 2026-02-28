import type { QuizQuestion } from "@/types/quiz";

export const optimizationToolsQuiz = [
  {
    id: "ot-quiz-1",
    topicId: "optimization-tools",
    lessonId: "ot-lesson-1",
    type: "multiple-choice",
    difficulty: "beginner",
    question:
      "OR-Tools の CP-SAT ソルバーが特に得意とする問題はどれか？",
    options: [
      {
        id: "ot-q1-a",
        text: "整数変数の制約充足問題やスケジューリング問題",
        isCorrect: true,
      },
      {
        id: "ot-q1-b",
        text: "連続変数の線形計画問題",
        isCorrect: false,
      },
      {
        id: "ot-q1-c",
        text: "非凸の二次最適化問題",
        isCorrect: false,
      },
      {
        id: "ot-q1-d",
        text: "微分方程式の数値解法",
        isCorrect: false,
      },
    ],
    explanation:
      "CP-SAT（Constraint Programming - SAT）は整数変数に対する制約充足・最適化問題に特化したソルバーです。特にスケジューリング（シフト作成、ジョブショップ）、割当問題に威力を発揮します。連続変数のLPにはGLOPソルバーを使います。",
  },
  {
    id: "ot-quiz-2",
    topicId: "optimization-tools",
    lessonId: "ot-lesson-1",
    type: "multiple-choice",
    difficulty: "intermediate",
    question:
      "OR-Tools の VRP ソルバーが使うメタヒューリスティクスとして含まれるものはどれか？",
    options: [
      {
        id: "ot-q2-a",
        text: "Guided Local Search（ガイド付き局所探索）",
        isCorrect: true,
      },
      {
        id: "ot-q2-b",
        text: "量子アニーリング",
        isCorrect: false,
      },
      {
        id: "ot-q2-c",
        text: "ニュートン法",
        isCorrect: false,
      },
      {
        id: "ot-q2-d",
        text: "勾配降下法",
        isCorrect: false,
      },
    ],
    explanation:
      "OR-Tools のルーティングソルバーは Guided Local Search、Simulated Annealing、Tabu Search などのメタヒューリスティクスを実装しています。VRPはNP困難なので、実用的なサイズの問題にはメタヒューリスティクスが必須です。",
  },
  {
    id: "ot-quiz-3",
    topicId: "optimization-tools",
    lessonId: "ot-lesson-2",
    type: "multiple-choice",
    difficulty: "beginner",
    question:
      "PuLP の特徴として正しいものはどれか？",
    options: [
      {
        id: "ot-q3-a",
        text: "モデリングレイヤーであり、CBC等の外部ソルバーを呼び出して問題を解く",
        isCorrect: true,
      },
      {
        id: "ot-q3-b",
        text: "独自のソルバーで問題を解く完全なソルバーである",
        isCorrect: false,
      },
      {
        id: "ot-q3-c",
        text: "二次計画問題や半正定値計画問題も解ける",
        isCorrect: false,
      },
      {
        id: "ot-q3-d",
        text: "C++ でしか使えない",
        isCorrect: false,
      },
    ],
    explanation:
      "PuLPはPythonのモデリングライブラリであり、LP/MIPの定式化を自然な記法で書けます。解くのはCBC、GLPK、Gurobi等の外部ソルバーです。二次計画はPuLPの対象外で、CVXPYを使います。",
  },
  {
    id: "ot-quiz-4",
    topicId: "optimization-tools",
    lessonId: "ot-lesson-2",
    type: "multiple-choice",
    difficulty: "intermediate",
    question:
      "PuLP で prob.constraints['Resource_Steel'].pi の値が 2.5 だった場合の解釈として正しいものはどれか？",
    options: [
      {
        id: "ot-q4-a",
        text: "鉄鋼の利用可能量を1単位増やすと、目的関数（利益）が2.5改善する",
        isCorrect: true,
      },
      {
        id: "ot-q4-b",
        text: "鉄鋼の使用量が2.5単位である",
        isCorrect: false,
      },
      {
        id: "ot-q4-c",
        text: "鉄鋼の制約が2.5%の確率で違反されている",
        isCorrect: false,
      },
      {
        id: "ot-q4-d",
        text: "鉄鋼の単価が2.5万円である",
        isCorrect: false,
      },
    ],
    explanation:
      ".pi は双対変数（シャドウプライス）の値です。鉄鋼制約のシャドウプライスが2.5ということは、鉄鋼の利用可能量を1kg増やすと利益が2.5万円増えることを意味します。これはリソース投資の優先順位を決める重要な情報です。",
  },
  {
    id: "ot-quiz-5",
    topicId: "optimization-tools",
    lessonId: "ot-lesson-3",
    type: "multiple-choice",
    difficulty: "beginner",
    question:
      "CVXPY が PuLP と比較して優れている点はどれか？",
    options: [
      {
        id: "ot-q5-a",
        text: "二次計画（QP）、二次錐計画（SOCP）、半正定値計画（SDP）などの凸最適化全般を扱える",
        isCorrect: true,
      },
      {
        id: "ot-q5-b",
        text: "非凸最適化問題も解ける",
        isCorrect: false,
      },
      {
        id: "ot-q5-c",
        text: "LP/MIPの定式化がPuLPより簡潔になる",
        isCorrect: false,
      },
      {
        id: "ot-q5-d",
        text: "実行速度がPuLPの10倍速い",
        isCorrect: false,
      },
    ],
    explanation:
      "CVXPYの最大の強みは凸最適化全般をカバーする点です。PuLPはLP/MIP専用ですが、CVXPYはQP（ポートフォリオ最適化等）、SOCP、SDPなど幅広い凸問題を統一的に扱えます。非凸問題はCVXPYでも解けません（DCP規則違反エラー）。",
  },
  {
    id: "ot-quiz-6",
    topicId: "optimization-tools",
    lessonId: "ot-lesson-3",
    type: "multiple-choice",
    difficulty: "intermediate",
    question:
      "CVXPY の DCP（Disciplined Convex Programming）規則の目的として正しいものはどれか？",
    options: [
      {
        id: "ot-q6-a",
        text: "問題が凸であることを定式化時に自動検証し、非凸問題の場合にエラーを返す",
        isCorrect: true,
      },
      {
        id: "ot-q6-b",
        text: "問題を自動的に凸問題に変換する",
        isCorrect: false,
      },
      {
        id: "ot-q6-c",
        text: "ソルバーの実行速度を最適化する",
        isCorrect: false,
      },
      {
        id: "ot-q6-d",
        text: "変数の型を自動推論する",
        isCorrect: false,
      },
    ],
    explanation:
      "DCP規則は凸性の自動検証システムです。目的関数と制約が凸性の条件を満たしているかをコンパイル時にチェックし、違反があればエラーを出します。非凸問題を凸に変換する機能はありません。「解けない問題に時間を浪費する」ミスを防ぐのがDCPの価値です。",
  },
  {
    id: "ot-quiz-7",
    topicId: "optimization-tools",
    lessonId: "ot-lesson-3",
    type: "true-false",
    difficulty: "intermediate",
    question:
      "マーコウィッツのポートフォリオ最適化（平均分散モデル）は目的関数が二次式であるため、PuLPでは解けないが CVXPYでは解ける。",
    options: [
      { id: "ot-q7-a", text: "正しい", isCorrect: true },
      { id: "ot-q7-b", text: "誤り", isCorrect: false },
    ],
    explanation:
      "正しいです。マーコウィッツモデルはポートフォリオの分散（二次形式 w^T Σ w）を最小化する問題で、二次計画問題（QP）です。PuLPは線形計画のみ対応しますが、CVXPYは凸二次計画を直接扱えます。共分散行列Σが半正定値なら凸QPとなりDCP規則を満たします。",
  },
  {
    id: "ot-quiz-8",
    topicId: "optimization-tools",
    type: "multiple-choice",
    difficulty: "advanced",
    question:
      "最適化ツールの選択として最も適切な組み合わせはどれか？\n\n問題A: 10都市の配送ルート最適化（時間枠制約あり）\n問題B: 資産5銘柄のポートフォリオ分散最小化\n問題C: 工場の生産計画（LP定式化可能）",
    options: [
      {
        id: "ot-q8-a",
        text: "A: OR-Tools (VRPソルバー), B: CVXPY (QP), C: PuLP (LP)",
        isCorrect: true,
      },
      {
        id: "ot-q8-b",
        text: "A: PuLP, B: PuLP, C: PuLP",
        isCorrect: false,
      },
      {
        id: "ot-q8-c",
        text: "A: CVXPY, B: OR-Tools, C: CVXPY",
        isCorrect: false,
      },
      {
        id: "ot-q8-d",
        text: "A: OR-Tools, B: PuLP, C: CVXPY",
        isCorrect: false,
      },
    ],
    explanation:
      "問題AはVRP（時間枠付き配車問題）なのでOR-Toolsの専用ソルバーが最適。問題BはQP（二次計画）なのでCVXPY。問題CはLP定式化可能なのでPuLPの可読性が活きます。各ツールの得意分野に合わせた選択が重要です。",
  },
] as const satisfies readonly QuizQuestion[];
