<script setup>
import BaseLayoutHeader from '@/components/layout/base/BaseLayoutHeader.vue';

defineProps({
  isHeaderVisible: { type: Boolean, default: true }
});
</script>

<template>
  <div class="flex flex-col flex-grow">
    <BaseLayoutHeader v-if="isHeaderVisible" />

    <main class="container py-3 flex-grow">
      <slot name="main" />
    </main>
  </div>
</template>
