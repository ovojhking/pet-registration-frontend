<script setup lang="ts">
    import Header from '@/components/partials/Header.vue';
</script>
<template>
  <Header />
  <main class="min-h-[100vh] bg-gray-100 dark:bg-gray-800">
    <RouterView />
  </main>
</template>
