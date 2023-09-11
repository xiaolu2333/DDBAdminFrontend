<template>
  <p>父组件中： {{ searchText }}</p>

  <CustomInput v-model="searchText" />
</template>

<script setup>
import {ref} from 'vue'
import CustomInput from './CustomInput.vue'

const searchText = ref('hello')
</script>