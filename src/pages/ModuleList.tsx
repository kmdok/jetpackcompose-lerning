import React from 'react';
import { Link } from 'react-router-dom';
import { phases } from '../data/modules';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const ModuleList: React.FC = () => {
    return (
        <div className="space-y-8">
            <div className="text-center space-y-4 mb-12">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-android-400 to-android-600 bg-clip-text text-transparent">
                    Android Core 完全習得
                </h1>
                <p className="text-gray-400 max-w-md mx-auto">
                    Jetpack ComposeによるモダンAndroid開発を深く学ぶ。
                    ゼロからエキスパートへ。
                </p>
            </div>

            <div className="space-y-6">
                {phases.map((phase, index) => (
                    <motion.div
                        key={phase.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-dark-card border border-dark-border rounded-2xl overflow-hidden"
                    >
                        <div className="p-6 border-b border-dark-border bg-white/5">
                            <h2 className="text-xl font-bold text-white mb-1">{phase.title}</h2>
                            <p className="text-sm text-gray-400">{phase.description}</p>
                        </div>

                        <div className="divide-y divide-dark-border">
                            {phase.modules.map((module) => (
                                <Link
                                    key={module.id}
                                    to={`/module/${module.id}`}
                                    className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors group"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-8 h-8 rounded-full bg-dark-surface flex items-center justify-center border border-dark-border group-hover:border-android-500 transition-colors">
                                            <span className="text-xs font-mono text-gray-400 group-hover:text-android-400">
                                                {module.id.split('_')[1]}
                                            </span>
                                        </div>
                                        <span className="text-gray-200 font-medium group-hover:text-white transition-colors">
                                            {module.title.split(': ')[1]}
                                        </span>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-android-400 transition-colors" />
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ModuleList;
