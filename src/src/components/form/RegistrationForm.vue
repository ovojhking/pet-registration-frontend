<script setup lang="ts">

    import {Axios} from '@/utils/Axios';
    import { onMounted, ref, watch, computed   } from 'vue';
    import { useRoute } from 'vue-router';
    import Card from '@/components/form/Card.vue';
    import { useI18n } from 'vue-i18n';
    // import InputText from 'primevue/inputtext';
    // import { Lable } from 'primevue/label';
    import {FloatLabel, InputText, Dropdown, Message} from 'primevue';
    
    const { t } = useI18n();
    const route = useRoute();
    const loading = ref(true);
    const breeds = ref({dog: [], cat: []});
    const petType = ref("dog");
    const petName = ref("");
    const petBreed = ref("");
    const petSex = ref("");
    const isKnowBirth = ref("");
    const selectedBreed = ref(null);

    onMounted(() => {
        const axios = new Axios();
        Promise.all([
            axios.get('breeds', {
                petTypeId: 1
            }),
            axios.get('breeds', {
                petTypeId: 2
            })
        ]).then(([dogBreeds, catBreeds]) => {
            if(dogBreeds.status !== 200 || catBreeds.status !== 200) {
                throw new Error('Error fetching breeds');
            }
            breeds.value.dog = dogBreeds.body;
            breeds.value.cat = catBreeds.body;
            loading.value = false;
        }).catch(error => {
            console.error('Error fetching breeds: ', error);
        });
    });

    watch(petType, () => {
        selectedBreed.value = null;
    });

    const breedOptions = computed(() => {
        if (!breeds.value[petType.value]) return [];

        return breeds.value[petType.value].map((key, value) => {
            return ({
                ...key,
                displayName: t(`breeds.${petType.value}.${key.name}`),
            });
        });
    });

</script>

<template>
    <Card
        :title="t('add_pet.title')"
    >
        <template #content>
            <div class="">
                <div class="mb-[20px]">
                    <label class="block font-semibold mb-2">What kind of pet do you have?</label>
                    <div class="flex space-x-2">
                        <button
                            @click="petType = 'dog'"
                            class="px-4 py-2 border rounded-lg w-1/2"
                            :class="petType === 'dog' ? 'bg-primary text-white' : 'border-primary text-primary'"
                        >
                            Dog
                        </button>
                        <button
                            @click="petType = 'cat'"
                            class="px-4 py-2 border rounded-lg w-1/2"
                            :class="petType === 'cat' ? 'bg-primary text-white' : 'border-primary text-primary'"
                        >
                            Cat
                        </button>
                    </div>
                </div>


                <FloatLabel variant="on">
                    <InputText id="on_label" v-model="petName" class="w-full" :invalid="true"/>
                    <label for="on_label">What is your pet's name?</label>
                </FloatLabel>
                <Message v-if="true" severity="error" size="small" variant="simple">{{ '123456' }}</Message>

                <label class="block font-semibold mb-[5px] mt-[15px]">What kind of pet do you have?</label>
                <Dropdown
                    v-model="selectedBreed"
                    :options="breedOptions"
                    optionLabel="displayName"
                    class="w-full"
                    :disabled="loading" 
                    :placeholder="loading ? 'Loading breeds...' : 'Select a breed'"
                />

                <!-- Pet Breed -->
                <div class="mb-4">
                    <label class="block font-semibold mb-2">What breed are they?</label>
                    <p-inputText v-model="petBreed" placeholder="Enter breed" class="w-full" />
                </div>

                <!-- Pet Sex -->
                <div class="mb-4">
                    <label class="block font-semibold mb-2">What sex are they?</label>
                    <div class="flex space-x-2">
                        <button
                            @click="petSex = 'male'"
                            class="px-4 py-2 border rounded-lg w-1/2"
                            :class="petSex === 'male' ? 'bg-primary text-white' : 'border-primary text-primary'"
                        >
                            Male
                        </button>
                        <button
                            @click="petSex = 'female'"
                            class="px-4 py-2 border rounded-lg w-1/2"
                            :class="petSex === 'female' ? 'bg-primary text-white' : 'border-primary text-primary'"
                        >
                            Female
                        </button>
                    </div>
                </div>

                <!-- Pet DOB Known -->
                <div class="mb-4">
                    <label class="block font-semibold mb-2">Do you know their date of birth?</label>
                    <div class="flex space-x-2">
                        <button
                            @click="isKnowBirth = 'yes'"
                            class="px-4 py-2 border rounded-lg w-1/2"
                            :class="isKnowBirth === 'yes' ? 'bg-primary text-white' : 'border-primary text-primary'"
                        >
                            Yes
                        </button>
                        <button
                            @click="isKnowBirth = 'no'"
                            class="px-4 py-2 border rounded-lg w-1/2"
                            :class="isKnowBirth === 'no' ? 'bg-primary text-white' : 'border-primary text-primary'"
                        >
                            No
                        </button>
                    </div>
                </div>
            </div>
        </template>
    </Card>
</template>