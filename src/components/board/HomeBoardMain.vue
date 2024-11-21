<script setup></script>

<template>
  <div class="ms-0 me-0 position-relative">
    <!-- 검색 input -->
    <input
      class="form-control mb-2"
      type="text"
      id="serachInput"
      placeholder="어디가 궁금하세요?"
    />
    <div class="position-absolute top-0 end-0 p-1">
      <button class="btn btn-link p-0" onclick="javascript:searchList();">
        <div class="pe-3">
          <svg
            height="100%"
            width="30px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 6C13.7614 6 16 8.23858 16 11M16.6588 16.6549L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
              stroke="#000000"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </button>
    </div>
    <div><h1 class="text-center">현재위치</h1></div>
    <div class="border-bottom my-2"></div>
    <div class="col">
      <div class="card h-100">
        <img
          src="https://via.placeholder.com/400x200"
          class="card-img-top"
          alt="매물 이미지"
        />
        <div class="card-body">
          <h5 class="card-title">매물 제목</h5>
          <p class="card-text">
            <strong>주차:</strong> 주차 가능<br />
            <strong>엘리베이터:</strong> 2대<br />
            <strong>층수:</strong> 3층<br />
            <strong>면적:</strong> 85㎡<br />
            <strong>방 개수:</strong> 3개<br />
            <strong>화장실:</strong> 2개<br />
          </p>
        </div>
        <div class="card-footer">
          <small class="text-muted">등록일: 2024-11-20</small>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
