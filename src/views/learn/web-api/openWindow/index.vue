<template>
  <button @click="openWindow">打开新窗口</button>
  <br/>
  <br/>
  <br/>
  <el-popover
      placement="bottom"
      :width="300"
      trigger="hover"
      content="this is content, this is content, this is content"
  >
    <div>
      <el-button type='primary' @click='showAction("详情")' :icon="Document">详情</el-button>
      <el-button type='success' @click='showAction("修改")' :icon="Edit">修改</el-button>
      <el-button type='danger' @click='showAction("卸载")' :icon="Delete">卸载</el-button>
    </div>
    <br/>
    <div>
      <el-button type='danger' @click='showAction("初始化为中心库")' :icon="Rank">初始化为中心库</el-button>
      <el-button type='danger' @click='showAction("业务授权")' :icon="Finished">业务授权</el-button>
    </div>
    <template #reference>
      <el-button type='primary' class="m-2" :icon="Coin">执行数据库操作</el-button>
    </template>
  </el-popover>

</template>

<script lang="ts" setup>
import {onMounted, reactive, ref, toRefs} from "vue";
import {useRoute, useRouter} from "vue-router";
import {ElMessage} from 'element-plus'
import {
  Coin, Delete, Edit, Document, Rank, Finished,
} from '@element-plus/icons-vue'

const router = useRouter();
const route = useRoute();

const state = reactive({})
const {} = toRefs(state)

function showAction(action: string) {
  ElMessage.success(action)
}

const openWindow = () => {
  const {href} = router.resolve({
    path: '/organization',

    // 携带参数
    query: {
      name: 'photo-editor'
    }
  })

  window.open(href)
}


// 监听名为 "my_channel" 的广播频道
const myChannel = new BroadcastChannel("my_channel");
// 监听该频道并处理消息
myChannel.onmessage = function (event) {
  alert("接收到消息: " + event.data); // "Hello World!
  console.log(event);
};
</script>

<style scoped>

</style>