<template>
    <div class="weather-card__header">
        <h2 class="weather-card__title">{{ item.city.name }}</h2>
        <div class="weather-card__meta">
            <span class="weather-card__temp"
                >{{ item.list[0].main.temp }}&deg;C</span
            >
            <img
                :src="
                    'http://openweathermap.org/img/w/' +
                    item.list[0].weather[0].icon +
                    '.png'
                "
                alt="Weather Icon"
                class="weather-card__icon"
            />
        </div>
    </div>

    <div class="weather-card__body">
        <div class="change-days">
            <v-btn @click="handleSetOneDay"> 1 {{ $t('general.day') }} </v-btn>
            <v-btn @click="handleSetFiveDays">
                5 {{ $t('general.days') }}
            </v-btn>
        </div>

        <div class="weather-card__details">
            <p class="weather-card__description">
                {{ item.list[0].weather[0].description }}
            </p>
            <p class="weather-card__wind">
                Wind: {{ item.list[0].wind.speed }} km/h
            </p>
            <p class="weather-card__humidity">
                Humidity: {{ item.list[0].main.humidity }}%
            </p>
        </div>

        <div class="weather-card__chart">
            <canvas ref="chartRef" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'ItemForOneDay',
}
</script>

<script setup>
import Chart from 'chart.js/auto'

import { ref, onMounted } from 'vue'

// eslint-disable-next-line
const props = defineProps({
    item: {
        type: Object,
        default: null,
    },
})

// eslint-disable-next-line
const emit = defineEmits(['set:one-day', 'set:five-days'])

const chartRef = ref(null)

const handleSetOneDay = () => {
    emit('set:one-day')
}

const handleSetFiveDays = () => {
    emit('set:five-days')
}

const createChart = () => {
    const ctx = chartRef.value.getContext('2d')
    const labels = props.item.list.map((data) => data.dt_txt)
    const data = props.item.list.map((data) => data.main.temp)
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels,
            datasets: [
                {
                    label: 'Temperature (Celsius)',
                    data,
                    borderColor: '#2196F3',
                    fill: false,
                },
            ],
        },
        options: {
            scales: {
                y: {
                    ticks: {
                        callback: function (value, index, values) {
                            return value + '°C'
                        },
                    },
                },
            },
        },
    })
}

onMounted(() => {
    createChart()
})
</script>

<style lang="scss" scoped>
.weather-card {
    background-color: #fff;
    box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.2);
    padding: 1rem;
    border-radius: 0.5rem;

    &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
    }

    &__meta {
        display: flex;
        align-items: center;
    }

    &__icon {
        margin-left: 0.5rem;
    }

    &__title {
        font-size: 1.5rem;
        font-weight: 500;
        margin: 0;
    }

    &__temp {
        font-size: 1.25rem;
        font-weight: 500;
        margin: 0;
    }

    &__description {
        margin: 0;
        font-weight: 500;
    }

    &__details {
        margin-right: 1rem;
    }

    &__chart {
        margin-top: 1rem;
    }
}
</style>
