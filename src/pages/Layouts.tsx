import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

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
          <pre className="bg-gray-900 text-gray-100 p-3 md:p-4 rounded-lg overflow-x-auto text-xs md:text-sm">
{`Column {
    Text("Item 1")
    Text("Item 2")
    Text("Item 3")
}`}
          </pre>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Row - 横方向配置</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-gray-900 text-gray-100 p-3 md:p-4 rounded-lg overflow-x-auto text-xs md:text-sm">
{`Row {
    Text("Left")
    Text("Center")
    Text("Right")
}`}
          </pre>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Modifier - スタイリング</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-gray-900 text-gray-100 p-3 md:p-4 rounded-lg overflow-x-auto text-xs md:text-sm">
{`Text(
    "Styled text",
    modifier = Modifier
        .padding(16.dp)
        .background(Color.Blue)
        .fillMaxWidth()
)`}
          </pre>
        </CardContent>
      </Card>
    </div>
  )
}
