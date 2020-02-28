const routes = [
    {
        name: 'login',
        category: 'login',
        title: 'ログインする',
        level: 0,
        path: '/login',
        layout: 'TopBar',
        components: {
            main: () => import('@/pages/login/Login')
        }
    },
    {
        name: 'dashboard',
        category: 'dashboard',
        title: 'ダッシュボード',
        path: '/',
        level: 1,
        layout: 'default',
        components: {
            main: () => import('@/pages/dashboard/Dashboard')
        }
    },
    {
        name: 'categories',
        category: 'categories',
        title: '辞書一覧',
        path: '/categories',
        layout: 'default',
        level: 1,
        components: {
            main: () => import('@/pages/categories/Categories')
        }
    },
    {
        name: 'category_detail',
        category: 'categories',
        title: '辞書',
        path: '/categories/:id',
        layout: 'default',
        level: 1,
        components: {
            main: () => import('@/pages/categories/CategoryDetail')
        }
    },
    {
        name: 'reviews',
        category: 'reviews',
        title: '小テスト',
        path: '/reviews/:which',
        layout: 'default',
        level: 1,
        components: {
            main: () => import('@/pages/reviews/Reviews')
        }
    },
    {
        name: 'review',
        category: 'review',
        title: '小テスト',
        path: '/reviews/:which/:id',
        layout: 'default',
        level: 1,
        components: {
            main: () => import('@/pages/reviews/Review')
        }
    },
    {
        name: 'marking',
        category: 'reviews',
        title: 'マーキング',
        path: '/reviews/:which/:id/marking',
        layout: 'TopBar',
        level: 1,
        components: {
            main: () => import('@/pages/mark/Marking')
        }
    },

    /** Admin */
    {
        name: 'admin',
        category: 'admin',
        title: '管理画面',
        path: '/administrator/',
        layout: 'default',
        level: 2,
        components: {
            main: () => import('@/pages/admin/Admin')
        }
    },

    {
        name: 'profile',
        category: 'profile',
        path: '/profile/:id',
        title: 'プロフィール',
        layout: 'default',
        level: 1,
        components: {
            main: () => import('@/pages/admin/Profile')
        }
    },

];

export default routes;