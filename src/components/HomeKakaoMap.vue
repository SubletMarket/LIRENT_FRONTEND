<script setup>
import { onBeforeMount, onMounted, onUpdated, reactive, ref, watch } from "vue";
import { subleaseAxios } from "@/util/http-commons";
import { useMemberStore } from "@/stores/member";
import { useRoute, useRouter } from "vue-router";

// 피니아
const memberStore = useMemberStore();
// 통신
const subleaseHttp = subleaseAxios();
// 라우트
const route = useRoute();
const router = useRouter();

// 변수들
const mapInstance = ref();
const mapCenter = reactive({});
const subleases = reactive({});

// 경로가 /detail/{subleasaeId} 일 경우, 해당 subleaseId값
const sublease = reactive({});

onBeforeMount(async () => {
  console.log("onBeforeMount");

  // 카카오 지도 생성
  mapInstance.value = new KakaoMap();

  await mapInstance.value.loadKakaoMapAPI();
  subleases.value = await getSubleases();

  console.log(subleases.value);

  // detail의 subleaseID값이 있으면 위치 가져오기
  if (route.params.subleaseId) {
    sublease.value = await getSublease(route.params.subleaseId);
    mapCenter.value = {
      latitude: sublease.value.latitude,
      longitude: sublease.value.longitude,
    };
  } else {
    mapCenter.value = await getCurrentCoord();
  }
  // 현재 전대차 매물 불러와서 지도에 표시
  setOverlaiesColor(route.params.subleaseId);
});

onMounted(async () => {});

onUpdated(() => {
  setOverlaiesColor(route.params.subleaseId);
});

// sublease 목록이 변하면 지도에 오버레이 업데이트
watch(subleases, (newVal, oldVal) => {
  for (const sublease of newVal.value) {
    const adjustedPrice = sublease.price / 10000;
    const content = document.createElement("div");
    content.style.cssText = `
      display: flex;
      align-items: center;
      justify-content: center;
      height: 40px;
      color: black;
      font-size: 14px;
      font-weight: bold;
      border: 2px solid black;
      border-radius: 10px;
      padding: 5px;
      text-align: center;
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);`;
    content.className = "text-bg-light";
    content.innerText = `${adjustedPrice}만원 / 하루`;
    content.addEventListener("click", () =>
      contentClicked(sublease.subleaseId)
    );

    mapInstance.value.setOverlay(
      sublease.subleaseId,
      {
        latitude: sublease.latitude,
        longitude: sublease.longitude,
      },
      content
    );
  }
});

// subleaseId 변화에 따른 Detail 화면 변화
watch(
  () => route.params.subleaseId,
  async (newVal, oldVal) => {
    if (newVal) {
      const data = await getSublease(newVal);
      sublease.value = data;
    }
    setOverlaiesColor(newVal);
  }
);

// 맵 중앙 이동 Watch
watch(mapCenter, (newVal, oldVal) => {
  mapInstance.value.setCenter(newVal.value);
});

async function getSubleases() {
  const { data } = await subleaseHttp.get("");
  return data;
}

function getCurrentCoord() {
  console.log("HomeKakaoMap getCurrentCoord()");

  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const coord = pos.coords;
        resolve({ latitude: coord.latitude, longitude: coord.longitude });
      });
    }
  });
}

async function getSublease(id) {
  const { data } = await subleaseHttp.get(`/${id}`);
  return data;
}

function setOverlaiesColor(subleaseId) {
  for (const overlayInfo of mapInstance.value.customOverlaies) {
    const targetOverlay = overlayInfo.overlay;
    const content = targetOverlay.getContent();

    if (overlayInfo.subleaseId == subleaseId) {
      content.className = "text-bg-info";
    } else {
      content.className = "text-bg-light";
    }

    targetOverlay.setContent(content);
  }
}

function contentClicked(id) {
  router.push({ name: "detail", params: { subleaseId: parseInt(id) } });
}

class KakaoMap {
  map;
  customOverlaies = [];

  constructor() {
    this.loadKakaoMapAPI().then(() => {
      this.initMap();
    });
  }

  loadKakaoMapAPI() {
    return new Promise((resolve, reject) => {
      if (window.kakao && window.kakao.maps) {
        resolve(); // 이미 로드된 경우
      } else {
        const script = document.createElement("script");
        script.onload = () => kakao.maps.load(resolve); // 로드 후 resolve 호출
        script.onerror = reject; // 로드 실패 시 reject 호출
        script.src =
          "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=53145e5b6696588dc70ac4fcb0dda36a";
        document.head.appendChild(script);
      }
    });
  }

  initMap() {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(36.358843, 127.344192),
      level: 3,
    };

    this.map = new kakao.maps.Map(container, options);
  }

  setOverlay(subleaseId, coords, content) {
    const kakaoCoords = new kakao.maps.LatLng(
      coords.latitude,
      coords.longitude
    );

    const newOverlay = new kakao.maps.CustomOverlay({
      position: kakaoCoords,
      content: content,
      xAnchor: 0.3,
      yAnchor: 0.91,
    });

    newOverlay.setMap(this.map);
    this.customOverlaies.push({ subleaseId, overlay: newOverlay });
  }

  deleteOverlay() {
    for (const overlay of this.customOverlaies) {
      overlay.setMap(null);
    }
    this.customOverlaies = {};
  }

  setCenter(coords) {
    console.log("KakaoMap.setCenter executed");
    const kakaoCoords = new kakao.maps.LatLng(
      coords.latitude,
      coords.longitude
    );
    this.map.setCenter(kakaoCoords);
  }
}
</script>

<template>
  <div id="map">
    <RouterView :sublease="sublease.value" />
  </div>
</template>

<style scoped>
#map {
  width: 100%;
  height: 100vh; /* 화면 전체 높이 */
  position: absolute; /* 지도 절대 위치 */
  top: 0; /* 상단부터 시작 */
  left: 0; /* 왼쪽부터 시작 */
  z-index: 1; /* 네브바보다 뒤에 위치 */
}
</style>
