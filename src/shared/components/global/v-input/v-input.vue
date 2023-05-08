<template>
    <div class="input-group" :class="className">
        <label class="input" :class="classes" :style="styles">
            <slot name="prepend" />
            <slot name="label">
                <span class="input-label">{{ label }}</span>
            </slot>
            <template v-if="!options.mask">
                <input
                    v-if="type !== 'textarea'"
                    v-bind="options"
                    v-on="listeners"
                    ref="input"
                    class="input-item"
                />
                <textarea
                    v-else
                    v-bind="options"
                    v-on="listeners"
                    ref="input"
                    class="input-item"
                />
            </template>
            <template v-else>
                <input
                    v-if="type !== 'textarea'"
                    v-bind="options"
                    v-on="listeners"
                    ref="input"
                    class="input-item"
                />
                <textarea
                    v-else
                    v-bind="options"
                    v-on="listeners"
                    ref="input"
                    class="input-item"
                />
            </template>
            <span v-if="$slots.append" class="input-append" @click.stop>
                <slot name="append" />
            </span>
        </label>
        <transition name="error">
            <div v-if="error" class="input-message">
                <span class="input-message--error">{{ error }}</span>
            </div>
        </transition>
    </div>
</template>
<script>
export default {
    name: 'VInput',
    inheritAttrs: false,
}
</script>
<script setup>
import { reactive, ref, computed, useSlots, inject } from 'vue'
import propsInput from './input.props'

const props = defineProps(propsInput)
const emit = defineEmits(['update:value', 'change', 'blur', 'focus'])
const slots = useSlots()
const $t = inject('$t')

//data
const focus = ref(false)
//computed
const styles = computed(() => ({
    height: props.height,
    ...(props.width && { maxWidth: props.width }),
}))

const error = computed(() => {
    if (!props.rules || !props.rules?.$errors?.length) return false

    const keys = props.rules.$errors.filter((key) => {
        return props.rules[key.$validator]
    })

    return keys.length
        ? $t(`errors.${keys[0].$validator}`, {
              name: props.rules.$path,
              length: keys[0].$params.min,
              other: keys[0].$params.otherName,
          })
        : null
})

const options = computed(() => ({
    maxLength: props.maxLength,
    value: props.value,
    type: props.type,
    disabled: props.disabled,
    placeholder: props.placeholder,
    readonly: props.readonly,
    ...props.settings,
}))

const classes = computed(() => [
    {
        'input--focus': focus.value,
        'input--value': props.value && !focus.value,
        'input--loading': props.loading,
        'input--disabled': props.disabled,
        'input--success': props.success && !error.value,
        'input--error': error.value,
        'input--append': slots.append,
        'input--prepend': slots.prepend,
        'input--outline': props.outline,
    },
    `input--${props.variant}`,
])

//methods
const onInput = (e) => {
    emit('update:value', e.target.value)
}

const onChange = (e) => {
    emit('change', e.target.value)
}

const onBlur = (e) => {
    focus.value = false
    emit('blur', e.target.value)
}
const onFocus = (e) => {
    focus.value = true
    emit('focus', e.target.value)
}

const listeners = reactive({
    input: onInput,
    change: onChange,
    blur: onBlur,
    focus: onFocus,
})
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
    opacity: 1;
    transform: translateX(0);
    height: 19px;
}
.error-enter-from,
.error-leave-to {
    height: 0px;
    transform: translateX(-10px);
    opacity: 0;
}
.input {
    border: 1px solid rgba(black, 0.48);
    border-radius: 8px;
    display: block;
    width: 100%;
    transition: all 0.2s ease-in-out;
    position: relative;
    display: flex;
    align-items: center;
    padding: 16px;
    background-color: $white;
    &--primary {
        //border: none;
        //border-radius: 0px;
        padding: 12px;
        border-bottom: 1px solid grey;
        .input-append {
            //right: 0;
        }
        .input-item {
            font-weight: 500;
            font-size: 14px;
        }
    }
    &--secondary {
        height: 60px;
        .input-label {
            position: absolute;
            top: 16px;
            // transform: translateY(-50%);
            font-weight: 500;
            font-size: 16px;
            line-height: calc(24 / 16) * 100%;
            color: rgba(black, 0.48);
            transition: all 0.2s ease-in-out;
        }
        &.input {
            &--focus,
            &--value {
                padding: 26px 16px 10px;
                .input-label {
                    top: 6px;
                    font-size: 13px;
                    line-height: calc(20 / 13) * 100%;
                    transform: none;
                }
            }
        }
    }
    &--empty {
        padding-top: 0;
        padding-bottom: 0;
        border-color: rgba(black, 0.2);
    }

    &--empty {
        height: 56px;
    }
    &--ternary {
        border: none;
        border-radius: 0px;
        padding: 8px 0px;
        .input-item {
            text-align: left;
        }

        &.input--outline {
            border-bottom: 1px solid #000;
        }
    }
    &--textarea-dialog {
        background-color: #f2f5f4;
        outline: none;
        border: none;

        .input-item {
            resize: unset;
        }
    }
    &-group {
        position: relative;
    }
    &-item {
        display: block;
        width: 100%;
        height: 100%;
        font-weight: 500;
        font-size: 16px;
        line-height: calc(24 / 16) * 100%;
    }

    &-append {
        flex: 1 1 0;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 16px;
        height: fit-content;
        width: fit-content;
    }

    &-message {
        transition: all 0.2s ease;
        position: relative;
        top: 4px;
        overflow: hidden;
        &--error {
            color: $danger;
        }
    }

    &--append {
        cursor: pointer;
        .input-item {
            padding-right: 40px;
        }
    }
    &--error {
        border-color: $danger;
        background-color: rgba($danger, 0.1);
    }

    &--success {
        border-color: $success;
        background-color: rgba($success, 0.1);
    }

    &--disabled {
        opacity: 0.4;
        pointer-events: none;
    }
}
</style>
