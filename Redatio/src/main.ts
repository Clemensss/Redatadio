import { createApp } from 'vue'
import Page from './components/Page.vue'
import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

app.use(router)

app.mount('#app')
app.component('Page', Page)
