import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import RegisterView from "@/views/RegisterView.vue";
import LoginView from "@/views/LoginView.vue";
import QuestionView from "@/views/QuestionView.vue";
import MyPageView from "@/views/MyPageView.vue";
import UpdateUserView from "@/views/UpdateUserView.vue";
import ResetPasswordView from "@/views/ResetPasswordView.vue";
import HomeDetail from "@/components/detail/HomeDetail.vue";
import ContractView from "@/views/ContractView.vue";

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
          component: HomeDetail,
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
