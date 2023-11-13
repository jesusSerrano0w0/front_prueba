import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.css'
import Login from './components/Login.vue'

const app=createApp(App);
app.component('Login',Login);
app.use(store).use(router).mount('#app')
import 'bootstrap/dist/js/bootstrap'