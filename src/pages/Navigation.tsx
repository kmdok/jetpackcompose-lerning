import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import CodeBlock from '@/components/CodeBlock'

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
          <CodeBlock className="text-xs">
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
          </CodeBlock>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>パラメータの渡し方</CardTitle>
        </CardHeader>
        <CardContent>
          <CodeBlock className="text-xs">
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
          </CodeBlock>
        </CardContent>
      </Card>
    </div>
  )
}
