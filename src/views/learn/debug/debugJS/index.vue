<template>
  <el-row>
    <el-col :span="16">
      <el-scrollbar height="90vh">
        <el-card>
          <template #header>
            <span>调试JS</span>
            <el-button @click="handleHelper" style="margin-left: 50px">获取帮助</el-button>
          </template>
          <p>
            <span>1. 打开“编辑配置”</span><br>
            <img src="./static/EditTheConfiguration.png" alt="打开“编辑配置”"/>
          </p>
          <p>
            <span>2. 添加JavaScript调试器</span><br>
            <img src="./static/AddJavascriptDebugger.png" alt="添加JavaScript调试器"/>
          </p>
          <p>
            <span>3. 添加调试器信息</span><br>
            <img src="./static/EditDebuggerInfo.png" alt="添加调试器信息"/>
          </p>
          <p>
            <span>4. 给代码打断点</span><br>
            <img src="./static/pointCode.png" alt="给代码打断点"/>
          </p>
          <p>
            <span>5. 开启调试模式</span><br>
            <img src="./static/debug.png" alt="开启调试模式"/>
          </p>
          <p>
            <span>6. 执行被调试代码（访问http://localhost:5173/#/learning/debug/debugJS）</span><br>
            <img src="./static/excuteCode.png" alt="执行被调试代码"/>
          </p>
          <p>
            <span>7. 执行调试操作</span><br>
            <img src="./static/excuteDebugStep.png" alt="执行调试操作"/>
          </p>
        </el-card>
      </el-scrollbar>
    </el-col>
    <el-col :span="8">
      <el-card>
        <el-button type="primary" @click="handleDebugClick">执行断点代码</el-button>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup>

/*
  获取帮助
 */
function handleHelper() {
  window.location = 'https://zhuanlan.zhihu.com/p/354523373#:~:text=%E8%B0%83%E8%AF%95%E7%9B%B8%E5%85%B3%E7%9A%84%E5%BF%AB%E6%8D%B7%E9%94%AE%201%20%E2%87%A7%20%2B%20F9%EF%BC%9A%E8%B0%83%E8%AF%95%E5%BD%93%E5%89%8D%E6%96%87%E4%BB%B6%202%20%E2%8C%A5%20%2B,F8%EF%BC%9A%E8%B7%B3%E5%87%BA%E5%87%BD%E6%95%B0%E4%BD%93%207%20F9%EF%BC%9A%E8%BF%90%E8%A1%8C%E5%88%B0%E4%B8%8B%E4%B8%80%E6%96%AD%E7%82%B9%208%20%E2%8C%A5%20%2B%20F9%EF%BC%9A%E8%BF%90%E8%A1%8C%E5%88%B0%E5%85%89%E6%A0%87%E5%A4%84%20%E6%9B%B4%E5%A4%9A%E9%A1%B9%E7%9B%AE'
}

/*
  进入断点代码
 */
function handleDebugClick() {
  // 示例用法：
  const unsortedArray = [5, 3, 1, 6, 4, 2];
  const sortedArray = quickSort(unsortedArray);
  console.log(sortedArray); // 输出：[1, 2, 3, 4, 5, 6]
}


/************************ utils ************************/
function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  const pivot = arr[arr.length - 1];
  const left = [];
  const right = [];

  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  return [...quickSort(left), pivot, ...quickSort(right)];
}
</script>

<style scoped>

</style>