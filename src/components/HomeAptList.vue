<script setup>
const props = defineProps({
  aptlist: Array,
});
</script>

<template>
  <table class="table table-hover text-center">
    <thead>
      <tr>
        <th>시/도</th>
        <th>구/군</th>
        <th>법정동</th>
        <th>아파트이름</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="apt in props.aptlist" :key="apt.aptSeq" @click="$emit('aptclick', apt)">
        <td>{{ apt.sido }}</td>
        <td>{{ apt.gugun }}</td>
        <td>{{ apt.dong }}</td>
        <td>{{ apt.aptName }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped></style>
