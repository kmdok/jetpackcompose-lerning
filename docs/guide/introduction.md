# イントロダクション

## Jetpack Composeとは

Jetpack ComposeはAndroidの最新のUIツールキットで、宣言的にUIを構築できるモダンなフレームワークです。ReactやFlutterと同様に、UIを状態の関数として表現します。

### 主な特徴

- **宣言的UI**: UIを状態の関数として記述
- **Kotlinネイティブ**: Kotlin言語の機能をフル活用
- **プレビュー機能**: Android Studioでリアルタイムプレビュー
- **マテリアルデザイン**: Material Design 3を標準サポート
- **完全互換**: 既存のAndroid Viewとも共存可能

## なぜJetpack Composeを学ぶのか

### 1. モダンなAndroid開発の標準

Jetpack Composeは、Googleが推奨する最新のAndroid UI開発手法です。新規プロジェクトではComposeの採用が推奨されています。

### 2. 開発効率の向上

従来のXMLベースのUI構築と比較して、コード量が大幅に削減され、UIとロジックを一箇所で管理できます。

```kotlin
// Composeの例 - シンプルで直感的
@Composable
fun Greeting(name: String) {
    Text(text = "Hello $name!")
}
```

```xml
<!-- 従来のXMLの例 - 複雑で冗長 -->
<TextView
    android:id="@+id/greeting"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="Hello World!" />
```

### 3. ReactやFlutterの知識が活きる

すでにReactやFlutterを使ったことがある方は、多くの概念が共通しているため、学習コストが低くなります。

| 概念 | React | Flutter | Jetpack Compose |
|------|-------|---------|-----------------|
| UIコンポーネント | Component | Widget | Composable |
| 状態管理 | useState | setState | remember + mutableStateOf |
| 副作用 | useEffect | initState/dispose | LaunchedEffect/DisposableEffect |
| リスト | map() | ListView.builder | LazyColumn |

## Jetpack Composeの基本概念

### Composable関数

ComposeではUIを**Composable関数**で構築します。`@Composable`アノテーションを付けた関数がUIコンポーネントになります。

```kotlin
@Composable
fun MyApp() {
    Text("Hello, Jetpack Compose!")
}
```

これはReactの関数コンポーネントやFlutterのWidgetに相当します。

### 宣言的UI

状態が変わると、UIが自動的に再構築されます。

```kotlin
@Composable
fun Counter() {
    var count by remember { mutableStateOf(0) }

    Column {
        Text("Count: $count")
        Button(onClick = { count++ }) {
            Text("Increment")
        }
    }
}
```

### 単方向データフロー

Composeは単方向データフローを採用しています：

1. **State（状態）** → UIを駆動するデータ
2. **Event（イベント）** → 状態を変更するアクション
3. **Recomposition（再構築）** → 状態変更時にUIを自動更新

```
State ──→ UI
  ↑        │
  └─ Event ┘
```

## 開発環境

### 必要なツール

- **Android Studio** (Hedgehog 2023.1.1以降推奨)
- **Kotlin** 1.9.0以降
- **JDK** 17以降

### プロジェクト作成

Android Studioで新規プロジェクトを作成する際、"Empty Compose Activity"テンプレートを選択するだけです。

## 次のステップ

- [Flutter/React との比較](/guide/comparison) - 既知の概念との対応を確認
- [環境セットアップ](/guide/setup) - 開発環境を整える
- [Kotlin基礎](/guide/kotlin-basics) - Kotlin言語の基本を学ぶ
