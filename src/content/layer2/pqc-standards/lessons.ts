import type { Lesson } from "@/types/content";

export const pqcStandardsLessons: readonly Lesson[] = [
  {
    id: "pqc-lesson-1",
    topicId: "pqc-standards",
    order: 1,
    title: "なぜPQCが必要か",
    estimatedMinutes: 25,
    sections: [
      {
        type: "text",
        content:
          "PQC（Post-Quantum Cryptography、耐量子暗号）は、量子コンピュータでも破れない暗号アルゴリズムの総称です。量子コンピュータを使った暗号（量子暗号）とは異なり、古典コンピュータで実行でき、既存のインフラとの互換性を保てることが大きな利点です。\n\nNISTは2016年からPQC標準化プロジェクトを開始し、6年間にわたる3ラウンドの選考を経て、2024年に最初のPQC標準を公開しました。",
      },
      {
        type: "diagram",
        content:
          "NIST PQC標準化タイムライン:\n\n2016年: PQC標準化プロジェクト開始、69の応募\n2017年: Round 1 開始、26方式を選出\n2019年: Round 2 開始、15方式に絞り込み\n2020年: Round 3 開始、7ファイナリスト + 8代替候補\n2022年: 4つの標準候補を発表\n2024年8月: FIPS 203 (ML-KEM), FIPS 204 (ML-DSA), FIPS 205 (SLH-DSA) 公開\n2025年: FIPS 206 (FN-DSA) 公開予定\n\n追加ラウンドでデジタル署名の追加候補も選考中",
      },
      {
        type: "text",
        content:
          "PQCアルゴリズムの安全性は、量子コンピュータでも効率的に解けないと考えられている数学的問題に基づいています:\n\n1. **格子問題（Lattice-based）**: ML-KEM、ML-DSA、FN-DSA\n   - Learning With Errors (LWE) 問題\n   - Module-LWE、Module-SIS問題\n   - 最短ベクトル問題（SVP）の困難性\n\n2. **ハッシュベース（Hash-based）**: SLH-DSA\n   - ハッシュ関数の安全性のみに依存\n   - 安全性の根拠が最も保守的\n\n3. **符号ベース（Code-based）**: Classic McEliece（追加候補）\n   - 一般的な線形符号の復号問題\n\n4. **多変数多項式（Multivariate）**: 追加候補に一部残存",
      },
      {
        type: "callout",
        content:
          "PQCは「量子コンピュータが不要」な点が重要です。量子鍵配送（QKD）のような量子暗号は専用ハードウェアが必要で、距離の制約もあります。PQCは既存のTLS、SSH、VPN等のプロトコルに組み込めるため、大規模な移行が現実的です。",
        calloutType: "important",
      },
      {
        type: "text",
        content:
          "NIST標準PQCアルゴリズムの概要:\n\n| 標準 | アルゴリズム | 旧名 | 用途 | 基盤 |\n|------|------------|------|------|------|\n| FIPS 203 | ML-KEM | CRYSTALS-Kyber | 鍵カプセル化 | Module-LWE |\n| FIPS 204 | ML-DSA | CRYSTALS-Dilithium | デジタル署名 | Module-LWE/SIS |\n| FIPS 205 | SLH-DSA | SPHINCS+ | デジタル署名 | ハッシュベース |\n| FIPS 206 | FN-DSA | FALCON | デジタル署名 | NTRU格子 |\n\n最も実装の優先度が高いのは ML-KEM（鍵交換）と ML-DSA（署名）です。",
      },
    ],
    keyConcepts: [
      {
        term: "PQC",
        termEn: "Post-Quantum Cryptography",
        definition:
          "量子コンピュータでも破れない暗号アルゴリズムの総称。古典コンピュータで実行可能で、既存インフラとの互換性を維持できる。",
      },
      {
        term: "格子暗号",
        termEn: "Lattice-based Cryptography",
        definition:
          "格子上の数学的問題（LWE、SVP等）の困難性に基づく暗号。PQC標準の主流。ML-KEM、ML-DSA、FN-DSAが該当。",
      },
      {
        term: "LWE問題",
        termEn: "Learning With Errors",
        definition:
          "ノイズ付きの線形方程式から秘密ベクトルを復元する問題。格子問題の困難性に帰着される。ML-KEM、ML-DSAの安全性の根拠。",
      },
    ],
  },
  {
    id: "pqc-lesson-2",
    topicId: "pqc-standards",
    order: 2,
    title: "ML-KEM（鍵カプセル化メカニズム）",
    estimatedMinutes: 40,
    sections: [
      {
        type: "text",
        content:
          "ML-KEM（Module-Lattice-Based Key-Encapsulation Mechanism、旧名CRYSTALS-Kyber）は、FIPS 203として標準化された鍵カプセル化メカニズムです。現在のECDHやRSA鍵交換の置き換えとして使用されます。\n\nKEM（Key Encapsulation Mechanism）は、公開鍵暗号を用いた鍵交換の手法です。従来のDiffie-Hellman鍵交換とは異なり、一方が鍵をカプセル化して送る方式です。",
      },
      {
        type: "diagram",
        content:
          "ML-KEMの鍵交換フロー:\n\n Alice                          Bob\n   │                             │\n   │ (pk, sk) ← KeyGen()        │\n   │──── pk（公開鍵）────────────→│\n   │                             │ (ct, ss) ← Encaps(pk)\n   │←── ct（暗号文）─────────────│\n   │ ss ← Decaps(sk, ct)        │\n   │                             │\n   │ Alice.ss == Bob.ss（共有秘密）│\n\nKeyGen: 鍵ペア生成\nEncaps: 公開鍵で共有秘密をカプセル化\nDecaps: 秘密鍵でカプセルを開封",
      },
      {
        type: "text",
        content:
          "ML-KEMの3つのパラメータセット:\n\n| パラメータ | セキュリティレベル | 公開鍵 | 暗号文 | 共有秘密 |\n|-----------|-------------------|--------|--------|----------|\n| ML-KEM-512 | Level 1 (AES-128相当) | 800 B | 768 B | 32 B |\n| ML-KEM-768 | Level 3 (AES-192相当) | 1,184 B | 1,088 B | 32 B |\n| ML-KEM-1024 | Level 5 (AES-256相当) | 1,568 B | 1,568 B | 32 B |\n\n比較: ECDH P-256の公開鍵は64バイト。ML-KEMの鍵サイズは大幅に大きくなりますが、TLS等のプロトコルでは実用上問題のないレベルです。",
      },
      {
        type: "code",
        content: `# ML-KEM key exchange using liboqs (Python wrapper)
import oqs

# Initialize ML-KEM-768
kem = oqs.KeyEncapsulation("ML-KEM-768")

# Alice: generate key pair
public_key = kem.generate_keypair()
print(f"Public key size:  {len(public_key)} bytes")

# Bob: encapsulate shared secret
ciphertext, shared_secret_bob = kem.encap_secret(public_key)
print(f"Ciphertext size:  {len(ciphertext)} bytes")
print(f"Shared secret:    {len(shared_secret_bob)} bytes")

# Alice: decapsulate shared secret
shared_secret_alice = kem.decap_secret(ciphertext)

# Verify
assert shared_secret_alice == shared_secret_bob
print("Key exchange successful!")
print(f"Shared secret: {shared_secret_alice.hex()[:32]}...")`,
        language: "python",
      },
      {
        type: "callout",
        content:
          "ML-KEM-768が最も推奨されるパラメータセットです。Level 3（AES-192相当）の安全性を持ち、性能と安全性のバランスが良好です。NISTのガイダンスでも一般的な用途にはML-KEM-768を推奨しています。",
        calloutType: "tip",
      },
      {
        type: "text",
        content:
          "ML-KEMの技術的特徴:\n\n- **安全性の根拠**: Module-LWE問題の困難性\n- **IND-CCA2安全性**: 適応的選択暗号文攻撃に対して安全\n- **Fujisaki-Okamoto変換**: CPA安全なPKEからCCA安全なKEMを構成\n- **NTT（Number Theoretic Transform）**: 多項式乗算を高速化\n- **性能**: 鍵生成、カプセル化、デカプセル化すべてマイクロ秒オーダー\n\nTLS 1.3への組み込みでは、鍵交換をECDHからML-KEMに置き換える、またはECDHとML-KEMのハイブリッド（X25519 + ML-KEM-768）が推奨されています。",
      },
    ],
    keyConcepts: [
      {
        term: "ML-KEM",
        termEn: "Module-Lattice-Based Key-Encapsulation Mechanism",
        definition:
          "FIPS 203標準の鍵カプセル化メカニズム。旧名CRYSTALS-Kyber。Module-LWE問題に基づき、ECDH/RSA鍵交換の量子耐性代替。",
      },
      {
        term: "KEM",
        termEn: "Key Encapsulation Mechanism",
        definition:
          "公開鍵を用いて共有秘密をカプセル化する方式。KeyGen、Encaps、Decapsの3操作。PQCではDH型鍵交換の代わりにKEMが標準的。",
      },
      {
        term: "IND-CCA2",
        termEn: "Indistinguishability under Adaptive Chosen Ciphertext Attack",
        definition:
          "適応的選択暗号文攻撃に対する安全性。攻撃者が復号オラクルにアクセスできても、暗号文から平文の情報を得られない。ML-KEMが満たす安全性レベル。",
      },
      {
        term: "ハイブリッド鍵交換",
        termEn: "Hybrid Key Exchange",
        definition:
          "古典的鍵交換（ECDH）とPQC鍵交換（ML-KEM）を組み合わせる方式。どちらか一方が破られても安全性を維持。移行期の推奨アプローチ。",
      },
    ],
  },
  {
    id: "pqc-lesson-3",
    topicId: "pqc-standards",
    order: 3,
    title: "ML-DSA（デジタル署名）",
    estimatedMinutes: 35,
    sections: [
      {
        type: "text",
        content:
          "ML-DSA（Module-Lattice-Based Digital Signature Algorithm、旧名CRYSTALS-Dilithium）は、FIPS 204として標準化されたデジタル署名アルゴリズムです。現在のECDSA、RSA-PSS、EdDSAの置き換えとして使用されます。\n\nML-DSAは、Module-LWEとModule-SIS（Short Integer Solution）問題の困難性に基づいています。NISTが最優先で推奨する署名アルゴリズムです。",
      },
      {
        type: "diagram",
        content:
          "ML-DSAの3つのパラメータセット:\n\n| パラメータ    | セキュリティ | 公開鍵   | 署名     | 秘密鍵    |\n|-------------|------------|---------|---------|----------|\n| ML-DSA-44   | Level 2    | 1,312 B | 2,420 B | 2,560 B  |\n| ML-DSA-65   | Level 3    | 1,952 B | 3,293 B | 4,032 B  |\n| ML-DSA-87   | Level 5    | 2,592 B | 4,595 B | 4,896 B  |\n\n比較:\n- ECDSA P-256: 公開鍵 64B, 署名 64B\n- RSA-2048:   公開鍵 256B, 署名 256B\n→ ML-DSAは桁違いに大きい。帯域幅への影響を考慮する必要あり。",
      },
      {
        type: "code",
        content: `# ML-DSA digital signature using liboqs
import oqs

# Initialize ML-DSA-65 (Level 3)
sig = oqs.Signature("ML-DSA-65")

# Key generation
public_key = sig.generate_keypair()
print(f"Public key size:  {len(public_key)} bytes")

# Sign a message
message = b"PQC migration plan for financial systems"
signature = sig.sign(message)
print(f"Signature size:   {len(signature)} bytes")

# Verify
is_valid = sig.verify(message, signature, public_key)
print(f"Signature valid:  {is_valid}")

# Tampered message verification
try:
    tampered = b"PQC migration plan for gaming systems"
    is_valid = sig.verify(tampered, signature, public_key)
    print(f"Tampered valid:   {is_valid}")
except Exception as e:
    print(f"Tampered rejected: {e}")`,
        language: "python",
      },
      {
        type: "callout",
        content:
          "ML-DSAの署名サイズはECDSAの約50倍です。これはTLS証明書チェーン（通常3-4証明書 × 2署名）で顕著な影響があります。帯域幅が制約される環境（IoT、モバイル等）では、FN-DSA（署名サイズが小さい）やハイブリッド署名を検討する必要があります。",
        calloutType: "warning",
      },
      {
        type: "text",
        content:
          "ML-DSAの署名生成プロセス（高レベル）:\n\n1. 秘密鍵からマスキングベクトル y をサンプリング\n2. w = A × y mod q を計算\n3. w の高ビット部分をコミットメントとしてハッシュ → チャレンジ c\n4. z = y + c × s（sは秘密鍵の一部）を計算\n5. z のノルムが閾値を超えたら1からやり直し（リジェクションサンプリング）\n6. 署名 = (z, hint)\n\nリジェクションサンプリングにより、署名から秘密鍵の情報がリークしないことを保証しています。このため署名生成は非決定的（毎回異なる署名が生成される）です。",
      },
    ],
    keyConcepts: [
      {
        term: "ML-DSA",
        termEn: "Module-Lattice-Based Digital Signature Algorithm",
        definition:
          "FIPS 204標準のデジタル署名。旧名CRYSTALS-Dilithium。Module-LWE/SIS問題に基づく。NISTが最優先で推奨するPQC署名アルゴリズム。",
      },
      {
        term: "リジェクションサンプリング",
        termEn: "Rejection Sampling",
        definition:
          "署名生成時に秘密鍵の情報がリークしないよう、条件を満たさない署名を破棄して再生成する手法。ML-DSAの安全性を支える重要なメカニズム。",
      },
      {
        term: "Module-SIS",
        termEn: "Module Short Integer Solution",
        definition:
          "格子上の短いベクトルを見つける問題のモジュール版。ML-DSAの安全性の根拠の一つ。量子コンピュータでも効率的に解けないと考えられている。",
      },
    ],
  },
  {
    id: "pqc-lesson-4",
    topicId: "pqc-standards",
    order: 4,
    title: "SLH-DSAとFN-DSA",
    estimatedMinutes: 35,
    sections: [
      {
        type: "text",
        content:
          "ML-DSA以外にもNISTは2つの署名アルゴリズムを標準化しています。用途や制約に応じて使い分ける必要があります。\n\n**SLH-DSA（FIPS 205、旧名SPHINCS+）:**\nハッシュベースの署名アルゴリズム。安全性がハッシュ関数のみに依存するため、格子問題に未知の脆弱性が見つかった場合のバックアップとして重要です。ただし署名サイズが大きく、署名生成が遅い。\n\n**FN-DSA（FIPS 206、旧名FALCON）:**\nNTRU格子に基づく署名アルゴリズム。ML-DSAより署名サイズが小さいのが利点。ただし実装が複雑で、浮動小数点演算が必要なためサイドチャネル攻撃への注意が必要。",
      },
      {
        type: "diagram",
        content:
          "PQC署名アルゴリズム比較表:\n\n| 特性         | ML-DSA-65 | SLH-DSA-SHA2-128f | FN-DSA-512 |\n|-------------|-----------|-------------------|------------|\n| 安全性の根拠 | 格子(M-LWE/SIS) | ハッシュのみ | NTRU格子  |\n| 公開鍵       | 1,952 B   | 32 B              | 897 B      |\n| 署名サイズ   | 3,293 B   | 17,088 B          | 666 B      |\n| 署名速度     | 速い      | 遅い              | 速い       |\n| 検証速度     | 速い      | 速い              | 速い       |\n| 実装難度     | 中        | 低                | 高         |\n| NIST推奨度   | 最優先    | バックアップ      | 帯域制約時 |",
      },
      {
        type: "text",
        content:
          "SLH-DSAの特徴:\n\n- **安全性**: ハッシュ関数（SHA-256/SHAKE）の安全性のみに依存。格子問題の脆弱性が発見されても影響を受けない\n- **ステートレス**: 署名に状態管理が不要（LMS/XMSSと異なる）\n- **パラメータ**: f（高速）とs（コンパクト）の2バリエーション\n  - SLH-DSA-SHA2-128f: 署名が速いが大きい（17KB）\n  - SLH-DSA-SHA2-128s: 署名が小さいが遅い（7KB）\n- **用途**: ファームウェア署名、コードサイニング等、署名サイズより安全性の確実性を重視する場面\n\n公開鍵が32バイトと極小なのも特徴です。リソースが限られたデバイスの鍵保存に有利です。",
      },
      {
        type: "text",
        content:
          "FN-DSAの特徴:\n\n- **署名サイズ**: 666バイト（FN-DSA-512）で、PQC署名の中で最小\n- **安全性の根拠**: NTRU格子問題の困難性\n- **実装の複雑さ**: ガウス分布からのサンプリングに浮動小数点演算が必要\n- **サイドチャネル**: 浮動小数点演算のタイミング差から秘密鍵が漏洩するリスク\n- **用途**: TLS証明書チェーンなど、署名サイズがボトルネックになる場面\n\n実装難度の高さから、NISTはML-DSAを最優先とし、FN-DSAは署名サイズが重要な場合のオプションとしています。",
      },
      {
        type: "callout",
        content:
          "コンサルティングでの使い分け推奨:\n- 一般用途 → ML-DSA-65（最もバランスが良い）\n- 帯域幅制約 → FN-DSA-512（署名が最小、ただし実装注意）\n- 最大限の安全性保証 → SLH-DSA（ハッシュのみに依存）\n- 高セキュリティ要件 → ML-DSA-87（Level 5）\n\n「格子が破られたら？」という質問にはSLH-DSAで対応できると説明できます。",
        calloutType: "tip",
      },
    ],
    keyConcepts: [
      {
        term: "SLH-DSA",
        termEn: "Stateless Hash-Based Digital Signature Algorithm",
        definition:
          "FIPS 205標準。旧名SPHINCS+。ハッシュ関数の安全性のみに依存する署名アルゴリズム。署名が大きいが安全性の根拠が最も保守的。格子暗号のバックアップ。",
      },
      {
        term: "FN-DSA",
        termEn: "FFT over NTRU-Lattice-Based Digital Signature Algorithm",
        definition:
          "FIPS 206標準。旧名FALCON。NTRU格子に基づく署名。PQC中で最小の署名サイズ（666B）。実装が複雑で浮動小数点演算が必要。",
      },
      {
        term: "NTRU格子",
        termEn: "NTRU Lattice",
        definition:
          "1996年に提案された格子ベースの暗号方式に基づく数学的構造。FN-DSAの安全性の根拠。Module-LWEとは異なる格子問題に基づく。",
      },
      {
        term: "ステートレス署名",
        termEn: "Stateless Signature",
        definition:
          "署名に状態管理が不要な方式。SLH-DSAが該当。LMS/XMSSのようなステートフル署名は状態管理の失敗で安全性が破綻するリスクがある。",
      },
    ],
  },
  {
    id: "pqc-lesson-5",
    topicId: "pqc-standards",
    order: 5,
    title: "liboqsで体験するPQC",
    estimatedMinutes: 40,
    sections: [
      {
        type: "text",
        content:
          "liboqs（Open Quantum Safe）は、PQCアルゴリズムの実装を提供するオープンソースライブラリです。C言語で実装され、Python、Go、Java、Rust等のラッパーがあります。\n\nPQCアルゴリズムを実際に手を動かして使うことで、鍵サイズや性能の感覚を掴むことができます。コンサルティングでも「実際に動かして確認した」と言えることが信頼につながります。",
      },
      {
        type: "code",
        content: `# Install liboqs Python wrapper
# pip install liboqs-python

import oqs
import time

# List available algorithms
print("Available KEMs:", oqs.get_enabled_KEM_mechanisms())
print("Available Sigs:", oqs.get_enabled_sig_mechanisms())

# ===== KEM Benchmark =====
print("\\n=== KEM Benchmark ===")
for kem_name in ["ML-KEM-512", "ML-KEM-768", "ML-KEM-1024"]:
    kem = oqs.KeyEncapsulation(kem_name)

    # KeyGen
    start = time.perf_counter()
    pk = kem.generate_keypair()
    keygen_time = time.perf_counter() - start

    # Encaps
    start = time.perf_counter()
    ct, ss_enc = kem.encap_secret(pk)
    encaps_time = time.perf_counter() - start

    # Decaps
    start = time.perf_counter()
    ss_dec = kem.decap_secret(ct)
    decaps_time = time.perf_counter() - start

    assert ss_enc == ss_dec
    print(f"{kem_name}:")
    print(f"  PK: {len(pk)}B, CT: {len(ct)}B, SS: {len(ss_enc)}B")
    print(f"  KeyGen: {keygen_time*1000:.2f}ms, "
          f"Encaps: {encaps_time*1000:.2f}ms, "
          f"Decaps: {decaps_time*1000:.2f}ms")`,
        language: "python",
      },
      {
        type: "code",
        content: `# ===== Signature Benchmark =====
print("\\n=== Signature Benchmark ===")
message = b"Document to sign for PQC migration assessment"

for sig_name in ["ML-DSA-44", "ML-DSA-65", "ML-DSA-87",
                  "Falcon-512", "Falcon-1024",
                  "SPHINCS+-SHA2-128f-simple"]:
    try:
        sig = oqs.Signature(sig_name)

        # KeyGen
        start = time.perf_counter()
        pk = sig.generate_keypair()
        keygen_time = time.perf_counter() - start

        # Sign
        start = time.perf_counter()
        signature = sig.sign(message)
        sign_time = time.perf_counter() - start

        # Verify
        start = time.perf_counter()
        is_valid = sig.verify(message, signature, pk)
        verify_time = time.perf_counter() - start

        print(f"{sig_name}:")
        print(f"  PK: {len(pk)}B, Sig: {len(signature)}B")
        print(f"  KeyGen: {keygen_time*1000:.2f}ms, "
              f"Sign: {sign_time*1000:.2f}ms, "
              f"Verify: {verify_time*1000:.2f}ms")
    except Exception as e:
        print(f"{sig_name}: Not available ({e})")`,
        language: "python",
      },
      {
        type: "example",
        content:
          "ベンチマーク結果の目安（一般的なPC、参考値）:\n\nML-KEM-768: KeyGen 0.05ms, Encaps 0.07ms, Decaps 0.07ms\nML-DSA-65:  KeyGen 0.15ms, Sign 0.50ms, Verify 0.15ms\nFalcon-512: KeyGen 5.00ms, Sign 0.80ms, Verify 0.10ms\nSPHINCS+-128f: KeyGen 0.30ms, Sign 15.0ms, Verify 0.50ms\n\n→ ML-KEM/ML-DSAはECDH/ECDSAに匹敵する速度。\n→ SPHINCS+の署名生成は桁違いに遅い。\n→ Falconの鍵生成は遅いが署名は高速。",
      },
      {
        type: "code",
        content: `# ===== Hybrid KEM Example (X25519 + ML-KEM-768) =====
# Conceptual implementation of hybrid key exchange
from cryptography.hazmat.primitives.asymmetric.x25519 import (
    X25519PrivateKey, X25519PublicKey
)
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.kdf.hkdf import HKDF

# Classical part: X25519
alice_x25519_sk = X25519PrivateKey.generate()
alice_x25519_pk = alice_x25519_sk.public_key()

bob_x25519_sk = X25519PrivateKey.generate()
bob_x25519_pk = bob_x25519_sk.public_key()

# PQC part: ML-KEM-768
kem = oqs.KeyEncapsulation("ML-KEM-768")
alice_pqc_pk = kem.generate_keypair()

# Bob combines both
x25519_shared = bob_x25519_sk.exchange(alice_x25519_pk)
pqc_ct, pqc_shared = kem.encap_secret(alice_pqc_pk)

# Alice combines both
x25519_shared_alice = alice_x25519_sk.exchange(bob_x25519_pk)
pqc_shared_alice = kem.decap_secret(pqc_ct)

# Derive final shared key from both
combined_alice = x25519_shared_alice + pqc_shared_alice
combined_bob = x25519_shared + pqc_shared

final_key_alice = HKDF(
    algorithm=hashes.SHA256(), length=32,
    salt=None, info=b"hybrid-kem",
).derive(combined_alice)

final_key_bob = HKDF(
    algorithm=hashes.SHA256(), length=32,
    salt=None, info=b"hybrid-kem",
).derive(combined_bob)

assert final_key_alice == final_key_bob
print("Hybrid key exchange successful!")
print(f"Final key: {final_key_alice.hex()[:32]}...")`,
        language: "python",
      },
      {
        type: "callout",
        content:
          "ハイブリッド鍵交換（X25519 + ML-KEM-768）は移行期の推奨アプローチです。Chromeは2024年からTLS接続でこのハイブリッド方式を有効にしています。「どちらかが破られても安全」という二重の保護を提供します。",
        calloutType: "important",
      },
    ],
    keyConcepts: [
      {
        term: "liboqs",
        termEn: "Open Quantum Safe library",
        definition:
          "PQCアルゴリズムの実装を提供するオープンソースライブラリ。C実装にPython/Go/Java/Rustラッパー。PQCの検証・ベンチマークに使用。",
      },
      {
        term: "oqs-provider",
        termEn: "OQS OpenSSL Provider",
        definition:
          "liboqsのPQCアルゴリズムをOpenSSL 3.xで使用可能にするプロバイダ。既存のOpenSSLベースのアプリケーションにPQCを組み込める。",
      },
      {
        term: "X25519+ML-KEM-768",
        termEn: "X25519 + ML-KEM-768 Hybrid",
        definition:
          "古典的鍵交換（X25519）とPQC（ML-KEM-768）を組み合わせたハイブリッド方式。Chrome等が採用。移行期の推奨アプローチ。",
      },
    ],
  },
] as const satisfies readonly Lesson[];
