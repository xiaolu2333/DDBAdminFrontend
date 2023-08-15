<template>
  <p>基于 系统模式+当前角色+数据库类型+数据库分布类型 等因素控制按钮可用性</p>

  <BtnCtrl
      :sysMode="2"
      :sys_admin="false"
      :db_admin1="true"
      :row="{isLocal: 3}"
      @bsn-auth="handleBsnAuth"
      @dt-auth="handleDtAuth"
      @make-center="handleMakeCenter"
  />
</template>

<script setup>
import {ref, defineProps, defineEmits, watchEffect} from 'vue';
import BtnCtrl from './BtnCtrl.vue';


const handleDtAuth = (row) => {
  console.log("用户授权 handleDtAuth:", row)
}

const handleMakeCenter = (row) => {
  console.log("初始化为中心库 handleMakeCenter:", row)
}

const handleBsnAuth = (row) => {
  console.log("业务授权 handleBsnAuth:", row)
}
</script>

<style scoped>

</style>