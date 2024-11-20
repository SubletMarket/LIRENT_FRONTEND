<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useMemberStore } from "@/stores/member";

const router = useRouter();
const store = useMemberStore();

const name = ref("");
const id = ref("");
const email = ref("");
const pw = ref("");

// 비밀번호 재설정 요청
const resetPassword = async () => {
  try {
    // 비밀번호 재설정 API 호출
    await store.resetPassword(
      name.value,
      email.value,
      id.value,
      pw.value
    );
    alert("비밀번호 재설정이 완료되었습니다.");
    router.push("/login");
  } catch (error) {
    console.error(error.message);
  }
};

// 로그인 페이지로 이동
const goToLogin = () => {
  router.push("/member/loginForm");
};
</script>

<template>
  <div class="container mt-5">
    <h2 class="text-center">비밀번호 재설정</h2>
    <form @submit.prevent="resetPassword">
      <div class="form-group">
        <label for="name">이름</label>
        <input
          type="text"
          class="form-control"
          id="name"
          v-model="name"
          placeholder="이름을 입력하세요"
          required
        />
      </div>
      <div class="form-group">
        <label for="email">이메일</label>
        <input
          type="email"
          class="form-control"
          id="email"
          v-model="email"
          placeholder="이메일을 입력하세요"
          required
        />
      </div>
      <div class="form-group">
        <label for="userId">아이디</label>
        <input
          type="text"
          class="form-control"
          id="userId"
          v-model="id"
          placeholder="아이디를 입력하세요"
          required
        />
      </div>
      <div class="form-group">
        <label for="password">새로운 비밀번호</label>
        <input
          type="password"
          class="form-control"
          id="password"
          v-model="pw"
          placeholder="새로운 비밀번호를 입력하세요"
          required
        />
      </div>
      <button class="btn btn-primary btn-block" type="submit">
        비밀번호 재설정
      </button>
    </form>

    <div v-if="successMessage" class="alert alert-success mt-3">
      {{ successMessage }}
      <div class="mt-3">
        <button class="btn btn-success btn-block" @click="goToLogin">
          로그인 페이지로 이동
        </button>
      </div>
    </div>

    <div v-if="errorMessage" class="alert alert-danger mt-3">
      {{ errorMessage }}
    </div>
  </div>
</template>

<style scoped>
body {
  background-color: #f8f9fa;
}

.container {
  max-width: 400px;
  margin-top: 100px;
}

.form-control:focus {
  box-shadow: none;
  border-color: #80bdff;
}
</style>
