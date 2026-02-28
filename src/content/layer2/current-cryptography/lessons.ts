import type { Lesson } from "@/types/content";

export const currentCryptographyLessons: readonly Lesson[] = [
  {
    id: "cc-lesson-1",
    topicId: "current-cryptography",
    order: 1,
    title: "対称鍵暗号 (AES)",
    estimatedMinutes: 30,
    sections: [
      {
        type: "text",
        content:
          "対称鍵暗号は、暗号化と復号に同じ鍵を使う方式です。現在最も広く使われている対称鍵暗号がAES（Advanced Encryption Standard）で、2001年にNISTが標準化しました。\n\nAESはブロック暗号の一種で、128ビットのデータブロックを固定長の鍵（128/192/256ビット）で暗号化します。SubBytes、ShiftRows、MixColumns、AddRoundKeyの4つの操作をラウンドとして繰り返すことで、入力データを攪拌します。",
      },
      {
        type: "callout",
        content:
          "AES-256は量子コンピュータに対してもGroverのアルゴリズムで鍵空間が半減する（256→128ビット相当）だけで、依然として安全とされています。これは対称鍵暗号の大きな強みです。",
        calloutType: "important",
      },
      {
        type: "code",
        content: `from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.primitives import padding
import os

# AES-256-CBC encryption example
key = os.urandom(32)  # 256-bit key
iv = os.urandom(16)   # 128-bit IV

# Encrypt
cipher = Cipher(algorithms.AES(key), modes.CBC(iv))
encryptor = cipher.encryptor()

padder = padding.PKCS7(128).padder()
padded_data = padder.update(b"Quantum Road - Learning PQC") + padder.finalize()

ciphertext = encryptor.update(padded_data) + encryptor.finalize()
print(f"Ciphertext: {ciphertext.hex()}")

# Decrypt
cipher = Cipher(algorithms.AES(key), modes.CBC(iv))
decryptor = cipher.decryptor()
decrypted_padded = decryptor.update(ciphertext) + decryptor.finalize()

unpadder = padding.PKCS7(128).unpadder()
plaintext = unpadder.update(decrypted_padded) + unpadder.finalize()
print(f"Plaintext: {plaintext.decode()}")`,
        language: "python",
      },
      {
        type: "text",
        content:
          "対称鍵暗号の課題は「鍵配送問題」です。暗号化と復号に同じ鍵を使うため、通信相手に安全に鍵を渡す方法が必要になります。この問題を解決するのが、次のレッスンで学ぶ公開鍵暗号です。\n\n実務では、TLS通信においてAESはデータ暗号化（バルク暗号化）に使われ、鍵の交換には公開鍵暗号が使われるハイブリッド構成が一般的です。",
      },
      {
        type: "example",
        content:
          "TLS 1.3の暗号スイート例: TLS_AES_256_GCM_SHA384\n- AES_256: 256ビットのAESで暗号化\n- GCM: Galois/Counter Modeで認証付き暗号化\n- SHA384: ハッシュ関数\n\nこの暗号スイートでは、AES-256-GCMがデータの暗号化と完全性保証を同時に行います。",
      },
    ],
    keyConcepts: [
      {
        term: "対称鍵暗号",
        termEn: "Symmetric-key Cryptography",
        definition:
          "暗号化と復号に同一の鍵を使用する暗号方式。AESが代表的。高速だが鍵配送問題がある。",
      },
      {
        term: "AES",
        termEn: "Advanced Encryption Standard",
        definition:
          "NISTが2001年に標準化したブロック暗号。鍵長128/192/256ビットに対応。現在最も広く使われる対称鍵暗号。",
      },
      {
        term: "鍵配送問題",
        termEn: "Key Distribution Problem",
        definition:
          "対称鍵暗号で、通信相手に安全に共通鍵を渡す方法が必要という根本的課題。公開鍵暗号やDiffie-Hellman鍵交換で解決される。",
      },
      {
        term: "認証付き暗号化",
        termEn: "Authenticated Encryption (AEAD)",
        definition:
          "暗号化と同時にデータの完全性・真正性を保証する方式。AES-GCMが代表的。改ざん検知が可能。",
      },
    ],
  },
  {
    id: "cc-lesson-2",
    topicId: "current-cryptography",
    order: 2,
    title: "公開鍵暗号 (RSA)",
    estimatedMinutes: 35,
    sections: [
      {
        type: "text",
        content:
          "公開鍵暗号は、暗号化と復号に異なる鍵（公開鍵と秘密鍵）を使う方式です。1977年にRivest、Shamir、Adlemanが発表したRSAは、最も広く使われてきた公開鍵暗号アルゴリズムです。\n\nRSAの安全性は「大きな合成数の素因数分解は困難である」という数学的仮定に基づいています。2つの大きな素数p, qの積n = p × qを計算するのは簡単ですが、nからp, qを求めるのは計算量的に困難です。",
      },
      {
        type: "diagram",
        content:
          "RSA鍵生成の流れ:\n\n1. 大きな素数 p, q を生成（各1024ビット以上）\n2. n = p × q を計算（RSAモジュラス）\n3. φ(n) = (p-1)(q-1) を計算\n4. e を選択（通常 65537）: gcd(e, φ(n)) = 1\n5. d を計算: e × d ≡ 1 (mod φ(n))\n\n公開鍵: (n, e)\n秘密鍵: (n, d)\n\n暗号化: c = m^e mod n\n復号:   m = c^d mod n",
      },
      {
        type: "code",
        content: `from cryptography.hazmat.primitives.asymmetric import rsa, padding
from cryptography.hazmat.primitives import hashes

# RSA key generation (2048-bit)
private_key = rsa.generate_private_key(
    public_exponent=65537,
    key_size=2048,
)
public_key = private_key.public_key()

# Encrypt with public key
message = b"PQC migration is critical"
ciphertext = public_key.encrypt(
    message,
    padding.OAEP(
        mgf=padding.MGF1(algorithm=hashes.SHA256()),
        algorithm=hashes.SHA256(),
        label=None,
    ),
)

# Decrypt with private key
plaintext = private_key.decrypt(
    ciphertext,
    padding.OAEP(
        mgf=padding.MGF1(algorithm=hashes.SHA256()),
        algorithm=hashes.SHA256(),
        label=None,
    ),
)
print(f"Decrypted: {plaintext.decode()}")`,
        language: "python",
      },
      {
        type: "callout",
        content:
          "RSA-2048は、古典コンピュータでは安全ですが、十分な規模の量子コンピュータが実現すればShorのアルゴリズムで多項式時間で破られます。これがPQC移行の最大の動機です。",
        calloutType: "warning",
      },
      {
        type: "text",
        content:
          "RSAは暗号化だけでなく、デジタル署名にも使われます。秘密鍵で署名し、公開鍵で検証することで、メッセージの真正性と否認防止を実現します。\n\n現在推奨される鍵長はRSA-2048以上ですが、NIST SP 800-57では2030年以降はRSA-3072以上を推奨しています。ただし、量子コンピュータの脅威を考慮すると、鍵長を増やすだけでは根本的な解決にはなりません。",
      },
    ],
    keyConcepts: [
      {
        term: "公開鍵暗号",
        termEn: "Public-key Cryptography",
        definition:
          "暗号化と復号に異なる鍵ペア（公開鍵・秘密鍵）を使用する方式。鍵配送問題を解決するが、対称鍵暗号より低速。",
      },
      {
        term: "素因数分解問題",
        termEn: "Integer Factorization Problem",
        definition:
          "大きな合成数を素因数に分解する計算問題。RSAの安全性の根拠。古典計算機では準指数時間だが、量子計算機では多項式時間で解ける。",
      },
      {
        term: "RSA",
        termEn: "Rivest-Shamir-Adleman",
        definition:
          "1977年発表の公開鍵暗号。素因数分解の困難性に基づく。暗号化とデジタル署名の両方に使用可能。量子コンピュータで破られる。",
      },
      {
        term: "OAEP",
        termEn: "Optimal Asymmetric Encryption Padding",
        definition:
          "RSA暗号化で使用されるパディング方式。選択暗号文攻撃に対する安全性を提供する。実装では必ずOAEPを使用すべき。",
      },
    ],
  },
  {
    id: "cc-lesson-3",
    topicId: "current-cryptography",
    order: 3,
    title: "楕円曲線暗号 (ECC)",
    estimatedMinutes: 35,
    sections: [
      {
        type: "text",
        content:
          "楕円曲線暗号（ECC）は、楕円曲線上の離散対数問題の困難性に基づく公開鍵暗号です。RSAと比べて、はるかに短い鍵長で同等の安全性を実現できるのが最大の利点です。\n\nECC-256ビットはRSA-3072ビットと同等の安全性を持ちます。鍵が短いため、計算が高速で、通信データ量も少なく、IoTデバイスなどリソースが限られた環境で特に有効です。",
      },
      {
        type: "diagram",
        content:
          "安全性レベルの比較（NISTセキュリティレベル）:\n\nセキュリティ | 対称鍵 | RSA鍵長 | ECC鍵長\n128ビット    | AES-128 | 3,072   | 256\n192ビット    | AES-192 | 7,680   | 384\n256ビット    | AES-256 | 15,360  | 521\n\n→ ECCはRSAの約1/12の鍵長で同等の安全性",
      },
      {
        type: "text",
        content:
          "楕円曲線上の離散対数問題（ECDLP）とは、楕円曲線上の点Gと Q = kG が与えられたときに、スカラー k を求める問題です。曲線上の点の加算は定義できますが、「何回加算したか」を逆算するのは困難です。\n\n主要な楕円曲線:\n- P-256（secp256r1）: NISTが標準化。TLSで最も広く使用\n- P-384（secp384r1）: より高い安全性が必要な場合\n- Curve25519: Daniel Bernsteinが設計。高速で実装ミスに強い\n- Ed25519: 署名用。Curve25519ベース。SSH、Signal等で採用",
      },
      {
        type: "code",
        content: `from cryptography.hazmat.primitives.asymmetric import ec
from cryptography.hazmat.primitives import hashes, serialization

# ECDSA key generation (P-256)
private_key = ec.generate_private_key(ec.SECP256R1())
public_key = private_key.public_key()

# Sign
message = b"Transition to PQC is necessary"
signature = private_key.sign(message, ec.ECDSA(hashes.SHA256()))
print(f"Signature length: {len(signature)} bytes")

# Verify
try:
    public_key.verify(signature, message, ec.ECDSA(hashes.SHA256()))
    print("Signature valid")
except Exception:
    print("Signature invalid")

# ECDH key exchange
peer_private = ec.generate_private_key(ec.SECP256R1())
peer_public = peer_private.public_key()

shared_key = private_key.exchange(ec.ECDH(), peer_public)
print(f"Shared secret length: {len(shared_key)} bytes")`,
        language: "python",
      },
      {
        type: "callout",
        content:
          "ECCもRSA同様、量子コンピュータのShorのアルゴリズムで破られます。楕円曲線上の離散対数問題は、素因数分解問題と同様に量子コンピュータで効率的に解けるためです。ECC-256は量子コンピュータに対して実質0ビットの安全性しかありません。",
        calloutType: "warning",
      },
    ],
    keyConcepts: [
      {
        term: "楕円曲線暗号",
        termEn: "Elliptic Curve Cryptography (ECC)",
        definition:
          "楕円曲線上の離散対数問題に基づく公開鍵暗号。RSAより短い鍵長で同等の安全性を実現。ECDSA、ECDH等のプロトコルで使用。",
      },
      {
        term: "ECDLP",
        termEn: "Elliptic Curve Discrete Logarithm Problem",
        definition:
          "楕円曲線上の点 Q = kG から k を求める問題。ECCの安全性の根拠。古典計算機では困難だが量子計算機では効率的に解ける。",
      },
      {
        term: "ECDH",
        termEn: "Elliptic Curve Diffie-Hellman",
        definition:
          "楕円曲線を用いた鍵交換プロトコル。TLSの鍵交換で広く使用される。通信路上で共通秘密を安全に導出する。",
      },
    ],
  },
  {
    id: "cc-lesson-4",
    topicId: "current-cryptography",
    order: 4,
    title: "暗号はなぜ安全か",
    estimatedMinutes: 25,
    sections: [
      {
        type: "text",
        content:
          "現行暗号の安全性は「計算量的安全性」に依存しています。つまり「理論的には解けるが、現実的な時間内では解けない」という仮定です。これは情報理論的安全性（原理的に解けない）とは異なります。\n\nこの「現実的な時間」の定義が、量子コンピュータの登場で根本的に変わろうとしています。",
      },
      {
        type: "diagram",
        content:
          "暗号の安全性の根拠マップ:\n\n暗号方式        | 安全性の根拠         | 量子耐性\n─────────────────────────────────────────────────\nAES-256        | 鍵空間の探索困難性    | ○ (128ビット相当に低下)\nRSA            | 素因数分解の困難性    | × (Shorで破られる)\nECC            | 楕円曲線離散対数の困難性 | × (Shorで破られる)\nSHA-256        | 原像攻撃の困難性     | △ (Groverで弱体化)\nDiffie-Hellman | 離散対数の困難性      | × (Shorで破られる)",
      },
      {
        type: "text",
        content:
          "NISTはセキュリティレベルを5段階で定義しています:\n\n- Level 1: AES-128の全数探索と同等以上\n- Level 2: SHA-256の衝突探索と同等以上\n- Level 3: AES-192の全数探索と同等以上\n- Level 4: SHA-384の衝突探索と同等以上\n- Level 5: AES-256の全数探索と同等以上\n\nPQCアルゴリズムもこのレベルに基づいて評価されます。例えばML-KEM-768はLevel 3、ML-KEM-1024はLevel 5を満たします。",
      },
      {
        type: "callout",
        content:
          "「Harvest Now, Decrypt Later（HNDL）」攻撃: 現在の暗号通信を傍受・保存しておき、将来量子コンピュータが実用化された時点で復号する戦略。機密性の高い情報は今から対策が必要です。金融データや政府通信は特にリスクが高い。",
        calloutType: "warning",
      },
      {
        type: "text",
        content:
          "暗号の安全性を保つための実務的なポイント:\n\n1. **Crypto Agility（暗号の俊敏性）**: 暗号アルゴリズムを容易に切り替えられるシステム設計\n2. **鍵管理**: 鍵の生成、保管、ローテーション、廃棄のライフサイクル管理\n3. **プロトコルの更新**: TLS 1.3への移行、古い暗号スイートの無効化\n4. **暗号インベントリ**: 組織内で使用している暗号方式の棚卸し\n\nこれらはPQC移行の前提条件であり、コンサルティングの第一歩です。",
      },
    ],
    keyConcepts: [
      {
        term: "計算量的安全性",
        termEn: "Computational Security",
        definition:
          "現実的な計算資源では破れないという仮定に基づく安全性。計算能力の向上で仮定が崩れるリスクがある。量子コンピュータはこの仮定を根本から変える。",
      },
      {
        term: "HNDL攻撃",
        termEn: "Harvest Now, Decrypt Later",
        definition:
          "現在の暗号通信を傍受・保存し、将来の量子コンピュータで復号する攻撃戦略。長期間の機密性が求められるデータに対する現実的な脅威。",
      },
      {
        term: "暗号の俊敏性",
        termEn: "Crypto Agility",
        definition:
          "暗号アルゴリズムやプロトコルを迅速に切り替えられるシステム設計原則。PQC移行の基盤となる重要概念。",
      },
      {
        term: "NISTセキュリティレベル",
        termEn: "NIST Security Level",
        definition:
          "NISTが定義する暗号の安全性の5段階評価基準。Level 1はAES-128相当、Level 5はAES-256相当。PQCアルゴリズムの評価にも使用される。",
      },
    ],
  },
] as const satisfies readonly Lesson[];
