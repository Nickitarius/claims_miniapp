import { createPinia } from 'pinia';
import { createApp } from 'vue';

import { createVuetify } from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import App from './App.vue';
import router from './router';

import { md3 } from 'vuetify/blueprints';
import { components, directives } from 'vuetify/dist/vuetify.js';

const app = createApp(App);

app.use(createPinia());

app.use(router);

const vuetify = createVuetify({
  components,
  directives,
  blueprint: md3,
});
app.use(vuetify);

// app.use(VueTelegramPlugin);

// app.config.globalProperties.TWA = window.Telegram.WebApp;

app.mount('#app');
