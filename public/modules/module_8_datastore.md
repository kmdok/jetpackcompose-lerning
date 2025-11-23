# Module 8: DataStore と設定保存

**ゴール**: SharedPreferencesを置き換える、モダンで非同期なデータ保存方法 DataStore をマスターする。

🔗 **公式ドキュメント (日本語)**:
*   [Jetpack DataStore](https://developer.android.com/topic/libraries/architecture/datastore?hl=ja)

---

## 1. DataStore vs SharedPreferences
| 機能 | SharedPreferences | DataStore |
| :--- | :--- | :--- |
| **API** | 同期 (UIブロックの危険) | 非同期 (Flow / Coroutines) |
| **型安全性** | なし (Key-Value) | あり (Proto DataStore) |
| **エラー処理** | なし | あり (IOExceptionなど) |
| **マイグレーション** | なし | あり |

> [!IMPORTANT]
> 新規アプリでは **DataStore** を使いましょう。

---

## 2. Preferences DataStore
Key-Value形式。SharedPreferencesに近いですが、非同期です。

### 依存関係
`implementation("androidx.datastore:datastore-preferences:1.0.0")`

### 定義と読み書き

```kotlin
// 1. インスタンス作成 (拡張プロパティとして定義)
val Context.dataStore: DataStore<Preferences> by preferencesDataStore(name = "settings")

// キー定義
val THEME_KEY = stringPreferencesKey("theme")

class SettingsRepository(private val context: Context) {
    // 2. 読み込み (Flow)
    val themeFlow: Flow<String> = context.dataStore.data
        .map { preferences ->
            preferences[THEME_KEY] ?: "Light" // デフォルト値
        }

    // 3. 書き込み (Suspend関数)
    suspend fun setTheme(theme: String) {
        context.dataStore.edit { preferences ->
            preferences[THEME_KEY] = theme
        }
    }
}
```

---

## 3. Proto DataStore (型安全)
Protocol Buffers (Protobuf) を使って、オブジェクトをそのまま保存します。
スキーマ定義が必要ですが、型安全で高速です。

1.  `.proto` ファイルでスキーマを定義。
2.  Serializerを実装。
3.  `DataStore<UserPreferences>` のように型指定で使う。

> [!TIP]
> 複雑な設定データや、型安全性を重視する場合は Proto DataStore を推奨します。単純なフラグなら Preferences DataStore で十分です。

---

## 4. SharedPreferencesからの移行
既存の SharedPreferences のデータを DataStore に引き継ぐことができます。

```kotlin
val Context.dataStore by preferencesDataStore(
    name = "settings",
    produceMigrations = { context ->
        // "old_settings" という名前の SharedPreferences から移行
        listOf(SharedPreferencesMigration(context, "old_settings"))
    }
)
```

これだけで、初回アクセス時に自動的にデータがコピーされ、古い SharedPreferences は削除されます。

---

## 🛑 理解度チェック

### クイズ 1: 読み込み
DataStoreからデータを読み取る際、スレッドをブロックせずに値を取得するには？
*   A) `dataStore.data.first()` (suspend関数内で)
*   B) `dataStore.data.toList()`
*   C) `runBlocking { ... }`

<details>
<summary>答え</summary>

**A) `first()`**。Flowの現在の値を1つ取得して終了します。UIで監視し続けるなら `collect` や `collectAsState` を使います。

</details>

### クイズ 2: エラーハンドリング
ファイルの読み書きに失敗した場合 (IOException)、DataStoreはどうなる？
*   A) クラッシュする
*   B) Flowが例外を投げるので `catch` オペレータで補足できる
*   C) 無視される

<details>
<summary>答え</summary>

**B)**。Flowの `catch` でハンドリングできます。
```kotlin
dataStore.data
    .catch { exception ->
        if (exception is IOException) emit(emptyPreferences()) else throw exception
    }
```

</details>

### クイズ 3: 同期処理
DataStoreをメインスレッドで同期的に読み書きすることは推奨される？
*   A) はい
*   B) いいえ (絶対に避けるべき)

<details>
<summary>答え</summary>

**B) いいえ**。DataStoreはI/O操作を行うため、メインスレッドをブロックするとANR (Application Not Responding) の原因になります。

</details>
