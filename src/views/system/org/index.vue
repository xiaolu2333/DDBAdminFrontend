<template>
  <el-form :model="queryParams" ref="queryForm" :inline="true">
    <el-form-item label="机构名称" prop="name">
      <el-input
          v-model="queryParams.name"
          placeholder="请输入机构名称"
          clearable
          style="width: 200px"
          @change="handleQueryNameOptionsChange"
      />
    </el-form-item>
    <el-form-item label="状态" prop="status">
      <el-select
          v-model="queryParams.status"
          placeholder="机构状态"
          clearable
          style="width: 200px"
          @change="handleQueryStatusOptionsChange"
      >
        <el-option
            v-for="item in queryStatusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button
          type="primary"
          icon="Search"
          @click="handleQuery"
      >搜索
      </el-button>
      <el-button
          icon="Refresh"
          @click="resetQuery"
      >重置
      </el-button>
    </el-form-item>
  </el-form>

  <el-card>
    <el-button
        type="primary"
        plain
        icon="Plus"
        @click="handleAdd"
    >新增
    </el-button>
    <!--    <el-button-->
    <!--        type="danger"-->
    <!--        plain-->
    <!--        icon="Delete"-->
    <!--        @click="handleDelete"-->
    <!--    >删除-->
    <!--    </el-button>-->
    <el-table
        :data="dataList"
        style="width: 100%"
        :loading="loading"
    >
      <el-table-column type="selection" width="55"/>
      <el-table-column prop="name" label="Name" mini-width="180"/>
      <el-table-column prop="code" label="Code" width="100"/>
      <el-table-column prop="status" label="Status" width="100"/>
      <el-table-column prop="desc" label="Desc" width="200"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-button link type="success" @click="handleUpdate(scope.row)">修改</el-button>
          <!--          <el-button v-if="scope.row.parentId != 0" link type="danger" @click="handleDelete(scope.row)">删除</el-button>-->
        </template>
      </el-table-column>
    </el-table>

    <!-- 新增或编辑机构对话框 -->
    <el-dialog v-model="dialogVisible" :title="orgFormTitle" draggable>
      <el-form ref="Form" :model="ogrForm" size="large">
        <el-form-item label="name" prop="name">
          <el-input v-model="ogrForm.name"/>
        </el-form-item>
        <el-form-item label="code">
          <el-input v-model="ogrForm.code"/>
        </el-form-item>
        <el-form-item label="status">
          <el-select v-model="ogrForm.status">
            <el-option label="启用" value="1"/>
            <el-option label="禁用" value="0"/>
          </el-select>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="ogrForm.desc" type="textarea" rows="4"/>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="submitForm">Submit</el-button>
          <el-button @click="dialogVisible = false">Cancel</el-button>
        </span>
      </template>
    </el-dialog>
  </el-card>
</template>

<script setup>
import {onMounted, reactive, toRefs} from "vue";
import {GetOrgListByPost} from "@/api/system/org.js";

const state = reactive({
  loading: false,
  dataList: [],
  queryParams: {
    name: undefined,
    status: undefined,
  },
  queryStatusOptions: [
    {
      value: 1,
      label: "启用",
    },
    {
      value: 0,
      label: "禁用",
    },
  ],
  dialogVisible: false,
  ogrForm: {
    id: null,
    name: null,
    code: null,
    status: null,
    desc: null,
  },
  orgFormTitle: "",
});

const {
  loading,
  dataList,
  queryParams,
  queryStatusOptions,
  dialogVisible,
  ogrForm,
  orgFormTitle
} = toRefs(state);

/**
 * 获取机构列表
 * */
function getOrgList() {
  loading.value = true;
  GetOrgListByPost(queryParams.value).then((res) => {
    console.log("post请求结果res:", res);
    if (res.data.code === 200) {
      dataList.value = res.data.data.datalist;
      state.loading = false;
    }
  });
  // GetOrgListByGet(queryParam.value).then((res) => {
  //   console.log("get请求结果res:", res);
  //   if (res.data.code === 200) {
  //     dataList.value = res.data.data.datalist;
  //     state.loading = false;
  //   }
  // });
}

/**
 * 状态查询处理
 * */
function handleQueryStatusOptionsChange(val) {
  if (val === "") {
    queryParams.value.status = undefined;
  }
}

/**
 * 名称查询处理
 * */
function handleQueryNameOptionsChange(val) {
  if (val === "") {
    queryParams.value.name = undefined;
  }
}

/**
 * 机构查询
 * */
function handleQuery() {
  loading.value = true;
  console.log("queryParam:", queryParams);
  getOrgList();
  loading.value = false;
}

/**
 * 重置机构查询
 * */
function resetQuery() {
  queryParams.value.name = undefined;
  queryParams.value.status = undefined;
  handleQuery();
}

/**
 * 新增机构
 * */
function handleAdd(val) {
  console.log("新增机构:", val);
  dialogVisible.value = true;
  orgFormTitle.value = "新增机构";
}

/**
 * 修改机构
 * */
function handleUpdate(val) {
  console.log("修改机构:", val);
  console.log("ogrForm:", ogrForm);
  dialogVisible.value = true;
  orgFormTitle.value = "编辑机构";
}

/**
 * 提交表单
 * */
function submitForm() {
  console.log("ogrForm:", ogrForm);
  dialogVisible.value = false;
}

onMounted(() => {
  handleQuery();
});
</script>

<style lang="scss" scoped></style>