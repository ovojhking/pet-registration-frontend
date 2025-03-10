import { defineStore } from 'pinia';
import { PetRegister } from './types/usePetStore';

export const usePetStore = defineStore('pet', {
    state: () => ({
        petRegisterData: null as PetRegister | null
    }),
    actions: {
        setPetRegister(data: PetRegister) {
            this.petRegisterData = data;
        },
        clearPetRegister() {
            this.petRegisterData = null;
        }
    }
});
