<script setup>
import axios from "axios";
import { watch } from "vue";

const props = defineProps({
  subleaseId: String,
});

// watch(
//   () => props.subleaseId,
//   () => {
//     axios.get("")
//   }
// );
</script>

<template>
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
      <input type="text" class="form-control" placeholder="메시지 입력..." />
      <button class="btn btn-primary">보내기</button>
    </div>
  </div>
</template>

<style scoped>
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
