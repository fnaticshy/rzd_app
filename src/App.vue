<script setup>
import { RouterView, useRouter } from 'vue-router';
import BaseLayoutRoot from '@/components/layout/base/BaseLayoutRoot.vue';
import { computed } from 'vue';

const router = useRouter();
const isAuthPage = computed(() => router.currentRoute.value.path === '/auth');
</script>

<template>
  <BaseLayoutRoot :is-header-visible="!isAuthPage">
    <template #main>
      <RouterView />
    </template>
  </BaseLayoutRoot>
</template>
