<template>
  <p>子组件接收到： {{ newGreetingMessage }}</p>
</template>

<script setup lang="ts">
import {ref, defineProps, computed} from 'vue'

const props = defineProps({
  greetingMessage: String
})
const emits = defineEmits(['updateGreetingMessage'])

const newGreetingMessage = computed(() => props.greetingMessage.replace('hello', 'hi'))

// 主动抛出事件 updateGreetingMessage，传递参数 newGreetingMessage
emits('updateGreetingMessage', newGreetingMessage.value)
</script>