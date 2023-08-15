<template>
  <el-button-group>
    <el-button
        v-if="isUserAuthorized"
        @click="handleDtAuth(row)"
        size="small"
        type="primary"
        :icon="Finished"
    >
      用户授权
    </el-button>

    <el-button
        v-if="isCenterInitiated"
        @click="handleMakeCenter(row)"
        size="small"
        type="success"
        :icon="Rank"
    >
      初始化为中心库
    </el-button>

    <el-button
        v-if="isBusinessAuthorized"
        @click="handleBsnAuth(row)"
        size="small"
        type="danger"
        :icon="Select"
    >
    >
      业务授权
    </el-button>
  </el-button-group>
</template>

<script setup lang="ts">
import {ref, defineProps, defineEmits, watchEffect} from 'vue';
import {Finished, Rank, Select} from '@element-plus/icons-vue'

const props = defineProps({
  sysMode: Number,
  sys_admin: Boolean,
  db_admin1: Boolean,
  row: Object,
});

const isUserAuthorized = ref(false);
const isCenterInitiated = ref(false);
const isBusinessAuthorized = ref(false);

// 在适当的时机更新计算属性的值
watchEffect(() => {
  isUserAuthorized.value = (props.sysMode === 0 && props.sys_admin) || ((props.sysMode === 2 || props.sysMode === 3) && (props.sys_admin || props.db_admin1));
  isCenterInitiated.value = props.sysMode === 2 && props.sys_admin && (props.row.isLocal === 0 || props.row.isLocal === 1);
  isBusinessAuthorized.value = props.sysMode === 2 && props.db_admin1 && props.row.isLocal === 3;
});

const emit = defineEmits(['DtAuth', 'MakeCenter', 'BsnAuth'])

const handleDtAuth = (row) => {
  // 抛出DtAuth事件
  emit('DtAuth', row)
}

const handleMakeCenter = (row) => {
  // 抛出MakeCenter事件
  emit('MakeCenter', row)
}

const handleBsnAuth = (row) => {
  // 抛出BsnAuth事件
  emit('BsnAuth', row)
}

</script>