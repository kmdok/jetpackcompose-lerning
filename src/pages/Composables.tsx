import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import CodeBlock from '@/components/CodeBlock'

export default function Composables() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-android-green to-android-blue bg-clip-text text-transparent">
        Composableとは
      </h1>

      <Card>
        <CardHeader>
          <CardTitle>基本構文</CardTitle>
        </CardHeader>
        <CardContent>
          <CodeBlock className="text-xs">
{`@Composable
fun Greeting(name: String) {
    Text("Hello, $name!")
}

// 使用例
@Composable
fun App() {
    Greeting("World")
}`}
          </CodeBlock>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>React/Flutterとの比較</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="bg-react-blue/10 p-3 md:p-4 rounded">
              <p className="font-semibold text-react-blue mb-2">⚛️ React</p>
              <code className="text-xs md:text-sm">function Greeting(&#123; name &#125;) &#123; ... &#125;</code>
            </div>
            <div className="bg-flutter-blue/10 p-3 md:p-4 rounded">
              <p className="font-semibold text-flutter-blue mb-2">🐦 Flutter</p>
              <code className="text-xs md:text-sm">class Greeting extends StatelessWidget &#123; ... &#125;</code>
            </div>
            <div className="bg-android-green/10 p-3 md:p-4 rounded">
              <p className="font-semibold text-android-green mb-2">🤖 Compose</p>
              <code className="text-xs md:text-sm">@Composable fun Greeting(name: String) &#123; ... &#125;</code>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>基本的なComposable</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <CodeBlock className="text-xs">
{`// Text
Text("Simple text")

// Button
Button(onClick = { println("Clicked") }) {
    Text("Click me")
}

// Column (縦並び)
Column {
    Text("First")
    Text("Second")
}`}
          </CodeBlock>
        </CardContent>
      </Card>
    </div>
  )
}
