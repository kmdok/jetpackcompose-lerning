# Module 13: セキュリティと認証

**ゴール**: 生体認証、パスキー (Credential Manager)、安全なデータ保存をマスターする。

🔗 **公式ドキュメント (日本語)**:
*   [生体認証ダイアログを表示する](https://developer.android.com/training/sign-in/biometric-auth?hl=ja)
*   [認証情報マネージャー (Credential Manager)](https://developer.android.com/training/sign-in/credential-manager?hl=ja)

---

## 1. 生体認証 (BiometricPrompt)
指紋認証や顔認証を統一的に扱うAPIです。
昔の `FingerprintManager` は非推奨です。

### 実装ステップ
1.  `BiometricManager` でハードウェア対応を確認。
2.  `BiometricPrompt` インスタンスを作成 (コールバック定義)。
3.  `promptInfo` を作成 (タイトルなど)。
4.  `authenticate()` を呼ぶ。

```kotlin
val promptInfo = BiometricPrompt.PromptInfo.Builder()
    .setTitle("ログイン")
    .setSubtitle("生体認証を使ってログイン")
    .setNegativeButtonText("キャンセル")
    .build()

val biometricPrompt = BiometricPrompt(activity, executor, callback)
biometricPrompt.authenticate(promptInfo)
```

### CryptoObject (高度なセキュリティ)
単に認証するだけでなく、**認証成功時のみ復号できる暗号化データ**を扱う場合は、`CryptoObject` を渡します。
これにより、「認証をバイパスしてデータだけ盗む」攻撃を防げます。

---

## 2. Credential Manager (パスキー)
Android 14以降の新しい認証標準です。
*   **Passkeys**: パスワードレス認証。
*   **Sign in with Google**: Googleアカウントでのログイン。
*   **保存されたパスワード**: 従来のパスワードマネージャー。

これらを統一されたUIで扱えます。

```kotlin
val credentialManager = CredentialManager.create(context)

val getCredentialRequest = GetCredentialRequest.Builder()
    .addCredentialOption(GetGoogleIdOption(...))
    .addCredentialOption(GetPasswordOption(...))
    .build()

val result = credentialManager.getCredential(context, getCredentialRequest)
```

---

## 3. 安全なデータ保存
### EncryptedSharedPreferences
SharedPreferencesのラッパーで、KeyとValueを自動的に暗号化します。
暗号鍵はハードウェアレベル (Keystore) で管理されます。

```kotlin
val masterKey = MasterKey.Builder(context)
    .setKeyScheme(MasterKey.KeyScheme.AES256_GCM)
    .build()

val sharedPreferences = EncryptedSharedPreferences.create(
    context,
    "secret_shared_prefs",
    masterKey,
    EncryptedSharedPreferences.PrefKeyEncryptionScheme.AES256_SIV,
    EncryptedSharedPreferences.PrefValueEncryptionScheme.AES256_GCM
)
```

### Android Keystore System
暗号鍵をアプリ内ではなく、OS管理下のコンテナ (TEE/StrongBox) に保存する仕組みです。
アプリから鍵を取り出すことはできず、「署名して」「復号して」という命令だけを送ります。

---

## 🛑 理解度チェック

### クイズ 1: パスキー
Credential Managerを使うメリットは？
*   A) パスワード、Googleログイン、パスキーを統一されたAPIとUIで扱える
*   B) 独自のログインUIを自由に作れる
*   C) サーバー側の実装が不要になる

<details>
<summary>答え</summary>

**A)**。ユーザーにとっても一貫した体験を提供できます。

</details>

### クイズ 2: 暗号化
アクセストークンなどの機密情報を保存するのに最も適切な場所は？
*   A) 通常の SharedPreferences
*   B) EncryptedSharedPreferences
*   C) 外部ストレージのテキストファイル

<details>
<summary>答え</summary>

**B) EncryptedSharedPreferences**。自動的に暗号化され、鍵も安全に管理されます。

</details>

### クイズ 3: 生体認証
`BiometricPrompt` で `CryptoObject` を使う理由は？
*   A) 認証速度を上げるため
*   B) 認証成功とデータの復号を紐付け、セキュリティを高めるため
*   C) 指紋画像の生データを取得するため

<details>
<summary>答え</summary>

**B)**。認証画面をスキップ（改ざん）されても、鍵がアンロックされないためデータは復号できません。

</details>
