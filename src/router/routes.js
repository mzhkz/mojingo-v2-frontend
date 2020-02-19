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
        title: '単語カテゴリー',
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
        path: '/reviews/:which/:id',
        layout: 'default',
        level: 1,
        components: {
            main: () => import('@/pages/reviews/Review')
        }
    },

    /** Admin */
    {
        name: 'admin',
        category: 'admin',
        path: '/admin/',
        layout: 'default',
        level: 2,
        components: {
            main: () => import('@/pages/admin/Admin')
        }
    },

    {
        name: 'profile',
        category: 'profile',
        path: '/profile/:which',
        title: 'プロフィール',
        layout: 'default',
        level: 1,
        components: {
            main: () => import('@/pages/admin/Profile')
        }
    },

];

export default routes;