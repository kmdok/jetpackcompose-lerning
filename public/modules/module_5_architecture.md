# Module 5: アーキテクチャとナビゲーション

**ゴール**: 本番レベルのアプリ構成、画面遷移、DI (依存性注入) を理解する。特にMVVMパターンに焦点を当てる。

🔗 **公式ドキュメント (日本語)**:
*   [Compose でのナビゲーション](https://developer.android.com/jetpack/compose/navigation?hl=ja)
*   [アーキテクチャ ガイド](https://developer.android.com/jetpack/guide?hl=ja)

---

## 1. Navigation Compose
Flutterの `GoRouter` や Reactの `React Router` に近いです。
全てがComposable関数です。

### 基本セットアップ
1.  `NavController` を作る。
2.  `NavHost` でルート(経路)を定義する。

```kotlin
val navController = rememberNavController()

NavHost(navController = navController, startDestination = "home") {
    composable("home") { HomeScreen(navController) }
    composable("details") { DetailScreen() }
}
```

### 引数の受け渡し
URLのような形式で渡します。

```kotlin
composable(
    "details/{userId}",
    arguments = listOf(navArgument("userId") { type = NavType.StringType })
) { backStackEntry ->
    val userId = backStackEntry.arguments?.getString("userId")
    DetailScreen(userId)
}

// 遷移
navController.navigate("details/123")
```

---

## 2. MVVM パターン
Composeでは、**単方向データフロー**が強制されるため、MVVMが自然にフィットします。

*   **Screen (View)**: `State` を受け取り、イベントを `ViewModel` に投げる。
*   **ViewModel**: イベントを受け取り、リポジトリを叩き、UIの状態 (`StateFlow`) を更新する。

```kotlin
@HiltViewModel
class UserViewModel @Inject constructor(
    private val repo: UserRepository
) : ViewModel() {
    // UIの状態
    val uiState = repo.users.map { UiState.Success(it) }
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), UiState.Loading)
}
```

---

## 3. 依存性注入 (Hilt)
Androidでは **Hilt** が標準です。
Flutterの `Riverpod` や `GetIt` の役割です。

### ViewModelの注入
`hiltViewModel()` を使うと、Navigationのスコープに紐付いたViewModelを自動で取得できます。

```kotlin
@Composable
fun UserScreen(
    // 自動的にDIされる。画面遷移して戻ってきても同じインスタンス(スコープ内なら)。
    viewModel: UserViewModel = hiltViewModel() 
) { ... }
```

---

## 4. マルチモジュール (概要)
大規模アプリでは機能ごとにモジュールを分けます。
*   `:app`: 全体をまとめる。
*   `:feature:home`: ホーム画面。
*   `:core:data`: データ層。

Composeなら、各モジュールが `Composable` 関数を公開するだけで連携できます。

---

## 🛑 理解度チェック

### クイズ 1: 画面遷移
引数を渡して画面遷移する場合、どのメソッドを使う？
*   A) `navController.push("route", args)`
*   B) `navController.navigate("route/arg")`
*   C) `Intent(context, DetailActivity::class.java)`

<details>
<summary>答え</summary>

**B) `navController.navigate("route/arg")`**。URLライクな文字列で指定します。

</details>

### クイズ 2: ViewModelのスコープ
`hiltViewModel()` で取得したViewModelはいつ破棄される？
*   A) コンポーザブルが画面から消えた瞬間
*   B) ナビゲーションのバックスタックからその画面が消えた時
*   C) アプリ終了時のみ

<details>
<summary>答え</summary>

**B)**。バックスタックに残っている間は生きています。

</details>

### クイズ 3: アーキテクチャ
ViewModelが保持すべきものは？
*   A) `NavController` のインスタンス
*   B) `Context`
*   C) UIの状態 (`StateFlow` など)

<details>
<summary>答え</summary>

**C)**。AとBはメモリリークの原因になるのでViewModelに持たせてはいけません。

</details>
