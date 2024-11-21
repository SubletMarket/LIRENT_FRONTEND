<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useMemberStore } from "@/stores/member"; // 정확한 경로로 수정

const router = useRouter();
const memberStore = useMemberStore();

const loginFailMessage = ref("");
const userId = ref("");
const password = ref("");
const saveIdChecked = ref(false);

onMounted(() => {
  // 쿠키에서 userId 값을 가져와 체크박스 상태 설정
  const savedUserId = document.cookie.replace(
    /(?:(?:^|.*;\s*)userId\s*\=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
  if (savedUserId) {
    saveIdChecked.value = true;
    userId.value = savedUserId;
  }
});

const handleLogin = async () => {
  try {
    console.log("1")
    const token = await memberStore.login(userId.value, password.value);
    console.log("서버에서 받은 토큰:", token);

    if (!token) {
      throw new Error("로그인 실패: 토큰이 없습니다.");
    }

    // 토큰 저장
    localStorage.setItem("accessToken", token);
    console.log("로그인 성공");

    // 사용자 정보 가져오기
    await memberStore.getUserData();
    router.push("/"); // 로그인 후 홈으로 이동
  } catch (error) {
    console.log("2")
    console.error("로그인 오류:", error);

    if (error.response && error.response.status === 404) {
      alert("아이디 또는 비밀번호가 잘못되었습니다.");
    } else {
      alert("오류가 발생했습니다. 다시 시도해주세요.");
    }
  }
};

// 페이지 이동 함수
const navigateTo = (path) => {
  router.push({ path: `/${path}` });
};
</script>

<template>
  <div>
    <!-- 로그인 실패 메시지 -->
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
    </div>
  </div>
</template>

<style scoped></style>
