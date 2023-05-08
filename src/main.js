import './assets/styles/styles.scss'
import { createApp } from 'vue'
import axios from 'axios'
import * as VueI18n from 'vue3-i18n'
import App from './App.vue'
import router from './router'
import plugins from './plugins'

const app = createApp(App)

app.use(router)

plugins(app, { axios, i18n: VueI18n })

app.mount('#app')
