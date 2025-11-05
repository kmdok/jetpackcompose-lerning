import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function KotlinBasics() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div className="space-y-3">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-kotlin-purple to-pink-500 bg-clip-text text-transparent">
          Kotlin基礎
        </h1>
        <p className="text-base md:text-lg text-gray-600">
          KotlinはGoogleが推奨するAndroid開発の公式言語です。
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>変数宣言</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <pre className="bg-gray-900 text-gray-100 p-3 md:p-4 rounded-lg overflow-x-auto text-xs md:text-sm">
{`val name = "John"      // 不変
var age = 25           // 可変

age = 26               // OK
// name = "Jane"       // エラー`}
          </pre>
          <div className="bg-blue-50 p-3 md:p-4 rounded-lg">
            <p className="text-sm text-blue-900">
              💡 <strong>比較:</strong> val = const (JS), var = let (JS)
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>null安全性</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <pre className="bg-gray-900 text-gray-100 p-3 md:p-4 rounded-lg overflow-x-auto text-xs md:text-sm">
{`var name: String = "John"
name = null  // エラー

var nullableName: String? = "John"
nullableName = null  // OK

// 安全な呼び出し
val length = name?.length ?: 0`}
          </pre>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>関数</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <pre className="bg-gray-900 text-gray-100 p-3 md:p-4 rounded-lg overflow-x-auto text-xs md:text-sm">
{`// 基本的な関数
fun greet(name: String): String {
    return "Hello, $name!"
}

// 単一式関数
fun greet(name: String) = "Hello, $name!"

// デフォルト引数
fun greet(name: String = "World") =
    "Hello, $name!"`}
          </pre>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>データクラス</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <pre className="bg-gray-900 text-gray-100 p-3 md:p-4 rounded-lg overflow-x-auto text-xs md:text-sm">
{`data class User(
    val id: Int,
    val name: String,
    val email: String
)

val user = User(1, "John", "john@example.com")

// copy で一部を変更
val updatedUser = user.copy(name = "Jane")`}
          </pre>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>ラムダ式</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <pre className="bg-gray-900 text-gray-100 p-3 md:p-4 rounded-lg overflow-x-auto text-xs md:text-sm">
{`val numbers = listOf(1, 2, 3, 4, 5)

// map関数でリストを変換
val doubled = numbers.map { it * 2 }
// [2, 4, 6, 8, 10]

// filter関数で絞り込み
val evens = numbers.filter { it % 2 == 0 }
// [2, 4]`}
          </pre>
          <div className="bg-blue-50 p-3 md:p-4 rounded-lg">
            <p className="text-sm text-blue-900">
              💡 <strong>itパラメータ:</strong> 単一パラメータのラムダでは、
              暗黙的に<code className="font-mono">it</code>が使えます
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
