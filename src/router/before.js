import loadLayoutMiddleware from '@/middleware/loadLayout.middleware'

export default async (to, from, next) => {
    try {
        document.title = to.meta.title || 'Title';
        await loadLayoutMiddleware(to)
        if (!to.meta.middleware) {
            return next()
        }
        const middleware = to.meta.middleware
        const context = {
            to,
            from,
            next,
            store,
        }
        return middleware[0]({
            ...context,
        })
    } catch (error) {
        throw Error(error)
    }
}
