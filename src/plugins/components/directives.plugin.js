export default {
    install: ({ directive }) => {
        directive('click-outside', {
            created(el, binding, vnode) {
                const vm = vnode.context
                const callback = binding.value

                el.clickOutsideEvent = (event) => {
                    if (!(el === event.target || el.contains(event.target))) {
                        return callback.call(vm, event)
                    }
                }

                document.body.addEventListener('click', el.clickOutsideEvent)
            },
            unmounted(el) {
                document.body.removeEventListener('click', el.clickOutsideEvent)
            },
        })
    },
}
