export default {
    install: ({ config, provide }) => {
        const { globalProperties } = config
        const session = {
            get: (key) => {
                const value = sessionStorage.getItem(key)
                return value ? JSON.parse(value) : null
            },
            set: (key, value) => {
                sessionStorage.setItem(key, JSON.stringify(value))
            },
            remove: (key) => {
                sessionStorage.removeItem(key)
            },
        }

        globalProperties.$session = session

        provide('$session', session)
    },
}
