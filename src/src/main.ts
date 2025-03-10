import './assets/tailwind.css';
import './style.css';
import 'primeicons/primeicons.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import Lara from '@primeuix/themes/lara';
import App from '@/App.vue';
import router from '@/router';
import i18n from '@/i18n/index';
import ToastService from 'primevue/toastservice';

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
app.use(i18n);
app.use(router);
app.use(ToastService);
app.mount('#app');
