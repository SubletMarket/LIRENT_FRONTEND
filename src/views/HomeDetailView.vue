<script setup>
import HomeDetailBoard from "@/components/detail/HomeDetailBoard.vue";
import HomeDetailChat from "@/components/detail/HomeDetailChat.vue";

const props = defineProps({
  currentSublease: Object,
});
</script>

<template>
  <HomeDetailBoard :sublease="props.currentSublease" />
  <!-- <HomeDetailChat :sublease="props.currentSublease" /> -->
</template>

<style scoped></style>
