import { sync } from 'vuex-router-sync';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

sync(store, router);

createApp(App).use(store).use(router).mount('#app');
