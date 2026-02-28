import type { Lesson } from "@/types/content";

export const classicalAiHybridLessons = [
  // ─── Lesson 1: AI-Driven Problem Definition ───
  {
    id: "ah-lesson-1",
    topicId: "classical-ai-hybrid",
    order: 1,
    title: "AIによる問題定義 ― データから最適化問題を導く",
    estimatedMinutes: 50,
    sections: [
      {
        type: "text",
        content: `## なぜ「AIで問題定義」なのか

従来の最適化コンサルティングでは、人間の専門家が顧客の業務を分析し、数理モデルを定義していた。これには時間がかかり、属人性も高い。

**AI×最適化のハイブリッド**では、機械学習を使って:
1. **データから目的関数を学習**する（何を最適化すべきか？）
2. **制約条件を自動検出**する（過去データの暗黙の制約を発見）
3. **パラメータを推定**する（需要予測、コスト予測）

これにより「問題定義のスピード」と「定義の精度」を同時に上げられる。計算設計会社としての差別化ポイントはここにある。`,
      },
      {
        type: "callout",
        content:
          "AI単独では「最適な判断」を保証できない。数理最適化単独では「データからの学習」ができない。両者を組み合わせることで、データに基づく意思決定と最適性の保証を同時に実現する。",
        calloutType: "important",
      },
      {
        type: "text",
        content: `## パターン1: 予測×最適化（Predict-then-Optimize）

最も基本的なハイブリッドパターン。2段階で動作する:

**ステージ1（予測）**: 機械学習で不確実なパラメータを予測
- 需要予測、価格予測、リードタイム予測、リスクスコア etc.

**ステージ2（最適化）**: 予測値を入力として最適化問題を解く
- 在庫最適化、ルート最適化、スケジューリング etc.

この2段階アプローチの弱点は、予測誤差が最適化結果に伝搬すること。対策として**ロバスト最適化**（最悪ケース対応）や**確率的最適化**（分布を考慮）を使う。`,
      },
      {
        type: "code",
        content: `"""
Predict-then-Optimize: Demand Prediction + Inventory Optimization
Stage 1: ML predicts demand
Stage 2: LP optimizes inventory
"""
import numpy as np
from sklearn.ensemble import GradientBoostingRegressor
from scipy.optimize import linprog

def predict_then_optimize() -> None:
    """Hybrid AI+optimization for inventory management."""
    np.random.seed(42)

    # ─── Stage 1: Demand Prediction ───
    # Historical data: features (season, promo, price) -> demand
    n_history = 200
    n_products = 3
    product_names = ["Widget_A", "Widget_B", "Widget_C"]

    # Synthetic training data
    X_train = np.random.rand(n_history, 3)  # [season, promo_flag, price_factor]
    y_train = np.column_stack([
        50 + 30 * X_train[:, 0] - 10 * X_train[:, 2] + np.random.normal(0, 5, n_history),
        30 + 20 * X_train[:, 1] + 15 * X_train[:, 0] + np.random.normal(0, 4, n_history),
        40 - 5 * X_train[:, 2] + 10 * X_train[:, 1] + np.random.normal(0, 3, n_history),
    ])

    # Train separate models for each product
    models = []
    for i in range(n_products):
        model = GradientBoostingRegressor(n_estimators=50, random_state=42)
        model.fit(X_train, y_train[:, i])
        models.append(model)

    # Predict demand for next period
    X_next = np.array([[0.8, 1.0, 0.6]])  # High season, promo active, moderate price
    predicted_demand = np.array([m.predict(X_next)[0] for m in models])
    print("Stage 1 - Predicted Demand:")
    for name, d in zip(product_names, predicted_demand):
        print(f"  {name}: {d:.1f} units")

    # ─── Stage 2: Inventory Optimization ───
    # Minimize: holding cost + stockout penalty
    # Variables: order_quantity for each product

    holding_cost = np.array([2.0, 1.5, 3.0])   # Cost per excess unit
    stockout_cost = np.array([10.0, 8.0, 15.0])  # Cost per shortage unit
    order_cost = np.array([5.0, 4.0, 6.0])       # Cost per unit ordered

    # Add safety margin (robust approach: order for predicted + margin)
    safety_factor = 1.15  # 15% safety margin
    target_stock = predicted_demand * safety_factor

    # Simple LP: minimize total expected cost
    # Use newsvendor-style critical ratio
    for i, name in enumerate(product_names):
        critical_ratio = stockout_cost[i] / (stockout_cost[i] + holding_cost[i])
        # Optimal order = predicted_demand adjusted by critical ratio
        # For simplicity, use safety factor approach
        optimal_order = target_stock[i]
        expected_holding = holding_cost[i] * max(0, optimal_order - predicted_demand[i])
        total_cost = order_cost[i] * optimal_order + expected_holding

        print(f"\n  {name}:")
        print(f"    Predicted demand: {predicted_demand[i]:.1f}")
        print(f"    Optimal order: {optimal_order:.1f}")
        print(f"    Critical ratio: {critical_ratio:.2f}")
        print(f"    Expected cost: {total_cost:.1f}")

predict_then_optimize()`,
        language: "python",
      },
      {
        type: "text",
        content: `## パターン2: Smart Predict-then-Optimize（SPO）

従来の「予測→最適化」の弱点は、予測モデルの損失関数と最適化の目的関数が一致しないことだ。予測精度が高くても、最適化結果が良くなるとは限らない。

**SPO（Smart Predict-then-Optimize）** は、最適化結果を予測モデルの学習にフィードバックする。具体的には:

1. 予測モデルの出力を最適化問題に入力
2. 最適化の結果から「予測がどう最適化結果に影響したか」を計算
3. その勾配を使って予測モデルを更新

これにより「予測精度」ではなく「意思決定の質」を直接最適化する。`,
      },
      {
        type: "callout",
        content:
          "SPOは学術的にはDecision-Focused LearningやEnd-to-End Learningとも呼ばれる。2017年のElmachtoubとGrigas の論文が起点。実装にはPyEPOやPyTorch+CVXPYLayers等のライブラリが使える。",
        calloutType: "info",
      },
    ],
    keyConcepts: [
      {
        term: "Predict-then-Optimize",
        termEn: "Predict-then-Optimize",
        definition:
          "AIで不確実パラメータを予測し、その予測値を入力として最適化を解く2段階アプローチ。ハイブリッド設計の基本パターン。",
      },
      {
        term: "ロバスト最適化",
        termEn: "Robust Optimization",
        definition:
          "パラメータの不確実性を考慮し、最悪ケースでも実行可能な解を求める手法。予測誤差に対する耐性を持つ。",
      },
      {
        term: "Smart Predict-then-Optimize",
        termEn: "SPO / Decision-Focused Learning",
        definition:
          "最適化結果を予測モデルの学習にフィードバックし、予測精度ではなく意思決定の質を直接最適化する手法。",
      },
    ],
  },

  // ─── Lesson 2: Mathematical Modeling Pipeline ───
  {
    id: "ah-lesson-2",
    topicId: "classical-ai-hybrid",
    order: 2,
    title: "数理モデル化パイプライン ― 自動化と標準化",
    estimatedMinutes: 50,
    sections: [
      {
        type: "text",
        content: `## 数理モデル化の4ステップ

顧客の問題を数理モデルに変換するプロセスを標準化する。計算設計会社としてスケーラブルにサービスを提供するための基盤だ。

### ステップ1: 問題の構造化

顧客の自然言語の要件から、以下を抽出する:
- **決定変数**: 何を決めるのか？（配送ルート、生産量、人員配置）
- **目的関数**: 何を最適化するのか？（コスト最小化、利益最大化、時間最短化）
- **制約条件**: どんな制限があるか？（予算、容量、法規制、人的制約）
- **パラメータ**: 何が既知で、何が不確実か？

### ステップ2: モデルの選択

問題の構造から適切なモデルクラスを選ぶ:
- 連続 + 線形 → LP
- 離散あり → MIP
- 二次目的 → QP
- 制約中心 → CSP
- 大規模 + 非構造 → メタヒューリスティクス`,
      },
      {
        type: "text",
        content: `### ステップ3: 実装と検証

モデルをコードに落とし込み、検証する:
- **小規模テスト**: 手計算で確認できるサイズで正しさを検証
- **感度分析**: パラメータの変動に対するロバスト性を確認
- **ベンチマーク**: 既知の問題・既存手法との比較

### ステップ4: 運用と改善

本番環境でモデルを運用し、継続的に改善する:
- **パフォーマンス監視**: 実際の結果とモデルの予測を比較
- **パラメータ更新**: 新データでパラメータを再推定
- **モデル拡張**: 新しい制約や目的の追加`,
      },
      {
        type: "code",
        content: `"""
Reusable optimization pipeline framework.
Demonstrates how to standardize the modeling process.
"""
from abc import ABC, abstractmethod
from dataclasses import dataclass
from typing import Any

@dataclass(frozen=True)
class OptimizationResult:
    """Standardized result from any optimization model."""
    status: str
    objective_value: float
    solution: dict[str, Any]
    solve_time_seconds: float
    gap: float | None = None  # MIP optimality gap

class OptimizationModel(ABC):
    """Base class for optimization models in the pipeline."""

    @abstractmethod
    def define_variables(self) -> None:
        """Step 1: Define decision variables."""
        ...

    @abstractmethod
    def define_objective(self) -> None:
        """Step 2: Define the objective function."""
        ...

    @abstractmethod
    def define_constraints(self) -> None:
        """Step 3: Define constraints."""
        ...

    @abstractmethod
    def solve(self) -> OptimizationResult:
        """Step 4: Solve and return standardized result."""
        ...

    def validate_input(self, data: dict[str, Any]) -> list[str]:
        """Optional: validate input data before solving."""
        return []  # No errors by default

    def sensitivity_analysis(self, result: OptimizationResult) -> dict[str, Any]:
        """Optional: analyze solution sensitivity to parameter changes."""
        return {}

class ModelPipeline:
    """
    Orchestrates the optimization pipeline:
    Data Ingestion -> Validation -> Modeling -> Solving -> Post-processing
    """

    def __init__(self, model: OptimizationModel) -> None:
        self.model = model
        self.results: list[OptimizationResult] = []

    def run(self, data: dict[str, Any]) -> OptimizationResult:
        """Execute the full pipeline."""
        # 1. Validate input
        errors = self.model.validate_input(data)
        if errors:
            raise ValueError(f"Input validation failed: {errors}")

        # 2. Build model
        self.model.define_variables()
        self.model.define_objective()
        self.model.define_constraints()

        # 3. Solve
        result = self.model.solve()
        self.results.append(result)

        # 4. Post-process
        if result.status == "Optimal":
            sensitivity = self.model.sensitivity_analysis(result)
            print(f"Solution found: objective = {result.objective_value:.2f}")
            if sensitivity:
                print(f"Sensitivity: {sensitivity}")
        else:
            print(f"Solver status: {result.status}")

        return result

# ─── Example: Concrete implementation ───
import pulp
import time

class ProductionModel(OptimizationModel):
    """Concrete production planning model."""

    def __init__(self, products: list[str], resources: dict[str, float],
                 profit: dict[str, float], usage: dict[tuple[str, str], float]) -> None:
        self.products = products
        self.resources = resources
        self.profit = profit
        self.usage = usage
        self.prob: pulp.LpProblem | None = None
        self.x: dict[str, pulp.LpVariable] = {}

    def define_variables(self) -> None:
        self.prob = pulp.LpProblem("Production", pulp.LpMaximize)
        self.x = {
            p: pulp.LpVariable(f"x_{p}", lowBound=0, cat="Integer")
            for p in self.products
        }

    def define_objective(self) -> None:
        assert self.prob is not None
        self.prob += pulp.lpSum(self.profit[p] * self.x[p] for p in self.products)

    def define_constraints(self) -> None:
        assert self.prob is not None
        for r, capacity in self.resources.items():
            self.prob += (
                pulp.lpSum(self.usage[(r, p)] * self.x[p] for p in self.products)
                <= capacity,
                f"Resource_{r}",
            )

    def solve(self) -> OptimizationResult:
        assert self.prob is not None
        start = time.time()
        self.prob.solve(pulp.PULP_CBC_CMD(msg=False))
        elapsed = time.time() - start

        solution = {p: self.x[p].varValue for p in self.products}
        return OptimizationResult(
            status=pulp.LpStatus[self.prob.status],
            objective_value=pulp.value(self.prob.objective) or 0.0,
            solution=solution,
            solve_time_seconds=elapsed,
        )

# Usage
model = ProductionModel(
    products=["A", "B"],
    resources={"material": 120, "labor": 80},
    profit={"A": 5, "B": 4},
    usage={("material", "A"): 2, ("material", "B"): 3,
           ("labor", "A"): 4, ("labor", "B"): 2},
)
pipeline = ModelPipeline(model)
result = pipeline.run({})
print(f"Production: {result.solution}")`,
        language: "python",
      },
      {
        type: "callout",
        content:
          "パイプラインの標準化は、計算設計会社としてスケールするために不可欠だ。毎回ゼロからモデルを作るのではなく、検証済みのフレームワーク上で顧客固有の部分だけを実装する。これにより品質とスピードを両立できる。",
        calloutType: "tip",
      },
      {
        type: "text",
        content: `## MLによるモデル選択の自動化

問題の特徴量（変数の数、制約の種類、問題のサイズ等）から、最適なソルバーやアルゴリズムを自動選択するメタ学習（Algorithm Selection）も活発に研究されている。

SATコミュニティでは **SATzilla** や **AutoFolio** が有名で、問題の特徴量からソルバーのポートフォリオから最適なソルバーを選択する。同様のアプローチはMIPや組合せ最適化全般に応用可能だ。`,
      },
    ],
    keyConcepts: [
      {
        term: "数理モデル化パイプライン",
        termEn: "Mathematical Modeling Pipeline",
        definition:
          "問題の構造化→モデル選択→実装と検証→運用と改善の4ステップを標準化したフレームワーク。スケーラブルなサービス提供の基盤。",
      },
      {
        term: "感度分析",
        termEn: "Sensitivity Analysis",
        definition:
          "パラメータの変動が最適解や目的関数値に与える影響を分析する手法。ロバストな意思決定に不可欠。",
      },
      {
        term: "アルゴリズム選択",
        termEn: "Algorithm Selection",
        definition:
          "問題の特徴量からメタ学習で最適なソルバー・アルゴリズムを自動選択する手法。SATzilla、AutoFolioが先駆的。",
      },
    ],
  },

  // ─── Lesson 3: Feedback Learning Loop ───
  {
    id: "ah-lesson-3",
    topicId: "classical-ai-hybrid",
    order: 3,
    title: "フィードバック学習ループ ― 最適化とAIの継続的改善",
    estimatedMinutes: 50,
    sections: [
      {
        type: "text",
        content: `## フィードバックループの必要性

現実の最適化問題は静的ではない。需要は変動し、コストは変化し、制約は追加・削除される。一度モデルを作って終わりでは、時間とともに解の質が劣化する。

**フィードバック学習ループ**は、最適化の結果を観測し、モデルを継続的に改善する仕組みだ:

1. **予測** → 2. **最適化** → 3. **実行** → 4. **観測** → 5. **学習** → 1に戻る

このループを回し続けることで:
- 予測精度が向上する（実績データでモデル更新）
- モデルの制約が洗練される（見落とし制約の発見）
- パラメータが最新化される（環境変化への追従）`,
      },
      {
        type: "text",
        content: `## バンディットアルゴリズムによる探索と活用

最適化の実行結果から学習する最もシンプルな方法が**多腕バンディット（Multi-Armed Bandit）** だ。

### 問題設定
- 複数の選択肢（腕）があり、各選択肢の報酬分布は未知
- 探索（未知の選択肢を試す）と活用（既知の最良の選択肢を使う）のバランスを取る

### 応用例
- **動的価格設定**: どの価格帯が最も利益を生むか？
- **A/Bテスト**: どのバリエーションが最良か？
- **メタヒューリスティクスのパラメータ調整**: 冷却率や突然変異率のオンライン調整`,
      },
      {
        type: "code",
        content: `"""
Thompson Sampling for dynamic parameter tuning.
Uses Bayesian updates to balance exploration and exploitation.
"""
import numpy as np
from dataclasses import dataclass, field

@dataclass
class ThompsonSamplingBandit:
    """
    Thompson Sampling with Beta-Bernoulli model.
    Maintains a posterior distribution for each arm's success rate.
    """
    n_arms: int
    alpha: list[float] = field(default_factory=list)  # Success counts + 1
    beta_param: list[float] = field(default_factory=list)  # Failure counts + 1

    def __post_init__(self) -> None:
        if not self.alpha:
            self.alpha = [1.0] * self.n_arms  # Uniform prior
        if not self.beta_param:
            self.beta_param = [1.0] * self.n_arms

    def select_arm(self) -> int:
        """Sample from each arm's posterior, pick the highest."""
        samples = [
            np.random.beta(self.alpha[i], self.beta_param[i])
            for i in range(self.n_arms)
        ]
        return int(np.argmax(samples))

    def update(self, arm: int, reward: float) -> None:
        """Update posterior with observed reward (0 or 1)."""
        if reward > 0:
            self.alpha[arm] += 1
        else:
            self.beta_param[arm] += 1

    def get_estimates(self) -> list[float]:
        """Get current estimated success rates."""
        return [
            self.alpha[i] / (self.alpha[i] + self.beta_param[i])
            for i in range(self.n_arms)
        ]

def simulate_dynamic_pricing() -> None:
    """
    Simulate dynamic pricing using Thompson Sampling.
    Each price point has an unknown conversion rate.
    """
    np.random.seed(42)

    # True conversion rates (unknown to the algorithm)
    prices = [980, 1480, 1980, 2480, 2980]
    true_conversion = [0.35, 0.28, 0.20, 0.12, 0.06]
    # Revenue per sale = price * conversion_rate
    # Optimal: 1480 * 0.28 = 414.4

    bandit = ThompsonSamplingBandit(n_arms=len(prices))
    total_revenue = 0.0
    arm_counts = [0] * len(prices)

    n_rounds = 1000

    for t in range(n_rounds):
        # Select price
        arm = bandit.select_arm()
        arm_counts[arm] += 1

        # Simulate customer response
        converted = np.random.random() < true_conversion[arm]
        revenue = prices[arm] if converted else 0
        total_revenue += revenue

        # Update model (use binary reward for Thompson Sampling)
        bandit.update(arm, 1.0 if converted else 0.0)

    print("Dynamic Pricing Results (1000 rounds):")
    print(f"Total revenue: {total_revenue:,.0f}")
    print(f"Avg revenue per round: {total_revenue / n_rounds:.1f}")
    print()
    print("Price  | Selections | Est. Conv. | True Conv. | Revenue/Trial")
    print("-" * 70)
    estimates = bandit.get_estimates()
    for i in range(len(prices)):
        exp_rev = prices[i] * estimates[i]
        true_rev = prices[i] * true_conversion[i]
        print(
            f"  {prices[i]:>5} | {arm_counts[i]:>10} | "
            f"{estimates[i]:>10.3f} | {true_conversion[i]:>10.3f} | "
            f"{exp_rev:>8.1f} (true: {true_rev:.1f})"
        )

simulate_dynamic_pricing()`,
        language: "python",
      },
      {
        type: "text",
        content: `## 強化学習×最適化

より複雑なフィードバックループには**強化学習（Reinforcement Learning, RL）** を使う。

### RL×最適化のパターン

1. **RLで方策を学習、最適化でアクションを精緻化**
   - 例: RLが大まかな配送エリア分割を決め、各エリア内のルートはVRPソルバーが最適化

2. **RLでメタヒューリスティクスのハイパーパラメータを調整**
   - 例: 焼きなまし法の冷却スケジュールを問題インスタンスに応じてRLが動的調整

3. **RLで分枝限定法の分枝戦略を学習**
   - 例: MIPソルバーの変数選択・ノード選択をRLで学習（learn-to-branch）`,
      },
      {
        type: "code",
        content: `"""
Feedback loop: Online learning for optimization parameter tuning.
Adjusts metaheuristic parameters based on observed performance.
"""
import numpy as np
from dataclasses import dataclass

@dataclass
class AdaptiveSAParams:
    """Adaptive Simulated Annealing parameters using exponential smoothing."""
    initial_temp: float = 1000.0
    cooling_rate: float = 0.995
    acceptance_rate_target: float = 0.3
    learning_rate: float = 0.1

    def update_from_performance(
        self,
        acceptance_rate: float,
        improvement_rate: float,
    ) -> None:
        """
        Adjust parameters based on observed search performance.
        If acceptance rate is too high -> cool faster (more exploitation)
        If acceptance rate is too low -> cool slower (more exploration)
        """
        # Adjust cooling rate
        if acceptance_rate > self.acceptance_rate_target * 1.2:
            # Too much acceptance -> cool faster
            self.cooling_rate = min(
                0.999,
                self.cooling_rate + self.learning_rate * 0.001,
            )
        elif acceptance_rate < self.acceptance_rate_target * 0.8:
            # Too little acceptance -> cool slower
            self.cooling_rate = max(
                0.990,
                self.cooling_rate - self.learning_rate * 0.001,
            )

        # Adjust initial temperature based on improvement
        if improvement_rate < 0.01:
            # Not finding improvements -> increase initial temp
            self.initial_temp *= 1.05
        elif improvement_rate > 0.1:
            # Finding many improvements -> temperature is fine
            self.initial_temp *= 0.98

def feedback_loop_demo() -> None:
    """
    Demonstrate the feedback loop for SA parameter tuning.
    """
    params = AdaptiveSAParams()

    # Simulate multiple optimization runs
    np.random.seed(42)

    print("Run | Cooling Rate | Init Temp  | Acceptance | Improvement")
    print("-" * 65)

    for run in range(10):
        # Simulate a run's statistics
        acceptance_rate = np.clip(
            0.3 + np.random.normal(0, 0.15)
            + (0.995 - params.cooling_rate) * 10,
            0.05, 0.95,
        )
        improvement_rate = np.clip(
            0.05 + np.random.normal(0, 0.03)
            + (params.initial_temp - 1000) / 10000,
            0.0, 0.3,
        )

        print(
            f"  {run:>2} | {params.cooling_rate:.6f}   | "
            f"{params.initial_temp:>9.1f} | "
            f"{acceptance_rate:>10.3f} | {improvement_rate:>10.3f}"
        )

        # Update parameters based on observed performance
        params.update_from_performance(acceptance_rate, improvement_rate)

    print(f"\nFinal parameters: cooling_rate={params.cooling_rate:.6f}, "
          f"initial_temp={params.initial_temp:.1f}")

feedback_loop_demo()`,
        language: "python",
      },
      {
        type: "callout",
        content:
          "フィードバック学習ループは、計算設計を「一度きりのプロジェクト」から「継続的なサービス」に変える鍵だ。初期モデル構築だけでなく、運用中の改善も含めた SaaS 型のサービスモデルを構築できる。",
        calloutType: "important",
      },
      {
        type: "text",
        content: `## ハイブリッド設計の全体像

Layer 1 で学んだ知識を統合すると、以下のような計算設計のフレームワークが見えてくる:

1. **問題分類**（計算量理論）: 顧客の問題がP/NP/NP完全のどこに位置するか判定
2. **手法選択**（数理最適化）: LP、MIP、CSP、メタヒューリスティクスから適切な手法を選択
3. **ツール実装**（最適化ツール）: OR-Tools、PuLP、CVXPY で実装
4. **AI統合**（ハイブリッド設計）: 予測モデルでパラメータ推定、フィードバックループで継続改善

これがLayer 2（量子理解）とLayer 3（ビジネス応用）の土台となる。量子コンピュータは「NP困難問題への新しいアプローチ」であり、このフレームワークの中に自然に位置づけられる。`,
      },
    ],
    keyConcepts: [
      {
        term: "フィードバック学習ループ",
        termEn: "Feedback Learning Loop",
        definition:
          "予測→最適化→実行→観測→学習のサイクルを回し、モデルを継続的に改善する仕組み。静的なモデルの劣化を防ぐ。",
      },
      {
        term: "多腕バンディット",
        termEn: "Multi-Armed Bandit",
        definition:
          "報酬分布が未知の複数の選択肢に対し、探索と活用のバランスを最適化する手法。動的価格設定やA/Bテストに応用。",
      },
      {
        term: "Thompson Sampling",
        termEn: "Thompson Sampling",
        definition:
          "各腕の報酬のベイズ事後分布からサンプリングし、最大のサンプルを持つ腕を選ぶバンディットアルゴリズム。自然に探索と活用をバランスする。",
      },
      {
        term: "Learn-to-Optimize",
        termEn: "Learn-to-Optimize",
        definition:
          "機械学習で最適化アルゴリズム自体のパラメータや戦略を学習する手法。分枝戦略の学習（learn-to-branch）やメタヒューリスティクスの自動調整が含まれる。",
      },
    ],
  },
] as const satisfies readonly Lesson[];
