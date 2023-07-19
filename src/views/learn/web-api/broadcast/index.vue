<template>
  <button @click="broadcast">通过Broadcast Channel API向 “打开新窗口” 和 “数据表授权” 页面传递数据</button>
</template>

<script setup>

const broadcast = () => {
  // 创建一个名为 "my_channel" 的广播频道
  const myChannel = new BroadcastChannel("my_channel");

  // 向该频道发送消息
  myChannel.postMessage("Hello world!");
}

</script>

<style scoped>

</style>