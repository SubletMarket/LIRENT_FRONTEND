<script setup>
import { onMounted, ref } from "vue";

const props = defineProps({
  selectedApt: Object,
});
const mapInstance = ref();

onMounted(() => {
  mapInstance.value = new KakaoMap();
});

class KakaoMap {
  map;
  customOverlay;
  constructor() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");
      /* global kakao */
      // script가 로드된 후 실행될 함수 정의
      script.onload = () => kakao.maps.load(this.initMap.bind(this));
      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=53145e5b6696588dc70ac4fcb0dda36a";
      document.head.appendChild(script);
    }
  }

  initMap() {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(36.358843, 127.344192),
      level: 3,
    };

    this.map = new kakao.maps.Map(container, options);
  }

  setOverlay(coords, content) {
    console.log("KakaoMap.setOverlay executed");
    const kakaoCoords = new kakao.maps.LatLng(
      coords.latitude,
      coords.longitude
    );

    this.customOverlay = new kakao.maps.CustomOverlay({
      position: kakaoCoords,
      content: content,
      xAnchor: 0.3,
      yAnchor: 0.91,
    });

    console.log("map set");
    this.customOverlay.setMap(this.map);
  }

  deleteOverlay() {
    if (this.customOverlay) {
      this.customOverlay.setMap(null);
    }
  }

  setCenter(coords) {
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
    <RouterView />
  </div>
</template>

<style scoped>
#map {
  width: 100%;
  height: calc(100vh - 56px);
  aspect-ratio: 1;
}
</style>
