<script setup lang="ts">
    import { ref, watchEffect } from 'vue';
    import ToggleSwitch from 'primevue/toggleswitch';

    const theme = ref<string>(localStorage.getItem('theme') || 'light');

    watchEffect(() => {
        if (theme.value === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("theme", theme.value);
    });
</script>

<template>
    <ToggleSwitch v-model="theme" true-value="dark" false-value="light">
        <template #handle>
            <span>{{ theme === 'light' ? '☀️' : '🌙'}}</span> 
        </template>
    </ToggleSwitch>
</template>
