<template>
  <button @click="openWindow">打开新窗口</button>
</template>

<script lang="ts" setup>
import {onMounted, reactive, ref, toRefs} from "vue";

import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();

const openWindow = () => {


  const {href} =  router.resolve({
    path:'/organization',

    // 携带参数
    query:{
      name:'photo-editor'
    }
  })

  window.open(href)
}
</script>

<style scoped>

</style>