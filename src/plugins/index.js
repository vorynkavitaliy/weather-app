import plugins from './components/index.plugins'
export default (app, options) => {
    for (const key in plugins) {
        const element = plugins[key]
        app.use(element, options)
    }
}
