<script setup>
import { Button } from '@/components/ui/button/index.js';
import { Label } from '@/components/ui/label/index.js';
import { Input } from '@/components/ui/input/index.js';
import { Select, SelectContent, SelectItem, SelectGroup, SelectTrigger, SelectValue } from '@/components/ui/select/index.js';
import { onMounted, computed, ref } from 'vue';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card/index.js';
import { useProductStore } from '@/stores/products.js';
import { useBasketStore } from '@/stores/basket.js';

const ALL_CATEGORIES = Object.freeze({ name: 'Все категории', value: 'category_all' });
const basketStore = useBasketStore();
const productStore = useProductStore();
const productsList = computed(() => productStore.data);
const productsLoading = computed(() => productStore.loading);
const productsError = computed(() => productStore.error);

// * Активные фильтры
const minPrice = ref(0);
const maxPrice = ref(Infinity);
const selectedCategory = ref(ALL_CATEGORIES.value);

// * Значений до применения фильтров
const tempMinPrice = ref(0);
const tempMaxPrice = ref(Infinity);
const tempSelectedCategory = ref(ALL_CATEGORIES.value);

// * Отфильтрованные товары
const filteredProducts = computed(() => {
  return productsList.value.filter((product) => {
    const matchesCategory =
      !selectedCategory.value || product.category === selectedCategory.value || selectedCategory.value === ALL_CATEGORIES.value;
    const matchesPrice =
      product.price >= minPrice.value && product.price <= maxPrice.value;

    return matchesCategory && matchesPrice;
  });
});

const applyFilters = () => {
  minPrice.value = tempMinPrice.value || 0;
  maxPrice.value = tempMaxPrice.value || Infinity;
  selectedCategory.value = tempSelectedCategory.value || '';
};

const resetFilters = () => {
  minPrice.value = 0;
  maxPrice.value = Infinity;
  selectedCategory.value = '';

  tempMinPrice.value = 0;
  tempMaxPrice.value = Infinity;
  tempSelectedCategory.value = '';
};

const categories = computed(() => {
  const allCategories = (productsList.value ? productsList.value : []).map(product => product.category);
  const result = [...new Set(allCategories)].map((el) => ({
    name: el, value: el
  }));

  result.unshift(ALL_CATEGORIES);

  return result;
});

const currentCategoryName = computed(() => categories.value.find((el) => el.value === selectedCategory.value)?.name);

onMounted(() => {
  productStore.fetchProducts();
});
</script>

<template>
  <div class="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
    <div v-if="productsLoading"
class="font-semibold text-lg mx-auto">
      Загрузка...
    </div>

    <div v-if="!productsLoading && productsError"
class="font-semibold text-lg text-rose-600 mx-auto">
      Возникла ошибка.
      <br>
      Попробуйте позже.
    </div>

    <template v-if="productsList?.length && !productsError && !productsLoading">
      <!-- Сайдбар -->
      <aside class="lg:w-1/5 space-y-2">
        <div class="text-lg font-medium">
          Фильтр
        </div>

        <Label>
          Выберите категорию
          <Select v-model="tempSelectedCategory">
            <SelectTrigger class="w-full">
              <SelectValue placeholder="Выберите категорию" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup v-for="category of categories"
:key="category.value">
                <SelectItem :value="category.value">
                  {{ category.name }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </Label>

        <div class="flex space-x-2">
          <Label class="w-6/12">
            Мин. цена
            <Input v-model="tempMinPrice"
type="number"/>
          </Label>

          <Label class="w-6/12">
            Макс. цена
            <Input v-model="tempMaxPrice"
type="number"/>
          </Label>
        </div>

        <div class="space-y-2">
          <Button class="w-full"
variant="outline"
size="xs"
@click="resetFilters">Сброс</Button>
          <Button class="w-full"
variant="secondary"
size="xs"
@click="applyFilters">Применить</Button>
        </div>
      </aside>

      <!-- Список товаров -->
      <div class="flex-1">
        <div class="text-2xl font-medium first-letter:capitalize pb-4">
          {{ currentCategoryName }}
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card class="shadow-md break-words flex flex-col"
v-for="product of filteredProducts"
:key="product.id">
            <CardHeader>
              <CardDescription class="capitalize">
                {{ product.category }}
              </CardDescription>
              <CardTitle>
                {{ product.title }}
              </CardTitle>
            </CardHeader>
            <CardContent class="mt-auto">
              <img
                loading="lazy"
                :src="product.image"
                :alt="product.title"
                class="w-full h-[200px] object-contain"
              />
              <div class="pt-3">
              <span class="font-semibold">
                Цена:
              </span>
                <span>
                {{ product.price }}
              </span>
              </div>
            </CardContent>
            <CardFooter>
              <Button @click="basketStore.basketItemsIds.includes(product.id) ? basketStore.deleteFromBasket(product) : basketStore.addToBasket(product)">
                {{ basketStore.basketItemsIds.includes(product.id) ? 'Добавлено' : 'В корзину' }}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </template>
  </div>
</template>
