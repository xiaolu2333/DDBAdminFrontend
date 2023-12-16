<template>
  <div>
    <router-view />
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
@import "@/style/scss/variables.scss";

div {
  background-color: $mainColor;
  height: calc(100vh - 3em)
}
</style>