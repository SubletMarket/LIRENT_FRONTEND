<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useMemberStore } from "@/stores/member";
import RegisterAddress from "@/components/RegisterAddress.vue";

const router = useRouter();
const store = useMemberStore();

const member = reactive({
  email: "",
  password: "",
  phone: "",
  address: "",
  nickname: "",
  park: false,
  buildingElevatorNum: undefined,
  floor: undefined,
  area: undefined,
  rooms: undefined,
  bathrooms: undefined,
  latitude: "",
  longitude: "",
});

function setAddressData(data) {
  member.address = data.address;
  member.latitude = data.latitude;
  member.longitude = data.longitude;
}

function regist() {
  console.log("doRegist");
  store.register(member);
}
</script>

<template>
  <div>
    <div class="container">
      <form @submit.prevent="handleRegister" class="container py-5">
        <div class="row justify-content-center">
          <div class="col-12 col-lg-8">
            <div class="card shadow-lg border-0">
              <div class="card-body p-5">
                <h1 class="text-center mb-4">회원가입</h1>

                <!-- 회원 정보 -->
                <div class="mb-4">
                  <h4 class="border-bottom pb-2 mb-3">회원 정보</h4>
                  <div class="row g-3">
                    <!-- 이메일 주소 & 비밀번호 -->
                    <div class="col-12 col-md-6">
                      <label for="email" class="form-label">이메일 주소</label>
                      <input
                        type="email"
                        class="form-control"
                        placeholder="이메일을 입력하세요"
                        required
                        v-model="member.email"
                      />
                    </div>
                    <div class="col-12 col-md-6">
                      <label for="pw" class="form-label">비밀번호</label>
                      <input
                        type="password"
                        class="form-control"
                        placeholder="비밀번호를 입력하세요"
                        required
                        v-model="member.password"
                      />
                    </div>
                    <!-- 전화번호 & 닉네임 -->
                    <div class="col-12 col-md-6">
                      <label for="phone" class="form-label">전화번호</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="전화번호를 입력하세요"
                        required
                        v-model="member.phone"
                      />
                    </div>
                    <div class="col-12 col-md-6">
                      <label for="nickname" class="form-label">닉네임</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="닉네임을 입력하세요"
                        required
                        v-model="member.nickname"
                      />
                    </div>
                    <!-- 주소 -->
                    <RegisterAddress @load="setAddressData" />
                  </div>
                </div>

                <!-- 집 정보 -->
                <div class="mb-4">
                  <h4 class="border-bottom pb-2 mb-3">집 정보</h4>
                  <div class="row g-3">
                    <!-- 주차 가능 -->
                    <div
                      class="col-12 col-md-4 d-flex align-items-center justify-content-center"
                    >
                      <div class="form-check form-switch">
                        <label for="park" class="form-check-label ms-2 mb-0"
                          >주차 가능</label
                        >
                        <input
                          type="checkbox"
                          class="form-check-input"
                          v-model="member.park"
                        />
                      </div>
                    </div>
                    <!-- 승강기 개수 -->
                    <div class="col-12 col-md-4">
                      <label for="buildingElevatorNum" class="form-label"
                        >승강기 개수</label
                      >
                      <input
                        type="text"
                        class="form-control"
                        placeholder="입력"
                        required
                        v-model="member.buildingElevatorNum"
                      />
                    </div>
                    <!-- 층수 -->
                    <div class="col-12 col-md-4">
                      <label for="floor" class="form-label">층수</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="입력"
                        required
                        v-model="member.floor"
                      />
                    </div>
                    <!-- 평수 -->
                    <div class="col-12 col-md-6">
                      <label for="area" class="form-label">평수</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="입력"
                        required
                        v-model="member.area"
                      />
                    </div>
                    <!-- 방 개수 -->
                    <div class="col-12 col-md-6">
                      <label for="rooms" class="form-label">방 개수</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="입력"
                        required
                        v-model="member.rooms"
                      />
                    </div>
                    <!-- 화장실 개수 -->
                    <div class="col-12">
                      <label for="bathrooms" class="form-label"
                        >화장실 개수</label
                      >
                      <input
                        type="text"
                        class="form-control"
                        placeholder="입력"
                        required
                        v-model="member.bathrooms"
                      />
                    </div>
                  </div>
                </div>

                <!-- 가입 버튼 -->
                <button
                  class="btn btn-primary w-100 py-2"
                  @click.prevent="regist"
                >
                  가입하기
                </button>

                <!-- 추가 링크 -->
                <div class="text-center mt-4">
                  <router-link to="/login" class="text-decoration-none">
                    이미 계정이 있으신가요? <strong>로그인</strong>
                  </router-link>
                </div>
                <div class="text-center mt-2">
                  <router-link to="/" class="text-decoration-none">
                    홈으로 돌아가기
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
body {
  background-color: #f8f9fa;
}

.form-control:focus {
  box-shadow: none;
  border-color: #80bdff;
}
</style>
