import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, Smartphone, Zap, RotateCcw, BarChart3, Link2, Monitor, Briefcase } from 'lucide-react'

export default function Home() {
  const features = [
    {
      icon: Zap,
      title: '最短2-3ヶ月で業務レベル',
      description: 'React/Flutter経験者の既存スキルを最大活用。効率的な学習パスで短期間での習得を実現',
      gradient: 'from-yellow-500 to-orange-500',
    },
    {
      icon: RotateCcw,
      title: '概念マッピング学習法',
      description: 'useState→remember、useEffect→LaunchedEffect など、既知の概念から自然に学習',
      gradient: 'from-react-blue to-flutter-blue',
    },
    {
      icon: BarChart3,
      title: '状態管理完全理解',
      description: 'LiveData vs Flow vs State の使い分けを実例で学習。業務で迷わない判断力を養成',
      gradient: 'from-blue-500 to-indigo-500',
    },
    {
      icon: Link2,
      title: 'Hilt依存性注入マスター',
      description: '手動DIとの比較でHiltの必要性を理解。テスト戦略まで含めた実践的スキルを習得',
      gradient: 'from-kotlin-purple to-pink-500',
    },
    {
      icon: Monitor,
      title: 'Android特有概念の習得',
      description: 'ライフサイクル、Permission、Navigationなど、Webアプリにない概念を効率的に学習',
      gradient: 'from-android-green to-android-blue',
    },
    {
      icon: Briefcase,
      title: '業務即戦力スキル',
      description: 'コードレビュー対応、エラーハンドリング、パフォーマンス最適化など実務で必要なスキル',
      gradient: 'from-purple-500 to-indigo-500',
    },
  ]

  const learningPath = [
    { 
      title: 'Phase 1: Kotlin & Android Studio (1週間)', 
      path: '/kotlin-basics', 
      description: 'Kotlin文法習得とAndroid Studio操作に慣れる'
    },
    { 
      title: 'Phase 2: Jetpack Compose習得 (1-2週間)', 
      path: '/composables', 
      description: 'React/Flutterの知識を活かしたCompose理解'
    },
    { 
      title: 'Phase 3: Android特有概念 (2-3週間)', 
      path: '/state-management', 
      description: 'ライフサイクル、Permission、Navigation、状態管理'
    },
    { 
      title: 'LiveData vs Flow vs State', 
      path: '/state-comparison', 
      description: '業務での適切な状態管理手法の選択'
    },
    { 
      title: 'Hilt依存性注入', 
      path: '/dependency-injection', 
      description: '手動DIとの比較でHiltを完全理解'
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
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          React/Flutter経験者向けの最短学習パス
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/kotlin-basics">
            <Button size="lg" className="bg-gradient-to-r from-android-green to-android-blue hover:opacity-90 text-white">
              今すぐ学習を開始する
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <Link to="/comparison">
            <Button size="lg" variant="outline">
              React/Flutter比較を見る
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-center text-gray-800">このサイトの特徴</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Concept Mapping Section */}
      <section className="space-y-8 py-12 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl">
        <h2 className="text-3xl font-bold text-center text-gray-800">既存スキル活用型学習</h2>
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">概念マッピング学習法</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg border">
                <code className="text-blue-600 bg-blue-50 px-2 py-1 rounded">useState</code>
                <ArrowRight className="w-4 h-4 text-gray-400" />
                <code className="text-green-600 bg-green-50 px-2 py-1 rounded">remember &#123; mutableStateOf() &#125;</code>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg border">
                <code className="text-blue-600 bg-blue-50 px-2 py-1 rounded">useEffect</code>
                <ArrowRight className="w-4 h-4 text-gray-400" />
                <code className="text-green-600 bg-green-50 px-2 py-1 rounded">LaunchedEffect</code>
              </div>
              <div className="text-center mt-4">
                <Link to="/react-flutter-mapping" className="text-blue-600 hover:text-blue-800 underline text-sm font-medium">
                  📋 完全な概念マッピング表を見る
                </Link>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">3段階の効率的学習パス</h3>
            <div className="space-y-3">
              <div className="p-3 bg-white rounded-lg border">
                <div className="font-medium text-gray-800">Week 1: Kotlin習得（1週間）</div>
                <div className="text-sm text-gray-600">TypeScript/Dartの知識を活かして効率的に</div>
              </div>
              <div className="p-3 bg-white rounded-lg border">
                <div className="font-medium text-gray-800">Week 2-3: Compose習得（1-2週間）</div>
                <div className="text-sm text-gray-600">React/FlutterのUIパターンをComposeで再現</div>
              </div>
              <div className="p-3 bg-white rounded-lg border">
                <div className="font-medium text-gray-800">Week 4-6: Android特有概念（2-3週間）</div>
                <div className="text-sm text-gray-600">ライフサイクル、Permission、Navigationなど</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Path */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-center text-gray-800">詳細学習パス</h2>
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

      {/* Business Skills Section */}
      <section className="space-y-8 py-12 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl">
        <h2 className="text-3xl font-bold text-center text-gray-800">業務必須スキル</h2>
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          <Card className="border-0 bg-white/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                状態管理の使い分け
              </CardTitle>
              <CardDescription>
                LiveData vs Flow vs State - 業務で迷わない判断基準を習得
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-0 bg-white/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Link2 className="w-5 h-5 text-purple-600" />
                Hilt依存性注入
              </CardTitle>
              <CardDescription>
                手動DIとの比較でHiltの必要性を完全理解
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-0 bg-white/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Monitor className="w-5 h-5 text-green-600" />
                Android特有概念
              </CardTitle>
              <CardDescription>
                ライフサイクル、Permission、Navigationの効率的習得
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-0 bg-white/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-orange-600" />
                実務スキル
              </CardTitle>
              <CardDescription>
                エラーハンドリング、テスト、パフォーマンス最適化
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center space-y-6 py-12 bg-gradient-to-r from-android-green/10 to-android-blue/10 rounded-2xl">
        <h2 className="text-3xl font-bold text-gray-800">準備はできましたか？</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          React/Flutterの知識を活かして、効率的にAndroid開発をマスターしましょう！
        </p>
        <Link to="/kotlin-basics">
          <Button size="lg" className="bg-gradient-to-r from-android-green to-android-blue hover:opacity-90 text-white">
            今すぐ学習を開始する
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </Link>
      </section>
    </div>
  )
}
