import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import Bibliotheque from './Bibliotheque.vue'
import router from './router'

const app = createApp(Bibliotheque)

app.use(router)

app.mount('#app')
