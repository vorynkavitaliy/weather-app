<template>
    <modal-primary :value="value" width="450px">

        <p>{{ $t('general.wishlist-dialog-title', { limit: 5 }) }}</p>

        <template #footer>
            <div>
                <v-btn @click="handleToggleDialogs">
                    {{ $t('buttons.apply') }}
                </v-btn>
            </div>
        </template>
    </modal-primary>
</template>

<script>
export default {
    name: 'AddToWishlistDialog',
}
</script>

<script setup>
import ModalPrimary from '@/shared/components/app-modal/modal-primary.vue'

const props = defineProps({
    value: {
        type: Boolean,
        default: false,
    },
})

const emit = defineEmits(['update:value'])

const handleToggleDialogs = () => {
    emit('update:value', false)
}
</script>

<style></style>
