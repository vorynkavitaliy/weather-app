import locales from '../../locales/index.locales'

export default {
    install: ({ use, provide, config }, { i18n }) => {
        const $i18n = i18n.createI18n({
            globalInjection: true,
            legacy: false,
            locale: process.env.VUE_APP_DEFAULT_LANGUAGE,
            fallbackLocale: 'en',
            messages: locales,
        })

        use($i18n)

        const { globalProperties } = config

        provide('$t', globalProperties.$t)
    },
}
