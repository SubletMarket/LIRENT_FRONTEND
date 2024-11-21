<script setup></script>

<template>
  <!-- Fixed Info Card -->
  <div class="card fixed-card">
    <div class="custom-card-header">
      <h5>남북아파트</h5>
      <p>서울특별시 서대문구 홍은동 395-1</p>
    </div>
    <div class="card-body">
      <p><strong>19평 아파트</strong></p>
      <p>방 2개 / 욕실 1개</p>
      <p>1층</p>
      <p>2024/11/18 - 2024/11/20</p>
      <hr />
      <p><strong>1일 당 비용</strong>: 2만원</p>
      <p><strong>전대 기간</strong>: 3일</p>
      <p>
        <strong>총 비용</strong>: <span class="highlight">6만원 + 20만원</span>
      </p>
      <hr />
      <div class="d-grid gap-2 mb-3">
        <button class="btn btn-outline-primary">전차인과 대화하기</button>
        <button class="btn btn-primary">예약요청하기</button>
      </div>

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

<style scoped>
.fixed-card {
  position: fixed;
  top: 10%;
  left: 20px;
  max-width: 350px;
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
  border-top: 1px solid #ddd;
  padding-top: 10px;
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
