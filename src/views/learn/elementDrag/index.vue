<template>
  <h2>元素拖动demo</h2>
  <div>
    <div class="main">
      <el-card style="height: 650px;">
        <el-row :gutter="20">
          <el-col :span="4">
            <!-- 拖拽源 -->
            <div class="content-siadeNav">
              <div class="title">tree列表：</div>
              <el-tree
                  :data="data"
                  ref="tree1"
                  draggable
                  default-expand-all
                  :allow-drop="returnFalse"
                  @node-drag-start="handleDragstart"
                  @node-drag-end="handleDragend"
              >
                <template
                    #default="{node,data}"
                    :style="{cursor: data.path ? 'move' : 'not-allowed'}"
                >
                  {{ data.label }}
                </template>
              </el-tree>
            </div>
          </el-col>
          <!-- 拖放位置 -->
          <el-col :span="20">
            <div class="content">
              <div id="frame_13">
                <div
                    draggable="true"
                    class="main_frame"
                    ref="main_frame_0"
                    @dragstart="ondragstart($event, 'main_frame_0', videoStream[0].path)"
                    @dragenter="ondragenter($event)"
                    @dragover="ondragover($event)"
                    @dragleave="ondragleave($event)"
                    @drop="ondrop($event, item)"
                >
                  {{ videoStream[0] }}
                </div>
                <div class="secondary_frame_right">
                  <div
                      draggable="true"
                      class="secondary_frame"
                      :id="'secondary_frame_' + (index + 1)"
                      :ref="'secondary_frame_' + (index + 1)"
                      v-for="(element, index) in videoStream_1"
                      :key="index"
                      @dragstart="ondragstart($event, 'secondary_frame_' + (index + 1), videoStream_1[index].path)"
                      @dragenter="ondragenter($event)"
                      @dragover="ondragover($event)"
                      @dragleave="ondragleave($event)"
                      @drop="ondrop($event, item)"
                  >
                    {{ element }}
                  </div>
                </div>
                <div
                    v-for="(element, index) in videoStream_2" :key="index"
                    draggable="true"
                    class="secondary_frame"
                    :id="'secondary_frame_' + (index + 5)"
                    :ref="'secondary_frame_' + (index + 5)"
                    @dragstart="ondragstart($event, 'secondary_frame_' + (index + 5), videoStream_2[index].path)"
                    @dragenter="ondragenter($event)"
                    @dragover="ondragover($event)"
                    @dragleave="ondragleave($event)"
                    @drop="ondrop($event, item)"
                >
                  {{ element }}
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </div>
    <div>
      <el-button
          v-draggable
          ref="dragBtn"
          type="success"
          @mousedown="handleMouseDown"
          @mouseup="handleMouseUp"
          style="z-index: 200"
      >拖动我
      </el-button>
      <div class="target-area">目标区域</div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref, reactive, toRefs} from "vue";
import {vDraggable} from '@neodrag/vue';

const tableRef = ref(null)
const tree1 = ref(null)
const dragBtn = reactive({
  data: "我被拖动到目标区域内",
})

const state = reactive({
  data: [
    {
      id: 1,
      label: "一级 1",
      children: [
        {
          id: 4,
          label: "二级 1-1",
          path: "test://111.222.333.444:8000",
          children: [{id: 9, label: "三级 1-1-1", path: "test://111.222.333.444:8000", children: []}]
        },
        {
          id: 6,
          label: "二级 1-1",
          path: "test://111.222.333.444:8000",
          children: []
        }
      ],
    },
    {
      id: 2,
      label: "一级 1",
      path: "test://111.222.333.444:8000",
      children: [
        {
          id: 5,
          label: "二级 1-1",
          children: [{id: 11, label: "三级 1-1-1", path: "test://111.222.333.444:8000", children: []}]
        }
      ],
    }],
  videoStream: [
    {
      id: 0,
      path: '',
    },
    {
      id: 1,
      path: '',
    },
    {
      id: 2,
      path: '',
    },
    {
      id: 3,
      path: '',
    },
    {
      id: 4,
      path: '',
    },
    {
      id: 5,
      path: '',
    },
    {
      id: 6,
      path: '',
    },
    {
      id: 7,
      path: '',
    },
    {
      id: 8,
      path: '',
    },
    {
      id: 9,
      path: '',
    },
    {
      id: 10,
      path: '',
    },
    {
      id: 11,
      path: '',
    },
    {
      id: 12,
      path: '',
    },
  ],
  videoStream_1: [],
  videoStream_2: [],
  currentId: '',
  item: '',

  // 鼠标松开时的坐标
  mouseUpPosition: {
    x: 0,
    y: 0
  },
})
const {
  data,
  videoStream,
  videoStream_1,
  videoStream_2,
  currentId,
  item,
  mouseUpPosition,
} = toRefs(state)


// 树状结构 开始拖动事件
function handleDragstart(node, event) {
  if (node.data.path) {
    state.item = node.data.path;
  }
}

// 树状结构 结束拖动事件
function handleDragend(draggingNode, endNode, position, event) {
  // const $data = tree1.value
  // // 插入一个空节点用于占位
  // let emptyData = {id: (+new Date), children: []};
  // $data.insertBefore(emptyData, draggingNode);
  // $nextTick(() => {
  //   // 如果是移动到了当前树上，需要清掉空节点
  //   if ($data.getNode(draggingNode.data)) {
  //     console.log('清空节点');
  //     $data.remove(emptyData);
  //   }
  // })
}

