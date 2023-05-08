<template>
    <div
        class="app-toggle-theme"
        :class="{ 'dark-theme': isDarkTheme }"
        @click="handleToggleTheme"
    >
        <v-icon
            :icon="isDarkTheme ? 'moon' : 'sun'"
            :fill="isDarkTheme ? '#F1C40F' : '#F39C12'"
            class-name="icon"
        />
    </div>
</template>

<script>
export default {
    name: 'ToggleThemeComponent',
}
</script>

<script setup>
import { ref, inject, onMounted } from 'vue'

const $storage = inject('$storage')

const isDarkTheme = ref(false)

const handleToggleTheme = () => {
    isDarkTheme.value = !isDarkTheme.value

    $storage.set('theme', isDarkTheme.value ? 'dark-theme' : 'light-theme')

    changeDocumentTheme()
}

const changeDocumentTheme = () => {
    if (isDarkTheme.value) {
        document.documentElement.classList.add('dark-theme')
    } else {
        document.documentElement.classList.remove('dark-theme')
    }
}

onMounted(() => {
    const theme = $storage.get('theme')

    isDarkTheme.value = theme === 'dark-theme'

    changeDocumentTheme()
})
</script>

<style lang="scss" scoped>
.app-toggle-theme {
    position: relative;
    background-color: $black;
    padding: 4px 6px;
    border-radius: 20px;
    width: 80px;
    height: 33px;
    cursor: pointer;

    .icon {
        position: absolute;
        top: 4px;
        left: calc(100% - 31px);
        transition: all 0.2s ease-in;
    }

    &::before {
        content: '';
        display: block;
        border-radius: 50%;
        width: 25px;
        height: 25px;
        background-color: $light;
        position: absolute;
        top: 4px;
        left: 6px;
        transition: left 0.2s ease-in;
    }

    &.dark-theme {
        &::before {
            left: calc(100% - 31px);
        }

        .icon {
            left: 6px;
        }
    }
}
</style>
