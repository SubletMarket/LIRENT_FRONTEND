import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import RegisterView from "@/views/RegisterView.vue";
import LoginView from "@/views/LoginView.vue";
import QuestionView from "@/views/QuestionView.vue";
import MyPageView from "@/views/MyPageView.vue";
import UpdateUserView from "@/views/UpdateUserView.vue";
import ResetPasswordView from "@/views/ResetPasswordView.vue";
import HomeDetailView from "@/views/HomeDetailView.vue";
import ContractView from "@/views/ContractView.vue";
import DealView from "@/views/DealView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "landing",
      component: HomeView,
      children: [
        {
          path: "detail/:subleaseId",
          name: "detail",
          component: HomeDetailView,
          props: true,
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/logout",
      name: "logout",
      redirect: { name: "login" }, // 로그아웃 시 로그인 화면으로 리다이렉트
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
      path: "/deal",
      name: "deal",
      component: DealView,
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
    {
      path: "/contract",
      name: "contract",
      component: ContractView,
    },
  ],
});

export default router;
