# Navigation Compose

Jetpack Composeでの画面遷移を学びます。

## Navigation Composeとは

::: info
**Navigation Compose**は、Jetpack Composeでの画面遷移を管理するライブラリです。

React RouterやFlutter Navigatorに相当します。
:::

## セットアップ

### 依存関係の追加

```kotlin
dependencies {
    implementation("androidx.navigation:navigation-compose:2.7.6")
}
```

## 基本的な使い方

### NavHostの定義

```kotlin
@Composable
fun AppNavigation() {
    val navController = rememberNavController()

    NavHost(
        navController = navController,
        startDestination = "home"
    ) {
        composable("home") {
            HomeScreen(
                onNavigateToDetail = {
                    navController.navigate("detail")
                }
            )
        }
        composable("detail") {
            DetailScreen(
                onNavigateBack = {
                    navController.popBackStack()
                }
            )
        }
    }
}
```

::: info 重要な用語
- **NavController**: ナビゲーションを制御するコントローラー
- **NavHost**: ナビゲーショングラフを定義するコンテナ
- **Route**: 画面を識別する文字列（URLのようなもの）
- **Destination**: 遷移先の画面
:::

## 画面遷移

### 前進（Navigate）

```kotlin
// シンプルな遷移
navController.navigate("detail")

// 単一インスタンス（戻るボタンで複数戻らないようにする）
navController.navigate("detail") {
    launchSingleTop = true
}

// バックスタックをクリア
navController.navigate("home") {
    popUpTo("home") { inclusive = true }
}
```

### 後退（Pop）

```kotlin
// 一つ前に戻る
navController.popBackStack()

// 特定の画面まで戻る
navController.popBackStack("home", inclusive = false)

// 戻れるかチェック
if (navController.previousBackStackEntry != null) {
    navController.popBackStack()
}
```

## パラメータの渡し方

### 方法1: 引数をRouteに含める（推奨）

```kotlin
NavHost(navController = navController, startDestination = "home") {
    composable("home") {
        HomeScreen(
            onUserClick = { userId ->
                navController.navigate("user/$userId")
            }
        )
    }

    composable(
        route = "user/{userId}",
        arguments = listOf(
            navArgument("userId") {
                type = NavType.IntType
            }
        )
    ) { backStackEntry ->
        val userId = backStackEntry.arguments?.getInt("userId")
        UserScreen(userId = userId)
    }
}
```

::: tip
React Routerの `/user/:userId` と同じ概念です！
:::

### 方法2: クエリパラメータ

```kotlin
composable(
    route = "search?query={query}",
    arguments = listOf(
        navArgument("query") {
            type = NavType.StringType
            defaultValue = ""
            nullable = true
        }
    )
) { backStackEntry ->
    val query = backStackEntry.arguments?.getString("query")
    SearchScreen(query = query)
}

// 遷移
navController.navigate("search?query=kotlin")
```

### 方法3: 複雑なオブジェクト（非推奨）

複雑なオブジェクトはViewModelやSavedStateHandleを使うのが推奨です。

```kotlin
// ViewModelで共有
class SharedViewModel : ViewModel() {
    var selectedUser: User? = null
}

// 画面Aで設定
sharedViewModel.selectedUser = user
navController.navigate("detail")

// 画面Bで取得
val user = sharedViewModel.selectedUser
```

## ネストしたナビゲーション

```kotlin
NavHost(navController = navController, startDestination = "main") {
    navigation(startDestination = "home", route = "main") {
        composable("home") { HomeScreen() }
        composable("profile") { ProfileScreen() }
    }

    navigation(startDestination = "login", route = "auth") {
        composable("login") { LoginScreen() }
        composable("register") { RegisterScreen() }
    }
}
```

## ボトムナビゲーション

```kotlin
@Composable
fun MainScreen() {
    val navController = rememberNavController()
    val navBackStackEntry by navController.currentBackStackEntryAsState()
    val currentRoute = navBackStackEntry?.destination?.route

    Scaffold(
        bottomBar = {
            NavigationBar {
                NavigationBarItem(
                    icon = { Icon(Icons.Default.Home, null) },
                    label = { Text("ホーム") },
                    selected = currentRoute == "home",
                    onClick = {
                        navController.navigate("home") {
                            popUpTo("home") { inclusive = true }
                        }
                    }
                )
                NavigationBarItem(
                    icon = { Icon(Icons.Default.Search, null) },
                    label = { Text("検索") },
                    selected = currentRoute == "search",
                    onClick = {
                        navController.navigate("search") {
                            popUpTo("home")
                        }
                    }
                )
                NavigationBarItem(
                    icon = { Icon(Icons.Default.Person, null) },
                    label = { Text("プロフィール") },
                    selected = currentRoute == "profile",
                    onClick = {
                        navController.navigate("profile") {
                            popUpTo("home")
                        }
                    }
                )
            }
        }
    ) { paddingValues ->
        NavHost(
            navController = navController,
            startDestination = "home",
            modifier = Modifier.padding(paddingValues)
        ) {
            composable("home") { HomeScreen() }
            composable("search") { SearchScreen() }
            composable("profile") { ProfileScreen() }
        }
    }
}
```

::: info Scaffoldとは
**Scaffold**は、Material DesignのレイアウトテンプレートでTopBar、BottomBar、FloatingActionButtonなどを配置できます。
:::

