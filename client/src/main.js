import { createApp } from "vue";
import { sync } from "vuex-router-sync";
import App from "./App.vue";
import router from "./router";
import store from "./store";

sync(store, router);

createApp(App).use(router).use(store).mount("#app");
