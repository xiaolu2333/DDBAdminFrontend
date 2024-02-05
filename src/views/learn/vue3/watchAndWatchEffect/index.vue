<template>
  <button @click="click">{{ number.count }}</button>
</template>
<script setup lang="ts">
import {reactive, ref, watchEffect} from "vue";

const x = ref(-1)

const number = reactive({count: 0});
watchEffect(() => {
  console.log("新的值:", number.count);    // 刚进入页面时，不会触发，number.count = 0
})


const click = () => {
  x.value = Math.floor(Math.random() * 100)
  number.count++;
};
</script>
