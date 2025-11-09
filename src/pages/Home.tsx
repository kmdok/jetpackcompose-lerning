import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, Code, Smartphone, Zap, BookOpen, Lightbulb, Rocket } from 'lucide-react'

export default function Home() {
  const features = [
    {
      icon: Code,
      title: 'Flutter/React経験者向け',
      description: 'すでに宣言的UIフレームワークの経験がある方向けに、既知の概念と対応づけながら学習できます',
      gradient: 'from-react-blue to-flutter-blue',
    },
    {
      icon: Smartphone,
      title: 'Jetpack Composeの基礎',
      description: 'Androidの最新UIツールキットであるJetpack Composeを基礎から学習します',
      gradient: 'from-android-green to-android-blue',
    },
    {
      icon: Zap,
      title: 'Kotlin言語',
      description: 'モダンで安全なKotlin言語の基本から、実践的な使い方まで網羅します',
      gradient: 'from-kotlin-purple to-pink-500',
    },
    {
      icon: BookOpen,
      title: '実践的なサンプル',
      description: 'TODOアプリやAPI連携など、実際のプロジェクトで使える実践例を豊富に用意',
      gradient: 'from-orange-500 to-red-500',
    },
    {
      icon: Lightbulb,
      title: 'State管理',
      description: 'React HooksやFlutter Riverpodに類似した、Composeでの状態管理を学習します',
      gradient: 'from-yellow-500 to-orange-500',
    },
    {
      icon: Rocket,
      title: 'UIコンポーネント',
      description: '豊富なUIコンポーネントとModifierの使い方を、実例とともに解説します',
      gradient: 'from-purple-500 to-indigo-500',
    },
  ]

  const learningPath = [
    { title: 'イントロダクション', path: '/', description: 'Jetpack Composeの概要を理解' },
    { title: 'Flutter/React比較', path: '/comparison', description: '既知の概念との対応を確認' },
    { title: 'Kotlin基礎', path: '/kotlin-basics', description: 'Kotlin言語の基本を習得' },
    { title: 'Jetpack Compose基礎', path: '/composables', description: 'Composableとstate管理を学習' },
    { title: '実践例', path: '/todo-app', description: '実際のアプリを作りながら理解を深める' },
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
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-android-green via-android-blue to-kotlin-purple bg-clip-text text-transparent">
              Jetpack Compose
            </span>
            <br />
            <span className="text-gray-800">& Kotlin 学習</span>
          </h1>
        </div>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Flutter/React経験者向けの実践的な学習ガイド
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/comparison">
            <Button size="lg" className="bg-gradient-to-r from-android-green to-android-blue hover:opacity-90 text-white">
              学習を始める
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <Link to="/comparison">
            <Button size="lg" variant="outline">
              Flutter/React比較を見る
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

      {/* Learning Path */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-center text-gray-800">学習の進め方</h2>
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

      {/* CTA Section */}
      <section className="text-center space-y-6 py-12 bg-gradient-to-r from-android-green/10 to-android-blue/10 rounded-2xl">
        <h2 className="text-3xl font-bold text-gray-800">準備はできましたか？</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Flutter/Reactの知識を活かして、Jetpack Composeを習得しましょう
        </p>
        <Link to="/comparison">
          <Button size="lg" className="bg-gradient-to-r from-android-green to-android-blue hover:opacity-90 text-white">
            今すぐ学習を始める
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </Link>
      </section>
    </div>
  )
}
