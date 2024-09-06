<script setup>
import { useRouter } from 'vue-router';
import { TableBody, TableCell, TableHead, TableHeader, TableRow, Table } from '@/components/ui/table/index.js';
import { useBasketStore } from '@/stores/basket.js';
import { computed } from 'vue';
import { Button } from '@/components/ui/button/index.js';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  DialogTitle
} from '@/components/ui/dialog/index.js';

const router = useRouter();
const basketStore = useBasketStore();
const basketList = computed(() => basketStore.data);
const countString = computed(() => {
  if (!basketList.value?.length) return '';

  const { count, sum } = basketList.value.reduce(
    (acc, { quantity, price }) => {
      acc.count += quantity;
      acc.sum += quantity * price;

      return acc;
    },
    { count: 0, sum: 0 }
  );

  return `Всего ${count} ${count > 1 ? 'товаров' : 'товар'}, на сумму ${sum.toFixed(2)}`;
});

const cleanUp = () => {
  basketStore.checkout();
  router.push('/');
};
</script>

<template>
  <div class="text-2xl font-medium">
    Товары в корзине
  </div>

  <template v-if="basketList?.length">
    <div class="overflow-auto">
      <Table class="w-full">
        <TableHeader>
          <TableRow>
            <TableHead class="w-[50px]">
              №
            </TableHead>
            <TableHead>
              Наименование
            </TableHead>
            <TableHead class="w-[200px]">
              Количество
            </TableHead>
            <TableHead class="w-[250px]">
              Цена за единицу
            </TableHead>
            <TableHead class="text-right w-[250px]">
              Итого
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow
            v-for="({ price, title, id, quantity, image }, index) in basketList"
            :key="id"
          >
            <TableCell class="font-medium">
              {{ index + 1 }}
            </TableCell>
            <TableCell class="font-medium">
              <div class="flex justify-start items-start">
                <img
                  loading="lazy"
                  :src="image"
                  :alt="title"
                  class="w-[50px] h-full max-h-[70px] object-contain"
                >
                <span class="ml-2">
                  {{ title }}
                </span>
              </div>
            </TableCell>
            <TableCell>
              <div class="flex items-center justify-center space-x-2">
                <Button
                  variant="outline"
                  size="xs"
                  @click="basketStore.changeQuantityById([id, '-'])"
                >
                  -
                </Button>
                <div>
                  {{ quantity }}
                </div>
                <Button
                  variant="outline"
                  size="xs"
                  @click="basketStore.changeQuantityById([id, '+'])"
                >
                  +
                </Button>
              </div>
            </TableCell>
            <TableCell>{{ price }}</TableCell>
            <TableCell class="text-right">
              {{ (quantity * price)?.toFixed(2) }}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <div class="flex flex-col sm:flex-row justify-between pt-6">
      <div class="text-2xl font-medium mb-4 sm:mb-0 sm: mr-3">
        {{ countString }}
      </div>

      <Dialog>
        <DialogTrigger as-child>
          <Button variant="outline">
            Оформить заказ
          </Button>
        </DialogTrigger>
        <DialogContent class="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Заказ №556RZD </DialogTitle>
            <DialogDescription>
              Ваш заказ успешно оформлен
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="submit"
              @click="cleanUp"
            >
              Закрыть
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  </template>

  <div
    v-else
    class="font-semibold text-lg mx-auto pt-6 flex flex-col justify-center items-center pb-6"
  >
    <span class="pb-6">
      Корзина пуста
    </span>

    <Button @click="router.push('/')">
      Вернуться к покупкам
    </Button>
  </div>
</template>
