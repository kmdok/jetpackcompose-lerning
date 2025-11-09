import { Link, useLocation } from 'react-router-dom'
import { Home, Code, Smartphone, Menu } from 'lucide-react'
import { useState } from 'react'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const navigation = [
    { name: 'ホーム', path: '/', icon: Home },
    { name: 'React/Flutter比較', path: '/react-flutter-mapping', icon: Code },
    { name: 'アーキテクチャ比較', path: '/comparison', icon: Code },
    { name: 'Kotlin基礎', path: '/kotlin-basics', icon: Code },
    { name: 'Composable', path: '/composables', icon: Smartphone },
    { name: 'State管理', path: '/state-management', icon: Smartphone },
    { name: 'DI', path: '/dependency-injection', icon: Smartphone },
    { name: 'レイアウト', path: '/layouts', icon: Smartphone },
    { name: 'リスト', path: '/lists', icon: Smartphone },
    { name: 'ナビゲーション', path: '/navigation', icon: Smartphone },
    { name: '実践: TODOアプリ', path: '/todo-app', icon: Smartphone },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-android-green to-android-blue flex items-center justify-center">
              <Smartphone className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-android-green to-android-blue bg-clip-text text-transparent">
              Jetpack Compose
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-android-green/10 text-android-green'
                      : 'text-gray-600 hover:text-android-green hover:bg-gray-100'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    {item.name}
                  </span>
                </Link>
              )
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md hover:bg-gray-100"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-white">
            <nav className="container mx-auto px-4 py-2 flex flex-col space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.path
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-android-green/10 text-android-green'
                        : 'text-gray-600 hover:text-android-green hover:bg-gray-100'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Icon className="w-4 h-4" />
                      {item.name}
                    </span>
                  </Link>
                )
              })}
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>

    </div>
  )
}
