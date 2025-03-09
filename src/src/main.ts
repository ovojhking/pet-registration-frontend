import './assets/tailwind.css';
import 'primeicons/primeicons.css';
import './style.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';


import PrimeVue from 'primevue/config';
import Lara from '@primeuix/themes/lara';

import App from './App.vue';

const app = createApp(App);

app.use(createPinia());
app.use(PrimeVue, {
    theme: {
        preset: Lara,
        options: {
            prefix: '',
            darkModeSelector: '.dark',
            cssLayer: false
        }
    }
});
app.mount('#app');
