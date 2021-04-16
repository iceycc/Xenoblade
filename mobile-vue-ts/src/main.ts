import {createApp} from 'vue'
// import App from './App.vue'
import MainLayout from './layouts/Main.vue'
import SimpleRouter from './router'
const app = createApp(SimpleRouter)
app.component('main-layout', MainLayout).mount('#app')
