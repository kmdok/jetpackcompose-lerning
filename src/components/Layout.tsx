import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronLeft, BookOpen } from 'lucide-react';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const location = useLocation();
    const isHome = location.pathname === '/';

    return (
        <div className="min-h-screen bg-dark-bg text-gray-200 font-sans selection:bg-android-500 selection:text-white">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 h-16 bg-dark-surface/80 backdrop-blur-md border-b border-dark-border z-50 flex items-center justify-between px-4">
                <div className="flex items-center gap-3">
                    {!isHome && (
                        <Link to="/" className="p-2 -ml-2 hover:bg-white/5 rounded-full transition-colors">
                            <ChevronLeft className="w-6 h-6 text-android-400" />
                        </Link>
                    )}
                    <div className="flex items-center gap-2">
                        <BookOpen className="w-6 h-6 text-android-500" />
                        <span className="font-bold text-lg tracking-tight text-white">
                            Android Core
                        </span>
                    </div>
                </div>

                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="p-2 -mr-2 hover:bg-white/5 rounded-full transition-colors"
                >
                    {isMenuOpen ? (
                        <X className="w-6 h-6 text-gray-400" />
                    ) : (
                        <Menu className="w-6 h-6 text-gray-400" />
                    )}
                </button>
            </header>

            {/* Main Content */}
            <main className="pt-20 pb-24 px-4 max-w-3xl mx-auto min-h-screen animate-fade-in">
                {children}
            </main>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="fixed inset-0 z-40 bg-dark-bg/95 backdrop-blur-xl pt-20 px-6 animate-fade-in">
                    <nav className="flex flex-col gap-6">
                        <Link
                            to="/"
                            onClick={() => setIsMenuOpen(false)}
                            className="text-2xl font-bold text-white hover:text-android-400 transition-colors"
                        >
                            ホーム
                        </Link>
                        <div className="h-px bg-dark-border" />
                        <a
                            href="https://developer.android.com/jetpack/compose?hl=ja"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-lg text-gray-400 hover:text-android-400 transition-colors"
                        >
                            公式ドキュメント (JP)
                        </a>
                    </nav>
                </div>
            )}
        </div>
    );
};

export default Layout;
