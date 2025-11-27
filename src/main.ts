import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './css/header.css'
import './css/landing.css'
import './css/nombre.css'
import './css/juego.css'
import './css/ranking.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
