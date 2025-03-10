export interface PetRegister {
    name: string;
    type: string;
    breed: string | null;
    date_of_birth: string;
    age: number;
    is_age_estimated: boolean;
    gender: 'male' | 'female';
    is_dangerous: boolean;
    is_mix: boolean;
    custom_breed: string;
    is_unknown: boolean;
}