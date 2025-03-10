<script setup lang="ts">
    import moment from 'moment';
    import {Axios} from '@/utils/Axios';
    import { onMounted, ref, watch, computed   } from 'vue';
    import { useRoute } from 'vue-router';
    import Card from '@/components/form/Card.vue';
    import { useI18n } from 'vue-i18n';
    import {FloatLabel, InputText, Select, Message, RadioButton, Button, InputNumber, DatePicker, Toast } from 'primevue';
    import { useToast } from "primevue/usetoast";
    
    const toast = useToast();
    const axios = new Axios();
    const { t } = useI18n();
    const route = useRoute();
    const loading = ref(true);
    const breeds = ref({dog: [], cat: []});
    const petTypeId = {
        dog: 1,
        cat: 2,
    }
    const submiting = ref(false);
    const petForm = ref({
        petType: "dog",
        petName: "",
        selectedBreed: {},
        isMix: false,
        customBreed: "",
        gender: "male",
        isKnowBirth: true,
        approximateAge: 0,
        birth: null,
    });

    const formFields = ref({
        petName: {
            isInvalid: false,
            errorMessage: "error_msg.petName",
            validateRule: (value) => value !== ""
        },
        selectedBreed: {
            isInvalid: false,
            errorMessage: "error_msg.selectedBreed",
            validateRule: (value) => {
                return Object.keys(value).length > 0
            }
        },
        customBreed: {
            isInvalid: false,
            errorMessage: "error_msg.customBreed",
            validateRule: (value) => {
                if (petForm.value.isMix) {
                    return value !== "";
                }
                return true;
            }
        },
        birth: {
            isInvalid: false,
            errorMessage: "error_msg.birth",
            validateRule: (value) => {
                if (!petForm.value.isKnowBirth) return true;
                return value && moment(value).isSameOrBefore(moment(), 'day');
            }
        },
    });

    const validateField = (fieldKey) => {
        const field = formFields.value[fieldKey];
        const result = field.validateRule(petForm.value[fieldKey]);

        if (result === true) {
            field.isInvalid = false;
        } else {
            field.isInvalid = true;
            field.errorMessage =  formFields.value[fieldKey].errorMessage;
        }
    };

    const submitForm = () => {
        let valid = true;
        Object.keys(formFields.value).forEach((key) => {
            validateField(key);
            if (formFields.value[key].isInvalid) {
                valid = false;
            }
        });

        if (valid) {
            const body = {
                pet_type_id: petTypeId[petForm.value.petType],
                name: petForm.value.petName,
                is_mix: petForm.value.isMix,
                gender: petForm.value.gender,
            }

            if(petForm.value.selectedBreed.id === -1) {
                if(petForm.value.isMix) {
                    body.is_mix = petForm.value.isMix;
                    body.custom_breed = petForm.value.customBreed;
                }else{
                    body.is_unknown = true;
                }
            }else{
                body.breed_id = petForm.value.selectedBreed.id;
            }

            if(petForm.value.isKnowBirth) {
                body.date_of_birth = moment(petForm.value.birth).format('YYYY-MM-DD');
            }else{
                body.approximate_age = petForm.value.approximateAge;
            }

            submiting.value = true;
            axios.post('pets', body)
                .then((response) => {
                    submiting.value = false;
                })
                .catch((error) => {
                    submiting.value = false;
                    toast.add({ severity: 'error', summary: 'Fetch Error', detail: error, life: 3000 });
                });

        }
    };

    onMounted(() => {
        Promise.all([
            axios.get('breeds', { petTypeId: 1 }),
            axios.get('breeds', { petTypeId: 2 })
        ]).then(([dogBreeds, catBreeds]) => {
            if(dogBreeds.status !== 200 || catBreeds.status !== 200) {
                throw new Error('Error fetching breeds');
            }
            breeds.value.dog = dogBreeds.body;
            breeds.value.cat = catBreeds.body;
            loading.value = false;
        }).catch(error => {
            console.error('Error fetching breeds: ', error);
            toast.add({ severity: 'error', summary: 'Fetch Error', detail: error, life: 3000 });
        });
    });

    watch(() => petForm.value.petType, () => {
        petForm.value.selectedBreed = {};
    });

    const breedOptions = computed(() => {
        const petType = petForm.value.petType;
        if (!breeds.value[petType]) return [];

        const returnValue = breeds.value[petType].map((breed) => {
            return ({
                ...breed,
                displayName: t(`breeds.${petType}.${breed.name}`),
            });
        });
        returnValue.push({ id: -1, name: 'unknow', displayName: t(`breeds.${petType}.unknow`) });
        return returnValue;
    });

</script>

