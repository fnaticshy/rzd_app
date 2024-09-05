<script setup>
import { useRouter, RouterLink } from 'vue-router';
import { Button } from '@/components/ui/button/index.js';
import MainLogoIcon from '@/components/icons/MainLogoIcon.vue';
import BasketIcon from '@/components/icons/BasketIcon.vue';
import { Badge } from '@/components/ui/badge/index.js';
import { useBasketStore } from '@/stores/basket.js';

const router = useRouter();
const basketStore = useBasketStore();
</script>

<template>
  <header class="flex-col md:flex border-b-4">
    <div class="container flex justify-between py-3 sm:py-4 items-center">
      <RouterLink to="/"
class="flex items-center">
        <MainLogoIcon />
        <span class="ml-2 hidden sm:inline-block font-semibold text-sm">
            RZD Shop
        </span>
      </RouterLink>

      <Button @click="router.push('/basket');"
size="sm"
class="relative">
        <Badge
          v-if="basketStore.basketItemsIds.length"
          variant="destructive"
class="absolute top-[-10px] right-[-10px]"
        >
          {{ basketStore.basketItemsIds.length }}
        </Badge>
        <BasketIcon />
        <span class="ml-2 hidden sm:inline-block">
            Корзина
        </span>
      </Button>
    </div>
  </header>
</template>
