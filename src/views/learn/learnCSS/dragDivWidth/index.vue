<template>
  <el-card class="app-card-container" shadow="never">
    <div class="box" ref="box">
      <div class="left" style="background-color: #f1fff5">
        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
        </ul>
      </div>
      <div class="resize" title="收缩侧边栏">
        ⋮
      </div>
      <div class="mid" style="background-color: #96b1eb">
        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
        </ul>
      </div>
    </div>
  </el-card>
</template>

<script setup>

import {onMounted} from "vue";

const dragControllerDiv = () => {
  let resize = document.getElementsByClassName('resize');
  let left = document.getElementsByClassName('left');
  let mid = document.getElementsByClassName('mid');
  let box = document.getElementsByClassName('box');


  //
  for (let i = 0; i < resize.length; i++) {
    // 鼠标按下事件
    resize[i].onmousedown = function (e) {
      // 变色提示
      resize[i].style.background = '#818181';
      let startX = e.clientX;
      resize[i].left = resize[i].offsetLeft;
      // 鼠标拖动事件
      document.onmousemove = function (e) {
        let endX = e.clientX;
        let moveLen = resize[i].left + (endX - startX); // （endx-startx）=移动的距离。resize[i].left+移动的距离=左边区域最后的宽度
        let maxT = box[i].clientWidth - resize[i].offsetWidth; // 容器宽度 - 左边区域的宽度 = 右边区域的宽度

        if (moveLen < 32) moveLen = 32; // 左边区域的最小宽度为32px
        if (moveLen > maxT - 150) moveLen = maxT - 150; //右边区域最小宽度为150px

        resize[i].style.left = moveLen; // 设置左侧区域的宽度

        for (let j = 0; j < left.length; j++) {
          left[j].style.width = moveLen + 'px';
          mid[j].style.width = (box[i].clientWidth - moveLen - 10) + 'px';
        }
      };
      // 鼠标松开事件
      document.onmouseup = function (evt) {
        //颜色恢复
        resize[i].style.background = '#d6d6d6';
        document.onmousemove = null;
        document.onmouseup = null;
        resize[i].releaseCapture && resize[i].releaseCapture(); //当你不在需要继续获得鼠标消息就要应该调用ReleaseCapture()释放掉
      };
      resize[i].setCapture && resize[i].setCapture(); //该函数在属于当前线程的指定窗口里设置鼠标捕获
      return false;
    };
  }
}

onMounted(() => {
  dragControllerDiv();
})
</script>

<style scoped>
.app-card-container {
  height: 100%;
  width: 100%;
}

::v-deep(.el-card__body) {
  height: 100%;
}

.scrollbar-wrapper {
  height: 100%;
}

.cus-card-header {
  height: 32px;
}

.function-toolbar {
  margin-bottom: 10px;
}

.query-box {
  float: right;
  height: 20px;
  margin-right: 5px;
}

.card-table-container {
  height: calc(90vh - 150px);
  width: calc(100%);
  transition: width 1s ease-in-out .5s;
}

.pagination-toolbar {
}

.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: left;
  border-radius: 4px;
  background-color: #fff5f5;
  color: #ff9999;
  font-weight: bold;
//background: var(--el-color-primary-light-9); //color: var(--el-color-primary);
}

::v-deep(.vxe-body--row.row-red) {
  background-color: #ffd6d6;
}

::v-deep(.vxe-body--column.col-red) {
  background-color: #f37676;
}

::v-deep(.el-upload-list__item) {
  margin: 0;
  padding-left: 0;
}

/* 拖拽相关样式 */
/*包围div样式*/
.box {
  width: 100%;
  height: 100%;
  margin: 1% 0;
  overflow: hidden;
  box-shadow: -1px 9px 10px 3px rgba(0, 0, 0, 0.11);
}

/*左侧div样式*/
.left {
  width: calc(21% - 10px); /*左侧初始化宽度*/
  height: 100%;
  background: #FFFFFF;
  float: left;
}

/*拖拽区div样式*/
.resize {
  cursor: col-resize;
  float: left;
  position: relative;
  top: 45%;
  background-color: #d6d6d6;
  border-radius: 5px;
  margin-top: -10px;
  width: 10px;
  height: 50px;
  background-size: cover;
  background-position: center;
  /*z-index: 99999;*/
  font-size: 32px;
  color: white;
}

/*拖拽区鼠标悬停样式*/
.resize:hover {
  color: #444444;
}

/*右侧div'样式*/
.mid {
  float: right;
  width: 78%; /*右侧初始化宽度*/
  height: 100%;
  background: #fff;
  box-shadow: -1px 4px 5px 3px rgba(0, 0, 0, 0.11);
}
</style>