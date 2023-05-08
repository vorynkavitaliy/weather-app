<template>
    <div class="wishlist-page">
        <div class="container">
            <div class="wrapper">
                <item-weather-component
                    v-for="(card, index) of weathers"
                    disabled
                    hide-remove-button
                    :in-wishlist="!!isWishlist(card)"
                    :key="index"
                    :loading="card.loading"
                    :city="card.item.name"
                    :item="card.item"
                    @toggle:wishlist="handleToggleToWishlist"
                    @set:one-day="fetchWeatherForOneDay(index)"
                    @set:five-days="fetchWeatherForFiveDays(index)"
                />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'WishlistContainer',
}
</script>

<script setup>
import { useI18n } from 'vue3-i18n'
import { computed, inject, onMounted, ref, watch } from 'vue'

import WeatherApi from '../../shared/api/weather.api'

import ItemWeatherComponent from '../../shared/components/item-weather.component.vue'

const { getLocale } = useI18n()
const $storage = inject('$storage')

const wishlist = ref($storage.get('wishlist') || [])
const weathers = ref([])

const isWishlist = computed(() => (item) => {
    return wishlist.value.find((card) => card.id === item?.id)
})

const lang = computed(() => getLocale())

const fetchWishlistCitiesWeathers = async () => {
    Promise.all(wishlist.value.map((card) => fetchWeather(card.name)))
}

watch(lang, async () => {
    weathers.value = []

    await fetchWishlistCitiesWeathers()
})

const fetchWeather = async (city) => {
    try {
        const response = await WeatherApi.getWeather({
            q: city,
            units: 'metric',
            lang: lang.value,
        })
        weathers.value.push({
            loading: false,
            id: response.data.id,
            item: { ...response.data },
        })
    } catch (error) {
        console.log(error)
    }
}

const fetchWeatherForOneDay = async (index) => {
    weathers.value[index].loading = true

    try {
        const response = await WeatherApi.getWeather({
            q: weathers.value[index].item?.name || weathers.value[index].item?.city.name,
            units: 'metric',
            lang: lang.value,
        })

        weathers.value[index] = {
            ...weathers.value[index],
            id: response.data.id,
            item: { ...response.data },
        }
    } catch (error) {
        console.log(error)
    } finally {
        weathers.value[index].loading = false
    }
}

const fetchWeatherForFiveDays = async (index) => {
    weathers.value[index].loading = true

    try {
        console.log('testL ', index)
        const response = await WeatherApi.getWeatherForFiveDays({
            q: weathers.value[index].item.name,
            units: 'metric',
            lang: lang.value,
        })

        weathers.value[index] = {
            ...weathers.value[index],
            id: response.data.city.id,
            item: { ...response.data },
        }
    } catch (error) {
        console.log(error)
    } finally {
        weathers.value[index].loading = false
    }
}

const handleToggleToWishlist = (item) => {
    if (!!isWishlist.value(item)) {
        wishlist.value = wishlist.value.filter((card) => card.id !== item.id)
    } else {
        wishlist.value.push(item)
    }

    $storage.set(
        'wishlist',
        wishlist.value.map((card) => ({
            id: card.id,
            name: card.name,
        })),
    )
}

onMounted(async () => {
    await fetchWishlistCitiesWeathers()
})
</script>

<style lang="scss" scoped>
.wrapper {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
    gap: 20px;
}
</style>
