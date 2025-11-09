import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import CodeBlock from '@/components/CodeBlock'

export default function Lists() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
        リスト表示
      </h1>

      <Card>
        <CardHeader>
          <CardTitle>LazyColumn - 効率的なリスト</CardTitle>
        </CardHeader>
        <CardContent>
          <CodeBlock className="text-xs">
{`LazyColumn {
    items(itemsList) { item ->
        Text(item.name)
    }
}`}
          </CodeBlock>
          <div className="mt-4 bg-blue-50 p-3 md:p-4 rounded-lg">
            <p className="text-sm text-blue-900">
              💡 <strong>比較:</strong><br/>
              React: map()<br/>
              Flutter: ListView.builder<br/>
              Compose: LazyColumn
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>グリッドレイアウト</CardTitle>
        </CardHeader>
        <CardContent>
          <CodeBlock className="text-xs">
{`LazyVerticalGrid(
    columns = GridCells.Fixed(3)
) {
    items(photos) { photo ->
        AsyncImage(
            model = photo.url,
            contentDescription = null
        )
    }
}`}
          </CodeBlock>
        </CardContent>
      </Card>
    </div>
  )
}
