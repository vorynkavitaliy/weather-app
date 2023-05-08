<template>
    <div class="header">
        {{ name }}, {{ sys.country }}, {{ formatDate(item.dt * 1000) }}
    </div>
    <div class="content">
        <div class="temperature">{{ main.temp }}°C</div>

        <div class="description">{{ weather[0].description }}</div>
        <div class="icon">
            <img
                :src="`http://openweathermap.org/img/w/${weather[0].icon}.png`"
            />
        </div>

        <div class="change-days">
            <v-btn @click="handleSetOneDay"> 1 {{ $t('general.day') }} </v-btn>
            <v-btn @click="handleSetFiveDays">
                5 {{ $t('general.days') }}
            </v-btn>
        </div>
    </div>
    <div class="footer">
        <div class="wind">Wind {{ wind.speed }} m/s</div>
        <div class="pressure">Pressure {{ main.pressure }} hPa</div>
        <div class="humidity">Humidity {{ main.humidity }} %</div>
    </div>
</template>

<script>
export default {
    name: 'ItemForOneDay',
}
</script>

<script setup>
import { ref, computed, watch } from 'vue'
import formatDate from '@/helpers/date-formatter.helper'

// eslint-disable-next-line
const props = defineProps({
    item: {
        type: Object,
        default: null,
    },
})

// eslint-disable-next-line
const emit = defineEmits(['set:one-day', 'set:five-days'])

const name = computed(() => props.item?.name || {})
const weather = computed(() => props.item?.weather || {})
const main = computed(() => props.item?.main || {})
const wind = computed(() => props.item?.wind || {})
const sys = computed(() => props.item?.sys || {})

const handleSetOneDay = () => {
    emit('set:one-day')
}

const handleSetFiveDays = () => {
    emit('set:five-days')
}
</script>

<style lang="scss" scoped>
.header {
    font-size: 24px;
    font-weight: 500;
    margin-bottom: 8px;
}

.content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-grow: 1;

    .temperature {
        font-size: 64px;
        font-weight: 500;
        margin-bottom: 16px;
    }

    .description {
        font-size: 24px;
        font-weight: 500;
        margin-bottom: 16px;
        text-transform: capitalize;
    }

    .icon {
        img {
            width: 120px;
            height: 120px;
        }
    }
}

.footer {
    display: flex;
    justify-content: space-between;
    font-size: 16px;

    .wind,
    .pressure,
    .humidity {
        font-weight: 500;
    }
}
</style>