## トランジションアニメーション

```kotlin
composable(
    route = "detail",
    enterTransition = {
        slideIntoContainer(
            towards = AnimatedContentTransitionScope.SlideDirection.Left,
            animationSpec = tween(300)
        )
    },
    exitTransition = {
        slideOutOfContainer(
            towards = AnimatedContentTransitionScope.SlideDirection.Left,
            animationSpec = tween(300)
        )
    },
    popEnterTransition = {
        slideIntoContainer(
            towards = AnimatedContentTransitionScope.SlideDirection.Right,
            animationSpec = tween(300)
        )
    },
    popExitTransition = {
        slideOutOfContainer(
            towards = AnimatedContentTransitionScope.SlideDirection.Right,
            animationSpec = tween(300)
        )
    }
) {
    DetailScreen()
}
```

## Deep Link

```kotlin
composable(
    route = "user/{userId}",
    deepLinks = listOf(
        navDeepLink {
            uriPattern = "myapp://user/{userId}"
        }
    )
) { backStackEntry ->
    val userId = backStackEntry.arguments?.getInt("userId")
    UserScreen(userId)
}
```

## 型安全なナビゲーション（Kotlin Serialization）

最新の推奨方法です。

```kotlin
@Serializable
object Home

@Serializable
data class UserProfile(val userId: Int)

NavHost(navController = navController, startDestination = Home) {
    composable<Home> {
        HomeScreen(
            onUserClick = { userId ->
                navController.navigate(UserProfile(userId = userId))
            }
        )
    }

    composable<UserProfile> { backStackEntry ->
        val userProfile: UserProfile = backStackEntry.toRoute()
        UserScreen(userId = userProfile.userId)
    }
}
```

::: tip
型安全なナビゲーションはコンパイル時にエラーを検出でき、より安全です。
:::

## バックプレス処理

```kotlin
@Composable
fun DetailScreen(navController: NavController) {
    BackHandler {
        // カスタムバックプレス処理
        navController.popBackStack()
    }

    // UI
}
```

## ViewModel との連携

```kotlin
@Composable
fun UserScreen(
    userId: Int,
    viewModel: UserViewModel = viewModel()
) {
    LaunchedEffect(userId) {
        viewModel.loadUser(userId)
    }

    val user by viewModel.user.collectAsState()

    // UI
}
```

## 実践例

### 完全なナビゲーション例

```kotlin
sealed class Screen(val route: String) {
    object Home : Screen("home")
    object Search : Screen("search")
    object Detail : Screen("detail/{itemId}") {
        fun createRoute(itemId: Int) = "detail/$itemId"
    }
}

@Composable
fun AppNavigation() {
    val navController = rememberNavController()

    NavHost(
        navController = navController,
        startDestination = Screen.Home.route
    ) {
        composable(Screen.Home.route) {
            HomeScreen(
                onItemClick = { itemId ->
                    navController.navigate(Screen.Detail.createRoute(itemId))
                },
                onSearchClick = {
                    navController.navigate(Screen.Search.route)
                }
            )
        }

        composable(Screen.Search.route) {
            SearchScreen(
                onBackClick = {
                    navController.popBackStack()
                },
                onItemClick = { itemId ->
                    navController.navigate(Screen.Detail.createRoute(itemId))
                }
            )
        }

        composable(
            route = Screen.Detail.route,
            arguments = listOf(
                navArgument("itemId") { type = NavType.IntType }
            )
        ) { backStackEntry ->
            val itemId = backStackEntry.arguments?.getInt("itemId") ?: 0
            DetailScreen(
                itemId = itemId,
                onBackClick = {
                    navController.popBackStack()
                }
            )
        }
    }
}
```

## トラブルシューティング

### 画面が二重に表示される

```kotlin
// ❌ 悪い例
navController.navigate("detail")
navController.navigate("detail")  // 重複

// ✅ 良い例
navController.navigate("detail") {
    launchSingleTop = true
}
```

### バックスタックが溜まる

```kotlin
// ホーム画面に戻る時、履歴をクリア
navController.navigate("home") {
    popUpTo(navController.graph.startDestinationId) {
        inclusive = true
    }
}
```

## 重要な用語集

| 用語 | 説明 |
|------|------|
| **NavController** | ナビゲーションを制御するコントローラー |
| **NavHost** | ナビゲーショングラフのコンテナ |
| **Route** | 画面を識別する文字列パス |
| **BackStack** | 画面履歴のスタック |
| **Deep Link** | アプリ外からの特定画面への直接リンク |
| **Scaffold** | Material Designのレイアウトテンプレート |
| **BackHandler** | バックボタン押下時の処理をカスタマイズ |

## 公式ドキュメント参考リンク

- [Navigation Compose](https://developer.android.com/jetpack/compose/navigation?hl=ja)
- [Navigate with Compose](https://developer.android.com/guide/navigation/navigation-compose?hl=ja)
- [Safe Args](https://developer.android.com/guide/navigation/navigation-pass-data?hl=ja)
- [Deep Links](https://developer.android.com/guide/navigation/navigation-deep-link?hl=ja)

## 次のステップ

- [副作用とライフサイクル](/guide/launched-effect) - LaunchedEffectを学ぶ
- [実践例: マルチスクリーンアプリ](/examples/multi-screen-app) - ナビゲーションを使った実践
