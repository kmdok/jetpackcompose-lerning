# ナビゲーションでパラメータを渡す

Navigation Composeでパラメータを受け渡す方法を学びます。

## URLパスパラメータ

### 基本的な使い方

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
        val userId = backStackEntry.arguments?.getInt("userId") ?: 0
        UserScreen(userId = userId)
    }
}
```

## クエリパラメータ

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

## 型安全なナビゲーション

```kotlin
@Serializable
object Home

@Serializable
data class UserProfile(val userId: Int, val tab: String = "posts")

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
        UserScreen(
            userId = userProfile.userId,
            initialTab = userProfile.tab
        )
    }
}
```

## 公式ドキュメント参考リンク

- [Navigate with Compose](https://developer.android.com/guide/navigation/navigation-compose?hl=ja)
- [Pass data between destinations](https://developer.android.com/guide/navigation/navigation-pass-data?hl=ja)

## 次のステップ

- [Navigation](/guide/navigation) - ナビゲーションの基本
- [State管理](/guide/state-management) - 状態管理を学ぶ
