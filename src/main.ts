import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import i18n from './i18n'

import App from './App.vue'
import router from './router'
import { createHead } from '@unhead/vue/client'
import { loadGA } from './plugins/analytics'
const app = createApp(App)
const head = createHead()

app.use(head)
loadGA('G-PGZJWR0P8L')
app.use(createPinia())
app.use(router)
app.use(i18n)
app.mount('#app')
