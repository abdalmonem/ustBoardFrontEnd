import { createApp } from 'vue';
import axios from 'axios';
import App from './App.vue';
import router from './router';
import store from './store';

// Comment made up here

createApp(App)
  .use(store)
  .use(router)
  .use(axios)
  .mount('#app');
