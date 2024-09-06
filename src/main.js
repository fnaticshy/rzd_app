import './assets/index.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import { defineRule, configure } from 'vee-validate';
import { required, email, min } from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import ru from '@vee-validate/i18n/dist/locale/ru.json';

const app = createApp(App);

// vee-validate, todo: remove to new file
defineRule('required', required);
defineRule('email', email);
defineRule('min', min);
setLocale('ru');
configure({
  generateMessage: localize({
    ru
  }),
});

app.use(createPinia());
app.use(router);
app.mount('#app');
