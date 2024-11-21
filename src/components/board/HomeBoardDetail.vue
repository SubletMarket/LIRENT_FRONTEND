<script setup>
import LoginView from "@/views/LoginView.vue";
import { computed, onMounted, reactive, watch } from "vue";

const props = defineProps({
  sublease: Object,
  subleaseId: Number,
});

const rentPeriod = reactive({
  startDate: "",
  endDate: "",
});

// 기간 유효성 유지용 Watch
watch(
  () => rentPeriod.startDate,
  (newVal, oldVal) => {
    rentPeriod.endDate = newVal;
  }
);

// 기간 계산용 computed
const dayDifference = computed(() => {
  const start = new Date(rentPeriod.startDate);
  const end = new Date(rentPeriod.endDate);
  const diffTime = end.getTime() - start.getTime(); // 밀리초 단위 차이 계산
  const diffDays = diffTime / (1000 * 60 * 60 * 24); // 일 단위로 변환
  return diffDays + 1; // 차이 반환
});

const periodSelected = computed(() => {
  if (rentPeriod.startDate && rentPeriod.endDate) {
    return true;
  } else {
    return false;
  }
});
</script>

<template>
  <template v-if="props.sublease">
    <!-- Fixed Info Card -->
    <div class="card fixed-card">
      <div class="custom-card-header">
        <h5>{{ props.sublease.address }}</h5>
      </div>
      <div class="card-body">
        <p>
          <strong>{{ props.sublease.area }}평</strong>
        </p>
        <p>
          방 {{ props.sublease.rooms }}개 / 욕실
          {{ props.sublease.bathrooms }}개
        </p>
        <p><strong>층수</strong>: {{ props.sublease.floor }}층</p>
        <p><strong>보증금</strong>: {{ props.sublease.deposit / 10000 }}만원</p>
        <p>
          <strong>1일 당 비용</strong>: {{ props.sublease.price / 10000 }}만원
        </p>
        <div class="input-group mb-3">
          <input
            type="date"
            class="form-control"
            :min="props.sublease.startDate"
            :max="props.sublease.endDate"
            v-model="rentPeriod.startDate"
          />
          <span class="input-group-text" id="basic-addon1">부터</span>
          <input
            type="date"
            class="form-control"
            :min="rentPeriod.startDate"
            :max="props.sublease.endDate"
            v-model="rentPeriod.endDate"
          />
          <span class="input-group-text" id="basic-addon1">까지</span>
        </div>
        <hr />
        <!-- 총비용 -->
        <template v-if="periodSelected">
          <p><strong>전대 기간</strong>: {{ dayDifference }}일</p>
          <p>
            <strong>총 비용</strong>:
            <span class="highlight"
              >{{ props.sublease.price / 10000 }}만원 * {{ dayDifference }}일 =
              {{ (props.sublease.price * dayDifference) / 10000 }}만원</span
            >
          </p>

          <div class="d-grid gap-2 mb-3">
            <button class="btn btn-primary">예약요청하기</button>
          </div>
          <hr />
        </template>
        <!-- Chat Section -->
        <div class="chat-container">
          <h6>채팅</h6>
          <div class="chat-box">
            <div class="chat-message">
              <strong>사용자:</strong> 안녕하세요! 방이 아직 available한가요?
            </div>
            <div class="chat-message">
              <strong>전차인:</strong> 네, 아직 가능합니다. 질문 있으시면
              말씀해주세요.
            </div>
          </div>
          <div class="chat-footer">
            <input
              type="text"
              class="form-control"
              placeholder="메시지 입력..."
            />
            <button class="btn btn-primary">보내기</button>
          </div>
        </div>
      </div>
    </div>
  </template>
</template>

<style scoped>
.fixed-card {
  position: fixed;
  top: 10%;
  left: 20px;
  max-width: 600px;
  z-index: 1000;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}
.custom-card-header {
  background-color: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
  text-align: center;
  padding: 15px;
  border-radius: 8px 8px 0 0;
}
.chat-container {
  padding-top: 10px;
  padding-bottom: 10px;
}
.chat-box {
  max-height: 150px;
  overflow-y: auto;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 5px;
  background-color: #f9f9f9;
}
.chat-message {
  margin-bottom: 5px;
}
.chat-footer {
  display: flex;
  gap: 5px;
}
.chat-footer input {
  flex-grow: 1;
}
</style>
