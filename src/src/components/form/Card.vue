<template>
    <Card class="w-[100%] p-[48px] bg-white shadow-md md:max-w-[563px] w-[100%] mx-auto">
        <template #title>
            <h1 class="text-xl font-semibold text-primary-dark dark:text-white" :class="$props.titleClasses">
                {{ $props.title }}
            </h1>
        </template>
        <template #content>
            <slot name="content"></slot>
        </template>
    </Card>
</template>
<script setup lang="ts">
    import { Card } from 'primevue';

    withDefaults(
        defineProps<{
            title: string;
            titleClasses?: string;
            contentClasses?: string;
        }>(),
        { titleClasses: '', contentClasses: '' }
    );
</script>
