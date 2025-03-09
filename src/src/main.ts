import './assets/tailwind.css';
import 'primeicons/primeicons.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';


import PrimeVue from 'primevue/config';

import App from './App.vue';

const app = createApp(App);

app.use(createPinia());
app.use(PrimeVue, { theme: 'none' });

app.mount('#app');
