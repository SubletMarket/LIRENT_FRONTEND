<script setup></script>

<template>
  <div class="bg-body p-2 board">
    <div class="row">
      <div class="col-3 p-0 my-auto text-end">
        <div class="dropdown">
          <a
            class="btn btn-sm btn-secondary dropdown-toggle"
            href="#"
            id="yearDropdownTitle"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            연도
          </a>

          <ul class="dropdown-menu" id="yearDropdown">
            <li>
              <a
                class="dropdown-item"
                href="#"
                onclick="javascript:setYearDropdownTitle();"
              ></a>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-9 ms-0 me-0 position-relative">
        <input
          class="form-control"
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
      </div>
    </div>
    <div class="shadow m-1 mt-4" style="height: 38%; overflow: hidden scroll">
      <ul class="list-group list-group-flush" id="result_box"></ul>
    </div>
    <div
      class="card text-center shadow m-1 mt-4"
      id="spec_result_box"
      style="height: 50%; overflow: hidden scroll"
    ></div>
  </div>
</template>

<style scoped>
.board {
  left: 10px;
  width: 20vw;
  min-width: 300px;
  top: 8vh;
  height: 96vh;
  position: fixed;
  z-index: 100;
}
</style>
