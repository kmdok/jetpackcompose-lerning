import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function Navigation() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
        Navigation Compose
      </h1>

      <Card>
        <CardHeader>
          <CardTitle>基本的な使い方</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-gray-900 text-gray-100 p-3 md:p-4 rounded-lg overflow-x-auto text-xs md:text-sm">
{`val navController = rememberNavController()

NavHost(
    navController = navController,
    startDestination = "home"
) {
    composable("home") {
        HomeScreen(
            onNavigate = {
                navController.navigate("detail")
            }
        )
    }
    composable("detail") {
        DetailScreen()
    }
}`}
          </pre>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>パラメータの渡し方</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-gray-900 text-gray-100 p-3 md:p-4 rounded-lg overflow-x-auto text-xs md:text-sm">
{`composable(
    route = "user/{userId}",
    arguments = listOf(
        navArgument("userId") {
            type = NavType.IntType
        }
    )
) { backStackEntry ->
    val userId = backStackEntry
        .arguments?.getInt("userId")
    UserScreen(userId = userId)
}

// 遷移
navController.navigate("user/\${userId}")`}
          </pre>
        </CardContent>
      </Card>
    </div>
  )
}
