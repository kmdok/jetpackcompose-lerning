import { Link } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, Smartphone } from 'lucide-react'

export default function Home() {
  const learningPath = [
    { 
      title: 'Kotlin基礎', 
      path: '/kotlin-basics', 
      description: 'null安全、コルーチン、データクラス'
    },
    { 
      title: 'Composable', 
      path: '/composables', 
      description: 'React/Flutter → Compose'
    },
    { 
      title: 'State管理', 
      path: '/state-management', 
      description: 'ViewModel + StateFlow/LiveData'
    },
    { 
      title: '依存性注入(DI)', 
      path: '/dependency-injection', 
      description: 'Hiltによる依存性注入'
    },
    { 
      title: 'レイアウト', 
      path: '/layouts', 
      description: 'Row、Column、Box'
    },
    { 
      title: 'リスト', 
      path: '/lists', 
      description: 'LazyColumn、LazyRow'
    },
    { 
      title: 'ナビゲーション', 
      path: '/navigation', 
      description: 'Navigation Component'
    },
  ]

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6 py-12">
        <div className="inline-block">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-android-green to-android-blue flex items-center justify-center">
              <Smartphone className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-android-green via-android-blue to-kotlin-purple bg-clip-text text-transparent">
              Android開発を 2-3ヶ月で習得
            </span>
            <br />
            <span className="text-gray-800">業務レベルのJetpack Compose</span>
          </h1>
        </div>
        <div className="flex justify-center">
          <Link to="/kotlin-basics">
            <Button size="lg" className="bg-gradient-to-r from-android-green to-android-blue hover:opacity-90 text-white">
              学習を開始する
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>



      {/* Learning Path */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-center text-gray-800">学習パス</h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {learningPath.map((step, index) => (
            <Link key={index} to={step.path}>
              <Card className="hover:shadow-md transition-all duration-300 hover:border-android-green cursor-pointer">
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-android-green to-android-blue flex items-center justify-center text-white font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-800">{step.title}</h3>
                    <p className="text-gray-600 text-sm">{step.description}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>


    </div>
  )
}
