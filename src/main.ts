import { createApp } from "vue";
import App from "./App.vue";

import { VueFire, VueFireFirestoreOptionsAPI } from "vuefire";
import firebaseApp from "./fireBaseConfig";
import router from "./router";

const app = createApp(App);

app.use(VueFire, {
  firebaseApp,
  modules: [VueFireFirestoreOptionsAPI()],
});

app.use(router);

app.mount("#app");
