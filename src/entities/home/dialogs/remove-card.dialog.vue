<template>
    <modal-primary :value="value" width="450px">
        <p>{{ $t('general.remove-card') }}</p>

        <template #footer>
            <div class="actions">
                <v-btn @click="handleApply">
                    {{ $t('buttons.apply') }}
                </v-btn>

                <v-btn type="danger" @click="handleToggleDialogs">
                    {{ $t('buttons.cancel') }}
                </v-btn>
            </div>
        </template>
    </modal-primary>
</template>

<script>
export default {
    name: 'RemoveCardDialog',
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

const emit = defineEmits(['update:value', 'apply'])

const handleToggleDialogs = () => {
    emit('update:value', false)
}

const handleApply = () => {
    emit('apply')
}
</script>

<style lang="scss" scoped>
.actions {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 20px;
}
</style>
