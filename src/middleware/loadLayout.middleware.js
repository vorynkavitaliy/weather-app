export default async function (route) {
    const { layout } = route.meta

    const component = await import(`@/layouts/${layout || 'default'}.vue`)

    route.meta.layoutComponent = component.default
}
