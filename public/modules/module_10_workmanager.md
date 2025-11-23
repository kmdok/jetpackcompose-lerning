# Module 10: WorkManager とアラーム

**ゴール**: アプリが閉じられていても実行されるバックグラウンド処理と、正確な時間のスケジューリングをマスターする。

🔗 **公式ドキュメント (日本語)**:
*   [WorkManager でタスクのスケジュールを設定する](https://developer.android.com/topic/libraries/architecture/workmanager?hl=ja)
*   [アラームのスケジュール設定](https://developer.android.com/training/scheduling/alarms?hl=ja)

---

## 1. WorkManager: 延期可能な非同期タスク
「今すぐじゃなくていいけど、必ず実行したい処理」に使います (画像のアップロード、データの同期など)。
OSのバッテリー最適化 (Dozeモード) を考慮して、最適なタイミングで実行してくれます。

### CoroutineWorker
Kotlinでは `CoroutineWorker` を使います。

```kotlin
class UploadWorker(ctx: Context, params: WorkerParameters) : CoroutineWorker(ctx, params) {
    override suspend fun doWork(): Result {
        // バックグラウンドで実行される (suspend関数が呼べる)
        val success = uploadImages()
        return if (success) Result.success() else Result.retry()
    }
}
```

### リクエストの作成
*   **OneTimeWorkRequest**: 1回だけ実行。
*   **PeriodicWorkRequest**: 定期実行 (最短15分間隔)。

```kotlin
val constraints = Constraints.Builder()
    .setRequiredNetworkType(NetworkType.CONNECTED) // Wi-Fi接続時のみ
    .setRequiresCharging(true) // 充電中のみ
    .build()

val uploadWork = OneTimeWorkRequestBuilder<UploadWorker>()
    .setConstraints(constraints)
    .build()

WorkManager.getInstance(context).enqueue(uploadWork)
```

---

## 2. AlarmManager: 正確な時間のスケジュール
「朝7時に目覚ましを鳴らす」など、**正確な時間**に処理を行いたい場合に使います。
リソース消費が激しいため、単なるバックグラウンド処理には WorkManager を使うべきです。

### 正確なアラーム (Exact Alarms)
Android 12以降、正確なアラームには権限 (`SCHEDULE_EXACT_ALARM`) が必要です。

```kotlin
val alarmManager = context.getSystemService(Context.ALARM_SERVICE) as AlarmManager
val intent = Intent(context, AlarmReceiver::class.java)
val pendingIntent = PendingIntent.getBroadcast(
    context, 0, intent, PendingIntent.FLAG_IMMUTABLE
)

// 指定時刻にPendingIntentを発火
alarmManager.setExactAndAllowWhileIdle(
    AlarmManager.RTC_WAKEUP,
    triggerTimeMillis,
    pendingIntent
)
```

> [!WARNING]
> **Dozeモード**: `setExactAndAllowWhileIdle` を使うと、デバイスがスリープ中でも強制的に起動して実行します。乱用厳禁です。

---

## 🛑 理解度チェック

### クイズ 1: 使い分け
「毎日深夜2時にログをサーバーに送信したい」。どちらを使うべき？
*   A) AlarmManager
*   B) WorkManager

<details>
<summary>答え</summary>

**B) WorkManager**。
「深夜2時ぴったり」である必要はなく、「寝ている間に」実行できれば良いため。WorkManagerの `PeriodicWorkRequest` と制約 (充電中など) を組み合わせるのがベストプラクティスです。

</details>

### クイズ 2: アプリ終了後
WorkManagerでスケジュールしたタスクは、ユーザーがアプリをタスクキル (スワイプして終了) した後も実行される？
*   A) はい
*   B) いいえ

<details>
<summary>答え</summary>

**A) はい**。WorkManagerはシステムサービスにタスクを登録するため、アプリプロセスが死んでいてもOSが再起動して実行してくれます (一部の中華系メーカーの独自OSを除く)。

</details>

### クイズ 3: 最短間隔
WorkManagerの定期実行の最短間隔は？
*   A) 1分
*   B) 15分
*   C) 1時間

<details>
<summary>答え</summary>

**B) 15分**。これより短い間隔で実行したい場合は、フォアグラウンドサービスなどを検討する必要がありますが、バッテリー消費に注意が必要です。

</details>
