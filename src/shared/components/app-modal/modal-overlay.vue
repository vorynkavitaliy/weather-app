<template>
    <transition name="modal">
        <div v-if="value" class="modal-mask" :class="className">
            <div class="modal-wrapper" @click.stop="onClick" />
            <slot name="container">
                <div
                    ref="modal"
                    :style="{ maxWidth: width }"
                    class="modal-container"
                >
                    <slot />
                </div>
            </slot>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'ModalOverlay',
    inheritAttrs: false,
}
</script>
<script setup>
import { ref } from 'vue'
// eslint-disable-next-line
const props = defineProps({
    value: {
        type: Boolean,
        default: false,
    },
    width: {
        type: String,
        default: '500px',
    },
    className: {
        type: [String, Object, Array],
        default: '',
    },
})
// eslint-disable-next-line
const emit = defineEmits(['click'])

//methods
const onClick = () => emit('click')
</script>

<style lang="scss" scoped>
.modal {
    &-mask {
        position: fixed;
        z-index: 9998;
        overflow: auto;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.1);
        display: flex;
        transition: opacity 0.2s ease;
    }

    &-wrapper {
        position: absolute;
        z-index: 0;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    &-container {
        position: relative;
        z-index: 1;
        width: 100%;
        margin: auto;
        background-color: #fff;
        border-radius: 8px;
        transition: all 0.2s ease;
        overflow: hidden;
        box-shadow: 0px 10px 14px rgba(51, 51, 51, 0.05);
    }

    &-enter-active {
        opacity: 0;
        .modal-container {
            transform: scale(1.1);
        }
    }
    &-leave-active {
        opacity: 0;

        .modal-container {
            transform: scale(1.1);
        }
    }
}
</style>
