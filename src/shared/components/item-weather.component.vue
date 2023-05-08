<template>
    <div class="card">
        <div class="actions">
            <v-btn
                v-if="item"
                width="30px"
                :type="inWishlist ? 'danger' : 'info'"
                class="wishlist"
                @click="handleToggleToWishlist"
            >
                <v-icon icon="heart" :fill="inWishlist ? 'red' : '#222'" />
            </v-btn>
            <v-btn
                v-if="!hideRemoveButton"
                width="30px"
                type="danger"
                class="remove"
                @click="handleRemoveCard"
            >
                &times;
            </v-btn>
        </div>
        <div v-click-outside="() => (cities = [])" class="search">
            <v-input
                :value="search"
                :disabled="disabled"
                @update:value="handleSearchCity"
                @focus="handleFocusSearchInput"
            />

            <ul v-if="cities.length" class="dropdown-menu">
                <li
                    v-for="(city, index) of cities"
                    :key="index"
                    class="dropdown-item"
                    @click="handleSelectCity(city)"
                >
                    {{ city.name }}
                </li>
            </ul>
        </div>

        <template v-if="item && !loading">
            <item-for-one-day-component
                v-if="!item.list"
                :item="item"
                @set:one-day="handleSetOneDay"
                @set:five-days="handleSetFiveDays"
            />

            <item-for-fives-days-component
                v-else
                :item="item"
                @set:one-day="handleSetOneDay"
                @set:five-days="handleSetFiveDays"
            />
        </template>

        <div v-if="loading" class="loader">
            <v-loader width="110px" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'ItemWeatherComponent',
}
</script>

<script setup>
import { ref, watch } from 'vue'

import ItemForOneDayComponent from './item-for-one-day.component.vue'
import ItemForFivesDaysComponent from './item-for-fives-days.component.vue'

import WeatherApi from '../api/weather.api'

// eslint-disable-next-line
const props = defineProps({
    city: {
        type: String,
        default: '',
    },
    loading: {
        type: Boolean,
        default: false,
    },
    item: {
        type: Object,
        default: null,
    },
    disabled: {
        type: Boolean,
        default: false,
    },

    hideRemoveButton: {
        type: Boolean,
        default: false,
    },
    inWishlist: {
        type: Boolean,
        default: false,
    },
})

// eslint-disable-next-line
const emit = defineEmits([
    'selected:city',
    'remove:card',
    'toggle:wishlist',
    'set:one-day',
    'set:five-days',
])

const search = ref(props.city)
const cities = ref([])
const timeout = ref(null)

const fetchCities = async () => {
    try {
        const queries = {
            q: search.value,
            limit: 20,
        }
        const response = await WeatherApi.getCities(queries)

        cities.value = [...response.data]

        console.log(response)
    } catch (error) {
        console.log(error)
    }
}

const handleSearchCity = (value) => {
    if (value.length < 3) {
        return
    }

    clearTimeout(timeout.value)

    timeout.value = setTimeout(async () => {
        search.value = value

        await fetchCities()

        clearTimeout(timeout.value)

        timeout.value = null
    }, 500)
}

const handleFocusSearchInput = async () => {
    await fetchCities()
}

const handleSelectCity = (city) => {
    emit('selected:city', city.name)

    cities.value = []
}

const handleToggleToWishlist = () => {
    emit('toggle:wishlist', props.item)
}
const handleRemoveCard = () => {
    emit('remove:card', props.item)
}

const handleSetOneDay = () => {
    emit('set:one-day')
}

const handleSetFiveDays = () => {
    emit('set:five-days')
}

watch(
    () => props.city,
    () => {
        search.value = props.city
    },
)
</script>

<style lang="scss">
.card {
    background-color: var(--info);
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    padding: 24px;
    display: flex;
    flex-direction: column;

    .loader {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
    }

    .actions {
        display: flex;
        column-gap: 10px;
        justify-content: flex-end;
        margin-bottom: 10px;
    }

    .change-days {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        align-items: center;
        width: 100%;
        column-gap: 20px;
        margin-bottom: 20px;
    }

    .search {
        margin-bottom: 20px;
        position: relative;

        .dropdown-menu {
            position: absolute;
            top: 100%;
            left: 0;
            z-index: 999;
            width: 100%;
            min-width: 200px;
            padding: 8px 0;
            margin: 4px 0 0;
            border: 1px solid #ccc;
            border-radius: 4px;
            background-color: #fff;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
            max-height: 180px;
            overflow: auto;
        }

        .dropdown-item {
            display: block;
            padding: 8px 24px;
            font-size: 14px;
            font-weight: 400;
            color: #333;
            cursor: pointer;
            transition: all 0.2s ease-in-out;
        }

        .dropdown-item:hover {
            background-color: #f2f2f2;
        }
    }
}
</style>
