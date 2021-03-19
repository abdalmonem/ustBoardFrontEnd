import { createApp } from 'vue';
import axios from 'axios';
import Vuex from 'vuex';
import App from './App.vue';
import router from './router';
import mainStore from './stores/mainStore';
import fixedNotifications from './plugins/fixedNotifications';
import duConfirmDialog from './plugins/duConfirmDialog';
import duDialog from './plugins/duDialog';
import duContextMenu from './plugins/duContextMenu';

// Comment made up here

createApp(App)
  .use(mainStore)
  .use(Vuex)
  .use(router)
  .use(axios)
  .use(fixedNotifications)
  .use(duDialog)
  .use(duConfirmDialog)
  .use(duContextMenu)
  .mount('#app');
