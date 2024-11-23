<script setup>
import { computed, onBeforeMount, reactive, ref, watch } from "vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { subleaseDealAxios } from "@/util/http-commons";

const dealHttp = subleaseDealAxios();

const props = defineProps({
  sublease: Object,
});

// 현재 매물의 계약들 관련 데이터
const deals = ref();
// dealHttp.get(`/${props.sublease.subleaseId}`).then(({ data }) => {
//   deals.value = data;
// });

// 선택된 계약 기간 변수
const rentPeriod = ref();

// 기간 계산용 computed
const dayDifference = computed(() => {
  if (rentPeriod.value) {
    const diffTime =
      rentPeriod.value[1].getTime() - rentPeriod.value[0].getTime(); // 밀리초 단위 차이 계산
    const diffDays = diffTime / (1000 * 60 * 60 * 24); // 일 단위로 변환
    return diffDays + 1;
  } else {
    return 0;
  }
});

// 비활성화할 날짜 계산용 computed
const disabledDates = computed(() => {
  const dates = [];
  if (deals.value) {
    for (const deal of deals.value) {
      const startDate = new Date(deal.startDate);
      const endDate = new Date(deal.endDate);

      while (startDate <= endDate) {
        dates.push(new Date(startDate));
        // 하루 증가
        startDate.setDate(startDate.getDate() + 1);
      }
    }
  }

  return dates;
});

// 현재 sublease의 계약정보 로드
watch(
  () => props.sublease,
  (newVal, oldVal) => {
    dealHttp.get(`/${newVal.subleaseId}`).then(({ data }) => {
      deals.value = data;
    });
  },
  { immediate: true }
);
</script>

<template>
  <!-- Fixed Info Card -->
  <div class="card fixed-card">
    <div class="custom-card-header">
      <h5 class="fw-bold">{{ props.sublease.address }}</h5>
    </div>
    <div class="card-body overflow-auto">
      <!-- 상단 강조 정보 -->
      <div class="mb-4 text-center">
        <h3 class="fw-bold text-primary mb-2">{{ props.sublease.area }}평</h3>
      </div>

      <!-- 상세 정보 -->
      <div class="row text-center g-3 mb-3">
        <div class="col-6 col-md-4">
          <div class="bg-light rounded p-3">
            <strong>방</strong>
            <p class="mb-0">{{ props.sublease.rooms }}개</p>
          </div>
        </div>
        <div class="col-6 col-md-4">
          <div class="bg-light rounded p-3">
            <strong>욕실</strong>
            <p class="mb-0">{{ props.sublease.bathrooms }}개</p>
          </div>
        </div>
        <div class="col-6 col-md-4">
          <div class="bg-light rounded p-3">
            <strong>층수</strong>
            <p class="mb-0">{{ props.sublease.floor }}층</p>
          </div>
        </div>
        <div class="col-6 col-md-6">
          <div class="bg-light rounded p-3">
            <strong>보증금</strong>
            <p class="mb-0">
              {{ (props.sublease.deposit / 10000).toLocaleString() }}만원
            </p>
          </div>
        </div>
        <div class="col-6 col-md-6">
          <div class="bg-light rounded p-3">
            <strong>1일 당 비용</strong>
            <p class="mb-0">
              {{ (props.sublease.price / 10000).toLocaleString() }}만원
            </p>
          </div>
        </div>
      </div>
      <!-- 날짜 선택 -->
      <div class="bg-light p-3 rounded">
        <h6 class="fw-bold mb-3 text-center">날짜 선택</h6>
        <VueDatePicker
          class="justify-content-center"
          v-model="rentPeriod"
          inline
          locale="ko"
          :enable-time-picker="false"
          prevent-min-max-navigation
          :range="{ noDisabledRange: true }"
          :min-date="props.sublease.startDate"
          :max-date="props.sublease.endDate"
          :disabled-dates="disabledDates"
        />
      </div>
      <hr />
      <!-- 총비용 -->
      <template v-if="rentPeriod">
        <p><strong>전대 기간</strong>: {{ dayDifference }}일</p>
        <p>
          <strong>총 비용</strong>:
          <span class="highlight"
            >{{ props.sublease.price / 10000 }}만원 * {{ dayDifference }}일 =
            {{ (props.sublease.price * dayDifference) / 10000 }}만원</span
          >
        </p>

        <div class="d-grid gap-2 mb-3">
          <button class="btn btn-primary" @click.prevent="">예약하기</button>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.fixed-card {
  position: fixed;
  top: 8%;
  left: 20px;
  max-width: 600px;
  max-height: 90%;
  z-index: 1000;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden; /* 카드가 넘치지 않도록 설정 */
}

.card-body {
  overflow-y: auto; /* 카드 내용 스크롤 허용 */
  max-height: calc(90vh - 56px); /* 헤더를 제외한 최대 높이 */
}

.custom-card-header {
  background-color: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
  text-align: center;
  padding: 15px;
  border-radius: 8px 8px 0 0;
}
</style>
