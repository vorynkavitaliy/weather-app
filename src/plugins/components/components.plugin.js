import AppLayout from '../../layouts/app.vue'
import VIcon from '../../shared/components/global/v-icon/v-icon.vue'
import VBtn from '../../shared/components/global/v-btn/v-btn.vue'
import VInput from '../../shared/components/global/v-input/v-input.vue'
import VLoader from '../../shared/components/global/v-loader/v-loader.vue'
const components = { AppLayout, VIcon, VBtn, VInput, VLoader }

export default {
    install: ({ component }) => {
        Object.entries(components).forEach(([name, item]) =>
            component(name, item),
        )
    },
}
