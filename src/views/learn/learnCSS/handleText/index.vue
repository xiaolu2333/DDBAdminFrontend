<template>
  <el-row>
    <el-col :span="8">
      <el-card>
        <template #header>
          <span>文字超出换行</span>
        </template>
        <div class="break-text-line">
          GoJS is a JavaScript and TypeScript library for building interactive diagrams and graphs. GoJS allows you to
          build
          all kinds of diagrams and graphs for your users, from simple flowcharts and org charts to highly-specific
          industrial
        </div>
      </el-card>
    </el-col>
    <el-col :span="8">
      <el-card>
        <template #header>
          <span>文字超出省略号</span>
        </template>
        <div class="ellipsis-at-end-line">
          GoJS is a JavaScript and TypeScript library for building interactive diagrams and graphs. GoJS allows you to
          build
          all kinds of diagrams and graphs for your users, from simple flowcharts and org charts to highly-specific
          industrial
          diagrams, SCADA and BPMN diagrams, medical diagrams like genograms, and more. GoJS makes constructing
          JavaScript
          diagrams of complex nodes, links, and groups easy with customizable templates and layouts.
        </div>
      </el-card>
    </el-col>
    <el-col :span="8">

    </el-col>
  </el-row>
</template>

<script setup>
</script>

<style scoped>
:deep(.el-card__header) {
  height: 50px;
}

.break-text-line {
  width: 200px;
  height: 150px;
  background-color: #f1fff5;
  /* 文字超出换行 */
  overflow-wrap: break-word
}

.ellipsis-at-end-line {
  width: 200px;
  height: 150px;
  background-color: #f1fff5;
  overflow: hidden; /* 文字超出隐藏 */
  text-overflow: ellipsis; /* 文字超出显示省略号 */
  white-space: nowrap; /* 文字不换行 */
}
</style>