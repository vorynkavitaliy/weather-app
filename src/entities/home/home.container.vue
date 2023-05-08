<template>
    <div class="home-page">
        <div class="container">
            <div class="wrapper">
                <item-weather-component
                    v-for="(card, index) of weathers"
                    :hide-remove-button="weathers.length === 1"
                    :key="index"
                    :city="card.selectedCity"
                    :in-wishlist="!!isWishlist(card)"
                    :loading="card.loading"
                    :item="card.item"
                    @selected:city="handleSelectedCity($event, index)"
                    @toggle:wishlist="handleToggleToWishlist"
                    @remove:card="handleOpenRemoveDialog($event, index)"
                    @set:one-day="fetchWeather(index)"
                    @set:five-days="fetchWeatherForFiveDays(index)"
                />

                <div
                    v-if="!maxWeathersCards"
                    class="add-country"
                    @click="handleAddCountry"
                >
                    +
                </div>
            </div>
        </div>

        <add-to-wishlist-dialog v-model:value="dialogs.wishlist" />

        <remove-card-dialog
            v-model:value="dialogs.remove"
            @apply="handleRemoveCard"
        />
    </div>
</template>

<script setup>
import { useI18n } from 'vue3-i18n'

import { ref, onMounted, reactive, computed, inject, watch } from 'vue'

import WeatherApi from '../../shared/api/weather.api'
import UserApi from './api/user.api'

import ItemWeatherComponent from '../../shared/components/item-weather.component.vue'
import AddToWishlistDialog from './dialogs/add-to-wishlist.dialog.vue'
import RemoveCardDialog from './dialogs/remove-card.dialog.vue'

const { getLocale } = useI18n()

const $storage = inject('$storage')

const selectedCardForRemove = ref(null)

const dialogs = reactive({
    wishlist: false,
    remove: false,
})

const weathers = ref([
    {
        selectedCity: '',
        loading: false,
    },
])

const wishlist = ref($storage.get('wishlist') || [])

const maxWeathersCards = computed(() => weathers.value.length >= 5)

const lang = computed(() => getLocale())

const isWishlist = computed(() => (item) => {
    return wishlist.value.find((card) => card.id === item?.id)
})

watch(lang, () => {
    Promise.all(weathers.value.map((_, index) => fetchWeather(index)))
})

const fetchWeather = async (index) => {
    if (!weathers.value[index].selectedCity) {
        return
    }

    weathers.value[index].loading = true

    try {
        const response = await WeatherApi.getWeather({
            q: weathers.value[index].selectedCity,
            units: 'metric',
            lang: lang.value,
        })

        weathers.value[index] = {
            ...weathers.value[index],
            id: response.data.id,
            item: { ...response.data },
        }
    } catch (error) {
    } finally {
        weathers.value[index].loading = false
    }
}

const fetchWeatherForFiveDays = async (index) => {
    if (!weathers.value[index].selectedCity) {
        return
    }

    weathers.value[index].loading = true

    try {
        const response = await WeatherApi.getWeatherForFiveDays({
            q: weathers.value[index].selectedCity,
            units: 'metric',
            lang: lang.value,
        })

        weathers.value[index] = {
            ...weathers.value[index],
            id: response.data.city.id,
            item: { ...response.data },
        }
    } catch (error) {
    } finally {
        weathers.value[index].loading = false
    }
}

const handleAddCountry = () => {
    weathers.value.push({ selectedCity: '', item: null })
}

const handleSelectedCity = async (value, index) => {
    weathers.value[index].selectedCity = value

    await fetchWeather(index)
}

const handleToggleToWishlist = (item) => {
    if (!!isWishlist.value(item)) {
        wishlist.value = wishlist.value.filter((card) => card.id !== item.id)

        $storage.set(
            'wishlist',
            wishlist.value.map((card) => ({
                id: card.id,
                name: card.name,
            })),
        )

        return
    }

    if (wishlist.value.length >= 5) {
        dialogs.wishlist = true

        return
    }

    wishlist.value.push(item)

    $storage.set(
        'wishlist',
        wishlist.value.map((card) => ({
            id: card.id,
            name: card.name,
        })),
    )
}

const handleOpenRemoveDialog = (_, index) => {
    dialogs.remove = true

    selectedCardForRemove.value = index
}

const handleRemoveCard = () => {
    weathers.value.splice(selectedCardForRemove.value, 1)

    dialogs.remove = false
}

const handleSetOneDay = (card) => {}

const handleSetFiveDays = async (card) => {

}

onMounted(async () => {
    const { city } = await UserApi.getUserLocation()

    weathers.value[0].selectedCity = city

    await fetchWeather(0)
})
</script>

<style lang="scss" scoped>
.wrapper {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
    gap: 20px;
}

.add-country {
    height: 100%;
    background-color: $info;
    border-radius: 5px;
    font-size: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 240px;
    cursor: pointer;
    user-select: none;
    min-height: 400px;
}
</style>
