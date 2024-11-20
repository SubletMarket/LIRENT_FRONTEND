<script setup>
import { RouterLink } from "vue-router";
import { useMemberStore } from "@/stores/member";
import { onMounted } from "vue";

const memberStore = useMemberStore();

onMounted(async () => {
  // 로그인 처리 로직 추가
  try {
    // 로그인 API 호출
    await memberStore.getUserData();
  } catch {

  }
});
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light shadow">
    <div class="container">
      <RouterLink :to="{ name: 'landing' }" class="navbar-brand text-primary fw-bold" style="font-family: 'Rampart One', cursive;"
        >LIRENT</RouterLink
      >
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-lg-0">
          <li class="nav-item">
            <RouterLink
              :to="{ name: 'qna' }"
              class="nav-link"
              aria-current="page"
              >Q&A</RouterLink
            >
          </li>
        </ul>
        <!-- 로그인 전 -->
        <template v-if=!memberStore.member.id>
          <ul class="navbar-nav mb-2 me-2 mb-lg-0" id="header_nav_confirm_off">
            <li class="nav-item">
              <RouterLink :to="{ name: 'login' }" class="nav-link" aria-current="page">로그인</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink :to="{ name: 'register' }" class="nav-link" aria-current="page">회원가입</RouterLink>
            </li>
          </ul>
        </template>
        <!-- 로그인 후 -->
        <template v-else>
          <ul class="navbar-nav mb-2 me-2 mb-lg-0" id="header_nav_confirm_on">
            <li class="nav-item">
              <button
                class="nav-link"
                aria-current="page"
                @click="memberStore.logout()"
              >
                로그아웃
              </button>
            </li>
            <li class="nav-item">
              <RouterLink :to="{ name: 'mypage' }" class="nav-link" aria-current="page">마이페이지</RouterLink>
            </li>
          </ul>
        </template>
      </div>
    </div>
  </nav>
</template>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Rampart+One&display=swap');
</style>
