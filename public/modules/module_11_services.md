# Module 11: サービスと通知

**ゴール**: ユーザーに見える形でバックグラウンド処理を継続する「フォアグラウンドサービス」と、ユーザーへの通知をマスターする。

🔗 **公式ドキュメント (日本語)**:
*   [フォアグラウンド サービス](https://developer.android.com/guide/components/foreground-services?hl=ja)
*   [通知の作成](https://developer.android.com/develop/ui/views/notifications/build-notification?hl=ja)

---

## 1. フォアグラウンドサービス
音楽再生、位置情報追跡、通話など、**ユーザーが認知している**状態で動き続けるサービスです。
ステータスバーに「通知」を表示する義務があります。

### サービスの定義
Android 14以降、`foregroundServiceType` の指定が必須になりました。

```xml
<!-- AndroidManifest.xml -->
<service
    android:name=".MyMusicService"
    android:foregroundServiceType="mediaPlayback"
    android:exported="false" />
```

### サービスの起動

```kotlin
class MyService : Service() {
    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        // 5秒以内に startForeground を呼ばないとクラッシュする (ANR)
        startForeground(NOTIFICATION_ID, createNotification())
        
        // 処理開始...
        return START_STICKY // 強制終了されても再起動
    }
}
```

---

## 2. 通知 (Notifications)
Android 13 (API 33) 以降、通知の表示にはランタイム権限 (`POST_NOTIFICATIONS`) が必要です。

### 通知チャンネル (Notification Channel)
Android 8.0以降、全ての通知はチャンネルに属する必要があります。ユーザーはチャンネルごとにON/OFFできます。

```kotlin
val channel = NotificationChannel(
    "default_channel",
    "Default Notifications",
    NotificationManager.IMPORTANCE_DEFAULT
).apply {
    description = "General app notifications"
}

val notificationManager = context.getSystemService(NotificationManager::class.java)
notificationManager.createNotificationChannel(channel)
```

### 通知の表示

```kotlin
val notification = NotificationCompat.Builder(context, "default_channel")
    .setSmallIcon(R.drawable.ic_notification)
    .setContentTitle("Upload Complete")
    .setContentText("Your file has been uploaded.")
    .setPriority(NotificationCompat.PRIORITY_DEFAULT)
    .build()

// 権限チェックが必要
if (ActivityCompat.checkSelfPermission(...) == PERMISSION_GRANTED) {
    NotificationManagerCompat.from(context).notify(1, notification)
}
```

---

## 3. バックグラウンドサービスの制限
Android 8.0以降、アプリがバックグラウンドにある状態でサービスを起動することは厳しく制限されています。
基本的には **WorkManager** を使うか、即座に **startForeground** を呼ぶ必要があります。

---

## 🛑 理解度チェック

### クイズ 1: 権限
通知を表示するために必要な権限は？
*   A) `INTERNET`
*   B) `POST_NOTIFICATIONS` (Android 13+)
*   C) `ACCESS_NOTIFICATION_POLICY`

<details>
<summary>答え</summary>

**B) `POST_NOTIFICATIONS`**。ランタイムパーミッションなので、ダイアログを出してユーザーに許可を求める必要があります。

</details>

### クイズ 2: サービスの停止
フォアグラウンドサービスを停止するには？
*   A) `stopSelf()` を呼ぶ
*   B) 通知をスワイプして消す
*   C) アプリを閉じる

<details>
<summary>答え</summary>

**A) `stopSelf()`** (サービス内部から) または `stopService()` (外部から)。通知を消してもサービスは止まりません（そもそもフォアグラウンドサービスの通知は消せないことが多いです）。

</details>

### クイズ 3: チャンネル
通知チャンネルを作成せずに通知を表示しようとするとどうなる？ (Android 8.0以上)
*   A) デフォルトチャンネルで表示される
*   B) 表示されない (エラーログが出る)
*   C) クラッシュする

<details>
<summary>答え</summary>

**B) 表示されない**。必ずチャンネルを作成する必要があります。

</details>
