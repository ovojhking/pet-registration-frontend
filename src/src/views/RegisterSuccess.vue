<script setup lang="ts">
    import { onMounted } from 'vue';
    import { usePetStore } from '@/stores/usePetStore';
    import {Card, Button} from 'primevue';
    import { useRouter } from 'vue-router';
    import { useI18n } from 'vue-i18n';

    const { t } = useI18n();
    const router = useRouter();
    const petStore = usePetStore();

    onMounted(() => {
        if (!petStore.petRegisterData) {
            router.replace('/');
        }
    });
</script>

<template>
    <div class="flex justify-center items-center p-[15px] pt-[30px] w-[100%]">
        

        <Card :title="'add_pet.title'" v-if="petStore.petRegisterData">
            <template #content>
                <div class="w-[100%] mx-auto flex flex-col items-center">
                    <div class="flex flex-col items-center p-[80px] w-[100%] bg-primary rounded-t-[10px]">
                        <span class="rounded-[100%] border-solid border-[3px] border-white p-3 w-[72px] h-[72px]">
                            <i class="pi pi-check text-white" style="font-size: 40px"></i>
                        </span>
                        <h2 class="text-2xl mt-5 text-white">{{t('common.success')}}</h2>
                    </div>

                    <div class="max-w-[360px] text-[14px] md:text-[16px]  ml-[18px] md:ml-[50px] mr-[18px] md:mr-[50px]  mb-[50px] mt-[40px] flex flex-col items-center">
                        <p class="text-center">{{t('register_success.greeting')}}</p>
                        <p class="text-center">{{t('register_success.check')}}</p>
                  
                        <div class="w-[100%] mt-[20px]">
                            <div class="flex gap-2 mb-1">
                                <span class="font-bold w-32 text-left">{{t('register_success.name')}}</span>
                                <span class="flex-1 text-right">{{ petStore.petRegisterData.name }}</span>
                            </div>
                            <div class="flex gap-2 mb-1">
                                <span class="font-bold w-32 text-left">{{t('register_success.type')}}</span>
                                <span class="flex-1 text-right">{{ petStore.petRegisterData.type }}</span>
                            </div>
                            <div class="flex gap-2 mb-1">
                                <span class="font-bold w-32 text-left">{{t('register_success.breed')}}</span>
                                <span class="flex-1 text-right" v-if="!petStore.petRegisterData.is_mix">{{ petStore.petRegisterData.breed}}</span>
                                <span class="flex-1 text-right" v-else-if="petStore.petRegisterData.custom_breed">{{ petStore.petRegisterData.custom_breed}}</span>
                                <span class="flex-1 text-right" v-else>{{t('register_success.unknown')}}</span>
                            </div>

                            <div class="flex gap-2 mb-1">
                                <span class="font-bold w-32 text-left">{{t('register_success.birth')}}</span>
                                <span class="flex-1 text-right">{{ petStore.petRegisterData.date_of_birth }}</span>
                            </div>
                            <div class="flex gap-2 mb-1">
                                <span class="font-bold w-32 text-left">{{t('register_success.age')}}</span>
                                <span class="flex-1 text-right">{{petStore.petRegisterData.age}}</span>
                            </div>
                            <div class="flex items-center justify-center mt-[20px]" v-if="petStore.petRegisterData.is_dangerous">
                                <i class="pi pi-exclamation-triangle text-[red]" style="font-size: 30px"></i>
                                <span class="font-bold ml-[10px] text-[red]">{{t('register_success.dangerous')}}</span>
                            </div>
             
                        </div>
                    </div>
                </div>
            </template>
        </Card>
    </div>
</template>

