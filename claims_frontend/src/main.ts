import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import { createPinia } from 'pinia';

// import '@mdi/font/css/materialdesignicons.css';
import { createVuetify } from 'vuetify';
import { md3 } from 'vuetify/blueprints';
import { components, directives } from 'vuetify/dist/vuetify.js';
import 'vuetify/dist/vuetify.min.css';
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg';

const app = createApp(App);

app.use(createPinia());

app.use(router);

const vuetify = createVuetify({
  components,
  directives,
  blueprint: md3,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
});
app.use(vuetify);

app.mount('#app');
