<script setup></script>

<template>
  <div>
    <!-- 중앙 content start -->
    <div class="container">
      <div style="height: 70px"></div>
      <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img
              src="https://cdn.pixabay.com/photo/2019/12/26/18/41/lamp-4720975_1280.jpg"
              class="img-fluid rounded mx-auto d-block w-100"
              style="height: 700px"
              alt="..."
            />
          </div>
          <div class="carousel-item">
            <img
              src="https://cdn.pixabay.com/photo/2016/11/30/08/46/living-room-1872191_1280.jpg"
              class="img-fluid rounded mx-auto d-block w-100"
              style="height: 700px"
              alt="..."
            />
          </div>
          <div class="carousel-item">
            <img
              src="https://cdn.pixabay.com/photo/2019/09/27/11/36/children-girls-4508290_1280.jpg"
              class="img-fluid rounded mx-auto d-block w-100"
              style="height: 700px"
              alt="..."
            />
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
      <!-- 아파트 매매 정보 검색 start -->
      <div class="position-relative">
        <div class="position-absolute top-0 start-0">
          <!-- 어떤 집을 찾고 계세요? -->
        </div>
        <div class="position-absolute top-0 end-0">
          <RouterLink :to="{ name: 'home' }" :class="{ link: true }">FIND A HOME </RouterLink>
        </div>
      </div>
    </div>
    <!-- 아파트 매매 정보 검색 start -->
    <!-- 중앙 content end -->
  </div>
</template>

<style scoped>
img {
  object-fit: cover;
}

.link {
  font-size: 100px;
  color: #000;
  text-decoration: none;
}
</style>
