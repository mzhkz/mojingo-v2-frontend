const routes = [
    {
        name: 'login',
        category: 'login',
        title: 'ログインする',
        level: 0,
        path: '/login',
        components: {
            main: () => import('@/pages/login/Login')
        }
    },
    {
        name: 'dashboard',
        category: 'dashboard',
        path: '/',
        level: 1,
        components: {
            main: () => import('@/pages/dashboard/Dashboard')
        }
    },
    {
        name: 'categories',
        category: 'categories',
        path: '/categories',
        level: 1,
        components: {
            main: () => import('@/pages/categories/Categories')
        }
    },
    {
        name: 'category_detail',
        category: 'categories',
        path: '/categories/:id',
        level: 1,
        components: {
            main: () => import('@/pages/categories/CategoryDetail')
        }
    },
    {
        name: 'reviews',
        category: 'reviews',
        path: '/reviews/:which',
        level: 1,
        components: {
            main: () => import('@/pages/reviews/Reviews')
        }
    },
    {
        name: 'review',
        category: 'review',
        path: '/reviews/:id',
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
        isPublic: false,
        level: 2,
        components: {
            main: () => import('@/pages/admin/Admin')
        }
    },

];

export default routes;