import type { Lesson } from "@/types/content";

export const quantumAlgorithmsLessons: readonly Lesson[] = [
  {
    id: "qa-lesson-1",
    topicId: "quantum-algorithms",
    order: 1,
    title: "Shor詳解",
    estimatedMinutes: 45,
    sections: [
      {
        type: "text",
        content:
          "Shorのアルゴリズムの詳細を理解しましょう。概要レッスンでは「周期発見→素因数分解」の流れを学びましたが、ここではより具体的なステップを追います。\n\n素因数分解の手順:\n1. 合成数 N が偶数なら 2 を因数として返す\n2. N = aᵇ の形かチェック（完全べき乗判定）\n3. ランダムに a（2 ≤ a ≤ N-1）を選ぶ\n4. gcd(a, N) > 1 なら因数を発見\n5. **量子サブルーチン**: f(x) = aˣ mod N の周期 r を求める\n6. r が奇数なら手順3に戻る\n7. gcd(aʳ/² ± 1, N) で因数を得る",
      },
      {
        type: "diagram",
        content:
          "量子回路の構成（概念的）:\n\n|0⟩⊗ⁿ ─── H⊗ⁿ ──── U_f ──── QFT† ──── 測定\n                       │\n|0⟩⊗ⁿ ─────────────── ⊕ ──────────────── (補助)\n\n1. 第1レジスタに Hadamard 変換 → 均等重ね合わせ\n2. U_f: f(x) = aˣ mod N を量子的に計算\n3. QFT†（逆量子フーリエ変換）で周期情報を抽出\n4. 測定結果から連分数展開で周期 r を復元\n\n必要な量子ビット数: 約 2n（nはNのビット数）\nゲート数: O(n³)",
      },
      {
        type: "text",
        content:
          "量子フーリエ変換（QFT）が核心です。古典の離散フーリエ変換がO(n × 2ⁿ)かかるのに対し、QFTはO(n²)の量子ゲートで実現できます。\n\nQFTは入力の周期構造を振幅として抽出します。f(x) = aˣ mod N の周期 r に関連する振幅が増幅され、測定すると k/r に近い値が得られます。複数回の測定と連分数展開を組み合わせて r を正確に求めます。",
      },
      {
        type: "callout",
        content:
          "Shorのアルゴリズムは確率的アルゴリズムです。1回の実行で成功する確率は高いですが、100%ではありません。失敗した場合はランダムな a を変えて再試行します。実用上、数回の試行で高確率で因数が見つかります。",
        calloutType: "info",
      },
      {
        type: "text",
        content:
          "RSA-2048を破るためのリソース推定（2024年時点の研究）:\n\n- **論理量子ビット**: 約4,000〜20,000（最適化手法により大きく変動）\n- **物理量子ビット**: 約2,000万（表面符号、エラー率10⁻³想定）\n- **実行時間**: 約8時間（最新のリソース推定論文による）\n- **Tゲート数**: 約10¹²\n\nGidney & Ekera（2021）の最適化により、必要リソースは大幅に削減されました。しかし現在のハードウェアはまだ数桁の距離があります。",
      },
    ],
    keyConcepts: [
      {
        term: "量子フーリエ変換",
        termEn: "Quantum Fourier Transform (QFT)",
        definition:
          "古典DFTの量子版。O(n²)ゲートで実現。周期構造を効率的に抽出する。Shorのアルゴリズムの核心部分。",
      },
      {
        term: "連分数展開",
        termEn: "Continued Fraction Expansion",
        definition:
          "QFTの測定結果から周期 r を復元する古典的手法。k/r に近い有理数を連分数で近似し、分母として r を得る。",
      },
      {
        term: "モジュラー累乗",
        termEn: "Modular Exponentiation",
        definition:
          "f(x) = aˣ mod N の計算。Shorの量子回路で最もリソースを消費する部分。効率的な量子回路の設計が活発に研究されている。",
      },
    ],
  },
  {
    id: "qa-lesson-2",
    topicId: "quantum-algorithms",
    order: 2,
    title: "Grover詳解",
    estimatedMinutes: 40,
    sections: [
      {
        type: "text",
        content:
          "Groverのアルゴリズムの詳細な動作原理を理解しましょう。概要レッスンでは「振幅増幅」のアイデアを学びましたが、ここでは具体的な量子回路とその挙動を追います。\n\nGroverのアルゴリズムは「Grover反復（Grover iteration）」を√N回繰り返すことで、ターゲット状態の振幅を最大化します。1回のGrover反復は2つの操作で構成されます:\n\n1. **オラクル反射（Oracle Reflection）**: ターゲット状態 |w⟩ の位相を反転 → |w⟩ → -|w⟩\n2. **拡散反射（Diffusion Reflection）**: 全振幅の平均値を軸に反射 → 平均より小さい振幅は増加、大きい振幅は減少",
      },
      {
        type: "diagram",
        content:
          "Grover反復の幾何学的解釈:\n\nBloch球上で、2つの直交軸を考える:\n- |w⟩: ターゲット状態\n- |w⊥⟩: ターゲット以外の状態\n\n初期状態 |s⟩ は |w⟩ と角度 θ/2 ≈ 1/√N をなす\n\n各Grover反復で角度が θ ずつ回転:\n- k回反復後の角度: (2k+1)θ/2\n- 最適回転回数: π/(4θ) ≈ π√N/4\n\n→ 約 π√N/4 回の反復で |w⟩ に最も近づく\n→ 繰り返しすぎると逆に遠ざかる（過回転）",
      },
      {
        type: "code",
        content: `# Grover's algorithm simulation (classical)
import numpy as np

def grover_simulation(n_qubits: int, target: int) -> int:
    """Simulate Grover's algorithm classically."""
    N = 2 ** n_qubits

    # Initial uniform superposition
    amplitudes = np.ones(N) / np.sqrt(N)

    # Optimal number of iterations
    n_iterations = int(np.round(np.pi / 4 * np.sqrt(N)))

    for _ in range(n_iterations):
        # Oracle: flip target amplitude
        amplitudes[target] *= -1

        # Diffusion: reflect about mean
        mean = np.mean(amplitudes)
        amplitudes = 2 * mean - amplitudes

    # Probability of measuring target
    probabilities = amplitudes ** 2
    print(f"Target probability: {probabilities[target]:.4f}")
    print(f"Iterations needed: {n_iterations}")
    return np.argmax(probabilities)

# 10 qubits = 1024 elements, classical needs ~512 queries
result = grover_simulation(n_qubits=10, target=42)
print(f"Found: {result}")  # Should be 42`,
        language: "python",
      },
      {
        type: "callout",
        content:
          "Groverのアルゴリズムの応用は暗号解読だけではありません。SAT問題、データベース検索、最適化問題の高速化など、幅広い応用があります。ただし、二乗根の高速化であるため、指数関数的な問題を多項式時間にすることはできません。",
        calloutType: "info",
      },
      {
        type: "text",
        content:
          "暗号への具体的影響:\n\n- **AES-128**: 鍵空間 2¹²⁸ → Groverで 2⁶⁴ 回の量子演算 → 不十分\n- **AES-256**: 鍵空間 2²⁵⁶ → Groverで 2¹²⁸ 回の量子演算 → 依然として安全\n- **SHA-256 原像**: 2²⁵⁶ → 2¹²⁸ → 安全\n- **SHA-256 衝突**: 2¹²⁸ → 理論上 2⁸⁵ 程度（BHTアルゴリズム）→ やや弱体化\n\nGroverの量子回路は非常に深い（多くのゲートが必要）ため、実際にはノイズや誤り訂正のオーバーヘッドで理論値ほどの高速化は得られないとする研究もあります。",
      },
    ],
    keyConcepts: [
      {
        term: "Grover反復",
        termEn: "Grover Iteration",
        definition:
          "オラクル反射と拡散反射の2操作からなる1ステップ。√N回繰り返すことでターゲット状態の振幅を最大化する。",
      },
      {
        term: "拡散演算子",
        termEn: "Diffusion Operator",
        definition:
          "全振幅の平均を軸に反射する操作。D = 2|s⟩⟨s| - I で表される。ターゲット以外の振幅を減少させ、ターゲットの振幅を増加させる。",
      },
      {
        term: "過回転",
        termEn: "Overshooting",
        definition:
          "Grover反復を最適回数以上繰り返すと、ターゲット状態の確率がかえって低下する現象。最適回数 π√N/4 を超えないよう注意が必要。",
      },
      {
        term: "BHTアルゴリズム",
        termEn: "BHT (Brassard-Hoyer-Tapp) Algorithm",
        definition:
          "Groverのアルゴリズムをハッシュ衝突探索に応用した手法。衝突探索をO(N^(1/3))に高速化するが、大量のqRAMを要する。",
      },
    ],
  },
  {
    id: "qa-lesson-3",
    topicId: "quantum-algorithms",
    order: 3,
    title: "QAOA（量子近似最適化アルゴリズム）",
    estimatedMinutes: 40,
    sections: [
      {
        type: "text",
        content:
          "QAOA（Quantum Approximate Optimization Algorithm）は、2014年にFarhi、Goldstone、Gutmannが提案したアルゴリズムです。組合せ最適化問題に対して、量子コンピュータで近似解を求めます。\n\nShorやGroverが理想的な（誤り訂正付きの）量子コンピュータを前提とするのに対し、QAOAはNISQ（Noisy Intermediate-Scale Quantum）デバイス、つまり現在の「ノイズのある中規模量子コンピュータ」でも動作するよう設計されています。",
      },
      {
        type: "diagram",
        content:
          "QAOAの構造:\n\n古典最適化器（パラメータ更新）\n    ↑ コスト関数値          ↓ γ, β パラメータ\n┌──────────────────────────────────────┐\n│  量子回路                              │\n│  |+⟩⊗ⁿ → U_C(γ₁) → U_B(β₁)        │\n│        → U_C(γ₂) → U_B(β₂)          │\n│        → ... → U_C(γₚ) → U_B(βₚ)   │\n│        → 測定                          │\n└──────────────────────────────────────┘\n\nU_C(γ): 問題のコスト関数に基づく位相回転\nU_B(β): 混合（ミキシング）操作\np: 回路の深さ（レイヤー数）",
      },
      {
        type: "text",
        content:
          "QAOAの動作原理:\n\n1. 全量子ビットを |+⟩ 状態（均等重ね合わせ）に初期化\n2. p層の量子回路を適用:\n   - U_C(γ): 問題のコストHamiltonianに基づく位相回転\n   - U_B(β): 混合Hamiltonianに基づく回転\n3. 測定してコスト関数値を計算\n4. 古典最適化器（COBYLA、SPSA等）でパラメータ γ, β を更新\n5. 2-4を繰り返して最適パラメータを見つける\n\np（層数）を増やすと解の質が向上しますが、回路が深くなりノイズの影響を受けやすくなります。実用上は p = 1〜5 程度が使われます。",
      },
      {
        type: "code",
        content: `# QAOA conceptual implementation with Qiskit
from qiskit import QuantumCircuit
from qiskit.circuit import Parameter
import numpy as np

def create_qaoa_circuit(
    n_qubits: int, p: int, edges: list[tuple[int, int]]
) -> QuantumCircuit:
    """Create a QAOA circuit for MaxCut problem."""
    gammas = [Parameter(f"gamma_{i}") for i in range(p)]
    betas = [Parameter(f"beta_{i}") for i in range(p)]

    qc = QuantumCircuit(n_qubits)

    # Initial superposition
    qc.h(range(n_qubits))

    for layer in range(p):
        # Cost unitary U_C(gamma)
        for i, j in edges:
            qc.rzz(gammas[layer], i, j)

        # Mixer unitary U_B(beta)
        for i in range(n_qubits):
            qc.rx(2 * betas[layer], i)

    qc.measure_all()
    return qc

# MaxCut on a simple graph
edges = [(0, 1), (1, 2), (2, 3), (3, 0)]
circuit = create_qaoa_circuit(n_qubits=4, p=2, edges=edges)
print(f"Circuit depth: {circuit.depth()}")
print(f"Parameters: {circuit.parameters}")`,
        language: "python",
      },
      {
        type: "callout",
        content:
          "QAOAの実用的な量子優位性はまだ証明されていません。現在の研究では、特定の問題構造に対してp層を十分に増やせば理論的に最適解に収束することが示されていますが、NISQデバイスのノイズがボトルネックです。ビジネスの文脈では「将来有望だが、現時点では古典の近似アルゴリズムが実用的」と伝えるのが正確です。",
        calloutType: "important",
      },
    ],
    keyConcepts: [
      {
        term: "QAOA",
        termEn: "Quantum Approximate Optimization Algorithm",
        definition:
          "NISQデバイス向けの変分量子アルゴリズム。組合せ最適化問題に対して量子・古典ハイブリッドで近似解を求める。MaxCut等に適用。",
      },
      {
        term: "NISQ",
        termEn: "Noisy Intermediate-Scale Quantum",
        definition:
          "ノイズのある中規模量子コンピュータの時代。50-数千量子ビット規模で誤り訂正なし。現在のハードウェアが該当。QAOAやVQEはNISQ向けに設計。",
      },
      {
        term: "変分量子アルゴリズム",
        termEn: "Variational Quantum Algorithm (VQA)",
        definition:
          "パラメータ付き量子回路と古典最適化器を組み合わせたハイブリッドアルゴリズム。QAOA、VQEが代表的。NISQデバイスでの実行を前提とする。",
      },
      {
        term: "MaxCut問題",
        termEn: "MaxCut Problem",
        definition:
          "グラフの頂点を2グループに分割し、グループ間をまたぐ辺の数を最大化する組合せ最適化問題。QAOAの代表的ベンチマーク。NP困難。",
      },
    ],
  },
  {
    id: "qa-lesson-4",
    topicId: "quantum-algorithms",
    order: 4,
    title: "VQE（変分量子固有値ソルバー）",
    estimatedMinutes: 40,
    sections: [
      {
        type: "text",
        content:
          "VQE（Variational Quantum Eigensolver）は、量子化学・材料科学における分子のエネルギー計算に使用される変分量子アルゴリズムです。2014年にPeruzzoらが提案し、量子コンピュータの実用的応用として最も期待されている分野の一つです。\n\n問題: ハミルトニアン H の最小固有値（基底状態エネルギー）を求める\n原理: 変分原理 ⟨ψ(θ)|H|ψ(θ)⟩ ≥ E₀ を利用\nE₀は基底状態エネルギー。パラメータ θ を最適化して下界を改善する。",
      },
      {
        type: "diagram",
        content:
          "VQEの構造（QAOAと類似だが問題が異なる）:\n\n古典最適化器（θ 更新）\n    ↑ ⟨H⟩ の期待値          ↓ θ パラメータ\n┌──────────────────────────────────────┐\n│  量子回路（Ansatz）                    │\n│  |0⟩⊗ⁿ → U(θ) → 測定               │\n│  Hの各項ごとに異なる基底で測定         │\n│  ⟨H⟩ = Σ cᵢ⟨Pᵢ⟩ を古典で計算       │\n└──────────────────────────────────────┘\n\nAnsatz例:\n- UCCSD (Unitary Coupled Cluster)\n- Hardware-Efficient Ansatz\n- ADAPT-VQE (adaptive)",
      },
      {
        type: "text",
        content:
          "VQEの応用分野:\n\n1. **創薬**: 薬剤候補分子の結合エネルギー計算。古典計算では電子数に対して指数関数的に計算量が増加するが、量子計算では効率的に計算できる可能性。\n\n2. **材料科学**: 高温超伝導体、触媒、バッテリー材料の電子構造計算。\n\n3. **化学反応シミュレーション**: 反応経路の探索、遷移状態の計算。\n\n現状の課題:\n- NISQデバイスのノイズが精度を制限\n- 量子ビット数が足りず、小分子しか扱えない\n- 古典シミュレーション（DMRG等）との優位性が未確立\n- Barren plateau問題（パラメータ空間の勾配消失）",
      },
      {
        type: "code",
        content: `# VQE conceptual example: H2 molecule energy
# Using PennyLane framework
import pennylane as qml
from pennylane import numpy as np

# Define molecule (H2 at 0.74 Angstrom)
symbols = ["H", "H"]
coordinates = np.array([0.0, 0.0, -0.37, 0.0, 0.0, 0.37])

# Build Hamiltonian
H, qubits = qml.qchem.molecular_hamiltonian(symbols, coordinates)
print(f"Number of qubits: {qubits}")
print(f"Number of Hamiltonian terms: {len(H.ops)}")

# Define quantum device and circuit
dev = qml.device("default.qubit", wires=qubits)

# Hardware-efficient ansatz
def circuit(params, wires):
    for i in wires:
        qml.RY(params[i], wires=i)
    for i in range(len(wires) - 1):
        qml.CNOT(wires=[wires[i], wires[i + 1]])
    for i in wires:
        qml.RY(params[len(wires) + i], wires=i)

@qml.qnode(dev)
def cost_fn(params):
    circuit(params, wires=range(qubits))
    return qml.expval(H)

# Optimize
params = np.random.uniform(0, 2 * np.pi, 2 * qubits)
opt = qml.GradientDescentOptimizer(stepsize=0.4)

for step in range(100):
    params = opt.step(cost_fn, params)
    if step % 20 == 0:
        energy = cost_fn(params)
        print(f"Step {step}: Energy = {energy:.6f} Ha")

# Exact value for H2: -1.1373 Ha`,
        language: "python",
      },
      {
        type: "callout",
        content:
          "VQEの実務的な位置づけ: 現在のNISQデバイスでは数十量子ビット程度の小分子しか扱えず、古典計算（CCSD(T)やDMRG）の方が精度が高いケースがほとんどです。コンサルティングでは「将来の量子化学計算への布石」として位置づけ、現時点での過度な期待を抑制することが重要です。",
        calloutType: "tip",
      },
    ],
    keyConcepts: [
      {
        term: "VQE",
        termEn: "Variational Quantum Eigensolver",
        definition:
          "ハミルトニアンの基底状態エネルギーを求める変分量子アルゴリズム。量子化学計算に応用。変分原理を利用し、量子・古典ハイブリッドで最適化する。",
      },
      {
        term: "Ansatz",
        termEn: "Ansatz (Trial Wavefunction)",
        definition:
          "VQEで使用するパラメータ付き量子回路（試行波動関数）。UCCSDやハードウェア効率的Ansatz等がある。回路の表現力と実行可能性のトレードオフがある。",
      },
      {
        term: "変分原理",
        termEn: "Variational Principle",
        definition:
          "任意の試行波動関数の期待値は基底状態エネルギー以上である（⟨ψ|H|ψ⟩ ≥ E₀）。VQEはこの原理を利用してパラメータを最適化し、基底状態に近づける。",
      },
      {
        term: "Barren Plateau",
        termEn: "Barren Plateau Problem",
        definition:
          "変分量子アルゴリズムにおいて、パラメータ空間の勾配が指数関数的に小さくなり最適化が困難になる現象。深い回路やランダムな初期化で発生しやすい。",
      },
    ],
  },
] as const satisfies readonly Lesson[];
