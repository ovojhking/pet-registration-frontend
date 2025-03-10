<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  import Mode from '@/components/Mode.vue';
  import { useNavigation } from '@/utils/useNavigation';

  const { t } = useI18n();
  const { switchLanguage } = useNavigation();

</script>
<template>
    <header class="dark:bg-blue-50 p-[8px] h-[78px] pt-[5px] pb-[5px] bg-white relative flex justify-between items-center shadow-md">
      <div></div>
      <div class="h-[100%] p-[5px] absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <img src="/logo.png" class="h-[100%]" />
      </div>
      <div class="flex items-center jutify-end">
        <a href="#" class="hidden sm:block text-primary mr-[10px]" @click="switchLanguage">
            {{ t('common.switch_language') }}
        </a>
        <Mode />
      </div>
    </header>
</template>
