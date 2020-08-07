import Vue from "vue";
import VueRouter from "vue-router";
import Home from "./views/Home.vue";
import Mm from "./views/Mm.vue";
import Collators from "./views/Collators.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/liquidity",
    name: "liquidity",
    component: () => import("./views/Liquidity.vue"),
  },
  {
    path: "/mm",
    name: "mm",
    component: Mm,
  },
  {
    path: "/collators",
    name: "collators",
    component: Collators,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
