import { createApp } from 'vue';
import './style.css';
import App from './App.vue';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';

import BootstrapVue3 from 'bootstrap-vue-3';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';

const app = createApp(App);

app.use(BootstrapVue3);
createApp(App).mount('#app');
