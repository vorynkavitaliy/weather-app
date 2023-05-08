import { createRouter, createWebHistory } from 'vue-router'
import before from './before'
import routes from './routes'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

router.beforeEach(before)

export default router
