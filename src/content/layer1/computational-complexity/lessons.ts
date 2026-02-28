import type { Lesson } from "@/types/content";

export const computationalComplexityLessons = [
  // ─── Lesson 1: P/NP Problem ───
  {
    id: "cc-lesson-1",
    topicId: "computational-complexity",
    order: 1,
    title: "P/NP問題 ― 計算の限界を知る",
    estimatedMinutes: 45,
    sections: [
      {
        type: "text",
        content: `## なぜ計算量理論を学ぶのか

「計算設計会社」を目指すうえで、最初に身につけるべきは**問題の難しさを見極める目**だ。顧客の課題を受け取ったとき、それが「効率よく解ける問題」なのか「本質的に難しい問題」なのかを即座に判断できなければ、適切なソリューションは提案できない。

計算量理論は、計算問題を**難しさのクラス**で分類する学問だ。この分類を理解すれば、問題に対して「古典アルゴリズムで十分か」「近似で妥協すべきか」「量子コンピュータに期待すべきか」という判断が可能になる。`,
      },
      {
        type: "callout",
        content:
          "計算量理論は抽象的に見えるが、実務での意思決定に直結する。「この問題は多項式時間で解けるか？」という問いは、プロジェクトの見積もりとアーキテクチャ選定の根幹になる。",
        calloutType: "important",
      },
      {
        type: "text",
        content: `## クラスPとは

**クラスP（Polynomial time）** は、入力サイズ n に対して多項式時間 O(n^k) で**解ける**問題の集合だ。

具体例:
- **ソート**: O(n log n) ― マージソート、ヒープソート
- **最短経路**: O(V² ) ― ダイクストラ法（優先度キュー使用で O(E + V log V)）
- **線形計画法**: 多項式時間 ― 楕円体法、内点法

これらの問題は入力が大きくなっても「現実的な時間」で解ける。計算設計の観点では、**問題をクラスPに帰着できれば勝ち**だ。`,
      },
      {
        type: "text",
        content: `## クラスNPとは

**クラスNP（Nondeterministic Polynomial time）** は、「答えが与えられたときに多項式時間で**検証できる**」問題の集合だ。「解くのは難しいかもしれないが、解の正しさはすぐ確認できる」問題群とも言える。

重要な点: **P ⊆ NP** である。Pの問題はすべてNPに含まれる（解けるなら当然検証もできる）。

未解決なのは **P = NP か P ≠ NP か** という問題だ。もし P = NP なら、検証できる問題はすべて効率的に解けることになる。これはミレニアム懸賞問題の一つであり、100万ドルの賞金がかけられている。`,
      },
      {
        type: "example",
        content: `### 巡回セールスマン問題（TSP）で理解する P と NP の違い

**問題**: n 個の都市を全て一度ずつ訪問し、出発点に戻る最短ルートを求めよ。

- **解を求める**: 全探索なら O(n!) 通り。n=20 で約 2.4×10^18 通り。スパコンでも何年もかかる。
- **解を検証する**: あるルートが「総距離 X 以下か？」の確認は O(n) でできる。都市を順に辿って距離を足すだけ。

TSPの判定版（距離 X 以下のルートが存在するか？）はNPに属する。解くのは指数時間だが、検証は多項式時間だ。`,
      },
      {
        type: "code",
        content: `import itertools
import math

def tsp_brute_force(cities: list[tuple[float, float]]) -> tuple[float, list[int]]:
    """Brute force TSP solver - O(n!) time complexity."""
    n = len(cities)

    def distance(i: int, j: int) -> float:
        x1, y1 = cities[i]
        x2, y2 = cities[j]
        return math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2)

    best_dist = float("inf")
    best_route: list[int] = []

    # Fix city 0 as start, permute the rest
    for perm in itertools.permutations(range(1, n)):
        route = [0] + list(perm) + [0]
        total = sum(distance(route[i], route[i + 1]) for i in range(n))
        if total < best_dist:
            best_dist = total
            best_route = route

    return best_dist, best_route

def verify_tsp_solution(
    cities: list[tuple[float, float]],
    route: list[int],
    max_distance: float,
) -> bool:
    """Verify a TSP solution in O(n) time."""
    n = len(cities)

    # Check that all cities are visited exactly once
    visited = set(route[:-1])  # Exclude return to start
    if len(visited) != n or visited != set(range(n)):
        return False

    # Check route starts and ends at the same city
    if route[0] != route[-1]:
        return False

    # Calculate total distance
    total = 0.0
    for i in range(len(route) - 1):
        x1, y1 = cities[route[i]]
        x2, y2 = cities[route[i + 1]]
        total += math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2)

    return total <= max_distance

# Example: 5 cities - brute force is feasible
cities = [(0, 0), (1, 5), (5, 2), (6, 6), (3, 3)]
dist, route = tsp_brute_force(cities)
print(f"Best route: {route}, distance: {dist:.2f}")
print(f"Verification: {verify_tsp_solution(cities, route, dist)}")`,
        language: "python",
      },
      {
        type: "callout",
        content:
          "n=5 なら一瞬で解けるが、n=20 で現実的な時間では解けなくなる。これがP と NP の差が実務に与えるインパクトだ。顧客の問題が n=1000 の TSP 相当だったとき、全探索を提案してはならない。",
        calloutType: "warning",
      },
    ],
    keyConcepts: [
      {
        term: "クラスP",
        termEn: "Class P",
        definition:
          "多項式時間で解ける決定問題の集合。入力サイズ n に対して O(n^k) のアルゴリズムが存在する問題。",
      },
      {
        term: "クラスNP",
        termEn: "Class NP",
        definition:
          "多項式時間で解の正しさを検証できる決定問題の集合。解くのが難しくても、答えのチェックは速い。",
      },
      {
        term: "P ≠ NP 予想",
        termEn: "P vs NP Conjecture",
        definition:
          "P と NP が等しくないという未証明の予想。多くの計算機科学者は P ≠ NP だと信じている。ミレニアム懸賞問題の一つ。",
      },
      {
        term: "決定問題",
        termEn: "Decision Problem",
        definition:
          "答えが Yes/No で返せる問題。最適化問題は「値 X 以下の解が存在するか？」という決定問題に変換して計算量を議論する。",
      },
    ],
  },

  // ─── Lesson 2: NP-Completeness ───
  {
    id: "cc-lesson-2",
    topicId: "computational-complexity",
    order: 2,
    title: "NP完全 ― 最も難しい問題群を識別する",
    estimatedMinutes: 50,
    sections: [
      {
        type: "text",
        content: `## NP完全問題の定義

**NP完全（NP-Complete）** は、NPの中で「最も難しい」問題のクラスだ。正確には次の2条件を満たす問題:

1. **NPに属する**: 解の検証が多項式時間でできる
2. **NP困難（NP-Hard）**: NPのすべての問題が多項式時間でこの問題に帰着（reduction）できる

つまりNP完全問題が1つでも多項式時間で解ければ、NPの全問題が多項式時間で解けることになり、P = NP が証明される。逆に言えば、NP完全と判明した問題には効率的な厳密解法が存在しないと考えてよい（P ≠ NP を仮定する限り）。`,
      },
      {
        type: "text",
        content: `## Cook-Levin の定理とSAT問題

1971年、Stephen Cook（とLeonid Levin）は**充足可能性問題（SAT）** がNP完全であることを証明した。これが最初のNP完全問題だ。

**SAT問題**: ブール変数の論理式が与えられたとき、すべての節を同時に真にする変数の割り当てが存在するか？

\`\`\`
例: (x₁ ∨ ¬x₂) ∧ (¬x₁ ∨ x₃) ∧ (x₂ ∨ ¬x₃)
解: x₁=True, x₂=True, x₃=True → すべての節が True
\`\`\`

Cook-Levin の定理以降、**帰着（reduction）** という手法で次々とNP完全問題が発見された。ある問題AがNP完全だと分かっていて、AをBに多項式時間で変換できれば、BもNP困難である。`,
      },
      {
        type: "callout",
        content:
          "帰着（Reduction）は計算量理論の最重要ツールだ。新しい問題に遭遇したとき、既知のNP完全問題から帰着できれば「この問題は効率的に解けない」と証明できる。これは実務で無駄な開発を防ぐ強力な武器になる。",
        calloutType: "tip",
      },
      {
        type: "text",
        content: `## 代表的なNP完全問題

以下は計算設計で頻出するNP完全問題だ。顧客の問題がこれらに帰着できるかどうかを判断できることが重要:

| 問題 | 説明 | 実務での出現 |
|------|------|-------------|
| **SAT** | 論理式の充足可能性 | 回路設計、検証 |
| **3-SAT** | 各節がちょうど3リテラルのSAT | SAT の標準形 |
| **頂点被覆** | 最小頂点数で全辺をカバー | ネットワーク監視 |
| **巡回セールスマン問題** | 最短巡回路 | 物流、配送最適化 |
| **グラフ彩色** | 最小色数で隣接頂点を異色に | スケジューリング |
| **ナップサック問題** | 容量制約下で価値最大化 | リソース配分 |
| **集合被覆** | 最小の部分集合で全要素カバー | テストケース選定 |
| **ハミルトン閉路** | 全頂点を1度ずつ通る閉路 | ルート探索 |`,
      },
      {
        type: "code",
        content: `"""
Example: Reducing Vertex Cover to an Integer Program
Shows how NP-complete problems appear in practice.
"""

def is_vertex_cover(
    edges: list[tuple[int, int]],
    cover: set[int],
) -> bool:
    """Verify a vertex cover in O(E) time."""
    return all(u in cover or v in cover for u, v in edges)

def vertex_cover_brute_force(
    n: int,
    edges: list[tuple[int, int]],
) -> set[int]:
    """Find minimum vertex cover by brute force - O(2^n * E)."""
    best_cover: set[int] | None = None

    # Try all subsets of vertices
    for mask in range(1 << n):
        cover = {i for i in range(n) if mask & (1 << i)}
        if is_vertex_cover(edges, cover):
            if best_cover is None or len(cover) < len(best_cover):
                best_cover = cover

    return best_cover or set()

# Example: small graph
edges = [(0, 1), (0, 2), (1, 3), (2, 3), (3, 4)]
n = 5
cover = vertex_cover_brute_force(n, edges)
print(f"Minimum vertex cover: {cover}")
print(f"Size: {len(cover)}")
print(f"Valid: {is_vertex_cover(edges, cover)}")

# n=5 is trivial, but n=50 has 2^50 ≈ 10^15 subsets
# This is why we need approximation algorithms`,
        language: "python",
      },
      {
        type: "example",
        content: `### 実務での NP完全判定の流れ

顧客から「倉庫の棚割を最適化したい」という依頼が来たとする。

1. **問題の形式化**: 商品 n 個を棚 m 段に配置。ピッキング頻度・商品サイズ・重量制約・同時注文パターンを考慮して、ピッキング時間を最小化。

2. **NP完全への帰着**: 制約を分析すると、これは多次元ビンパッキング問題の変種であり、ビンパッキングはNP困難。

3. **結論**: 厳密解を保証するアルゴリズムは大規模インスタンスでは非現実的。**近似アルゴリズム**または**メタヒューリスティクス**を適用すべき。

この判断ができるまでのスピードが、計算設計のプロとしての価値だ。`,
      },
    ],
    keyConcepts: [
      {
        term: "NP完全",
        termEn: "NP-Complete",
        definition:
          "NPに属し、かつNPの全問題が多項式時間で帰着可能な問題。NP内で最も難しい問題のクラス。",
      },
      {
        term: "帰着",
        termEn: "Reduction",
        definition:
          "ある問題Aを問題Bに多項式時間で変換する手法。AがBに帰着できれば、BはA以上に難しい。",
      },
      {
        term: "NP困難",
        termEn: "NP-Hard",
        definition:
          "NPの全問題が帰着可能な問題。NPに属する必要はない（解の検証が多項式時間でなくてもよい）。NP完全はNP困難かつNPに属する問題。",
      },
      {
        term: "充足可能性問題",
        termEn: "SAT (Boolean Satisfiability)",
        definition:
          "ブール論理式を真にする変数割り当てが存在するかを判定する問題。最初にNP完全と証明された問題。",
      },
      {
        term: "Cook-Levin の定理",
        termEn: "Cook-Levin Theorem",
        definition:
          "SATがNP完全であることを証明した定理（1971年）。NP完全理論の出発点であり、後の多くのNP完全性証明の基礎。",
      },
    ],
  },

  // ─── Lesson 3: Approximation Algorithms ───
  {
    id: "cc-lesson-3",
    topicId: "computational-complexity",
    order: 3,
    title: "近似アルゴリズム ― NP困難に立ち向かう",
    estimatedMinutes: 50,
    sections: [
      {
        type: "text",
        content: `## NP困難問題への実用的アプローチ

NP完全問題は厳密解を多項式時間で求められない（P ≠ NP を仮定）。では実務でどうするか？ 答えの一つが**近似アルゴリズム**だ。

近似アルゴリズムは、最適解からのズレを数学的に保証しつつ、多項式時間で動作する。重要なのは**近似比（approximation ratio）** だ。

- **最小化問題**: アルゴリズムの解 C と最適解 C* に対して、C / C* ≤ α（α ≥ 1）
- **最大化問題**: C / C* ≥ α（α ≤ 1）

α が1に近いほど、最適解に近い解が得られる。`,
      },
      {
        type: "example",
        content: `### 頂点被覆の2-近似アルゴリズム

頂点被覆問題は NP完全だが、**最適解の2倍以内**の解を多項式時間で得るアルゴリズムが存在する。

**アルゴリズム**:
1. 辺を1本選ぶ (u, v)
2. u と v の両方を被覆に追加
3. u または v に接続する辺をすべて削除
4. 辺がなくなるまで繰り返す

**なぜ2-近似か？**: 選んだ辺の集合をマッチングと呼ぶ。各辺で2頂点を追加するので、マッチングのサイズの2倍が答え。一方、最適解は各辺から最低1頂点を含む必要があるので、マッチングサイズ以上。よって近似比は2。`,
      },
      {
        type: "code",
        content: `def vertex_cover_2approx(
    n: int,
    edges: list[tuple[int, int]],
) -> set[int]:
    """
    2-approximation algorithm for Minimum Vertex Cover.
    Guaranteed to return a cover at most 2x the optimal size.
    Time complexity: O(V + E)
    """
    cover: set[int] = set()
    remaining_edges = list(edges)
    removed_vertices: set[int] = set()

    for u, v in remaining_edges:
        if u not in removed_vertices and v not in removed_vertices:
            # Add both endpoints
            cover.add(u)
            cover.add(v)
            removed_vertices.add(u)
            removed_vertices.add(v)

    return cover

# Example
edges = [(0, 1), (0, 2), (1, 3), (2, 3), (3, 4), (4, 5)]
cover = vertex_cover_2approx(6, edges)
print(f"2-approx cover: {cover}, size: {len(cover)}")
# Optimal might be {0, 3, 4} (size 3), 2-approx gives at most 6`,
        language: "python",
      },
      {
        type: "text",
        content: `## 貪欲法による近似

**貪欲法（Greedy Algorithm）** は、各ステップで局所的に最良の選択を行う手法だ。NP困難問題に対して良い近似を与えることがある。

### 集合被覆問題の貪欲法

全体集合 U と部分集合の族 S₁, S₂, ..., Sₙ が与えられたとき、U を被覆する最小の部分集合族を求める問題。NP困難だが、貪欲法で **O(ln n)** 近似が得られる。

**アルゴリズム**: 毎回、未被覆要素を最も多くカバーする部分集合を選ぶ。`,
      },
      {
        type: "code",
        content: `def greedy_set_cover(
    universe: set[int],
    subsets: list[set[int]],
) -> list[int]:
    """
    Greedy O(ln n)-approximation for Set Cover.
    Returns indices of selected subsets.
    """
    uncovered = set(universe)
    selected: list[int] = []
    available = list(range(len(subsets)))

    while uncovered:
        # Pick the subset that covers the most uncovered elements
        best_idx = max(
            available,
            key=lambda i: len(subsets[i] & uncovered),
        )
        selected.append(best_idx)
        uncovered -= subsets[best_idx]
        available.remove(best_idx)

    return selected

# Example: monitoring all network segments
universe = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
subsets = [
    {1, 2, 3, 4},      # Sensor A
    {3, 4, 5, 6},      # Sensor B
    {5, 6, 7},          # Sensor C
    {7, 8, 9, 10},      # Sensor D
    {1, 5, 9},           # Sensor E
    {2, 6, 10},          # Sensor F
]

selected = greedy_set_cover(universe, subsets)
print(f"Selected subsets: {selected}")
print(f"Cover: {set().union(*(subsets[i] for i in selected))}")`,
        language: "python",
      },
      {
        type: "callout",
        content:
          "近似アルゴリズムの価値は「どの程度最適から離れるか」を数学的に保証できること。顧客に「最適解の2倍以内です」と説明できるのと「だいたい良い解です」では、説得力が全く違う。",
        calloutType: "tip",
      },
      {
        type: "text",
        content: `## 近似困難性

すべてのNP困難問題が良い近似比を持つわけではない。**PCP定理**により、一部の問題は特定の近似比より良い近似が P ≠ NP のもとで不可能と証明されている。

| 問題 | 最良の近似比 | 近似困難性 |
|------|------------|-----------|
| 頂点被覆 | 2 | 2 - ε は NP困難 |
| 集合被覆 | O(ln n) | (1-ε)ln n は NP困難 |
| TSP（三角不等式） | 3/2 (Christofides) | 220/219 以下は NP困難 |
| 一般TSP | 近似不可能 | 任意の定数近似が NP困難 |
| MAX-3SAT | 7/8 | 7/8 + ε は NP困難 |

これを知っておくと「この問題でこれ以上の精度を求めても意味がない」という判断ができる。`,
      },
    ],
    keyConcepts: [
      {
        term: "近似アルゴリズム",
        termEn: "Approximation Algorithm",
        definition:
          "NP困難問題に対し、最適解との乖離を数学的に保証しつつ多項式時間で解を求めるアルゴリズム。",
      },
      {
        term: "近似比",
        termEn: "Approximation Ratio",
        definition:
          "近似アルゴリズムの解と最適解の比率。最小化問題では α = C/C* (α ≥ 1)、αが小さいほど良い。",
      },
      {
        term: "貪欲法",
        termEn: "Greedy Algorithm",
        definition:
          "各ステップで局所的に最良の選択を行う手法。厳密解を保証しないが、多くのNP困難問題で良い近似比を実現する。",
      },
    ],
  },

  // ─── Lesson 4: Randomized Algorithms ───
  {
    id: "cc-lesson-4",
    topicId: "computational-complexity",
    order: 4,
    title: "確率的アルゴリズム ― ランダム性を武器にする",
    estimatedMinutes: 45,
    sections: [
      {
        type: "text",
        content: `## 確率的アルゴリズムの分類

確率的アルゴリズムは、**乱数を利用して計算を行う**アルゴリズムだ。ランダム性を導入することで、決定的アルゴリズムより高速に、あるいは単純に問題を解決できることがある。

2つの主要なクラスがある:

### ラスベガスアルゴリズム (Las Vegas)
- **常に正しい答え**を返す
- 実行時間がランダム（期待値は多項式時間）
- 例: ランダムクイックソート（期待値 O(n log n)）

### モンテカルロアルゴリズム (Monte Carlo)
- 実行時間は**確定的**（決まっている）
- 答えが**確率的に正しい**（誤答の確率がある）
- 例: Miller-Rabin 素数判定`,
      },
      {
        type: "code",
        content: `import random

def randomized_quicksort(arr: list[int]) -> list[int]:
    """
    Las Vegas algorithm: always correct, expected O(n log n).
    Worst case O(n^2) but extremely unlikely with random pivot.
    """
    if len(arr) <= 1:
        return arr

    pivot = random.choice(arr)
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]

    return randomized_quicksort(left) + middle + randomized_quicksort(right)

# Las Vegas: result is always correct
data = [3, 6, 8, 10, 1, 2, 1]
print(f"Sorted: {randomized_quicksort(data)}")`,
        language: "python",
      },
      {
        type: "text",
        content: `## モンテカルロ法の実用

モンテカルロ法は、ランダムサンプリングで問題の近似解を得る手法だ。最適化、シミュレーション、積分計算など幅広い分野で使われる。

ポイントは**サンプル数を増やせば精度が上がる**こと。中心極限定理により、精度は √n に比例して向上する（n はサンプル数）。`,
      },
      {
        type: "code",
        content: `import random
import math

def monte_carlo_pi(n_samples: int) -> float:
    """
    Monte Carlo estimation of pi.
    Throw random darts at a unit square, count how many land in the inscribed circle.
    """
    inside_circle = 0
    for _ in range(n_samples):
        x = random.uniform(0, 1)
        y = random.uniform(0, 1)
        if x * x + y * y <= 1:
            inside_circle += 1
    return 4 * inside_circle / n_samples

# Accuracy improves with sqrt(n)
for n in [100, 1_000, 10_000, 100_000, 1_000_000]:
    estimate = monte_carlo_pi(n)
    error = abs(estimate - math.pi)
    print(f"n={n:>10,}: pi ≈ {estimate:.6f}, error = {error:.6f}")`,
        language: "python",
      },
      {
        type: "text",
        content: `## クラス BPP と量子計算への接続

確率的アルゴリズムの計算量クラスとして **BPP (Bounded-Error Probabilistic Polynomial time)** がある。多項式時間で動作し、誤答確率が 1/3 以下のモンテカルロアルゴリズムで解ける問題のクラスだ。

量子コンピュータの計算量クラス **BQP (Bounded-Error Quantum Polynomial time)** は BPP の量子版と言える。BPP ⊆ BQP と考えられており、量子コンピュータは確率的古典コンピュータよりも広い問題クラスを効率的に解ける可能性がある。

\`\`\`
P ⊆ BPP ⊆ BQP ⊆ PSPACE
\`\`\`

このクラス関係を理解しておくと、Layer 2 で量子アルゴリズムを学ぶときに「何が本質的に新しいのか」が明確になる。`,
      },
      {
        type: "callout",
        content:
          "確率的アルゴリズムは量子コンピュータの前段階として重要だ。量子計算も本質的に確率的であり、測定結果は確率分布に従う。BPP と BQP の関係を押さえておくと、量子の理解がスムーズになる。",
        calloutType: "info",
      },
      {
        type: "code",
        content: `def miller_rabin(n: int, k: int = 10) -> bool:
    """
    Monte Carlo primality test.
    Returns True if n is probably prime, False if definitely composite.
    Error probability < (1/4)^k.
    """
    if n < 2:
        return False
    if n == 2 or n == 3:
        return True
    if n % 2 == 0:
        return False

    # Write n-1 as 2^r * d
    r, d = 0, n - 1
    while d % 2 == 0:
        r += 1
        d //= 2

    # Witness loop
    for _ in range(k):
        a = random.randrange(2, n - 1)
        x = pow(a, d, n)

        if x == 1 or x == n - 1:
            continue

        for _ in range(r - 1):
            x = pow(x, 2, n)
            if x == n - 1:
                break
        else:
            return False  # Composite

    return True  # Probably prime

# Test
primes = [p for p in range(2, 100) if miller_rabin(p)]
print(f"Primes up to 100: {primes}")
# Error probability for k=10: < (1/4)^10 ≈ 10^-6`,
        language: "python",
      },
    ],
    keyConcepts: [
      {
        term: "ラスベガスアルゴリズム",
        termEn: "Las Vegas Algorithm",
        definition:
          "常に正しい答えを返すが、実行時間がランダムな確率的アルゴリズム。期待実行時間で評価する。",
      },
      {
        term: "モンテカルロアルゴリズム",
        termEn: "Monte Carlo Algorithm",
        definition:
          "実行時間は確定的だが、答えが確率的に正しい（一定の確率で誤答する）アルゴリズム。",
      },
      {
        term: "BPP",
        termEn: "Bounded-Error Probabilistic Polynomial Time",
        definition:
          "多項式時間のモンテカルロアルゴリズムで解ける問題のクラス。量子版のBQPとの関係で重要。",
      },
      {
        term: "BQP",
        termEn: "Bounded-Error Quantum Polynomial Time",
        definition:
          "量子コンピュータで多項式時間に解ける問題のクラス。BPP ⊆ BQP と考えられている。",
      },
    ],
  },
] as const satisfies readonly Lesson[];
