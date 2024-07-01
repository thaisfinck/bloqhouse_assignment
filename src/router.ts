import { createRouter, createWebHistory } from "vue-router";
import Add from "./components/Movies/Add.vue";
import List from "./components/Movies/List.vue";
import Edit from "./components/Movies/Edit.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: List,
    },
    {
      path: "/add",
      name: "Add",
      component: Add,
    },
    {
      path: "/edit/:id",
      name: "Edit",
      component: Edit,
    },
  ],
});

export default router;
