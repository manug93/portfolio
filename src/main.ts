import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import i18n from './i18n'

import App from './App.vue'
import router from './router'
import { configure } from "vue-gtag";


const app = createApp(App)

configure({
  tagId: "G-PGZJWR0P8L"
})
app.use(createPinia())
app.use(router)
app.use(i18n)
app.mount('#app')
