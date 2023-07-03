<template>
  <div>
    <div class="container-1">
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
      <div>6</div>
      <div>7</div>
      <div>8</div>
      <div>9</div>
    </div>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.container-1 {
  background-color: #daf7d0;
  // 使用 grid 布局
  display: grid;
  // 定义网格布局的列，grid-template-columns<rows>: length | percent | auto | fr
  grid-template-columns: 1fr 1fr 1fr;
  // 定义网格布局的行，grid-template-rows<rows>: length | percent | auto | fr
  grid-template-rows: 1fr 1fr 1fr;
  // 定义网格布局的列间距为 10px
  grid-column-gap: 10px;
  // 定义网格布局的行间距为 10px
  grid-row-gap: 10px;
}

.container-1 div {
  background-color: #96b1eb;
  // 文本水平居中
  text-align: center;
  // 文本垂直居中
  line-height: 100px;
}

div {
  width: 100px;
  height: 100px;
}
</style>