# Module 12: インテントとシステム連携

**ゴール**: 他のアプリとの連携 (データ共有、起動、被起動) を深く理解し、適切な手段を選択できるようにする。

🔗 **公式ドキュメント (日本語)**:
*   [他のアプリとの対話](https://developer.android.com/training/basics/intents?hl=ja)
*   [共有データの受信](https://developer.android.com/training/sharing/receive?hl=ja)
*   [Android App Links の処理](https://developer.android.com/training/app-links?hl=ja)

---

## 1. インテント (Intent): Androidのメッセージング
インテントは「やりたいこと」を記述したメッセージオブジェクトです。

### 明示的 (Explicit) vs 暗黙的 (Implicit)
*   **明示的**: クラス名を指定して起動。「このアプリの `DetailActivity` を開く」。
*   **暗黙的**: アクションを指定して起動。「地図を見たい (`ACTION_VIEW`)」「共有したい (`ACTION_SEND`)」。OSが適切なアプリを探します。

---

## 2. 他のアプリにデータを送る (共有シート)
テキストや画像を他のアプリ (LINE, Twitterなど) に送るには `Intent.createChooser` を使います。

```kotlin
val sendIntent = Intent().apply {
    action = Intent.ACTION_SEND
    putExtra(Intent.EXTRA_TEXT, "見てみて！このアプリすごいよ！")
    type = "text/plain"
}

val shareIntent = Intent.createChooser(sendIntent, "友達に教える")
context.startActivity(shareIntent)
```

### ファイルの共有 (FileProvider)
`file://` URIを他のアプリに渡すとクラッシュします (FileUriExposedException)。
**FileProvider** を使って `content://` URIを生成し、一時的なアクセス権を付与する必要があります。

1.  `AndroidManifest.xml` に `<provider>` を定義。
2.  `res/xml/file_paths.xml` で公開ディレクトリを指定。
3.  `FileProvider.getUriForFile()` でURIを取得。

---

## 3. 他のアプリからデータを受け取る
自分のアプリが「共有先」としてリストに出るようにします。

### マニフェスト定義
`<intent-filter>` をActivityに追加します。

```xml
<activity android:name=".ShareActivity">
    <intent-filter>
        <action android:name="android.intent.action.SEND" />
        <category android:name="android.intent.category.DEFAULT" />
        <data android:mimeType="text/plain" />
        <data android:mimeType="image/*" />
    </intent-filter>
</activity>
```

### データの取得
Activity (または `MainActivity`) で Intent を解析します。

```kotlin
// Activity.onCreate / onNewIntent
if (intent?.action == Intent.ACTION_SEND) {
    if ("text/plain" == intent.type) {
        val sharedText = intent.getStringExtra(Intent.EXTRA_TEXT)
        // ...
    }
}
```

---

## 4. ディープリンク (Deep Links) vs App Links
URL (`https://example.com/user/1`) をタップした時に自分のアプリを起動させます。

| 機能 | Deep Links (Custom Scheme) | Android App Links |
| :--- | :--- | :--- |
| **形式** | `myapp://host/path` | `https://example.com/path` |
| **検証** | なし (誰でも定義可能) | あり (サーバーに証明書が必要) |
| **挙動** | ダイアログが出る可能性あり | **即座にアプリが起動** (検証成功時) |

> [!IMPORTANT]
> 現代のAndroid開発では、セキュリティとUXの観点から **Android App Links** (`https`) が推奨されます。

### 定義方法
`autoVerify="true"` が重要です。

```xml
<intent-filter android:autoVerify="true">
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />

    <data android:scheme="https" android:host="www.example.com" />
</intent-filter>
```

---

## 5. ブロードキャスト (BroadcastReceiver)
システムや他のアプリからのイベント (充電開始、機内モードなど) を受け取ります。
Android 8.0以降、多くの暗黙的ブロードキャストはマニフェストで受信できなくなりました (動的登録が必要)。

```kotlin
// 動的登録 (Activity/Service内)
val receiver = object : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent) {
        if (intent.action == Intent.ACTION_AIRPLANE_MODE_CHANGED) {
            // ...
        }
    }
}

// 登録
registerReceiver(receiver, IntentFilter(Intent.ACTION_AIRPLANE_MODE_CHANGED))
```

---

## 🛑 理解度チェック

### クイズ 1: ファイル共有
カメラアプリで撮った写真を、自分のアプリで受け取りたい。相手のアプリから渡されるURIのスキームは通常どれ？
*   A) `file://`
*   B) `content://`
*   C) `http://`

<details>
<summary>答え</summary>

**B) `content://`**。FileProviderなどを通じてセキュアに共有されます。

</details>

### クイズ 2: ディープリンク
ユーザーがURLをタップした時、ダイアログを出さずに**強制的に**自分のアプリを開かせたい。何を使うべき？
*   A) Custom Scheme (`myapp://`)
*   B) Android App Links (`https://` + `autoVerify`)
*   C) Intent Filter

<details>
<summary>答え</summary>

**B) Android App Links**。ドメイン所有権の検証に成功すれば、ブラウザを経由せず即座にアプリが起動します。

</details>

### クイズ 3: 共有の受信
アプリが既に起動している状態で、共有インテントを受け取った。どのメソッドが呼ばれる？
*   A) `onCreate`
*   B) `onNewIntent`
*   C) `onResume`

<details>
<summary>答え</summary>

**B) `onNewIntent`** (launchModeが `singleTop` や `singleTask` の場合)。ここで `intent` プロパティを更新する必要があります (`setIntent(intent)`)。

</details>
