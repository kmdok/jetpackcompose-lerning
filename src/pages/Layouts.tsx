import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import CodeBlock from '@/components/CodeBlock'

export default function Layouts() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
        レイアウト基礎
      </h1>

      <Card>
        <CardHeader>
          <CardTitle>Column - 縦方向配置</CardTitle>
        </CardHeader>
        <CardContent>
          <CodeBlock className="text-xs">
{`Column {
    Text("Item 1")
    Text("Item 2")
    Text("Item 3")
}`}
          </CodeBlock>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Row - 横方向配置</CardTitle>
        </CardHeader>
        <CardContent>
          <CodeBlock className="text-xs">
{`Row {
    Text("Left")
    Text("Center")
    Text("Right")
}`}
          </CodeBlock>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Modifier - スタイリング</CardTitle>
        </CardHeader>
        <CardContent>
          <CodeBlock className="text-xs">
{`Text(
    "Styled text",
    modifier = Modifier
        .padding(16.dp)
        .background(Color.Blue)
        .fillMaxWidth()
)`}
          </CodeBlock>
        </CardContent>
      </Card>
    </div>
  )
}
