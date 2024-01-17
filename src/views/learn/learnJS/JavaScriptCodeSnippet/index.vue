<template>
  <el-card>
    <p>获取中文输入的大写首字母</p>
    <el-input v-model="inputValue1" placeholder="请输入中文" @input="handleInput1"/>
    <p>{{ showInputValue1 }}</p>
  </el-card>
  <el-card>
    <p>获取时间距离</p>
    <el-input v-model="inputValue2" placeholder="请输入日期时间" @input="handleInput2"/>
    <p>{{ showInputValue2 }}</p>
  </el-card>
</template>

<script setup>
import {ref, reactive, toRefs, getCurrentInstance} from "vue";
import {pinyin} from 'pinyin-pro';

const state = reactive({
  inputValue1: '',
  showInputValue1: '',

  inputValue2: '',
  showInputValue2: '',
})

const {
  inputValue1,
  showInputValue1,

  inputValue2,
  showInputValue2,
} = toRefs(state)


function handleInput1() {
  state.showInputValue1 = pinyin(state.inputValue1, {
    pattern: 'first',
    toneType: 'none',
    type: 'array'
  }).map(item => item.toUpperCase()).join('');
}

function handleInput2(time) {
  const now = new Date()
  const diff = now.getTime() - new Date(time).getTime()

  if (diff > 24 * 60 * 60 * 1000) {
    state.showInputValue2 = time
  } else if (diff > 60 * 60 * 1000) {
    state.showInputValue2 = Math.floor(diff / (60 * 60 * 1000)) + '小时前'
  } else if (diff > 60 * 1000) {
    state.showInputValue2 = Math.floor(diff / (60 * 1000)) + '分钟前'
  } else {
    state.showInputValue2 = '刚刚'
  }
}
</script>

<style scoped>

</style>