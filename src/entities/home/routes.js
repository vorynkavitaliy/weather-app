export default [
    {
        name: 'home',
        path: '/',
        component: () => import('./home.view.vue'),
        meta: {
            title: 'Home',
        },
    },
]
