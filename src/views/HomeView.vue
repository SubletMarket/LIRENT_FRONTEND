<script setup>
import HomeKakaoMap from "@/components/HomeKakaoMap.vue";
import HomeAptList from "@/components/HomeAptList.vue";
import { homeAxios, regcodeAxios } from "@/util/http-commons";
import { ref, onMounted } from "vue";
import HomeBoard from "@/components/HomeBoard.vue";

const regcodeHttp = regcodeAxios();
const homeHttp = homeAxios();

const address = ref({
  sido: "",
  gugun: "",
  dong: "",
});

const searchAptName = ref("");

const addressOptions = ref({
  sidos: [],
  guguns: [],
  dongs: [],
});

const aptList = ref([]);

const apt = ref({});

onMounted(() => {
  regcodeHttp
    .get("", {
      params: {
        regcode_pattern: "*00000000",
        is_ignore_zero: true,
      },
    })
    .then(({ data }) => {
      console.log("sidos 로드 완료");
      addressOptions.value.sidos = data.regcodes;
    });
});

// sido에 따른 gugun 업데이트
function updateGugun() {
  const subSidoCode = address.value.sido.substring(0, 2);
  regcodeHttp
    .get("", {
      params: {
        regcode_pattern: subSidoCode + "???00000",
        is_ignore_zero: true,
      },
    })
    .then(({ data }) => {
      const codes = data.regcodes;
      const guguns = [];
      for (const key in codes) {
        const gugunName = codes[key].name.split(" ")[1];
        if (gugunName) {
          guguns.push({ code: codes[key].code, name: gugunName });
        }
      }

      addressOptions.value.guguns = guguns;
      addressOptions.value.dongs = [];
      address.value.gugun = null;
      address.value.dong = null;
    });
}

// gugun에 따른 dong 업데이트
function updateDong() {
  const subGugunCode = address.value.gugun.substring(0, 5);
  regcodeHttp
    .get("", {
      params: {
        regcode_pattern: subGugunCode + "???00",
        is_ignore_zero: true,
      },
    })
    .then(({ data }) => {
      const codes = data.regcodes;
      const dongs = [];
      for (const key in codes) {
        const dongName = codes[key].name.split(" ")[2];
        if (dongName) {
          dongs.push({ code: codes[key].code, name: dongName });
        }
      }

      addressOptions.value.dongs = dongs;
      address.value.dong = null;
    });
}

function findHomeByCode() {
  let targetCode;

  if (address.value.dong) targetCode = address.value.dong;
  else if (address.value.gugun) targetCode = address.value.gugun;
  else if (address.value.sido) targetCode = address.value.sido;

  console.log(targetCode);

  if (targetCode) {
    homeHttp.get(`/list/${targetCode}`).then(({ data }) => {
      aptList.value = null;
      aptList.value = data;
      console.log(aptList.value);
    });
  }
}

function findHomeByName() {
  homeHttp
    .get("/listByName", {
      params: {
        aptName: searchAptName.value,
      },
    })
    .then(({ data }) => {
      aptList.value = data;
    });
}
</script>

<template>
  <!-- 상단 navbar end -->
  <!-- 중앙 content start -->
  <div>
    <div class="row" id="map-data-field">
      <HomeBoard />
      <!-- 중앙 left content  start -->
      <HomeKakaoMap :selected-apt="apt" />
    </div>
  </div>
</template>

<style scoped></style>
