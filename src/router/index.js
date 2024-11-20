import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import IndexView from "@/views/IndexView.vue";
import RegisterView from "@/views/RegisterView.vue";
import LoginView from "@/views/LoginView.vue";
import QuestionView from "@/views/QuestionView.vue";
import MyPageView from "@/views/MyPageView.vue";
import UpdateUserView from "@/views/UpdateUserView.vue";
import ResetPasswordView from "@/views/ResetPasswordView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "landing",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
    },
    {
      path: "/mypage",
      name: "mypage",
      component: MyPageView,
    },
    {
      path: "/updateUser",
      name: "updateUser",
      component: UpdateUserView,
    },
    {
      path: "/resetPassword",
      name: "resetPassword",
      component: ResetPasswordView,
    },
    {
      path: "/qna",
      name: "qna",
      component: QuestionView,
    },
  ],
});

export default router;
