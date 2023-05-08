export default {
    install: ({ config, provide }) => {
        const { globalProperties } = config
        const storage = {
            get: (key) => {
                const value = localStorage.getItem(key)

                return value ? JSON.parse(value) : null
            },
            set: (key, value) => {
                localStorage.setItem(key, JSON.stringify(value))
            },
            remove: (key) => {
                localStorage.removeItem(key)
            },
        }

        globalProperties.$storage = storage

        provide('$storage', storage)
    },
}
