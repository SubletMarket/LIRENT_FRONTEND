<script setup>
import HomeDetailBoard from "@/components/detail/HomeDetailBoard.vue";
import HomeDetailChat from "@/components/detail/HomeDetailChat.vue";

const props = defineProps({
  sublease: Object,
});
</script>

<template>
  <HomeDetailBoard :sublease="props.sublease" />
  <HomeDetailChat :sublease="props.sublease" />
</template>

<style scoped></style>
