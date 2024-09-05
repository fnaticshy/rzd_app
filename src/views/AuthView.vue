<script setup>
import { useForm } from 'vee-validate';
import { useRouter } from 'vue-router';
import { FormLabel, FormField, FormItem, FormMessage, FormControl } from '@/components/ui/form/index.js';
import { Input } from '@/components/ui/input/index.js';
import { Button } from '@/components/ui/button/index.js';
import { useAuthStore } from '@/stores/auth.js';

const authStore = useAuthStore();
const router = useRouter();
const { isFieldDirty, handleSubmit } = useForm({
  validationSchema: {
    email: 'required|email',
    password: 'required'
  }
});
const onSubmit = handleSubmit((values) => {
  authStore.login({ ...values, id: Date.now() });
  router.push('/');
});

</script>

<template>
  <div class="overflow-y-auto overflow-x-hidden top-0 right-0 left-0 m-auto z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex">
    <div class="relative p-4 w-full max-w-xl max-h-full m-auto">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <div class="p-4 md:p-5">
          <div class="w-full">
            <h1 class="text-center text-2xl font-medium">Форма авторизации</h1>

            <form
              class="space-y-6"
              @submit.prevent="onSubmit"
            >
              <FormField
                v-slot="{ componentField }"
                name="email"
                label="Email"
                :validate-on-blur="!isFieldDirty"
              >
                <FormItem>
                  <FormLabel class="first-letter:uppercase">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Введите email"
                      v-bind="componentField"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>

              <FormField
                v-slot="{ componentField }"
                name="password"
                label="Пароль"
                :validate-on-blur="!isFieldDirty"
              >
                <FormItem>
                  <FormLabel class="first-letter:uppercase">
                    Пароль
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Введите пароль"
                      v-bind="componentField"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>

              <Button type="submit">
                Войти
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