<template>
    <Toast />

    <Card :title="t('add_pet.title')">
        <template #content>
            <form @submit.prevent="submitForm" class="space-y-4">
                <div class="flex items-center justify-between">
                    <label class="block text-sm font-medium text-[12px]">{{t('add_pet.choose_species')}}</label>
                    <div class="flex mt-[5px] w-[95px] md:w-[140px]">
                        <button
                            type="button"
                            @click="petForm.petType = 'dog'"
                            class="p-0 border w-1/2 h-[30px] text-[12px]"
                            style="border-radius: 10px 0 0 10px;"
                            :class="petForm.petType === 'dog' ? 'border-primary bg-primary text-white' : 'border-primary text-primary'"
                        >
                            {{ t('add_pet.dog') }}
                        </button>
                        <button
                            type="button"
                            @click="petForm.petType = 'cat'"
                            class="p-0 border w-1/2 h-[30px] ml-0 text-[12px]"
                            style="border-radius: 0px 10px 10px 0px; margin-left: 0px;"
                            :class="petForm.petType === 'cat' ? 'border-primary bg-primary text-white' : 'border-primary text-primary'"
                        >
                            {{ t('add_pet.cat') }}
                        </button>
                    </div>
                </div>

                
                <label class="block text-sm font-medium" style="margin-top: 25px;">{{t('add_pet.ask_name')}}</label>
                <InputText
                    v-model="petForm.petName"
                    :invalid="formFields.petName.isInvalid"
                    @blur="validateField('petName')"
                    class="w-full"
                />
                <Message v-if="formFields.petName.isInvalid" severity="error" size="small" variant="simple">
                    {{ t(formFields.petName.errorMessage) }}
                </Message>

                <label class="block text-sm font-medium">{{t('add_pet.ask_breed')}}</label>
                <Select
                    v-model="petForm.selectedBreed"
                    :options="breedOptions"
                    optionLabel="displayName"
                    class="w-full"
                    :invalid="formFields.selectedBreed.isInvalid"
                    @change="validateField('selectedBreed')"
                    :placeholder="loading ? t('common.loading') : t('add_pet.breed_placeholder')"
                    :disabled="loading"
                />
                <Message v-if="formFields.selectedBreed.isInvalid" severity="error" size="small" variant="simple">
                    {{ t(formFields.selectedBreed.errorMessage) }}
                </Message>

                <div class="flex flex-col gap-2"  v-if="petForm.selectedBreed && petForm.selectedBreed.name === 'unknow'">
                    <label class="text-sm">{{t("add_pet.choose_breed")}}</label>

                    <div class="flex items-center gap-2">
                        <RadioButton v-model="petForm.isMix" inputId="dontKnow" :value="false" />
                        <label for="dontKnow" class="text-sm">{{t("add_pet.unknown")}}</label>
                    </div>

                    <div class="flex items-center gap-2">
                    <RadioButton v-model="petForm.isMix" inputId="mix" :value="true" />
                    <label for="mix" class="text-sm">{{t("add_pet.mix")}}</label>
                    </div>
                    <template v-if="petForm.isMix">
                        <InputText 
                            v-model="petForm.customBreed"
                            placeholder=""
                            class="w-full mt-2"
                            :invalid="formFields.customBreed.isInvalid"
                        />
                        <Message v-if="formFields.customBreed.isInvalid" severity="error" size="small" variant="simple">
                            {{ t(formFields.customBreed.errorMessage) }}
                        </Message>
                    </template>
                </div>

                <label class="block text-sm font-medium text-[12px]">{{t('add_pet.gender')}}</label>
                <div class="flex space-x-2" style="margin-top: 5px;">
                    <button
                        type="button"
                        @click="petForm.gender = 'male'"
                        class="p-0 border w-1/2 h-[30px] text-[12px]"
                        style="border-radius: 10px 0 0 10px;"
                        :class="petForm.gender === 'male' ? 'border-primary bg-primary text-white' : 'border-primary text-primary'"
                    >
                        {{ t('add_pet.male') }}
                    </button>
                    <button
                        type="button"
                        @click="petForm.gender = 'female'"
                        class="p-0 border w-1/2 h-[30px] ml-0 text-[12px]"
                        style="border-radius: 0px 10px 10px 0px; margin-left: 0px;"
                        :class="petForm.gender === 'female' ? 'border-primary bg-primary text-white' : 'border-primary text-primary'"
                    >
                        {{ t('add_pet.female') }}
                    </button>
                </div>

                <label class="block text-sm font-medium text-[12px]">{{t('add_pet.ask_birth')}}</label>
                <div class="flex space-x-2" style="margin-top: 5px;">
                    <button
                        type="button"
                        @click="petForm.isKnowBirth = true"
                        class="p-0 border w-1/2 h-[30px] text-[12px]"
                        style="border-radius: 10px 0 0 10px;"
                        :class="petForm.isKnowBirth === true ? 'border-primary bg-primary text-white' : 'border-primary text-primary'"
                    >
                        {{ t('common.yes') }}
                    </button>
                    <button
                        type="button"
                        @click="petForm.isKnowBirth = false"
                        class="p-0 border w-1/2 h-[30px] ml-0 text-[12px]"
                        style="border-radius: 0px 10px 10px 0px; margin-left: 0px;"
                        :class="petForm.isKnowBirth === false ? 'border-primary bg-primary text-white' : 'border-primary text-primary'"
                    >
                        {{ t('common.no') }}
                    </button>
                </div>
            
                <template v-if="petForm.isKnowBirth">
                    <label class="block text-sm font-medium text-[12px]">{{t('add_pet.birth')}}</label>
                    <DatePicker 
                        v-model="petForm.birth" 
                        showIcon 
                        fluid 
                        iconDisplay="input" 
                        :invalid="formFields.birth.isInvalid"
                    />
                    <Message v-if="formFields.birth.isInvalid" severity="error" size="small" variant="simple">
                        {{ t(formFields.birth.errorMessage) }}
                    </Message>
                </template>
                <template v-else>
                    <label class="block text-sm font-medium text-[12px]">{{t('add_pet.approximate_age')}}</label>
                    <InputNumber v-model="petForm.approximateAge" inputId="minmax-buttons" mode="decimal" showButtons :min="0" :max="100" fluid />
                </template>
            
                <Button type="submit" :label="t('add_pet.submit')" icon="pi pi-check" class="w-full bg-primary hover:bg-primary" :loading="submiting"/>
            </form>
        </template>
    </Card>
</template>