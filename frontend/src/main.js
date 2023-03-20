import { createApp } from 'vue'
import App from './App.vue'
import './main.css'
import router1 from './routes/routes'

const app = createApp(App);

app.use(router1);

app.mount('#app');

