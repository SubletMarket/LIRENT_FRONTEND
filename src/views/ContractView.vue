<script setup>
import { ref, computed } from "vue";
import axios from "axios";
import { useMemberStore } from "@/stores/member";

// Member store instance to access token
const memberStore = useMemberStore();
const accessToken = computed(() => memberStore.accessToken);

const formData = ref({
  Address: "",
  subleaseDeposit: "",
  subleaseCost: "",
  contractYear: "",
  contractMonth: "",
  contractDay: "",
  startYear: "",
  startMonth: "",
  startDay: "",
  endYear: "",
  endMonth: "",
  endDay: "",
  fromNum: "",
  fromPN: "",
  fromName: "",
  toNum: "",
  toPN: "",
  toName: "",
});

const generatedFilePath = ref("");
const isLoading = ref(false);

const submitForm = async () => {
  isLoading.value = true;

  try {
    const response = await axios.post(
      "http://localhost:8080/api/contract/generate",
      formData.value,
      {
        headers: {
          Authorization: `Bearer ${accessToken.value}`, // Include JWT token in headers
        },
      }
    );
    generatedFilePath.value = response.data;
    alert("계약서가 성공적으로 생성되었습니다!");
  } catch (error) {
    console.error("계약서 생성 실패:", error);
    alert("계약서 생성 중 오류가 발생했습니다.");
  } finally {
    isLoading.value = false;
  }
};

const downloadFile = async () => {
  if (!generatedFilePath.value) {
    alert("다운로드할 파일이 없습니다. 계약서를 먼저 생성하세요.");
    return;
  }

  try {
    const response = await axios.get(
      `http://localhost:8080/api/contract/download`,
      {
        params: {
          filePath: generatedFilePath.value, // 파일 경로 전달
        },
        headers: {
          Authorization: `Bearer ${accessToken.value}`, // JWT 인증 헤더 포함
        },
        responseType: "blob", // 바이너리 데이터로 응답받기
      }
    );

    // 다운로드 처리
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;

    // 서버에서 받은 파일 이름 설정
    const fileName = generatedFilePath.value.split("/").pop();
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    alert("파일이 성공적으로 다운로드되었습니다!");
  } catch (error) {
    console.error("다운로드 실패:", error);
    alert("파일 다운로드 중 오류가 발생했습니다.");
  }
};

</script>

<template>
  <div class="container mt-4">
    <h2 style="text-align: center;">계약서 생성기</h2>
    <form @submit.prevent="submitForm" class="mt-4">
      <div v-for="(value, key) in formData" :key="key" class="mb-3">
        <label :for="key" class="form-label">{{ key }}</label>
        <input
          type="text"
          :id="key"
          class="form-control"
          v-model="formData[key]"
          :placeholder="`Enter ${key}`"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary" :disabled="isLoading">
        {{ isLoading ? "생성 중..." : "계약서 생성" }}
      </button>
    </form>
    <div v-if="generatedFilePath" class="mt-4">
      <h4>계약서 생성 결과</h4>
      <p>{{ generatedFilePath }}</p>
      <a
  v-if="generatedFilePath"
  @click.prevent="downloadFile"
  class="btn btn-success"
  target="_blank"
>다운로드</a>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 800px;
}
</style>
