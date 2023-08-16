<template>
  <el-button-group>
    <el-button
        v-if="isUserAuthorized"
        @click="handleDtAuth(props.isLocal)"
        size="small"
        type="primary"
        :icon="Finished"
    >
      用户授权
    </el-button>

    <el-button
        v-if="isCenterInitiated"
        @click="handleMakeCenter(props.isLocal)"
        size="small"
        type="success"
        :icon="Rank"
    >
      初始化为中心库
    </el-button>

    <el-button
        v-if="isBusinessAuthorized"
        @click="handleBsnAuth(props.isLocal)"
        size="small"
        type="danger"
        :icon="Select"
    >
      业务授权
    </el-button>

    <el-button
        v-if="isCommitRegister"
        @click="handleCommitRegister(props.isLocal)"
        size="small"
        type="danger"
        :icon="Select"
    >提交注册
    </el-button>

    <el-button
        v-if="isTablePerms"
        @click="handleTablePerms(props.isLocal)"
        size="small"
        type="danger"
        :icon="Select"
    >表共享
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
  isLocal: Number,
  status: Number,
  share: Boolean
});

const isUserAuthorized = ref(false);
const isCenterInitiated = ref(false);
const isBusinessAuthorized = ref(false);
const isCommitRegister = ref(false);
const isTablePerms = ref(false);

// 在适当的时机更新计算属性的值
watchEffect(() => {
  console.log("用户授权 watchEffect:", props)
  isUserAuthorized.value = props.sys_admin && props.isLocal !== 2
  isCenterInitiated.value = props.sysMode === 2 && props.sys_admin && (props.isLocal === 0 || props.isLocal === 1) && props.status === 1 && !props.share
  isBusinessAuthorized.value = props.sysMode === 2 && props.sys_admin && props.isLocal === 3 && props.status === 1
  isCommitRegister.value = props.sysMode === 3 && props.sys_admin && (props.isLocal === 0 || props.isLocal === 1) && props.status !== 1
  isTablePerms.value = props.sysMode === 3 && props.sys_admin && (props.isLocal === 0 || props.isLocal === 1) && !props.share && props.status === 1
});

const emit = defineEmits(['DtAuth', 'MakeCenter', 'BsnAuth', 'CommitRegister', 'TablePerms'])

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

const handleCommitRegister = (row) => {
  // 抛出CommitRegister事件
  emit('CommitRegister', row)
}

const handleTablePerms = (row) => {
  // 抛出TablePerms事件
  emit('TablePerms', row)
}
</script>