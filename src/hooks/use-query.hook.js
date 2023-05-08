import { useRouter, useRoute } from 'vue-router'

export default function () {
    const router = useRouter()
    const route = useRoute()

    const setQUery = (name, query) => router.push({ name, query })
    const getQuery = (name) => route.query[name]
    const replaceQuery = (query) => router.replace({ query })

    return { setQUery, getQuery, replaceQuery }
}
