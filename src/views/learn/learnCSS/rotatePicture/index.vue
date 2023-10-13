<template>
  <div v-if="msg.show">
    <span class="rotate">
<!--      <img src="src/assets/images/loading.jpg" alt="加载中">-->
    </span>
  </div>
</template>

<script setup>
import {reactive, toRefs} from "vue";

const props = defineProps({
  msg: {
    type: Object,
    default: {
      show: true,
      title: '加载中...'
    }
  }
})

const state = reactive({
  msg: {
    show: props.msg.show,
    title: props.msg.title
  }
})
const {
  msg
} = toRefs(state)
</script>

<style scoped>
.rotate {
  display: inline-block;
  color: red;
  animation: rotate 10s linear infinite;
  -webkit-animation: rotate 3s linear infinite;

}

@keyframes rotate {
  0% {
    transform: rotate(0);
  }

  25% {
    transform: rotate(90deg);
  }
  50% {
    transform: rotate(180deg);
  }
  75% {
    transform: rotate(270deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@-webkit-keyframes rotate {
  0% {
    transform: rotate(0);
  }
  25% {
    transform: rotate(90deg);
  }
  50% {
    transform: rotate(180deg);
  }
  75% {
    transform: rotate(270deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

img {
  width: 100px;
  height: 100px;
}
</style>