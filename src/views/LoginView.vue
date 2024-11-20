<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useMemberStore } from "@/stores/member";

const router = useRouter();
const store = useMemberStore();

const loginFailMessage = ref("");
const userId = ref("");
const password = ref("");
const saveIdChecked = ref(false);

onMounted(() => {
  // 쿠키에서 userId 값을 가져오고 체크 상태를 설정
  const savedUserId = document.cookie.replace(
    /(?:(?:^|.*;\s*)userId\s*\=\s*([^;]*).*$)|^.*$/,
    '$1'
  );
  if (savedUserId) {
    saveIdChecked.value = true;
    userId.value = savedUserId;
  }
});

const handleLogin = async () => {
  // 로그인 처리 로직 추가
  try {
    // 로그인 API 호출
    store.login(userId.value, password.value);

    // 로그인 성공 시 홈페이지로 이동
    router.push("/");
  } catch (error) {
    loginFailMessage.value = "아이디 또는 비밀번호가 잘못되었습니다.";
  }

  // TODO: 쿠키 처리 해야됨!
};

// 페이지로 보내야 할 때
const navigateTo = (path) => {
  router.push({ path: `/${path}` });
};
</script>

<template>
  <div>
    <!-- 로그인 실패 메시지 표시 -->
    <div v-if="loginFailMessage" style="color: red">{{ loginFailMessage }}</div>

    <div class="container">
      <h2 class="text-center">로그인</h2>

      <!-- 로그인 폼 -->
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">아이디</label>
          <input
            type="text"
            class="form-control"
            v-model="userId"
            id="username"
            placeholder="아이디를 입력하세요"
            required
          />
          <label for="saveId">아이디 저장</label>
          <input type="checkbox" v-model="saveIdChecked" id="saveId" />
        </div>

        <div class="form-group">
          <label for="password">비밀번호</label>
          <input
            type="password"
            class="form-control"
            v-model="password"
            id="password"
            placeholder="비밀번호를 입력하세요"
            required
          />
        </div>

        <button class="btn btn-primary btn-block" type="submit">로그인</button>
      </form>

      <div class="text-center mt-3">
        <button @click="navigateTo('register')" class="btn btn-link">
          계정이 없으신가요? 회원가입
        </button>
      </div>

      <div class="text-center mt-3">
        <button @click="navigateTo('resetPassword')" class="btn btn-link">
          비밀번호를 잊으셨나요? 재설정하기
        </button>
      </div>

      <div class="text-center mt-3">
        <router-link to="/member/index">홈으로 돌아가기</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
