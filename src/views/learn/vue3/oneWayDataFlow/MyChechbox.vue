<script setup lang='ts'>
import {defineProps, onBeforeMount, ref} from "vue";

const props = defineProps<{
  checkboxOptions: Array<any>
  checkboxData: Array<any>
}>();
console.log('props:', props)

const pullDownRef = ref<VxePulldownInstance>()
const clickEvent = () => {
  const $pulldown = pullDownRef.value
  if ($pulldown) {
    $pulldown.togglePanel()
  }
}
// 下拉面板隐藏事件
const handlePanelHide = () => {

}

onBeforeMount(() => {
  console.log('checkboxOptions:', props.checkboxOptions)
  console.log('checkboxData:', props.checkboxData)
})
</script>

<template>
  <vxe-pulldown
      ref="pullDownRef"
      @hide-panel="handlePanelHide"
  >
    <template #default>
      <vxe-button icon="vxe-icon-arrow-down" @click="clickEvent">{{ props.checkboxData }}</vxe-button>
    </template>
    <template #dropdown>
      <vxe-checkbox-group v-model="props.checkboxData">
        <p v-for="(option,index) in props.checkboxOptions" :key="index">
          <vxe-checkbox :label="option.label" :content="option.value"/>
        </p>
      </vxe-checkbox-group>
    </template>
  </vxe-pulldown>
</template>

<style scoped>

</style>