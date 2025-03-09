<script setup lang="ts">
  import Mode from '@/components/Mode.vue';
</script>
<template>
    <header class="dark:bg-gray-500 p-[8px] h-[78px] pt-[5px] pb-[5px] bg-white relative flex justify-between items-center shadow-md">
      <div></div>
      <div class="h-[100%] p-[5px] absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <img src="/logo.png" class="h-[100%]" />
      </div>
      <div class="flex items-center jutify-end">
        <Mode />
      </div>
    </header>
</template>
