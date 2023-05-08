<template>
    <div class="app-language">
        <ul class="app-language--list">
            <li
                v-for="lang of ['ua', 'en']"
                :key="lang"
                class="app-language--item"
                :class="{ active: selectedLanguage === lang }"
                @click="handleSwitchLanguage(lang)"
            >
                {{ $t(`inputs.language.${lang}`) }}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'ChangeLanguageComponent',
}
</script>

<script setup>
import { computed, inject, onMounted } from 'vue'
import { useI18n } from 'vue3-i18n'

const { getLocale, setLocale } = useI18n()

const $storage = inject('$storage')

const selectedLanguage = computed(() => getLocale())

const handleSwitchLanguage = (lang) => {
    setLocale(lang)

    $storage.set('language', lang)
}

onMounted(() => {
    const lang = $storage.get('language') || 'ua'

    setLocale(lang)
})
</script>

<style lang="scss" scoped>
.app-language {
    position: relative;
    background-color: $black;
    padding: 4px 6px;
    border-radius: 10px;


    &--list {
        display: flex;
        align-items: center;
    }

    &--item {
        cursor: pointer;
        padding: 4px;
        border-radius: 5px;
        color: #ffffff;
        transition: background-color .2s ease-in;

        &.active {
            background-color: $light;
            color: $black;
        }

        &:not(:last-child) {
            margin-right: 6px;
        }
    }
}
</style>
