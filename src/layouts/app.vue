<template>
    <component :is="route.meta.layoutComponent">
        <router-view />
    </component>
</template>

<script>
export default {
    name: 'AppLayout',
}
</script>
<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>
