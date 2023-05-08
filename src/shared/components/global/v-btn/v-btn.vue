<template>
    <router-link
        v-if="to"
        :to="to"
        ref="button"
        :class="['button', classes, className]"
        :style="stylesElement"
        @click="onClick"
    >
        <template v-if="!loading">
            <slot />
        </template>
        <template v-else>
            <span :style="styleLoading" class="loading" />
        </template>
    </router-link>

    <a
        v-else-if="href"
        :href="href"
        ref="button"
        :class="['button', classes, className]"
        :style="stylesElement"
        @click="onClick"
    >
        <template v-if="!loading">
            <slot />
        </template>
        <template v-else>
            <span :style="styleLoading" class="loading" />
        </template>
    </a>
    <button
        v-else
        ref="button"
        :class="['button', classes, className]"
        :style="stylesElement"
        @click="onClick"
    >
        <template v-if="!loading">
            <slot />
        </template>
        <template v-else>
            <span :style="styleLoading" class="loading" />
        </template>
    </button>
</template>

<script>
export default {
    name: 'VBtn',
}
</script>
<script setup>
import { computed } from 'vue'
import propsButton from './button.props'
// eslint-disable-next-line
const props = defineProps(propsButton)
// eslint-disable-next-line
const emit = defineEmits(['click'])
//computed
const stylesElement = computed(() => {
    const obj = {}
    props.color && (obj.color = props.color)
    props.height && (obj.height = props.height)
    props.width && (obj.maxWidth = props.width)
    props.fontSize && (obj.fontSize = props.fontSize)
    props.rounded && (obj.borderRadius = props.rounded)
    props.background && (obj.backgroundColor = props.background)
    props.borderColor && (obj.borderColor = props.borderColor)
    return { ...obj, ...props.styles }
})

const classes = computed(() => [
    {
        'button--outline': props.outline === true,
        'button--disabled': props.disabled === true,
        'button--loading': props.loading === true,
    },
    `button--${props.type}`,
])

const styleLoading = computed(() => {
    let obj = {}
    props.loadingStyle && (obj = { ...obj, ...props.loadingStyle })
    return obj
})
//methods
const onClick = (event) => emit('click', event)
</script>

<style lang="scss" scoped>
.button {
    height: 36px;
    width: 100%;
    max-width: 100%;
    font-weight: 500;
    font-size: 15px;
    line-height: calc(24 / 15) * 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    color: #fff;
    cursor: pointer;
    overflow: hidden;
    transition: all 0.2s ease;
    text-decoration: none;

    &:hover {
        text-decoration: none !important;
    }
    &--outline {
        border: 1px solid var(--text-color);
    }

    &--primary {
        background-color: var(--success);
        border-color: var(--success);
        &:hover {
            background-color: rgba($success, 0.8);
        }
    }

    &--empty {
        background-color: transparent;
        color: var(--text-color);
        &:hover {
            background-color: rgba(var(--text-color), 0.1);
        }
    }
    &--danger {
        color: $white;
        background-color: var(--danger);
        border: 1px solid var(--danger);
        &:hover {
            background-color: rgba($danger, 0.8);
        }
    }
    &--warning {
        color: $black;
        background-color: var(--warning);
        border: 1px solid var(--warning);
        &:hover {
            background-color: rgba(var(--warning), 0.8);
        }
    }
    &--info {
        color: $black;
        background-color: var(--info);
        border: 1px solid var(--info);
        &:hover {
            background-color: rgba(var(--info), 0.8);
        }
    }
    &--icon {
        color: $success;
        background-color: transparent;
        border: unset;
    }

    &--disabled {
        background-color: var(--disabled) !important;
        pointer-events: none !important;
        color: $white !important;
        border-color: transparent !important;
    }

    &--loading {
        pointer-events: none;
    }

    .loading {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        border-top: 2px solid rgba(var(--primary), 0.2);
        border-right: 2px solid transparent;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
}
</style>
