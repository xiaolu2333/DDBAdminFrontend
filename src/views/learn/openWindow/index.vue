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


// 监听名为 "my_channel" 的广播频道
const myChannel = new BroadcastChannel("my_channel");
// 监听该频道并处理消息
myChannel.onmessage = function (event) {
  alert("接收到消息: " + event.data); // "Hello World!
  console.log(event);
};
</script>

<style scoped>

</style>