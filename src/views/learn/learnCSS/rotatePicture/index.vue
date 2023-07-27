<template>
  <MyLoading :show="true"></MyLoading>
</template>

<script setup>
import {MyLoading} from '@/components/common/index'
</script>

<style scoped>

</style>

<!--<template>-->
<!--<MyLoading :msg="msg"></MyLoading>-->
<!--</template>-->

<!--<script setup>-->
<!--import {reactive, toRefs} from "vue";-->
<!--import {MyLoading} from '@/components/common/index'-->

<!--const state = reactive({-->
<!--  msg: {-->
<!--    show: true,-->
<!--    title: '加载中...'-->
<!--  }-->
<!--})-->
<!--const {-->
<!--  msg-->
<!--} = toRefs(state)-->
<!--</script>-->

<!--<style scoped>-->
<!--</style>-->