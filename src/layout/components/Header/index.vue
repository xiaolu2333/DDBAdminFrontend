<template>
  <p>{{ data }}</p>
</template>

<script setup>
const data = "顶部工具栏"

</script>

<style lang="scss" scoped>
@import "@/style/scss/variables.scss";

p {
  background-color: $menuColor;
  padding: 20px;
  color: $menuTextColor;
}
</style>