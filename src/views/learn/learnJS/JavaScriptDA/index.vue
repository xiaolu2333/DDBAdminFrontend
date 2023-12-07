<template>
  111
</template>

<script setup>
import {onMounted, reactive, toRefs, ref, inject, Ref, nextTick, watch, unref} from 'vue'


/******************************** 排序 *****************************/
// 冒泡
function bubbleSort() {
  let list = [5, 4, 3, 2, 1]

  for (let i = 0; i < list.length; ++i) {
    for (let j = i + 1; j < list.length - i + 1; ++j) {
      if (list[i] >= list[j]) {
        let temp = list[j]
        list[j] = list[i]
        list[i] = temp
      }
      console.log('list:', list)
    }
  }
}

onMounted(() => {
  bubbleSort()
})
</script>

<style scoped>

</style>