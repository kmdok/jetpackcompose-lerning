import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import { phases } from '../data/modules';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import 'highlight.js/styles/atom-one-dark.css';

const ModuleViewer: React.FC = () => {
    const { moduleId } = useParams();
    const navigate = useNavigate();
    const [content, setContent] = useState<string>('');
    const [loading, setLoading] = useState(true);

    // Find current module and navigation
    const allModules = phases.flatMap(p => p.modules);
    const currentIndex = allModules.findIndex(m => m.id === moduleId);
    const currentModule = allModules[currentIndex];
    const prevModule = allModules[currentIndex - 1];
    const nextModule = allModules[currentIndex + 1];

    useEffect(() => {
        if (!currentModule) return;

        setLoading(true);
        // Remove leading slash from path to avoid double slashes when joining with BASE_URL
        const modulePath = currentModule.path.startsWith('/') ? currentModule.path.slice(1) : currentModule.path;
        fetch(`${import.meta.env.BASE_URL}${modulePath}`)
            .then(res => res.text())
            .then(text => {
                setContent(text);
                setLoading(false);
                window.scrollTo(0, 0);
            })
            .catch(err => {
                console.error('Failed to load module:', err);
                setLoading(false);
            });
    }, [currentModule]);

    if (!currentModule) {
        return <div className="text-center py-20">モジュールが見つかりません</div>;
    }

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <Loader2 className="w-8 h-8 text-android-500 animate-spin" />
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-8"
        >
            <article className="prose prose-invert prose-android max-w-none">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeHighlight, rehypeRaw]}
                    components={{
                        // Custom styling for markdown elements
                        h1: ({ node, ...props }) => <h1 className="text-3xl font-bold text-android-400 mb-6" {...props} />,
                        h2: ({ node, ...props }) => <h2 className="text-2xl font-bold text-white mt-10 mb-4 border-b border-dark-border pb-2" {...props} />,
                        h3: ({ node, ...props }) => <h3 className="text-xl font-bold text-android-200 mt-8 mb-3" {...props} />,
                        code: ({ node, className, children, ...props }: any) => {
                            const match = /language-(\w+)/.exec(className || '')
                            return !match ? (
                                <code className="bg-white/10 text-android-300 px-1.5 py-0.5 rounded font-mono text-sm" {...props}>
                                    {children}
                                </code>
                            ) : (
                                <code className={className} {...props}>
                                    {children}
                                </code>
                            )
                        },
                        pre: ({ node, ...props }) => <pre className="bg-dark-surface border border-dark-border rounded-xl p-4 overflow-x-auto my-6" {...props} />,

                        a: ({ node, ...props }) => <a className="text-android-400 hover:text-android-300 underline decoration-android-400/30 hover:decoration-android-300 transition-colors" {...props} />,
                        ul: ({ node, ...props }) => <ul className="list-disc list-outside ml-6 space-y-2 my-4 text-gray-300" {...props} />,
                        ol: ({ node, ...props }) => <ol className="list-decimal list-outside ml-6 space-y-2 my-4 text-gray-300" {...props} />,
                        li: ({ node, ...props }) => <li className="pl-1 text-gray-300" {...props} />,
                        table: ({ node, ...props }) => <div className="overflow-x-auto my-8 rounded-lg border border-dark-border"><table className="min-w-full divide-y divide-dark-border" {...props} /></div>,
                        th: ({ node, ...props }) => <th className="px-4 py-3 text-left text-sm font-semibold text-white bg-white/5" {...props} />,
                        td: ({ node, ...props }) => <td className="px-4 py-3 text-sm text-gray-300 border-t border-dark-border" {...props} />,
                        // Quiz Styling
                        details: ({ node, ...props }) => (
                            <details className="group bg-dark-card border border-dark-border rounded-xl overflow-hidden my-6 transition-all duration-300 open:border-android-500/50 open:bg-dark-surface" {...props} />
                        ),
                        summary: ({ node, ...props }: any) => (
                            <summary className="cursor-pointer p-4 font-medium text-white hover:text-android-400 transition-colors flex items-center justify-between select-none list-none marker:content-none" {...props}>
                                <span>{props.children}</span>
                                <ChevronRight className="w-5 h-5 text-gray-500 transition-transform group-open:rotate-90 group-open:text-android-500" />
                            </summary>
                        ),
                        p: ({ node, ...props }: any) => {
                            if (node?.parentNode?.tagName === 'details') {
                                return <p className="px-4 pb-4 text-gray-300 animate-fade-in" {...props} />
                            }
                            return <p className="mb-4 leading-relaxed text-gray-300 text-lg" {...props} />
                        },
                        // @ts-ignore
                        blockquote: ({ node, children, ...props }: any) => {
                            // Check for GitHub Alert syntax
                            const content = React.Children.toArray(children).map(child => {
                                if (React.isValidElement(child) && (child.props as any).node?.tagName === 'p') {
                                    return child.props.children
                                }
                                return child
                            }).join('')

                            let borderColor = 'border-android-500'
                            let bgColor = 'bg-android-500/10'
                            let icon = '💡'

                            if (content.includes('[!IMPORTANT]')) {
                                borderColor = 'border-purple-500'
                                bgColor = 'bg-purple-500/10'
                                icon = '⚡'
                            } else if (content.includes('[!WARNING]')) {
                                borderColor = 'border-yellow-500'
                                bgColor = 'bg-yellow-500/10'
                                icon = '⚠️'
                            } else if (content.includes('[!NOTE]')) {
                                borderColor = 'border-blue-500'
                                bgColor = 'bg-blue-500/10'
                                icon = '📝'
                            }

                            // Remove the alert tag from display if possible, or just render styled box
                            return (
                                <blockquote className={`border-l-4 ${borderColor} ${bgColor} p-4 rounded-r-lg my-8 not-italic`} {...props}>
                                    <div className="flex gap-2 font-bold text-white mb-2 items-center">
                                        <span>{icon}</span>
                                        <span>ポイント</span>
                                    </div>
                                    <div className="text-gray-300">
                                        {children}
                                    </div>
                                </blockquote>
                            )
                        },
                    }}
                >
                    {content}
                </ReactMarkdown>
            </article>

            {/* Navigation Footer */}
            <div className="flex items-center justify-between pt-8 border-t border-dark-border mt-12">
                {prevModule ? (
                    <button
                        onClick={() => navigate(`/module/${prevModule.id}`)}
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
                    >
                        <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <div className="text-left">
                            <div className="text-xs text-gray-500">前へ</div>
                            <div className="font-medium max-w-[150px] truncate">{prevModule.title}</div>
                        </div>
                    </button>
                ) : <div />}

                {nextModule ? (
                    <button
                        onClick={() => navigate(`/module/${nextModule.id}`)}
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group text-right"
                    >
                        <div className="text-right">
                            <div className="text-xs text-gray-500">次へ</div>
                            <div className="font-medium max-w-[150px] truncate">{nextModule.title}</div>
                        </div>
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                ) : <div />}
            </div>
        </motion.div>
    );
};

export default ModuleViewer;
