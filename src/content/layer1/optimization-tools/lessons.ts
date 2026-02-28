import type { Lesson } from "@/types/content";

export const optimizationToolsLessons = [
  // ─── Lesson 1: OR-Tools ───
  {
    id: "ot-lesson-1",
    topicId: "optimization-tools",
    order: 1,
    title: "OR-Tools入門 ― Googleの最適化エンジン",
    estimatedMinutes: 55,
    sections: [
      {
        type: "text",
        content: `## OR-Toolsとは

**Google OR-Tools** は、Google が開発・公開しているオープンソースの最適化ツールキットだ。以下のソルバーを統合的に利用できる:

- **線形計画 / 整数計画ソルバー**: GLOP（LP）、SCIP / CP-SAT（MIP）
- **制約プログラミングソルバー**: CP-SAT
- **ルーティングソルバー**: VRP（配車問題）専用エンジン
- **グラフアルゴリズム**: 最短経路、最小費用流

OR-Toolsの強みは**スケーラビリティ**と**実務に特化したAPI**だ。特に配車・スケジューリング・割当問題で威力を発揮する。`,
      },
      {
        type: "callout",
        content:
          "OR-Tools のインストール: pip install ortools。C++、Java、C# のバインディングも提供されている。商用利用も無料。",
        calloutType: "info",
      },
      {
        type: "code",
        content: `"""
OR-Tools: Employee Scheduling (Shift Assignment)
A practical CSP example using CP-SAT solver.
"""
from ortools.sat.python import cp_model

def solve_shift_scheduling() -> None:
    """Assign nurses to shifts satisfying all constraints."""
    # Data
    num_nurses = 5
    num_days = 7
    num_shifts = 3  # Morning, Afternoon, Night

    all_nurses = range(num_nurses)
    all_days = range(num_days)
    all_shifts = range(num_shifts)
    shift_names = ["Morning", "Afternoon", "Night"]

    model = cp_model.CpModel()

    # Decision variables: shifts[n][d][s] = 1 if nurse n works shift s on day d
    shifts = {}
    for n in all_nurses:
        for d in all_days:
            for s in all_shifts:
                shifts[(n, d, s)] = model.new_bool_var(f"shift_n{n}_d{d}_s{s}")

    # Constraint 1: Each shift on each day needs exactly 1 nurse
    for d in all_days:
        for s in all_shifts:
            model.add_exactly_one(shifts[(n, d, s)] for n in all_nurses)

    # Constraint 2: Each nurse works at most 1 shift per day
    for n in all_nurses:
        for d in all_days:
            model.add_at_most_one(shifts[(n, d, s)] for s in all_shifts)

    # Constraint 3: No night shift followed by morning shift
    for n in all_nurses:
        for d in range(num_days - 1):
            model.add_implication(
                shifts[(n, d, 2)],        # Night shift today
                shifts[(n, d + 1, 0)].negated()  # NOT morning shift tomorrow
            )

    # Constraint 4: Each nurse works 4-5 shifts per week
    for n in all_nurses:
        total_shifts = sum(shifts[(n, d, s)] for d in all_days for s in all_shifts)
        model.add(total_shifts >= 4)
        model.add(total_shifts <= 5)

    # Objective: Balance night shifts across nurses
    # Minimize the maximum number of night shifts any nurse has
    max_night = model.new_int_var(0, num_days, "max_night")
    for n in all_nurses:
        night_count = sum(shifts[(n, d, 2)] for d in all_days)
        model.add(max_night >= night_count)
    model.minimize(max_night)

    # Solve
    solver = cp_model.CpSolver()
    solver.parameters.max_time_in_seconds = 10.0
    status = solver.solve(model)

    if status in (cp_model.OPTIMAL, cp_model.FEASIBLE):
        print(f"Status: {'Optimal' if status == cp_model.OPTIMAL else 'Feasible'}")
        print(f"Max night shifts per nurse: {solver.value(max_night)}")
        print()

        header = "Nurse | " + " | ".join(f"Day {d}" for d in all_days)
        print(header)
        print("-" * len(header))

        for n in all_nurses:
            row = f"  {n}   | "
            for d in all_days:
                assigned = "-"
                for s in all_shifts:
                    if solver.value(shifts[(n, d, s)]) == 1:
                        assigned = shift_names[s][0]  # M, A, N
                row += f" {assigned:>5} | "
            print(row)
    else:
        print("No solution found!")

solve_shift_scheduling()`,
        language: "python",
      },
      {
        type: "text",
        content: `## Vehicle Routing Problem（VRP）

OR-Tools の真骨頂は**配車問題（VRP）** ソルバーだ。複数の車両で複数の顧客を訪問する最適ルートを求める。

VRPはTSPの拡張であり、以下の制約を扱える:
- 車両の容量制約（積載量）
- 時間枠制約（顧客の営業時間）
- 移動時間・距離制約
- デポ（拠点）制約

OR-Tools の RoutingModel は、これらの制約を組み合わせて現実の配送最適化を実現する。`,
      },
      {
        type: "code",
        content: `"""
OR-Tools: Capacitated Vehicle Routing Problem (CVRP)
Multiple vehicles deliver goods from a depot to customers.
"""
from ortools.constraint_solver import routing_enums_pb2, pywrapcp

def solve_cvrp() -> None:
    """Solve a simple CVRP with capacity constraints."""
    # Distance matrix (depot is index 0)
    distance_matrix = [
        [0, 548, 776, 696, 582, 274, 502, 194, 308, 194],
        [548, 0, 684, 308, 194, 502, 730, 354, 696, 742],
        [776, 684, 0, 992, 878, 502, 274, 810, 468, 742],
        [696, 308, 992, 0, 114, 650, 878, 502, 844, 890],
        [582, 194, 878, 114, 0, 536, 764, 388, 730, 776],
        [274, 502, 502, 650, 536, 0, 228, 308, 194, 240],
        [502, 730, 274, 878, 764, 228, 0, 536, 194, 468],
        [194, 354, 810, 502, 388, 308, 536, 0, 342, 388],
        [308, 696, 468, 844, 730, 194, 194, 342, 0, 274],
        [194, 742, 742, 890, 776, 240, 468, 388, 274, 0],
    ]

    # Customer demands (depot has 0 demand)
    demands = [0, 1, 1, 2, 4, 2, 4, 8, 8, 1]

    num_vehicles = 3
    vehicle_capacity = 15
    depot = 0

    # Create routing model
    manager = pywrapcp.RoutingIndexManager(
        len(distance_matrix), num_vehicles, depot
    )
    routing = pywrapcp.RoutingModel(manager)

    # Distance callback
    def distance_callback(from_index: int, to_index: int) -> int:
        from_node = manager.IndexToNode(from_index)
        to_node = manager.IndexToNode(to_index)
        return distance_matrix[from_node][to_node]

    transit_callback_index = routing.RegisterTransitCallback(distance_callback)
    routing.SetArcCostEvaluatorOfAllVehicles(transit_callback_index)

    # Capacity constraint
    def demand_callback(from_index: int) -> int:
        from_node = manager.IndexToNode(from_index)
        return demands[from_node]

    demand_callback_index = routing.RegisterUnaryTransitCallback(demand_callback)
    routing.AddDimensionWithVehicleCapacity(
        demand_callback_index,
        0,                               # Slack
        [vehicle_capacity] * num_vehicles,  # Max capacity per vehicle
        True,                             # Start cumul to zero
        "Capacity",
    )

    # Search parameters
    search_params = pywrapcp.DefaultRoutingSearchParameters()
    search_params.first_solution_strategy = (
        routing_enums_pb2.FirstSolutionStrategy.PATH_CHEAPEST_ARC
    )
    search_params.local_search_metaheuristic = (
        routing_enums_pb2.LocalSearchMetaheuristic.GUIDED_LOCAL_SEARCH
    )
    search_params.time_limit.seconds = 5

    # Solve
    solution = routing.SolveWithParameters(search_params)

    if solution:
        total_distance = 0
        for vehicle_id in range(num_vehicles):
            index = routing.Start(vehicle_id)
            route: list[int] = []
            route_distance = 0
            route_load = 0

            while not routing.IsEnd(index):
                node = manager.IndexToNode(index)
                route.append(node)
                route_load += demands[node]
                prev_index = index
                index = solution.Value(routing.NextVar(index))
                route_distance += routing.GetArcCostForVehicle(
                    prev_index, index, vehicle_id
                )

            route.append(manager.IndexToNode(index))  # Return to depot
            total_distance += route_distance
            print(
                f"Vehicle {vehicle_id}: {' -> '.join(map(str, route))}"
                f"  Distance: {route_distance}, Load: {route_load}"
            )
        print(f"Total distance: {total_distance}")
    else:
        print("No solution found!")

solve_cvrp()`,
        language: "python",
      },
      {
        type: "callout",
        content:
          "配送最適化は物流企業にとって直接的なコスト削減になる。OR-Tools を使いこなせれば「配送ルートを最適化して燃料費を15%削減」といった定量的な提案ができるようになる。",
        calloutType: "tip",
      },
    ],
    keyConcepts: [
      {
        term: "OR-Tools",
        termEn: "Google OR-Tools",
        definition:
          "Google開発のオープンソース最適化ツールキット。LP/MIPソルバー、CP-SATソルバー、VRPソルバーを統合。商用利用無料。",
      },
      {
        term: "CP-SAT ソルバー",
        termEn: "CP-SAT Solver",
        definition:
          "OR-Tools の制約プログラミングソルバー。整数変数の制約充足・最適化問題を解く。スケジューリングや割当問題に強い。",
      },
      {
        term: "配車問題",
        termEn: "Vehicle Routing Problem (VRP)",
        definition:
          "複数の車両で複数の顧客を訪問する最適ルートを求めるNP困難問題。容量制約や時間枠制約を含む現実的な変種が多い。",
      },
    ],
  },

  // ─── Lesson 2: PuLP ───
  {
    id: "ot-lesson-2",
    topicId: "optimization-tools",
    order: 2,
    title: "PuLP実践 ― Pythonで数理最適化を定式化する",
    estimatedMinutes: 45,
    sections: [
      {
        type: "text",
        content: `## PuLPとは

**PuLP** は Python の数理最適化モデリングライブラリだ。LP/MIP の定式化を自然な数式的記法で書ける。

PuLP自体はソルバーではなく**モデリングレイヤー**だ。背後で CBC、GLPK、Gurobi、CPLEX などのソルバーを呼び出す。デフォルトでは CBC（オープンソース）が使われる。

### OR-Tools との使い分け

| | PuLP | OR-Tools |
|---|---|---|
| **得意分野** | LP/MIP のモデリング | CSP, VRP, スケジューリング |
| **記法** | 数式に近い自然な記法 | API ベースの制約記述 |
| **ソルバー** | 外部ソルバーを呼び出す | 内蔵ソルバー（GLOP, CP-SAT） |
| **学習コスト** | 低い | やや高い |

一般的なLP/MIPなら PuLP が書きやすい。制約プログラミングや VRP なら OR-Tools を選ぶ。`,
      },
      {
        type: "code",
        content: `"""
PuLP: Production Planning with Multiple Products and Resources
Demonstrates natural mathematical modeling syntax.
"""
import pulp

def production_planning() -> None:
    """Optimize production mix for maximum profit."""
    # Products and resources
    products = ["Widget_A", "Widget_B", "Widget_C", "Widget_D"]
    resources = ["Steel", "Labor", "Machine_Time", "Storage"]

    # Profit per unit (万円)
    profit = {"Widget_A": 12, "Widget_B": 8, "Widget_C": 15, "Widget_D": 10}

    # Resource consumption per unit
    consumption = {
        ("Steel", "Widget_A"): 3, ("Steel", "Widget_B"): 2,
        ("Steel", "Widget_C"): 4, ("Steel", "Widget_D"): 1,
        ("Labor", "Widget_A"): 5, ("Labor", "Widget_B"): 3,
        ("Labor", "Widget_C"): 6, ("Labor", "Widget_D"): 4,
        ("Machine_Time", "Widget_A"): 2, ("Machine_Time", "Widget_B"): 4,
        ("Machine_Time", "Widget_C"): 3, ("Machine_Time", "Widget_D"): 2,
        ("Storage", "Widget_A"): 1, ("Storage", "Widget_B"): 1,
        ("Storage", "Widget_C"): 2, ("Storage", "Widget_D"): 1,
    }

    # Available resources
    available = {
        "Steel": 200, "Labor": 300,
        "Machine_Time": 250, "Storage": 120,
    }

    # Create the problem
    prob = pulp.LpProblem("Production_Planning", pulp.LpMaximize)

    # Decision variables: how many of each product to produce
    x = {
        p: pulp.LpVariable(f"produce_{p}", lowBound=0, cat="Integer")
        for p in products
    }

    # Objective: maximize total profit
    prob += pulp.lpSum(profit[p] * x[p] for p in products), "Total_Profit"

    # Constraints: resource limits
    for r in resources:
        prob += (
            pulp.lpSum(consumption[(r, p)] * x[p] for p in products) <= available[r],
            f"Resource_{r}",
        )

    # Additional constraint: minimum production of Widget_A (contract obligation)
    prob += x["Widget_A"] >= 10, "Min_Widget_A"

    # Solve
    prob.solve(pulp.PULP_CBC_CMD(msg=False))

    print(f"Status: {pulp.LpStatus[prob.status]}")
    print(f"Maximum Profit: {pulp.value(prob.objective):.0f} (万円)")
    print()
    for p in products:
        print(f"  {p}: {x[p].varValue:.0f} units")

    # Shadow prices (dual values)
    print("\nShadow Prices:")
    for name, constraint in prob.constraints.items():
        if constraint.pi is not None:
            print(f"  {name}: {constraint.pi:.2f}")

production_planning()`,
        language: "python",
      },
      {
        type: "text",
        content: `## 実践: ポートフォリオ最適化

PuLPは金融のポートフォリオ最適化にも使える。ただし、本来のポートフォリオ最適化（マーコウィッツモデル）は二次計画問題であり、線形の PuLP では近似的な定式化になる。厳密な二次計画にはCVXPY（次のレッスン）を使う。

以下は線形近似版だ。`,
      },
      {
        type: "code",
        content: `"""
PuLP: Simplified Portfolio Optimization (Linear Approximation)
Maximize expected return subject to risk and diversification constraints.
"""
import pulp

def portfolio_optimization() -> None:
    """Simple portfolio allocation using LP."""
    assets = ["Stocks_JP", "Stocks_US", "Bonds_JP", "Bonds_US", "REIT", "Gold"]

    # Expected annual return (%)
    expected_return = {
        "Stocks_JP": 7.0, "Stocks_US": 9.0,
        "Bonds_JP": 1.5, "Bonds_US": 3.0,
        "REIT": 5.0, "Gold": 4.0,
    }

    # Risk score (simplified: higher = riskier)
    risk_score = {
        "Stocks_JP": 8, "Stocks_US": 9,
        "Bonds_JP": 2, "Bonds_US": 3,
        "REIT": 6, "Gold": 5,
    }

    prob = pulp.LpProblem("Portfolio", pulp.LpMaximize)

    # Allocation percentage (0-100%)
    w = {
        a: pulp.LpVariable(f"weight_{a}", lowBound=0, upBound=0.4)
        for a in assets
    }

    # Objective: maximize expected return
    prob += pulp.lpSum(expected_return[a] * w[a] for a in assets)

    # Constraint: weights sum to 1
    prob += pulp.lpSum(w[a] for a in assets) == 1, "Total_100pct"

    # Constraint: average risk score <= 5 (moderate risk)
    prob += (
        pulp.lpSum(risk_score[a] * w[a] for a in assets) <= 5,
        "Risk_Limit",
    )

    # Constraint: at least 20% in bonds (safety)
    prob += w["Bonds_JP"] + w["Bonds_US"] >= 0.2, "Min_Bonds"

    prob.solve(pulp.PULP_CBC_CMD(msg=False))

    print(f"Status: {pulp.LpStatus[prob.status]}")
    print(f"Expected Return: {pulp.value(prob.objective):.2f}%")
    print("\nAllocation:")
    for a in assets:
        pct = w[a].varValue
        if pct is not None and pct > 0.001:
            print(f"  {a}: {pct * 100:.1f}%")

portfolio_optimization()`,
        language: "python",
      },
      {
        type: "callout",
        content:
          "PuLPの強みは可読性だ。prob += lpSum(...) <= 100 のように、数式をほぼそのままコードに書ける。クライアントへのモデル説明資料にもコードがそのまま使えるレベルの読みやすさ。",
        calloutType: "tip",
      },
    ],
    keyConcepts: [
      {
        term: "PuLP",
        termEn: "PuLP (Python Linear Programming)",
        definition:
          "PythonのLP/MIPモデリングライブラリ。数式に近い自然な記法で最適化問題を定式化できる。CBCをデフォルトソルバーとして使用。",
      },
      {
        term: "モデリングレイヤー",
        termEn: "Modeling Layer",
        definition:
          "最適化問題の定式化を抽象的に記述し、背後のソルバーに渡す中間層。PuLP、Pyomo、JuMP等がある。ソルバーの切り替えが容易。",
      },
      {
        term: "CBC",
        termEn: "COIN-OR Branch and Cut",
        definition:
          "オープンソースのMIPソルバー。PuLPのデフォルトソルバー。商用ソルバー（Gurobi, CPLEX）には劣るが、中規模問題なら十分実用的。",
      },
    ],
  },

  // ─── Lesson 3: CVXPY ───
  {
    id: "ot-lesson-3",
    topicId: "optimization-tools",
    order: 3,
    title: "CVXPY実践 ― 凸最適化のフロントエンド",
    estimatedMinutes: 50,
    sections: [
      {
        type: "text",
        content: `## CVXPYとは

**CVXPY** は凸最適化問題のモデリングフレームワークだ。LP、二次計画（QP）、半正定値計画（SDP）、二次錐計画（SOCP）など、**凸最適化**全般を統一的に扱える。

### PuLPとの違い

| | PuLP | CVXPY |
|---|---|---|
| **対象** | LP/MIP（線形のみ） | 凸最適化全般（二次、錐、SDP含む） |
| **変数** | 連続/整数 | 連続が基本（整数も一部対応） |
| **強み** | LP/MIPに特化、可読性 | 凸最適化の幅広さ、DCP規則による検証 |

CVXPYは**DCP（Disciplined Convex Programming）** 規則に基づき、問題が凸であることを自動検証する。凸でない問題を渡すとエラーになるため、定式化の誤りを早期に検出できる。`,
      },
      {
        type: "code",
        content: `"""
CVXPY: Markowitz Portfolio Optimization (Quadratic Programming)
The classic mean-variance portfolio optimization.
"""
import cvxpy as cp
import numpy as np

def markowitz_portfolio() -> None:
    """
    Minimize portfolio variance subject to target return.
    This is a Quadratic Program (QP) - not possible with PuLP.
    """
    np.random.seed(42)

    # 5 assets: expected returns and covariance matrix
    n_assets = 5
    asset_names = ["JP_Equity", "US_Equity", "JP_Bond", "US_Bond", "Gold"]

    # Expected annual returns
    mu = np.array([0.07, 0.09, 0.015, 0.03, 0.04])

    # Covariance matrix (annual)
    # Constructed to be realistic: stocks correlated, bonds low correlation
    sigma = np.array([
        [0.04, 0.02, 0.001, 0.002, 0.005],
        [0.02, 0.05, 0.002, 0.003, 0.008],
        [0.001, 0.002, 0.002, 0.001, 0.000],
        [0.002, 0.003, 0.001, 0.003, 0.001],
        [0.005, 0.008, 0.000, 0.001, 0.015],
    ])

    # Decision variable: portfolio weights
    w = cp.Variable(n_assets)

    # Target return
    target_return = 0.05  # 5% annual

    # Objective: minimize portfolio variance (w^T * Sigma * w)
    portfolio_variance = cp.quad_form(w, sigma)
    objective = cp.Minimize(portfolio_variance)

    # Constraints
    constraints = [
        cp.sum(w) == 1,            # Weights sum to 1
        w >= 0,                     # No short selling
        mu @ w >= target_return,    # Meet target return
        w <= 0.4,                   # Max 40% per asset
    ]

    # Solve
    prob = cp.Problem(objective, constraints)
    prob.solve()

    print(f"Status: {prob.status}")
    print(f"Portfolio Variance: {prob.value:.6f}")
    print(f"Portfolio Std Dev: {np.sqrt(prob.value):.4f} ({np.sqrt(prob.value)*100:.2f}%)")
    print(f"Expected Return: {(mu @ w.value):.4f} ({(mu @ w.value)*100:.2f}%)")
    print(f"Sharpe-like Ratio: {(mu @ w.value) / np.sqrt(prob.value):.4f}")
    print()
    print("Allocation:")
    for i, name in enumerate(asset_names):
        if w.value[i] > 0.001:
            print(f"  {name}: {w.value[i]*100:.1f}%")

markowitz_portfolio()`,
        language: "python",
      },
      {
        type: "text",
        content: `## DCP規則と凸性の自動検証

CVXPYの最大の特徴は**DCP（Disciplined Convex Programming）規則**だ。問題の定式化時に、目的関数と制約が凸性の条件を満たしているかを自動的にチェックする。

### DCP規則の基本

- **凸関数の最小化**または**凹関数の最大化**が許される
- 制約は **凸 ≤ 凹** の形式
- 合成規則: 凸関数の非減少変換は凸、凹関数の非増加変換は凸

この規則に違反するとコンパイル時エラーになる。「解けない問題を解こうとして時間を浪費する」事態を防げる。`,
      },
      {
        type: "code",
        content: `"""
CVXPY: Signal Denoising (Regularized Optimization)
Shows how CVXPY handles non-trivial convex problems elegantly.
"""
import cvxpy as cp
import numpy as np

def signal_denoising() -> None:
    """
    Denoise a 1D signal using Total Variation regularization.
    minimize ||x - y||_2^2 + lambda * ||Dx||_1
    where D is the difference operator.
    """
    np.random.seed(42)

    # Generate a piecewise constant signal with noise
    n = 200
    true_signal = np.zeros(n)
    true_signal[40:80] = 1.0
    true_signal[80:120] = 0.5
    true_signal[140:180] = -0.8

    noise = np.random.normal(0, 0.2, n)
    noisy_signal = true_signal + noise

    # Decision variable: recovered signal
    x = cp.Variable(n)

    # Total Variation regularization parameter
    lam = 2.0

    # Difference matrix (first-order differences)
    # D[i] = x[i+1] - x[i]
    diff = x[1:] - x[:-1]

    # Objective: data fidelity + TV regularization
    objective = cp.Minimize(
        cp.sum_squares(x - noisy_signal) + lam * cp.norm1(diff)
    )

    prob = cp.Problem(objective)
    prob.solve()

    print(f"Status: {prob.status}")
    print(f"Objective value: {prob.value:.4f}")

    # Calculate recovery error
    recovery_error = np.linalg.norm(x.value - true_signal)
    noise_level = np.linalg.norm(noise)
    print(f"Noise level (L2): {noise_level:.4f}")
    print(f"Recovery error (L2): {recovery_error:.4f}")
    print(f"Improvement: {(1 - recovery_error/noise_level)*100:.1f}%")

signal_denoising()`,
        language: "python",
      },
      {
        type: "callout",
        content:
          "CVXPYは機械学習・統計・信号処理・金融工学と幅広い分野で使われている。凸最適化の知識と組み合わせれば、「データから最適な判断を下す」システムの核心部分を構築できる。",
        calloutType: "info",
      },
      {
        type: "text",
        content: `## 最適化ツールの選択指針

実務では問題の構造に応じてツールを使い分ける:

| 問題の種類 | 推奨ツール | 理由 |
|-----------|-----------|------|
| LP/MIP（定式化重視） | PuLP | 可読性が高く、プロトタイプに最適 |
| VRP・スケジューリング | OR-Tools | 専用ソルバーがある |
| 凸最適化（QP, SOCP, SDP） | CVXPY | 凸最適化全般を統一的に扱える |
| 大規模MIP（商用品質） | Gurobi / CPLEX + PuLP or Pyomo | 性能が桁違い |
| 非凸最適化 | メタヒューリスティクス or 専用ソルバー | 汎用ツールでは対応困難 |

「まずPuLPでプロトタイプ → 性能が足りなければ OR-Tools or 商用ソルバーに切り替え」が実用的なワークフローだ。`,
      },
    ],
    keyConcepts: [
      {
        term: "CVXPY",
        termEn: "CVXPY",
        definition:
          "凸最適化のPythonモデリングフレームワーク。LP/QP/SOCP/SDPなど凸最適化全般を統一的に扱い、DCP規則で凸性を自動検証する。",
      },
      {
        term: "DCP規則",
        termEn: "Disciplined Convex Programming",
        definition:
          "CVXPYが採用する凸性検証の規則体系。問題定式化時に目的関数と制約の凸性を自動チェックし、非凸問題はエラーにする。",
      },
      {
        term: "二次計画問題",
        termEn: "Quadratic Programming (QP)",
        definition:
          "目的関数が二次式、制約が線形の最適化問題。ポートフォリオ最適化（マーコウィッツモデル）が代表例。凸QPは多項式時間で解ける。",
      },
      {
        term: "Total Variation正則化",
        termEn: "Total Variation Regularization",
        definition:
          "信号のノイズ除去に使われる正則化手法。信号の差分のL1ノルムを最小化することで、区分的に定数な信号を復元する。",
      },
    ],
  },
] as const satisfies readonly Lesson[];
