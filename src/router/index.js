import { createRouter, createWebHistory } from "vue-router";
import MainPage from "../components/Home/Home.vue";
import HousesPage from "../views/HousesView.vue";
import DetailView from "../views/DetailView.vue";
import CreateView from "../views/CreateView.vue";
import EditView from "../views/EditView.vue";
import FinancialTips from "../components/bonus/FinancialTips.vue"; 
import FinanceSurvey from "../components/bonus/FinanceSurvey.vue";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: MainPage, // Home page
    },
    {
      path: "/houses",
      name: "houses",
      component: HousesPage, // Houses page
    },
    {
      path: "/houses/detail/:id",
      name: "detail",
      component: DetailView,
      props: true, // Pass the `id` as a prop to the component
    },
    {
      path: "/create-house",
      name: "create-house",
      component: CreateView,
    },
    {
      path: "/edit-house/:id",
      name: "edit-house",
      component: EditView,
    },
    {
      path: "/financial-tips",
      name: "financial-tips",
      component: FinancialTips, // Financial Tips Page
    },
    {
      path: "/finance-survey",
      name: "finance-survey",
      component: FinanceSurvey,
    },    
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

export default router;
