<template>
    <main class="app-main">
        <app-header />

        <div>
            <slot />
        </div>
    </main>
</template>

<script>
export default {
    name: 'Default',
}
</script>

<script setup>
import AppHeader from '../core/components/app-header/app-header.vue'
</script>

<style lang="scss" scoped>
.app {
    &-header {
        //position: absolute;
        //top: 0;
        //left: 0;
        width: 100%;
    }

    &-main {
        //padding-top: 80px;
        //@include screen($md) {
        //    padding-top: 88px;
        //}
    }
}
</style>
