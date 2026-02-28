import type { Lesson } from "@/types/content";

export const mathematicalOptimizationLessons = [
  // ─── Lesson 1: Linear Programming ───
  {
    id: "mo-lesson-1",
    topicId: "mathematical-optimization",
    order: 1,
    title: "線形計画法 ― 最適化の基礎を固める",
    estimatedMinutes: 50,
    sections: [
      {
        type: "text",
        content: `## 線形計画法とは

**線形計画法（Linear Programming, LP）** は、線形の目的関数を線形の制約条件のもとで最大化（または最小化）する手法だ。最適化問題の中で最も基本的かつ強力な手法であり、実務で遭遇する問題の多くはLPに定式化できる。

### 標準形

$$
\\text{maximize} \\quad c^T x \\\\
\\text{subject to} \\quad Ax \\leq b, \\quad x \\geq 0
$$

- **決定変数** x: 最適化したい変数のベクトル
- **目的関数** c^T x: 最大化（最小化）したいスカラー値
- **制約条件** Ax ≤ b, x ≥ 0: 実行可能領域を定める不等式

重要な性質: LPの最適解は必ず**実行可能領域の頂点**に存在する。`,
      },
      {
        type: "example",
        content: `### 具体例: 生産計画問題

工場で製品AとBを生産する。各製品の利益と必要リソースは:

| | 製品A | 製品B | 利用可能量 |
|---|---|---|---|
| 材料（kg/個） | 2 | 3 | 120 |
| 労働時間（h/個） | 4 | 2 | 80 |
| 利益（万円/個） | 5 | 4 | - |

**定式化:**
- maximize: 5x_A + 4x_B （利益最大化）
- subject to:
  - 2x_A + 3x_B ≤ 120 （材料制約）
  - 4x_A + 2x_B ≤ 80 （労働時間制約）
  - x_A, x_B ≥ 0 （非負制約）`,
      },
      {
        type: "code",
        content: `"""
Linear Programming with scipy.optimize.linprog
Production planning example.
"""
from scipy.optimize import linprog

# Objective: maximize 5*x_A + 4*x_B
# linprog minimizes, so negate the coefficients
c = [-5, -4]

# Inequality constraints: A_ub @ x <= b_ub
A_ub = [
    [2, 3],   # Material constraint
    [4, 2],   # Labor constraint
]
b_ub = [120, 80]

# Variable bounds: x >= 0
x_bounds = [(0, None), (0, None)]

result = linprog(c, A_ub=A_ub, b_ub=b_ub, bounds=x_bounds, method="highs")

print(f"Status: {result.message}")
print(f"Product A: {result.x[0]:.1f} units")
print(f"Product B: {result.x[1]:.1f} units")
print(f"Maximum profit: {-result.fun:.1f} (万円)")`,
        language: "python",
      },
      {
        type: "text",
        content: `## 双対性とその意味

すべてのLPには**双対問題（Dual Problem）** が存在する。主問題（Primal）が最大化なら双対は最小化であり、強双対性定理により最適値は一致する。

### 双対性の実務的意味

双対変数は**シャドウプライス（影の価格）** と呼ばれ、制約条件を1単位緩和したときに目的関数がどれだけ改善するかを表す。

先の例で言えば:
- 材料の双対変数が 0.5 → 材料を 1kg 増やすと利益が 0.5万円増加
- 労働時間の双対変数が 1.0 → 労働時間を 1時間増やすと利益が 1.0万円増加

この情報はリソース投資の意思決定に直結する。双対変数が大きい制約のリソースを優先的に確保すべきだ。`,
      },
      {
        type: "callout",
        content:
          "LPは多項式時間で解ける（クラスP）。内点法の計算量は O(n^3.5 L) で、数千変数の問題も秒単位で解ける。これが整数計画法やNP困難な最適化問題との決定的な違い。",
        calloutType: "important",
      },
    ],
    keyConcepts: [
      {
        term: "線形計画法",
        termEn: "Linear Programming (LP)",
        definition:
          "線形の目的関数を線形の制約条件下で最適化する手法。多項式時間で解け、最適化の基礎。",
      },
      {
        term: "双対問題",
        termEn: "Dual Problem",
        definition:
          "主問題に対応する別の最適化問題。強双対性定理により主問題と双対問題の最適値は一致する。",
      },
      {
        term: "シャドウプライス",
        termEn: "Shadow Price",
        definition:
          "双対変数の値。制約条件を1単位緩和したときの目的関数の改善量を表す。リソース配分の意思決定に活用する。",
      },
      {
        term: "実行可能領域",
        termEn: "Feasible Region",
        definition:
          "すべての制約条件を満たす解の集合。LPでは凸多面体を形成し、最適解は頂点に存在する。",
      },
    ],
  },

  // ─── Lesson 2: Integer Programming ───
  {
    id: "mo-lesson-2",
    topicId: "mathematical-optimization",
    order: 2,
    title: "整数計画法 ― 離散最適化の世界",
    estimatedMinutes: 55,
    sections: [
      {
        type: "text",
        content: `## 整数計画法が必要な理由

現実の問題では変数が連続値ではなく**離散値**を取ることが多い。トラックの台数は整数、工場を建てる/建てないは0-1、シフトの割当は離散選択だ。

**整数計画法（Integer Programming, IP）** は変数の一部または全部が整数であるという制約を加えた最適化問題:

- **整数計画問題（IP）**: すべての変数が整数
- **混合整数計画問題（MIP）**: 一部が整数、残りが連続
- **0-1整数計画問題**: 変数が0または1のみ

整数制約を加えるだけで問題は**NP困難**になる。LPが多項式時間で解けるのに対し、IPは一般に指数時間が必要だ。`,
      },
      {
        type: "text",
        content: `## 分枝限定法（Branch and Bound）

IPを解く最も一般的な手法が**分枝限定法**だ。

1. **LP緩和**: 整数制約を外してLPとして解く（上界を得る）
2. **分枝**: 整数でない変数 x_i = 3.7 に対し、x_i ≤ 3 と x_i ≥ 4 の2つの部分問題に分割
3. **限定**: LP緩和の最適値が既知の整数解（下界）以下なら、その枝を刈る（探索不要）
4. 再帰的に繰り返す

LP緩和が良い上界を与えるほど刈り込みが効き、高速に解ける。実務では、良い初期解（下界）を見つけることが性能に直結する。`,
      },
      {
        type: "code",
        content: `"""
Integer Programming: Facility Location Problem
Decide which warehouses to open and how to assign customers.
"""
from scipy.optimize import milp, LinearConstraint, Bounds
import numpy as np

# Problem: 3 candidate warehouses, 4 customers
# Fixed cost to open warehouse j: f_j
# Transport cost from warehouse j to customer i: c_ij

fixed_costs = [100, 150, 120]  # Warehouse opening costs
transport = [
    [10, 30, 25],  # Customer 0 to each warehouse
    [25, 10, 15],  # Customer 1
    [30, 20, 10],  # Customer 2
    [15, 25, 20],  # Customer 3
]

n_warehouses = 3
n_customers = 4

# Decision variables:
# y_j (0-1): open warehouse j? (3 vars)
# x_ij (0-1): assign customer i to warehouse j? (12 vars)
n_vars = n_warehouses + n_warehouses * n_customers

# Objective: minimize fixed costs + transport costs
c = np.zeros(n_vars)
for j in range(n_warehouses):
    c[j] = fixed_costs[j]  # y_j coefficients
for i in range(n_customers):
    for j in range(n_warehouses):
        c[n_warehouses + i * n_warehouses + j] = transport[i][j]

# Constraint 1: Each customer assigned to exactly one warehouse
A_eq = np.zeros((n_customers, n_vars))
b_eq = np.ones(n_customers)
for i in range(n_customers):
    for j in range(n_warehouses):
        A_eq[i, n_warehouses + i * n_warehouses + j] = 1

# Constraint 2: Can only assign to open warehouses (x_ij <= y_j)
A_ub = np.zeros((n_customers * n_warehouses, n_vars))
b_ub = np.zeros(n_customers * n_warehouses)
for i in range(n_customers):
    for j in range(n_warehouses):
        row = i * n_warehouses + j
        A_ub[row, n_warehouses + i * n_warehouses + j] = 1   # x_ij
        A_ub[row, j] = -1                                      # -y_j
        # x_ij - y_j <= 0

# Variable bounds and integrality
bounds = Bounds(lb=0, ub=1)
integrality = np.ones(n_vars)  # All variables are integer (0-1)

constraints = [
    LinearConstraint(A_eq, b_eq, b_eq),          # Equality
    LinearConstraint(A_ub, -np.inf, b_ub),        # Inequality
]

result = milp(c, integrality=integrality, bounds=bounds, constraints=constraints)

if result.success:
    y = result.x[:n_warehouses]
    x = result.x[n_warehouses:].reshape(n_customers, n_warehouses)
    print(f"Total cost: {result.fun:.0f}")
    for j in range(n_warehouses):
        if y[j] > 0.5:
            customers = [i for i in range(n_customers) if x[i, j] > 0.5]
            print(f"  Warehouse {j}: OPEN, serves customers {customers}")`,
        language: "python",
      },
      {
        type: "callout",
        content:
          "施設配置問題は物流、通信基地局、データセンター配置など幅広い実務で登場する。顧客が「拠点を最適化したい」と言ったとき、まず MIP として定式化できないか検討すべき。",
        calloutType: "tip",
      },
      {
        type: "text",
        content: `## LP緩和ギャップ

LP緩和の最適値と整数最適値の差を**緩和ギャップ（Integrality Gap）** という。このギャップが小さいほど分枝限定法は効率的に動作する。

定式化の工夫（有効不等式の追加、変数の再定義）によってギャップを小さくできることがある。これが**数理モデリングの腕の見せ所**であり、同じ問題でもモデリング次第で求解時間が桁違いに変わる。`,
      },
    ],
    keyConcepts: [
      {
        term: "整数計画法",
        termEn: "Integer Programming (IP)",
        definition:
          "変数の一部または全部が整数値を取る最適化問題。LPと異なりNP困難だが、分枝限定法などで実用的に解ける場合が多い。",
      },
      {
        term: "分枝限定法",
        termEn: "Branch and Bound",
        definition:
          "LP緩和で上界を求め、整数制約で分枝し、不要な枝を刈り込む手法。IPソルバーの中核アルゴリズム。",
      },
      {
        term: "LP緩和",
        termEn: "LP Relaxation",
        definition:
          "整数制約を外して連続LPとして解くこと。元の問題の最適値の上界（最小化なら下界）を与える。",
      },
      {
        term: "緩和ギャップ",
        termEn: "Integrality Gap",
        definition:
          "LP緩和の最適値と整数最適値の差。ギャップが小さい定式化ほど分枝限定法の効率が良い。",
      },
    ],
  },

  // ─── Lesson 3: Constraint Satisfaction Problems ───
  {
    id: "mo-lesson-3",
    topicId: "mathematical-optimization",
    order: 3,
    title: "制約充足問題 ― 条件を満たす解を見つける",
    estimatedMinutes: 45,
    sections: [
      {
        type: "text",
        content: `## 制約充足問題（CSP）とは

**制約充足問題（Constraint Satisfaction Problem, CSP）** は、目的関数を最適化するのではなく、**すべての制約を同時に満たす解**を見つける問題だ。

CSPは3つの要素で定義される:
- **変数**: X = {x₁, x₂, ..., xₙ}
- **ドメイン**: D = {D₁, D₂, ..., Dₙ}（各変数が取りうる値の集合）
- **制約**: C = {c₁, c₂, ..., cₘ}（変数間の関係）

最適化問題との違いは「一番良い解」ではなく「条件を満たす解」を探す点だ。ただし、CSPに目的関数を追加すれば**制約最適化問題（COP）** になる。`,
      },
      {
        type: "example",
        content: `### 代表例: 数独

数独は典型的なCSPだ。

- **変数**: 81マスそれぞれ（x_{1,1}, x_{1,2}, ..., x_{9,9}）
- **ドメイン**: 各変数は {1, 2, ..., 9}（事前に埋まっているマスはドメインが1つ）
- **制約**:
  - 各行で全数字が異なる（AllDifferent制約 × 9）
  - 各列で全数字が異なる（AllDifferent制約 × 9）
  - 各3×3ブロックで全数字が異なる（AllDifferent制約 × 9）

目的関数はない。すべての制約を満たす割り当てが解だ。`,
      },
      {
        type: "text",
        content: `## バックトラッキングと制約伝搬

CSPを解く基本手法は**バックトラッキング**だ。変数を1つずつ割り当て、制約に違反したら直前の選択を撤回（バックトラック）する。

### 高速化テクニック

1. **制約伝搬（Constraint Propagation）**: ある変数を割り当てたとき、他の変数のドメインから矛盾する値を除去する
2. **アーク整合性（Arc Consistency）**: すべての制約について、各変数の値に対応する相手の値が存在することを保証
3. **変数順序（Variable Ordering）**: ドメインが最も小さい変数を先に割り当てる（MRV: Minimum Remaining Values）
4. **値順序（Value Ordering）**: 他の変数のドメインを最も制限しない値を先に試す（LCV: Least Constraining Value）`,
      },
      {
        type: "code",
        content: `"""
CSP Solver: Sudoku using backtracking with constraint propagation.
"""

def solve_sudoku(board: list[list[int]]) -> bool:
    """
    Solve sudoku in-place using backtracking + constraint propagation.
    0 represents empty cells.
    """
    empty = find_empty_with_mrv(board)
    if empty is None:
        return True  # All cells filled - solved!

    row, col = empty
    candidates = get_candidates(board, row, col)

    for num in candidates:
        board[row][col] = num
        if solve_sudoku(board):
            return True
        board[row][col] = 0  # Backtrack

    return False

def find_empty_with_mrv(board: list[list[int]]) -> tuple[int, int] | None:
    """MRV heuristic: pick the empty cell with fewest candidates."""
    min_candidates = 10
    best_cell: tuple[int, int] | None = None

    for r in range(9):
        for c in range(9):
            if board[r][c] == 0:
                n = len(get_candidates(board, r, c))
                if n < min_candidates:
                    min_candidates = n
                    best_cell = (r, c)

    return best_cell

def get_candidates(board: list[list[int]], row: int, col: int) -> set[int]:
    """Get valid numbers for a cell (constraint propagation)."""
    used: set[int] = set()

    # Row constraint
    used.update(board[row])

    # Column constraint
    used.update(board[r][col] for r in range(9))

    # 3x3 box constraint
    box_row, box_col = 3 * (row // 3), 3 * (col // 3)
    for r in range(box_row, box_row + 3):
        for c in range(box_col, box_col + 3):
            used.add(board[r][c])

    return set(range(1, 10)) - used

# Example puzzle (0 = empty)
puzzle = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9],
]

if solve_sudoku(puzzle):
    for row in puzzle:
        print(" ".join(str(x) for x in row))
else:
    print("No solution exists")`,
        language: "python",
      },
      {
        type: "callout",
        content:
          "CSPはスケジューリング（シフト作成、時間割）、配置問題（座席配置、周波数割当）、設定問題（ネットワーク構成）など実務で頻出する。SAT ソルバーやCP ソルバーを使えば大規模問題も実用的に解ける。",
        calloutType: "tip",
      },
    ],
    keyConcepts: [
      {
        term: "制約充足問題",
        termEn: "Constraint Satisfaction Problem (CSP)",
        definition:
          "変数・ドメイン・制約の3要素で定義され、すべての制約を同時に満たす解を求める問題。数独やスケジューリングが典型例。",
      },
      {
        term: "バックトラッキング",
        termEn: "Backtracking",
        definition:
          "変数を順に割り当て、制約違反時に直前の選択を撤回して別の値を試す探索手法。CSPの基本的な解法。",
      },
      {
        term: "制約伝搬",
        termEn: "Constraint Propagation",
        definition:
          "変数の割り当てにより他の変数のドメインから矛盾する値を除去する技法。探索空間を大幅に削減する。",
      },
    ],
  },

  // ─── Lesson 4: Metaheuristics ───
  {
    id: "mo-lesson-4",
    topicId: "mathematical-optimization",
    order: 4,
    title: "メタヒューリスティクス ― 大規模問題への切り札",
    estimatedMinutes: 55,
    sections: [
      {
        type: "text",
        content: `## メタヒューリスティクスとは

**メタヒューリスティクス**は、特定の問題に依存しない汎用的な最適化フレームワークだ。厳密解の保証はないが、NP困難な大規模問題に対して実用的な品質の解を現実的な時間で見つけられる。

計算設計において、メタヒューリスティクスは以下の場面で使う:
- 問題がNP困難で、近似アルゴリズムの近似比が悪い場合
- 目的関数が複雑で数理計画法の標準形に落とせない場合
- 「十分良い解」を短時間で得たい場合

### 探索と活用のトレードオフ

メタヒューリスティクスの核心は**探索（Exploration）** と**活用（Exploitation）** のバランスだ:
- **探索**: 解空間を広く探る。局所最適解から脱出する
- **活用**: 良い解の近傍を集中的に探索する。解の品質を上げる`,
      },
      {
        type: "text",
        content: `## 焼きなまし法（Simulated Annealing）

焼きなまし法は金属の焼きなまし工程からヒントを得た手法だ。

1. 初期解 s と高温度 T からスタート
2. 現在の解の近傍から新しい解 s' をランダムに生成
3. s' が改善なら受容。改悪でも確率 exp(-ΔE/T) で受容（高温では悪い方向への移動も許す）
4. 温度 T を徐々に下げる
5. T が十分低くなったら終了

高温では探索重視（悪化も受け入れ、局所最適から脱出）、低温では活用重視（良い解の周辺を精密探索）。温度スケジュールの設計が性能を左右する。`,
      },
      {
        type: "code",
        content: `"""
Simulated Annealing for TSP.
A practical example of metaheuristic optimization.
"""
import random
import math

def simulated_annealing_tsp(
    distances: list[list[float]],
    initial_temp: float = 1000.0,
    cooling_rate: float = 0.995,
    min_temp: float = 1.0,
) -> tuple[list[int], float]:
    """
    Solve TSP approximately using Simulated Annealing.
    Returns (best_route, best_distance).
    """
    n = len(distances)

    def route_distance(route: list[int]) -> float:
        return sum(
            distances[route[i]][route[i + 1]]
            for i in range(len(route) - 1)
        ) + distances[route[-1]][route[0]]

    def two_opt_swap(route: list[int]) -> list[int]:
        """Generate a neighbor by reversing a segment."""
        new_route = route[:]
        i = random.randint(0, n - 2)
        j = random.randint(i + 1, n - 1)
        new_route[i:j + 1] = reversed(new_route[i:j + 1])
        return new_route

    # Initialize with a random route
    current = list(range(n))
    random.shuffle(current)
    current_dist = route_distance(current)

    best = current[:]
    best_dist = current_dist

    temp = initial_temp
    iterations = 0

    while temp > min_temp:
        # Generate neighbor
        neighbor = two_opt_swap(current)
        neighbor_dist = route_distance(neighbor)
        delta = neighbor_dist - current_dist

        # Accept or reject
        if delta < 0 or random.random() < math.exp(-delta / temp):
            current = neighbor
            current_dist = neighbor_dist

            if current_dist < best_dist:
                best = current[:]
                best_dist = current_dist

        temp *= cooling_rate
        iterations += 1

    return best, best_dist

# Example: 10 cities with random distances
random.seed(42)
n_cities = 10
coords = [(random.uniform(0, 100), random.uniform(0, 100)) for _ in range(n_cities)]
dist_matrix = [
    [math.dist(coords[i], coords[j]) for j in range(n_cities)]
    for i in range(n_cities)
]

route, distance = simulated_annealing_tsp(dist_matrix)
print(f"Best route: {route}")
print(f"Total distance: {distance:.2f}")
print(f"Route: {' -> '.join(str(r) for r in route)} -> {route[0]}")`,
        language: "python",
      },
      {
        type: "text",
        content: `## 遺伝的アルゴリズム（GA）

**遺伝的アルゴリズム**は自然淘汰と遺伝を模倣した最適化手法だ。

1. **初期集団**: 解の候補（個体）をランダムに生成
2. **適応度評価**: 各個体の目的関数値（適応度）を計算
3. **選択**: 適応度が高い個体を親として選ぶ
4. **交叉（Crossover）**: 2つの親の特徴を組み合わせて子を生成
5. **突然変異（Mutation）**: 低確率で解をランダムに変化
6. 世代交代を繰り返す

GAの強みは**集団ベース**であること。複数の解を同時に探索するため、解空間の異なる領域を並列に探索できる。`,
      },
      {
        type: "code",
        content: `"""
Genetic Algorithm for the Knapsack Problem.
"""
import random

def genetic_knapsack(
    values: list[int],
    weights: list[int],
    capacity: int,
    pop_size: int = 100,
    generations: int = 200,
    mutation_rate: float = 0.05,
) -> tuple[list[int], int]:
    """
    Solve 0-1 Knapsack approximately using a Genetic Algorithm.
    Returns (selected_items, total_value).
    """
    n = len(values)

    def fitness(chromosome: list[int]) -> int:
        total_weight = sum(w * g for w, g in zip(weights, chromosome))
        total_value = sum(v * g for v, g in zip(values, chromosome))
        # Penalize over-capacity solutions
        if total_weight > capacity:
            return 0
        return total_value

    def tournament_select(population: list[list[int]], k: int = 3) -> list[int]:
        candidates = random.sample(population, k)
        return max(candidates, key=fitness)

    def crossover(parent1: list[int], parent2: list[int]) -> list[int]:
        point = random.randint(1, n - 1)
        return parent1[:point] + parent2[point:]

    def mutate(chromosome: list[int]) -> list[int]:
        result = chromosome[:]
        for i in range(n):
            if random.random() < mutation_rate:
                result[i] = 1 - result[i]  # Flip bit
        return result

    # Initialize population
    population = [
        [random.randint(0, 1) for _ in range(n)]
        for _ in range(pop_size)
    ]

    best_individual: list[int] = max(population, key=fitness)
    best_fitness = fitness(best_individual)

    for gen in range(generations):
        new_population: list[list[int]] = []

        # Elitism: keep the best individual
        new_population.append(best_individual[:])

        while len(new_population) < pop_size:
            parent1 = tournament_select(population)
            parent2 = tournament_select(population)
            child = crossover(parent1, parent2)
            child = mutate(child)
            new_population.append(child)

        population = new_population
        gen_best = max(population, key=fitness)
        gen_fitness = fitness(gen_best)

        if gen_fitness > best_fitness:
            best_individual = gen_best[:]
            best_fitness = gen_fitness

    selected = [i for i in range(n) if best_individual[i] == 1]
    return selected, best_fitness

# Example: 15 items
random.seed(42)
n_items = 15
values = [random.randint(10, 100) for _ in range(n_items)]
weights = [random.randint(5, 50) for _ in range(n_items)]
capacity = sum(weights) // 3

selected, total_value = genetic_knapsack(values, weights, capacity)
total_weight = sum(weights[i] for i in selected)
print(f"Capacity: {capacity}")
print(f"Selected items: {selected}")
print(f"Total value: {total_value}")
print(f"Total weight: {total_weight}")`,
        language: "python",
      },
      {
        type: "callout",
        content:
          "メタヒューリスティクスは量子インスパイアド最適化（Layer 3）の直接的な土台になる。量子アニーリングは焼きなまし法の量子版であり、QAOA は変分アルゴリズムの一種だ。ここでの理解がLayer 3の学習速度を大きく左右する。",
        calloutType: "info",
      },
    ],
    keyConcepts: [
      {
        term: "メタヒューリスティクス",
        termEn: "Metaheuristics",
        definition:
          "問題に依存しない汎用的な最適化フレームワーク。厳密解を保証しないが、NP困難な大規模問題に実用的な解を提供する。",
      },
      {
        term: "焼きなまし法",
        termEn: "Simulated Annealing",
        definition:
          "温度パラメータで探索と活用のバランスを制御する手法。高温では悪化も受容して広く探索し、低温では精密探索する。",
      },
      {
        term: "遺伝的アルゴリズム",
        termEn: "Genetic Algorithm",
        definition:
          "自然淘汰を模倣した集団ベースの最適化手法。選択・交叉・突然変異の操作で解の集団を進化させる。",
      },
      {
        term: "探索と活用のトレードオフ",
        termEn: "Exploration-Exploitation Tradeoff",
        definition:
          "解空間を広く探る探索と、良い解の近傍を集中的に調べる活用のバランス。メタヒューリスティクスの設計の核心。",
      },
    ],
  },
] as const satisfies readonly Lesson[];
