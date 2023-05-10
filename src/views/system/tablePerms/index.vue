<template>
  <div>
    <ShareTable :dialog-data="dialogData" @submit-perms="submit"></ShareTable>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, reactive, toRefs, ref} from "vue";
import ShareTable from "../../../components/ShareTable.vue";

const state = reactive({
  tableNameList: [],
  dialogData: {
    table: [],
    id: '1',
    dialogVisible: false,
  }
})

const {
  tableNameList,
  dialogData,
} = toRefs(state);

const getTableNameList = () => {
  state.tableNameList = [
    'table 1', 'table 2', 'table 3', 'table 4', 'table 5', 'table 6', 'table 7', 'table 8', 'table 9', 'table 10'
  ]
  state.dialogData.table = state.tableNameList
  state.dialogData.dialogVisible = true
}

const submit = (data: any) => {
  console.log('submit:', data)
}

onMounted(() => {
  getTableNameList();
});
</script>

<style scoped>

</style>