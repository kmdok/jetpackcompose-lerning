# 環境セットアップ

Jetpack Composeの開発を始めるための環境構築方法を説明します。

## 必要なツール

### 1. Android Studio

公式IDE。Jetpack Composeの開発には必須です。

- **推奨バージョン**: Hedgehog (2023.1.1) 以降
- **ダウンロード**: [https://developer.android.com/studio](https://developer.android.com/studio)

::: tip
FlutterでAndroid Studioを使用していた場合、同じIDEがそのまま使えます。
:::

### 2. JDK

- **必要バージョン**: JDK 17以降
- Android Studioに同梱されているので、通常は個別インストール不要

### 3. Kotlin

- **必要バージョン**: 1.9.0以降
- プロジェクトのGradleで自動的に管理されます

## プロジェクトの作成

### 1. Android Studioを起動

"New Project"を選択します。

### 2. テンプレート選択

"Empty Activity"テンプレートを選択します。これがJetpack Composeプロジェクトの基本です。

### 3. プロジェクト設定

```
Name: MyComposeApp
Package name: com.example.mycomposeapp
Save location: 任意
Language: Kotlin
Minimum SDK: API 24 (Android 7.0) 以降を推奨
Build configuration language: Kotlin DSL
```

::: warning
"Language"は必ず**Kotlin**を選択してください。JavaではJetpack Composeは使えません。
:::

### 4. プロジェクト作成

"Finish"をクリックすると、Gradleの同期が自動で始まります。

## プロジェクト構造

作成されたプロジェクトの構造：

```
MyComposeApp/
├── app/
│   ├── src/
│   │   └── main/
│   │       ├── java/com/example/mycomposeapp/
│   │       │   └── MainActivity.kt
│   │       └── AndroidManifest.xml
│   └── build.gradle.kts
├── gradle/
└── build.gradle.kts
```

### 重要なファイル

#### `MainActivity.kt`

```kotlin
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            MyComposeAppTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    Greeting("Android")
                }
            }
        }
    }
}

@Composable
fun Greeting(name: String, modifier: Modifier = Modifier) {
    Text(
        text = "Hello $name!",
        modifier = modifier
    )
}
```

#### `app/build.gradle.kts`

重要な依存関係：

```kotlin
dependencies {
    // Compose BOM (Bill of Materials)
    implementation(platform("androidx.compose:compose-bom:2024.01.00"))

    // Compose関連
    implementation("androidx.compose.ui:ui")
    implementation("androidx.compose.material3:material3")
    implementation("androidx.compose.ui:ui-tooling-preview")
    implementation("androidx.activity:activity-compose:1.8.2")

    // デバッグ用
    debugImplementation("androidx.compose.ui:ui-tooling")
}
```

## 実行とプレビュー

### エミュレータでの実行

1. ツールバーの▶️ボタンをクリック
2. エミュレータまたは実機を選択
3. アプリが起動します

### プレビュー機能

Composeの大きな利点の一つが、エミュレータなしでUIをプレビューできることです。

```kotlin
@Preview(showBackground = true)
@Composable
fun GreetingPreview() {
    MyComposeAppTheme {
        Greeting("Android")
    }
}
```

Android Studioの右上の"Split"または"Design"タブでプレビューが表示されます。

::: tip React/Flutterとの比較
- **React**: Hot Reloadに相当
- **Flutter**: Hot Reloadと同様の体験
- **Compose**: さらに高速で、エミュレータ起動不要
:::

### 複数プレビュー

複数のバリエーションを同時にプレビューできます：

```kotlin
@Preview(name = "Light Mode", showBackground = true)
@Preview(
    name = "Dark Mode",
    uiMode = Configuration.UI_MODE_NIGHT_YES,
    showBackground = true
)
@Composable
fun GreetingPreview() {
    MyComposeAppTheme {
        Greeting("Android")
    }
}
```

## 便利な設定

### ライブテンプレート

Android Studioの設定で、Composeのコードスニペットを追加できます：

- `comp` → `@Composable`関数
- `prev` → `@Preview`関数

### ショートカット

- **Cmd+Shift+F (Mac) / Ctrl+Shift+F (Win)**: プロジェクト全体検索
- **Cmd+B (Mac) / Ctrl+B (Win)**: 定義へジャンプ
- **Cmd+P (Mac) / Ctrl+P (Win)**: パラメータ情報表示

## トラブルシューティング

### Gradleの同期エラー

```bash
./gradlew clean build
```

### プレビューが表示されない

1. ビルドが完了しているか確認
2. `@Preview`アノテーションが正しく付いているか確認
3. "Build & Refresh"ボタンをクリック

### エミュレータが遅い

- システムイメージはx86_64を使用（ARM系より高速）
- RAMを2GB以上割り当て
- ハードウェアアクセラレーションを有効化

## 次のステップ

環境が整ったら、学習を始めましょう！

- [Kotlin基礎](/guide/kotlin-basics) - Kotlin言語の基本
- [Composableとは](/guide/composables) - Composeの基本概念
