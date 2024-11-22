<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useMemberStore } from "@/stores/member";

const router = useRouter();
const store = useMemberStore();

const nickname = ref("");
const id = ref("");
const email = ref("");
const pw = ref("");
const confirmPassword = ref("");
const registrationError = ref("");

const handleRegister = async () => {
  if (pw.value !== confirmPassword.value) {
    registrationError.value = "비밀번호가 일치하지 않습니다.";
    return;
  }

  try {
    // 회원가입 API 호출
    await store.register(id.value, pw.value, nickname.value, email.value);

    // 회원가입 성공 시 로그인 화면으로 이동
    // TODO: 추후 회원가입하면 자동 로그인되도록..도 하고 싶어요
    alert("회원가입이 완료되었습니다.");
    router.push("/login");
  } catch (error) {
    // TODO: 나중에 원인도 알려줘야 할 듯! 중복된 아이디인지.. 등등
    registrationError.value = "회원가입에 실패했습니다. 다시 시도해 주세요.";
  }
};
</script>

<template>
  <div>
    <div class="container container2">
      <h2 class="text-center">회원가입</h2>

      <div v-if="registrationError" class="alert alert-danger">
        {{ registrationError }}
      </div>

      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <label for="username">이름</label>
          <input
            type="text"
            class="form-control"
            id="username"
            v-model="nickname"
            placeholder="이름을 입력하세요"
            required
          />
        </div>
        <div class="form-group">
          <label for="userid">아이디</label>
          <input
            type="text"
            class="form-control"
            id="userid"
            v-model="id"
            placeholder="아이디를 입력하세요"
            required
          />
        </div>
        <div class="form-group">
          <label for="email">이메일 주소</label>
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
          <label for="pw">비밀번호</label>
          <input
            type="password"
            class="form-control"
            id="pw"
            v-model="pw"
            placeholder="비밀번호를 입력하세요"
            required
          />
        </div>
        <div class="form-group">
          <label for="confirmPassword">비밀번호 확인</label>
          <input
            type="password"
            class="form-control"
            id="confirmPassword"
            v-model="confirmPassword"
            placeholder="비밀번호를 다시 입력하세요"
            required
          />
        </div>

        <button class="btn btn-primary btn-block" type="submit">
          가입하기
        </button>

        <div class="text-center mt-3">
          <router-link to="/login">이미 계정이 있으신가요? 로그인</router-link>
        </div>

        <div class="text-center mt-3">
          <router-link to="/">홈으로 돌아가기</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
body {
  background-color: #f8f9fa;
}

.container2 {
  margin-top: 100px;
  max-width: 400px;
}

.form-control:focus {
  box-shadow: none;
  border-color: #80bdff;
}
</style>
