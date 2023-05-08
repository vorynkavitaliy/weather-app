<template>
    <svg v-bind="attr" @click="onClick">
        <use :xlink:href="`${src}#icon-${icon}`" />
    </svg>
</template>

<script>
export default {
    name: 'VIcon',
    inheritAttrs: false,
}
</script>

<script setup>
import { computed } from 'vue'
// eslint-disable-next-line
const props = defineProps({
    icon: {
        type: String,
        default: '',
        required: true,
    },
    width: {
        type: [Number, String],
        default: 24,
    },
    height: {
        type: [Number, String],
        default: 24,
    },
    fill: {
        type: String,
        default: '#222222',
    },
    stroke: {
        type: String,
        default: 'none',
    },
    type: {
        type: String,
        default: 'default',
    },
    className: {
        type: [String, Object, Array],
        default: '',
    },
})
// eslint-disable-next-line
const emit = defineEmits(['click'])

const url = computed(() => {
    switch (props.type) {
        case 'colors':
            return 'icons-colors-sprite'

        default:
            return 'icons-sprite'
    }
})
const src = computed(
    () => new URL(`@/assets/icons/icons-sprite.svg`, import.meta.url).href,
)
const attr = computed(() => {
    return {
        ...(props.fill && { fill: props.fill }),
        ...(props.stroke && { stroke: props.stroke }),
        height: props.height,
        width: props.width,
        class: props.className,
    }
})
const onClick = () => emit('click')
</script>

<style lang="scss" scoped>
svg {
    transition: all 0.2s ease;
}
</style>
