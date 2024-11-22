<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useMemberStore } from "@/stores/member";

const router = useRouter();
const store = useMemberStore();

// 컴포넌트 로드 시 회원 정보 불러오기
onMounted(() => {
  loadMemberInfo();
});

const loadMemberInfo = async () => {
  try {
    // 유저 정보 받아오는 API 호출
    await store.getUserData();
  } catch (error) {
    console.error(error.message);
  }
};

// 회원 탈퇴
const deleteMember = async () => {
  const result = confirm("정말 탈퇴하시겠습니까?");

  if (result) {
    try {
      await store.deleteUser();
      alert("탈퇴되었습니다. 그동안 이용해주셔서 감사합니다.");
      router.push("/");
    } catch (error) {
      console.error(error.message);
    }
  }
};

// 페이지로 보내야 할 때
const navigateTo = (path) => {
  router.push({ path: `/${path}` });
};
</script>

<template>
  <div>
    <div class="container mt-5">
      <div style="height: 70px"></div>
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header text-center">
              <h4>회원 정보</h4>
            </div>
            <div class="card-body">
              <!-- 회원 정보 수정 폼 -->
              <form>
                <div class="form-group">
                  <label for="nickname">이름</label>
                  <input
                    type="text"
                    readonly
                    class="form-control-plaintext"
                    id="nickname"
                    v-model="store.member.nickname"
                  />
                </div>
                <div class="form-group">
                  <label for="userid">아이디</label>
                  <input
                    type="text"
                    readonly
                    class="form-control-plaintext"
                    id="userid"
                    v-model="store.member.id"
                  />
                </div>
                <div class="form-group">
                  <label for="email">이메일</label>
                  <input
                    type="text"
                    readonly
                    class="form-control-plaintext"
                    id="email"
                    v-model="store.member.email"
                  />
                </div>
                <button
                  @click="navigateTo('updateUser')"
                  class="btn btn-primary btn-block mt-3"
                  type="button"
                >
                  정보 수정
                </button>
              </form>

              <!-- 회원 탈퇴 버튼 -->
              <button
                type="button"
                class="btn btn-danger btn-block mt-3"
                @click="deleteMember"
              >
                회원 탈퇴
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
