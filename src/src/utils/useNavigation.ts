import { RouteParamsRawGeneric, useRoute, useRouter } from 'vue-router';
import i18n from '@/i18n/index';

export function useNavigation() {
    const currentRoute = useRoute();
    const router = useRouter();
    console.log('init router: ', router)


    function getOtherLanguage(): 'en' | 'fr' {
        console.log('aabb')
        switch (i18n.global.locale.value) {
            case 'en':
                return 'fr';
            case 'fr':
                return 'en';
            default:
                return 'fr';
        }
    }

    function navigateToRoute(name: string, params?: RouteParamsRawGeneric): void {
        router.push({
            name,
            params: {
                ...params,
                locale: currentRoute.params.locale as string
            }
        });
    }

    function switchLanguage(): void {
        console.log('router: ', router)

        router.push({
            name: currentRoute.name,
            params: {
                ...currentRoute.params,
                locale: getOtherLanguage()
            }
        });
    }

    return { navigateToRoute, switchLanguage };
}
