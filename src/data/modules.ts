export interface Module {
    id: string;
    title: string;
    phase: string;
    description: string;
    path: string;
}

export const phases = [
    {
        id: 'phase1',
        title: 'フェーズ 1: 基礎',
        description: 'Kotlin、Composeのメンタルモデル、状態管理',
        modules: [
            { id: 'module_1', title: 'モジュール 1: Kotlin速習', path: '/modules/module_1_kotlin_accelerated.md' },
            { id: 'module_2', title: 'モジュール 2: Composeのメンタルモデル', path: '/modules/module_2_compose_mental_model.md' },
            { id: 'module_3', title: 'モジュール 3: 状態管理', path: '/modules/module_3_state_management.md' },
            { id: 'module_4', title: 'モジュール 4: 副作用とライフサイクル', path: '/modules/module_4_side_effects.md' },
            { id: 'module_5', title: 'モジュール 5: アーキテクチャとナビゲーション', path: '/modules/module_5_architecture.md' },
            { id: 'module_6', title: 'モジュール 6: パフォーマンス', path: '/modules/module_6_performance.md' },
        ]
    },
    {
        id: 'phase2',
        title: 'フェーズ 2: データと永続化',
        description: 'Room、DataStore、ネットワーク',
        modules: [
            { id: 'module_7', title: 'モジュール 7: Roomデータベース', path: '/modules/module_7_room_database.md' },
            { id: 'module_8', title: 'モジュール 8: DataStore', path: '/modules/module_8_datastore.md' },
            { id: 'module_9', title: 'モジュール 9: ネットワーク', path: '/modules/module_9_networking.md' },
        ]
    },
    {
        id: 'phase3',
        title: 'フェーズ 3: システム統合',
        description: 'WorkManager、サービス、インテント、セキュリティ',
        modules: [
            { id: 'module_10', title: 'モジュール 10: WorkManager', path: '/modules/module_10_workmanager.md' },
            { id: 'module_11', title: 'モジュール 11: サービスと通知', path: '/modules/module_11_services.md' },
            { id: 'module_12', title: 'モジュール 12: インテントとシステム統合', path: '/modules/module_12_system_integration.md' },
            { id: 'module_13', title: 'モジュール 13: セキュリティとID', path: '/modules/module_13_security.md' },
        ]
    },
    {
        id: 'phase4',
        title: 'フェーズ 4: 高度なUI',
        description: 'アニメーション、Canvas、アクセシビリティ',
        modules: [
            { id: 'module_14', title: 'モジュール 14: 高度なアニメーション', path: '/modules/module_14_animations.md' },
            { id: 'module_15', title: 'モジュール 15: Canvas', path: '/modules/module_15_canvas.md' },
            { id: 'module_16', title: 'モジュール 16: アクセシビリティ', path: '/modules/module_16_accessibility.md' },
        ]
    },
    {
        id: 'phase5',
        title: 'フェーズ 5: テストと品質',
        description: 'ユニットテスト、UIテスト、Hilt',
        modules: [
            { id: 'module_17', title: 'モジュール 17: ユニットテスト', path: '/modules/module_17_unit_testing.md' },
            { id: 'module_18', title: 'モジュール 18: UIテスト', path: '/modules/module_18_ui_testing.md' },
            { id: 'module_19', title: 'モジュール 19: Hiltテスト', path: '/modules/module_19_hilt_testing.md' },
        ]
    }
];
