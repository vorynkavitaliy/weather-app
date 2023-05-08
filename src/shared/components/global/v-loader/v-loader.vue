<template>
    <div class='loader-wrapper' v-bind='attr'>
        <svg class="loader" viewBox="0 0 24 24">
            <circle class="loader__value" cx="12" cy="12" r="10" />
            <circle class="loader__value" cx="12" cy="12" r="10" />
            <circle class="loader__value" cx="12" cy="12" r="10" />
            <circle class="loader__value" cx="12" cy="12" r="10" />
            <circle class="loader__value" cx="12" cy="12" r="10" />
            <circle class="loader__value" cx="12" cy="12" r="10" />
        </svg>
        <slot />
    </div>
</template>

<script>
export default {
    name: 'v-loader',
}
</script>

<script setup>
//data
import { computed } from 'vue'

const attr = computed(() => {
    return {
        style: {
            maxWidth: width,
            fontSize: fontSize,
            fontWeight: fontWeight,
            color: textColor,
        }
    }
});

//props
const { width, fontSize, fontWeight, textColor } = defineProps({
    width: {
        required: false,
        type: [Number, String],
        default: 50,
    },
    fontSize: {
        required: false,
        type: [Number, String],
        default: 24,
    },
    fontWeight: {
        required: false,
        type: [Number, String],
        default: 500,
    },
    textColor: {
        required: false,
        type: [Number, String],
        default: '#333333',
    }

})

</script>

<style lang='scss' scoped>

//$loader-colors: dodgerblue, mediumspringgreen, crimson, peachpuff, chocolate, pink;
$loader-colors: $success;
$loader-dash: 63;
$loader-duration: length($loader-colors) * 1s;
$loader-duration-alt: calc($loader-duration / length($loader-colors));
$loader-keyframe: calc(1 / (length($loader-colors) * 2) * 100);

.loader-wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.loader {
    animation: loader-turn $loader-duration-alt linear infinite;
    padding: 1rem;
    width: 100%;

    @keyframes loader-turn {
        50% { transform: rotate(180deg) }
        100% { transform: rotate(720deg) }
    }
}

.loader__value {
    animation: loader-stroke $loader-duration linear infinite;
    fill: none;
    stroke-dasharray: $loader-dash;
    stroke-dashoffset: $loader-dash;
    stroke-linecap: round;
    stroke-width: 4;

    @for $i from 1 through length($loader-colors) {
        &:nth-child(#{$i}) {
            stroke: nth($loader-colors, $i);

            @if $i > 1 {
                animation-delay: ($i - 1) * $loader-duration-alt;
            }
        }
    }

    @keyframes loader-stroke {
        #{$loader-keyframe * 1%} { stroke-dashoffset: 0 }
        #{$loader-keyframe * 2%}, 100% { stroke-dashoffset: $loader-dash }
    }
}

</style>