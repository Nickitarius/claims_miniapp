import { createPinia } from 'pinia';
import { createApp } from 'vue';

import App from './App.vue';
import router from './router';
import { createVuetify } from 'vuetify';
import "vuetify/dist/vuetify.min.css"

import { components, directives } from 'vuetify/dist/vuetify.js';
import { VueTelegramPlugin } from 'vue-tg';

const app = createApp(App);

app.use(createPinia());
app.use(router);

const vuetify = createVuetify({
  components,
  directives,
});
app.use(vuetify)

app.use(VueTelegramPlugin);

app.config.globalProperties.TWA = window.Telegram.WebApp

app.mount('#app');
