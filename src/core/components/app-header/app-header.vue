<template>
    <div class="app-header">
        <div class="container">
            <div class="inner">
                <nav class="app-header--navigation">
                    <ul class="app-header--navigation-list">
                        <li class="app-header--navigation-item">
                            <router-link
                                :to="{ name: 'home' }"
                                class="app-header--navigation-link"
                            >
                                {{ $t('navbar.home') }}
                            </router-link>
                        </li>

                        <li class="app-header--navigation-item">
                            <router-link
                                :to="{ name: 'wishlist' }"
                                class="app-header--navigation-link"
                            >
                                {{ $t('navbar.wishlist') }}
                            </router-link>
                        </li>
                    </ul>
                </nav>

                <change-language-component
                    class="app-header--change-language"
                />

                <toggle-theme-component class="app-header--toggle-theme" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AppHeader',
}
</script>

<script setup>
import ChangeLanguageComponent from './components/change-language.component.vue'
import ToggleThemeComponent from './components/toggle-theme.component.vue'
</script>

<style lang="scss" scoped>
.app-header {
    .inner {
        display: flex;
        align-items: center;
        padding: 12px 0px;
    }

    &--navigation {
        &-list {
            display: flex;
            align-items: center;
        }

        &-item {
            margin-right: 10px;
        }
    }

    &--change-language {
        margin-left: auto;
        margin-right: 10px;
    }
}
</style>
