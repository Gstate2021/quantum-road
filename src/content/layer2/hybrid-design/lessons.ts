import type { Lesson } from "@/types/content";

export const hybridDesignLessons: readonly Lesson[] = [
  {
    id: "hd-lesson-1",
    topicId: "hybrid-design",
    order: 1,
    title: "古典前処理→量子コア→古典後処理",
    estimatedMinutes: 40,
    sections: [
      {
        type: "text",
        content:
          "現在の量子コンピュータ（NISQ時代）では、量子だけで問題を解決することは現実的ではありません。古典コンピュータと量子コンピュータの長所を組み合わせた「ハイブリッドアーキテクチャ」が実用的なアプローチです。\n\n基本構造は「古典前処理 → 量子コア → 古典後処理」の3段パイプラインです。量子コンピュータは「得意な部分だけ」を担当し、それ以外は古典コンピュータが処理します。",
      },
      {
        type: "diagram",
        content:
          "ハイブリッドアーキテクチャの3段パイプライン:\n\n┌─────────────────┐\n│ 1. 古典前処理     │\n│ - データ収集・整形 │\n│ - 問題の定式化    │\n│ - 次元削減       │\n│ - 量子回路パラメータ計算 │\n└────────┬────────┘\n         │ 量子回路 + パラメータ\n┌────────▼────────┐\n│ 2. 量子コア      │\n│ - 量子状態の準備  │\n│ - 量子ゲート操作  │\n│ - 測定          │\n│ - 期待値の推定   │\n└────────┬────────┘\n         │ 測定結果 / 期待値\n┌────────▼────────┐\n│ 3. 古典後処理    │\n│ - 結果の解釈     │\n│ - パラメータ更新  │\n│ - 誤り緩和       │\n│ - ビジネスロジック │\n└─────────────────┘",
      },
      {
        type: "text",
        content:
          "各フェーズの詳細:\n\n**1. 古典前処理**\n- 問題のエンコード: 実世界の問題をハミルトニアンやコスト関数に変換\n- 次元削減: 量子ビット数を削減するために問題を圧縮\n- 初期パラメータの設定: 変分アルゴリズムの初期値を古典ヒューリスティクスで推定\n- 量子回路のコンパイル: 論理回路を物理ハードウェアにマッピング\n\n**2. 量子コア**\n- 変分量子回路の実行（QAOA、VQE等）\n- ショットベースの測定（同じ回路を何千回も実行して統計を取る）\n- 量子特有の操作（重ね合わせ、もつれ、干渉の活用）\n\n**3. 古典後処理**\n- 測定結果の統計処理\n- 誤り緩和（ZNE、PEC等）でノイズの影響を軽減\n- 変分パラメータの最適化（COBYLA、SPSA等）\n- ビジネスロジックへの接続",
      },
      {
        type: "code",
        content: `# Hybrid pipeline example: QAOA for portfolio optimization
import numpy as np
from dataclasses import dataclass

@dataclass(frozen=True)
class HybridPipelineResult:
    """Result of a hybrid quantum-classical pipeline."""
    optimal_params: np.ndarray
    best_cost: float
    best_solution: list[int]
    iterations: int

# Phase 1: Classical Preprocessing
def classical_preprocessing(
    returns: np.ndarray,
    covariance: np.ndarray,
    risk_factor: float,
) -> dict:
    """Convert portfolio problem to QUBO formulation."""
    n_assets = len(returns)

    # QUBO matrix: Q_ij = risk_factor * cov_ij - delta_ij * returns_i
    Q = risk_factor * covariance - np.diag(returns)

    # Estimate initial QAOA parameters (classical heuristic)
    spectral_gap = np.max(np.abs(np.linalg.eigvalsh(Q)))
    initial_gamma = np.pi / (4 * spectral_gap)
    initial_beta = np.pi / 8

    return {
        "qubo_matrix": Q,
        "n_qubits": n_assets,
        "initial_params": np.array([initial_gamma, initial_beta]),
    }

# Phase 2: Quantum Core (simulated)
def quantum_core(
    qubo_matrix: np.ndarray,
    params: np.ndarray,
    n_shots: int = 1024,
) -> dict:
    """Execute QAOA circuit and return measurement results."""
    n_qubits = len(qubo_matrix)
    gamma, beta = params[0], params[1]

    # Simulated measurement (in production, use actual QPU)
    bitstrings = []
    for _ in range(n_shots):
        bits = np.random.randint(0, 2, n_qubits)
        bitstrings.append(bits)

    return {"bitstrings": bitstrings, "n_shots": n_shots}

# Phase 3: Classical Postprocessing
def classical_postprocessing(
    bitstrings: list[np.ndarray],
    qubo_matrix: np.ndarray,
) -> tuple[float, list[int]]:
    """Evaluate solutions and find the best one."""
    best_cost = float("inf")
    best_solution = []

    for bits in bitstrings:
        cost = bits @ qubo_matrix @ bits
        if cost < best_cost:
            best_cost = cost
            best_solution = bits.tolist()

    return best_cost, best_solution

# Run hybrid pipeline
returns = np.array([0.05, 0.08, 0.12, 0.03])
covariance = np.array([
    [0.04, 0.01, 0.02, 0.005],
    [0.01, 0.09, 0.03, 0.01],
    [0.02, 0.03, 0.16, 0.02],
    [0.005, 0.01, 0.02, 0.01],
])

preprocessed = classical_preprocessing(returns, covariance, risk_factor=0.5)
quantum_result = quantum_core(
    preprocessed["qubo_matrix"],
    preprocessed["initial_params"],
)
best_cost, best_solution = classical_postprocessing(
    quantum_result["bitstrings"],
    preprocessed["qubo_matrix"],
)

print(f"Best portfolio: {best_solution}")
print(f"Best cost: {best_cost:.4f}")`,
        language: "python",
      },
      {
        type: "callout",
        content:
          "ハイブリッド設計のポイントは「量子コンピュータの弱点を古典で補う」ことです。量子コンピュータはノイズに弱く、量子ビット数が限られ、入出力に制約があります。古典前処理で問題を量子に適した形に変換し、古典後処理で誤り緩和と結果の解釈を行うことで、現在のNISQデバイスでも実用的な結果を得られる可能性が高まります。",
        calloutType: "important",
      },
    ],
    keyConcepts: [
      {
        term: "ハイブリッドアーキテクチャ",
        termEn: "Hybrid Classical-Quantum Architecture",
        definition:
          "古典前処理→量子コア→古典後処理の3段パイプライン。量子コンピュータの強みを活かしつつ、弱点を古典で補う実用的な設計パターン。",
      },
      {
        term: "QUBO",
        termEn: "Quadratic Unconstrained Binary Optimization",
        definition:
          "二次無制約二値最適化。組合せ最適化問題をバイナリ変数の二次形式 x^T Q x として定式化する。QAOAや量子アニーリングへの入力形式として標準的。",
      },
      {
        term: "誤り緩和",
        termEn: "Error Mitigation",
        definition:
          "NISQデバイスのノイズを古典後処理で軽減する手法。ZNE（Zero-Noise Extrapolation）やPEC（Probabilistic Error Cancellation）が代表的。誤り訂正とは異なり追加量子ビットは不要。",
      },
      {
        term: "ショット",
        termEn: "Shot (Measurement)",
        definition:
          "量子回路の1回の実行と測定。量子力学の確率的性質により、同じ回路を何千回も実行（ショット）して統計的に結果を推定する必要がある。",
      },
    ],
  },
  {
    id: "hd-lesson-2",
    topicId: "hybrid-design",
    order: 2,
    title: "ハイブリッド設計パターン",
    estimatedMinutes: 40,
    sections: [
      {
        type: "text",
        content:
          "ハイブリッド設計にはいくつかの確立された設計パターンがあります。問題の性質やハードウェアの制約に応じて適切なパターンを選択します。",
      },
      {
        type: "diagram",
        content:
          "主要なハイブリッド設計パターン:\n\n1. Variational Loop（変分ループ）\n   古典 ⇄ 量子 を収束まで反復\n   例: VQE, QAOA\n\n2. Quantum Subroutine（量子サブルーチン）\n   古典アルゴリズム内で量子を関数呼び出し\n   例: Shor（古典 + 周期発見）、量子サンプリング\n\n3. Quantum-Inspired（量子インスパイアード）\n   量子アルゴリズムのアイデアを古典で近似実装\n   例: テンソルネットワーク、シミュレーテッド量子アニーリング\n\n4. Embedding（埋め込み）\n   大きな問題を分割し、サブ問題を量子で解く\n   例: 量子ビット数制約の回避",
      },
      {
        type: "text",
        content:
          "**パターン1: Variational Loop（変分ループ）**\n\n最もNISQ時代に適したパターンです。QAOA、VQEが代表例。\n\n構造:\n1. 古典が初期パラメータ θ₀ を設定\n2. 量子が回路 U(θ) を実行し、コスト関数値 C(θ) を返す\n3. 古典がθを更新: θ_{n+1} = θ_n - η∇C(θ)\n4. 収束まで2-3を繰り返し\n\n設計上の考慮:\n- 古典最適化器の選択（勾配ベース vs 勾配フリー）\n- ショット数の設定（精度 vs 速度）\n- 収束判定の基準\n- Barren Plateauの回避策",
      },
      {
        type: "text",
        content:
          "**パターン2: Quantum Subroutine（量子サブルーチン）**\n\n古典アルゴリズムの特定のステップを量子で置き換えるパターン。\n\n例:\n- Shorのアルゴリズム: 古典的な因数分解アルゴリズム内で「周期発見」だけを量子で実行\n- HHL: 連立一次方程式の求解で量子を使用\n- 量子サンプリング: MCMC等のサンプリングステップを量子で高速化\n\n利点:\n- 量子リソースの使用を最小限に抑えられる\n- 既存の古典アルゴリズムの枠組みを維持できる\n- 段階的な量子導入が可能\n\n注意点:\n- 量子・古典間のデータ転送のオーバーヘッド\n- 量子の出力を古典で利用可能な形に変換する必要がある",
      },
      {
        type: "code",
        content: `# Design Pattern: Variational Loop with Error Mitigation
from dataclasses import dataclass
from typing import Callable
import numpy as np

@dataclass(frozen=True)
class VariationalConfig:
    """Configuration for variational hybrid loop."""
    n_params: int
    n_shots: int
    max_iterations: int
    convergence_threshold: float
    learning_rate: float
    error_mitigation: str  # "none", "ZNE", "PEC"

def variational_loop(
    quantum_executor: Callable[[np.ndarray, int], float],
    config: VariationalConfig,
    initial_params: np.ndarray | None = None,
) -> dict:
    """
    Generic variational hybrid loop.

    Args:
        quantum_executor: Function that runs quantum circuit
                         and returns cost value.
        config: Loop configuration.
        initial_params: Starting parameters. Random if None.

    Returns:
        Dictionary with optimal params, cost history, etc.
    """
    # Phase 1: Classical Preprocessing
    if initial_params is None:
        params = np.random.uniform(0, 2 * np.pi, config.n_params)
    else:
        params = initial_params.copy()

    cost_history: list[float] = []
    best_cost = float("inf")
    best_params = params.copy()

    for iteration in range(config.max_iterations):
        # Phase 2: Quantum Core
        cost = quantum_executor(params, config.n_shots)

        # Phase 3: Classical Postprocessing
        # Apply error mitigation
        if config.error_mitigation == "ZNE":
            cost = zero_noise_extrapolation(
                quantum_executor, params, config.n_shots
            )

        cost_history.append(cost)

        if cost < best_cost:
            best_cost = cost
            best_params = params.copy()

        # Convergence check
        if len(cost_history) > 5:
            recent_var = np.var(cost_history[-5:])
            if recent_var < config.convergence_threshold:
                break

        # Parameter update (parameter-shift rule for gradient)
        gradient = compute_parameter_shift_gradient(
            quantum_executor, params, config.n_shots
        )
        params = params - config.learning_rate * gradient

    return {
        "optimal_params": best_params,
        "optimal_cost": best_cost,
        "cost_history": cost_history,
        "iterations": len(cost_history),
    }

def zero_noise_extrapolation(
    executor: Callable, params: np.ndarray, n_shots: int
) -> float:
    """ZNE: Run at multiple noise levels and extrapolate to zero."""
    noise_factors = [1.0, 1.5, 2.0]
    costs = [executor(params, n_shots) for _ in noise_factors]
    # Linear extrapolation to zero noise
    coeffs = np.polyfit(noise_factors, costs, 1)
    return float(np.polyval(coeffs, 0.0))

def compute_parameter_shift_gradient(
    executor: Callable, params: np.ndarray, n_shots: int
) -> np.ndarray:
    """Compute gradient using parameter-shift rule."""
    gradient = np.zeros_like(params)
    shift = np.pi / 2

    for i in range(len(params)):
        params_plus = params.copy()
        params_plus[i] += shift
        params_minus = params.copy()
        params_minus[i] -= shift

        gradient[i] = (
            executor(params_plus, n_shots) -
            executor(params_minus, n_shots)
        ) / 2

    return gradient`,
        language: "python",
      },
      {
        type: "callout",
        content:
          "パターン選択の判断基準:\n- NISQ時代（今）→ Variational Loop + Error Mitigation\n- FTQ時代（将来）→ Quantum Subroutine（Shor、QPE等）\n- 量子HW不要で今すぐ→ Quantum-Inspired\n- 大規模問題→ Embedding + 分割統治",
        calloutType: "tip",
      },
    ],
    keyConcepts: [
      {
        term: "変分ループ",
        termEn: "Variational Loop",
        definition:
          "古典と量子を交互に繰り返すハイブリッドパターン。古典がパラメータを更新し、量子がコスト関数を評価する。QAOA、VQEの基本構造。NISQ時代の主流。",
      },
      {
        term: "パラメータシフト則",
        termEn: "Parameter-Shift Rule",
        definition:
          "変分量子回路のパラメータに対する解析的な勾配計算法。パラメータを±π/2シフトした2回の回路実行で勾配を求める。有限差分より精度が高い。",
      },
      {
        term: "ZNE",
        termEn: "Zero-Noise Extrapolation",
        definition:
          "誤り緩和手法の一つ。複数のノイズレベルで量子回路を実行し、ゼロノイズへ外挿することでノイズの影響を軽減する。追加量子ビット不要。",
      },
      {
        term: "量子インスパイアード",
        termEn: "Quantum-Inspired Algorithm",
        definition:
          "量子アルゴリズムのアイデアを古典コンピュータで近似実装する手法。テンソルネットワークやシミュレーテッド量子アニーリング等。量子HW不要で即座に導入可能。",
      },
    ],
  },
  {
    id: "hd-lesson-3",
    topicId: "hybrid-design",
    order: 3,
    title: "計算資源の最適配分",
    estimatedMinutes: 35,
    sections: [
      {
        type: "text",
        content:
          "ハイブリッド設計で最も重要な判断の一つが「何を古典で、何を量子で処理するか」の切り分けです。量子コンピュータは高価でリソースが限られているため、量子に任せる部分は最小限かつ最も効果的な範囲に絞る必要があります。",
      },
      {
        type: "diagram",
        content:
          "量子 vs 古典の適材適所:\n\n量子が得意:\n- 指数的な状態空間の探索（組合せ最適化）\n- 量子系のシミュレーション（化学、材料）\n- 特定の構造を持つ問題（周期発見、探索）\n\n古典が得意:\n- データの前処理・変換\n- 大規模な入出力処理\n- 反復計算の制御ロジック\n- 結果の解釈・可視化\n- 実数の高精度計算\n\n判断基準:\n問題サイズが量子ビット数に収まるか？\n量子優位性が理論的に示されているか？\n古典の近似解で十分ではないか？",
      },
      {
        type: "text",
        content:
          "コスト分析フレームワーク:\n\n量子コンピュータの利用コストを判断する際は、以下の4要素を考慮します。\n\n1. **QPU時間コスト**: 量子プロセッサの使用料金（クラウド課金）\n2. **回路実行回数**: ショット数 × パラメータ更新回数\n3. **古典オーバーヘッド**: 前処理・後処理の計算時間\n4. **通信レイテンシ**: 古典→量子→古典のデータ転送時間\n\n特に変分ループでは「パラメータ更新1回あたりのQPU実行回数」が支配的なコスト要因になります。勾配計算にパラメータシフト則を使う場合、パラメータ数 × 2回の回路実行が必要です。",
      },
      {
        type: "code",
        content: `# Resource estimation for hybrid quantum-classical workloads
from dataclasses import dataclass

@dataclass(frozen=True)
class QuantumResourceEstimate:
    """Estimate quantum and classical resources needed."""
    n_qubits: int
    circuit_depth: int
    n_shots_per_eval: int
    n_params: int
    n_iterations: int
    qpu_time_per_shot_us: float  # microseconds
    classical_time_per_iter_ms: float  # milliseconds
    qpu_cost_per_second: float  # USD

def estimate_resources(
    n_qubits: int,
    n_params: int,
    n_iterations: int = 100,
    n_shots: int = 4096,
    circuit_depth: int = 50,
) -> dict:
    """Estimate total resources for a variational hybrid workload."""

    # QPU estimates
    qpu_time_per_shot_us = circuit_depth * 0.1  # ~100ns per gate
    shots_per_gradient = n_params * 2  # parameter-shift rule
    total_shots = n_shots * (1 + shots_per_gradient) * n_iterations

    total_qpu_time_s = total_shots * qpu_time_per_shot_us / 1e6
    total_qpu_time_h = total_qpu_time_s / 3600

    # Classical estimates
    classical_time_per_iter_ms = 10  # optimizer + postprocessing
    total_classical_time_s = n_iterations * classical_time_per_iter_ms / 1000

    # Cost estimates (IBM Quantum cloud pricing approximation)
    qpu_cost_per_second = 1.60  # USD/second (approximation)
    total_qpu_cost = total_qpu_time_s * qpu_cost_per_second

    # Communication overhead
    round_trips = n_iterations * (1 + shots_per_gradient)
    comm_latency_ms = 50  # network latency per round trip
    total_comm_time_s = round_trips * comm_latency_ms / 1000

    return {
        "n_qubits": n_qubits,
        "n_params": n_params,
        "total_shots": total_shots,
        "total_qpu_time_hours": round(total_qpu_time_h, 4),
        "total_classical_time_seconds": round(total_classical_time_s, 2),
        "total_communication_time_seconds": round(total_comm_time_s, 2),
        "estimated_qpu_cost_usd": round(total_qpu_cost, 2),
        "bottleneck": (
            "communication"
            if total_comm_time_s > total_qpu_time_s
            else "qpu_execution"
        ),
    }

# Example: 20-qubit QAOA for portfolio optimization
estimate = estimate_resources(
    n_qubits=20,
    n_params=10,  # 5 layers × 2 params
    n_iterations=100,
    n_shots=4096,
)

for key, value in estimate.items():
    print(f"{key}: {value}")`,
        language: "python",
      },
      {
        type: "callout",
        content:
          "多くのハイブリッドワークロードで、通信レイテンシが全体のボトルネックになります。クラウド量子コンピュータの場合、1回の回路送信→実行→結果取得に50-200msかかることがあり、変分ループの反復回数が多いと支配的なコストになります。オンプレミス量子コンピュータや、回路をバッチ送信する最適化が重要です。",
        calloutType: "warning",
      },
      {
        type: "text",
        content:
          "コンサルティングでの実践的な判断フロー:\n\n1. **問題の定式化**: ビジネス課題を数理最適化問題に変換\n2. **古典ベースライン**: まず古典アルゴリズム（SA、GA、CPLEX等）で解く\n3. **量子適合性評価**: 量子が古典を上回る可能性があるか判断\n   - 問題サイズ vs 利用可能量子ビット数\n   - 解の精度要件 vs NISQデバイスのノイズレベル\n   - 古典近似解の品質 vs 量子解の期待品質\n4. **PoC設計**: 小規模問題でハイブリッドパイプラインを構築\n5. **スケーリング評価**: 問題サイズ拡大時のリソース増加を見積もる\n\n現時点での正直な結論: ほとんどのビジネス問題に対して、古典的手法が量子を上回ります。量子が有利になる「量子実用優位性（Quantum Utility）」の境界はまだ明確ではありません。しかし、ハイブリッド設計のスキルは将来の量子優位性を活用するための不可欠な準備です。",
      },
    ],
    keyConcepts: [
      {
        term: "量子実用優位性",
        termEn: "Quantum Utility",
        definition:
          "量子コンピュータが古典コンピュータより実用的に優れた結果を出せる領域。量子超越性（任意の問題での優位）よりも実用的な基準。まだ明確な境界は確立されていない。",
      },
      {
        term: "QPU時間",
        termEn: "QPU Time",
        definition:
          "量子プロセッサの使用時間。クラウド量子コンピュータの課金単位。回路深さ × ショット数 × 反復回数で決まる。コスト最適化の重要なパラメータ。",
      },
      {
        term: "古典ベースライン",
        termEn: "Classical Baseline",
        definition:
          "量子アルゴリズムの有効性を評価するための古典的な比較対象。SA、GA、CPLEX等で問題を解き、量子が上回るか検証する。ハイブリッド設計の必須ステップ。",
      },
    ],
  },
] as const satisfies readonly Lesson[];
