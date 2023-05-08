<template>
    <modal-overlay v-bind="modalAttrs" @click="onClose">
        <div class="modal-head">
            <slot name="head" />
        </div>
        <div class="modal-body">
            <slot />
        </div>

        <div class="modal-footer">
            <slot name="footer" />
        </div>
    </modal-overlay>
</template>

<script>
import { computed } from 'vue'
export default {
    name: 'ModalPrimary',
    inheritAttrs: false,
}
</script>
<script setup>
import ModalOverlay from './modal-overlay.vue'
// eslint-disable-next-line
const props = defineProps({
    value: {
        type: Boolean,
        default: false,
    },
    width: {
        type: String,
        default: '540px',
    },
    icon: {
        type: String,
        default: 'letter',
    },
    variant: {
        type: String,
        default: 'primary',
    },
    iconSize: {
        type: Object,
        default: () => ({
            w: '60px',
            h: '60px',
        }),
    },
    className: {
        type: [String, Object, Array],
        default: '',
    },
    disableDefaultClose: {
        type: Boolean,
        default: false,
    },
})
// eslint-disable-next-line
const emit = defineEmits(['update:value'])

//data
const modalAttrs = computed(() => ({
    width: props.width,
    className: ['modal-primary', props.className, props.variant],
    value: props.value,
}))

//methods

const onClose = () => {
    if (props.disableDefaultClose) {
        return
    }
    emit('update:value', false)
}
</script>

<style lang="scss" scoped>
.modal {
    &-primary {
        &.danger {
            .modal-head {
                background-color: $danger;
            }
        }

        &.delete {
            .modal-head {
                background-color: $danger;
                padding-bottom: 10px;
            }
            .modal-body {
               padding: 0;
             }
        }
    }
    &-head {
        position: relative;
        padding: 32px 32px 0px 32px;

        &--close {
            position: absolute;
            top: 14px;
            right: 12px;
        }
    }

    &-body {
        padding: 32px;

        &--icon {
            display: block;
            width: 100px;
            height: 100px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #000;
            border-radius: 15px;
            overflow: hidden;
            margin: -50px auto 12px;
            position: relative;
            z-index: 1;
            .icon {
                margin: auto;
            }
        }
    }

    &-footer {
        padding: 32px;
    }
}
</style>
