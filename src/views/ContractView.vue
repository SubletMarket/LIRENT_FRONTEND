<script setup>
import { ref } from "vue";
import axios from "axios";

const formData = ref({
  ad: "",
  ma: "",
  mm: "",
  Y: "",
  M: "",
  D: "",
  eY: "",
  eM: "",
  eD: "",
  cY: "",
  cM: "",
  cD: "",
  aNum: "",
  Pn: "",
  aN: "",
  bNum: "",
  bPN: "",
  bN: "",
});

const generatedFilePath = ref("");
const isLoading = ref(false);

const submitForm = async () => {
  isLoading.value = true;
  try {
    // const response = await axios.post("/api/contract/generate", formData.value);
    const response = await axios.post("http://localhost:8080/api/contract/generate", formData.value);

    generatedFilePath.value = response.data;
    alert("계약서가 성공적으로 생성되었습니다!");
  } catch (error) {
    console.error("계약서 생성 실패:", error);
    alert("계약서 생성 중 오류가 발생했습니다.");
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="container mt-4">
    <h2>계약서 생성기</h2>
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
      <a :href="generatedFilePath" class="btn btn-success" target="_blank">다운로드</a>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 800px;
}
</style>
