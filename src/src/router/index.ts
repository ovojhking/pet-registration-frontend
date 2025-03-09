import { createRouter, createWebHistory } from 'vue-router';
import Second from '@/views/Second.vue';
import i18n from '@/i18n/index';
import Index from '@/views/Index.vue';

const currentLocale = i18n.global.locale.value;

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/:locale(fr|en)/2',
            name: 'second',
            component: Second
        },
        {
            path: '/:locale(fr|en)',
            name: 'index',
            component: Index
        },
        { path: '/:pathMatch(.*)*', redirect: `/${currentLocale}` },
    ]
});

router.beforeEach((to, from, next) => {
    const { locale } = to.params;

    i18n.global.locale.value = locale as 'en' | 'fr';

    next();
});

export default router;