// 允许拖动
function returnTrue() {
  return true;
}

// 不允许拖动
function returnFalse() {
  return false;
}

// dom开始拖动事件
function ondragstart(e, tagId, path) {
  let id = parseInt(tagId.split('_')[2])
  state.currentId = id
}

// 鼠标进入当前dom
function ondragenter(e) {
  e = e || event;
  if (e.preventDefault) {
    e.preventDefault();
  } else {
    e.returnValue = false;
  }
  console.log('元素进入');
}

// 鼠标在当前dom中移动
function ondragover(e) {
  e = e || event;
  if (e.preventDefault) {
    e.preventDefault();
  } else {
    e.returnValue = false;
  }
  console.log('元素移动');
}

// 鼠标离开当前区域
function ondragleave() {
  console.log('元素离开目标区域');
}

// 鼠标落下
function ondrop(e, item) {
  let index = e.target.id.split('_')[2]
  let currentRef = e.target.ref
  if (!index) {
    // state.getVideo(state.$refs.currentRef, item)
    state.videoStream[0].path = item
  } else {
    // state.getVideo(state.$refs.currentRef, item)
    state.videoStream[index].path = item
  }
  if (state.currentId !== '') {
    if (state.currentId === 0) {
      state.videoStream[0].path = ''
    } else if (state.currentId > 0 && state.currentId < 5) {
      state.videoStream_1[state.currentId - 1].path = ''
    } else {
      state.videoStream_2[state.currentId - 5].path = ''
    }
    state.currentId = ''
  }
  console.log('元素落在目标区域');
}

/**
 * 按钮上的鼠标按下事件
 * @param e
 */
function handleMouseDown(e) {
  e = e || event;
  if (e.preventDefault) {
    // 阻止默认浏览器动作(W3C)
    e.preventDefault();
    // 显示鼠标按下的位置
    console.log('鼠标按下：', e.clientX, e.clientY);
  } else {
    e.returnValue = false;
  }
}

/**
 * 按钮上的鼠标松开事件
 */
function handleMouseUp(e) {
  e = e || event;
  if (e.preventDefault) {
    // 阻止默认浏览器动作(W3C)
    e.preventDefault();
    // 显示鼠标松开的位置
    console.log('鼠标松开：', e.clientX, e.clientY);
    state.mouseUpPosition.x = e.clientX;
    state.mouseUpPosition.y = e.clientY;
    if (isMouseUpInRect('target-area')) {
      console.log('鼠标松开在目标区域内');
    } else {
      console.log('鼠标松开在目标区域外');
    }
  } else {
    e.returnValue = false;
  }
}

/**
 * 获取指定元素的坐标范围
 * @param elClassName
 */
function getRect(elClassName) {
  let rect = document.getElementsByClassName(elClassName)[0].getBoundingClientRect();
  const axis = {
    left: rect.left + document.body.scrollLeft,
    top: rect.top + document.body.scrollTop,
    width: rect.width,
    height: rect.height
  };
  console.log('元素坐标范围：', axis);
  return axis;
}

/**
 * 判断鼠标松开的位置是否在指定元素的坐标范围内
 */
function isMouseUpInRect(elClassName) {
  let axis = getRect(elClassName);
  let x = state.mouseUpPosition.x;
  let y = state.mouseUpPosition.y;
  if (x >= axis.left && x <= axis.left + axis.width && y >= axis.top && y <= axis.top + axis.height) {
    return true;
  } else {
    return false;
  }
}


onMounted(() => {
  if (state.videoStream.length > 2) {
    if (state.videoStream.length > 5) {
      for (let i = 1; i < 5; i++) {
        state.videoStream_1.push(state.videoStream[i])
      }
      for (let i = 5; i < state.videoStream.length; i++) {
        state.videoStream_2.push(state.videoStream[i])
      }
    } else {
      for (let i = 1; i < state.videoStream.length; i++) {
        state.videoStream_1.push(state.videoStream[i])
      }
    }
  }
})

</script>

<style scoped lang="scss">

/* 框架样式 */
.main {
  width: 97%;
  margin: 10px;

  .content-siadeNav {
    background-color: #fdfdfd;
    height: 83vh;

    .title {
      padding: 10px;
      background-color: #FAFAFA;
    }
  }

  .content {
    background-color: #fdfdfd;
    height: 83vh;
  }
}

.tree {
  display: inline-block;
  vertical-align: top;
  width: 30%;
  height: 400px;
  border: 1px solid #999;
}

/*定义要拖拽元素的样式*/
#frame_13 {
  width: 1280px;
  display: flex;
  flex-wrap: wrap;
  margin: 0 40px;
  padding-top: 5px;

  .main_frame {
    display: block;
    background-color: aqua;
    width: 640px;
    height: 360px;
  }

  .secondary_frame_right {
    display: flex;
    flex-wrap: wrap;
    width: 640px;
    height: 360px;
  }

  .secondary_frame {
    display: block;
    background-color: rgb(138, 135, 135);
    width: 320px;
    height: 180px;
  }
}

.target-area {
  width: 500px;
  height: 300px;
  border: 1px solid #999;
  background-color: #f1fff5;
  float: right;
}
</style>