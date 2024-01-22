# 一，不同的数据状态类型


当构建前端应用时，我们常常需要复用公共任务的逻辑。
例如为了在不同地方格式化时间，我们可能会抽取一个可复用的日期格式化函数。
这个函数封装了**无状态的逻辑**：它在接收一些输入后立刻返回所期望的输出。


有状态逻辑负责管理会随时间而变化的状态。
一个简单的例子是跟踪当前鼠标在页面中的位置，在实际应用中，也可能是像触摸手势或与数据库的连接状态这样的更复杂的逻辑。


# 二，抽象 utils 函数
我们可以直接在组件中定义一个 utils 函数来实现鼠标位置的监听：
```vue
<template>Mouse position is at: {{ x }}, {{ y }}</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const x = ref(0)
const y = ref(0)

function update(event) {
  x.value = event.pageX
  y.value = event.pageY
}

onMounted(() => window.addEventListener('mousemove', update))
onUnmounted(() => window.removeEventListener('mousemove', update))
</script>
```
这个组件的逻辑很简单，但是它有一个问题：它是**紧密耦合**的。
如果我们想在另一个组件中使用相同的逻辑，我们需要复制粘贴这些代码。


# 三，什么是组合式函数

vue3中的**组合式函数**是一中利用 Vue 的组合式 API 来封装和复用**有状态逻辑**的函数。
- 与 react 中 hooks 概念类似

比如，如果我们需要在多个页面获取鼠标位置信息，我们可以封装一个自定义hooks:
```js
import { ref, onMounted, onUnmounted } from 'vue'

export default function useMousePosition() {
  const x = ref(0)
  const y = ref(0)

  const updateMouse = (e: MouseEvent) => {
    x.value = e.pageX
    y.value = e.pageY
  }

  onMounted(() => {
    window.addEventListener('mousemove', updateMouse)
  })

  onUnmounted(() => {
    window.removeEventListener('mousemove', updateMouse)
  })

  return {
    x,
    y,
  }
}
```
在其中我们使用了 Vue 的组合式 API：
- 首先用`ref`定义了两个响应式数据`x`和`y`。
- 然后在`onMounted`钩子中添加了监听鼠标移动事件的函数，当鼠标移动时，更新`x`和`y`的值。
- 最后在`onUnmounted`钩子中移除了监听事件的函数。

然后在需要的组件中这样使用：
```vue
<template>
  <el-card>
    <p>多组件中复用鼠标追踪器</p>
    <p>当前鼠标位置：({{ x }}, {{ y }})</p>
  </el-card>
</template>

<script setup>
import {useEventListener} from '@/hooks/mouse.js'

const {x, y} = useEventListener()
</script>
```
- 使用时，直接通过解构赋值来从这个组合式函数暴露出的状态中获取我们需要的数据即可。

总之，组合式函数与上面的 utils 函数的核心逻辑完全一致，我们做的只是把这个核心逻辑移到一个外部函数中去，并返回需要暴露的状态。

组合式函数的优势就是一个组合式函数可以调用一个或多个其他的组合式函数。
这使得我们**可以像使用多个组件组合成整个应用一样，用多个较小且逻辑独立的单元来组合形成复杂的逻辑**——这就是这种设计被命名为组合式函数的原因。

例如，将上面的`useMousePosition`组合式函数继续拆分：
```javascript
// event.js
import { onMounted, onUnmounted } from 'vue'

export function useEventListener(target, event, callback) {
  // 如果你想的话，也可以用字符串形式的 CSS 选择器来寻找目标 DOM 元素
  onMounted(() => target.addEventListener(event, callback))
  onUnmounted(() => target.removeEventListener(event, callback))
}
```
然后，之前的 useMouse() 组合式函数可以被简化为：
```javascript
// mouse.js
import { ref } from 'vue'
import { useEventListener } from './event'

export function useMouse() {
  const x = ref(0)
  const y = ref(0)

  useEventListener(window, 'mousemove', (event) => {
    x.value = event.pageX
    y.value = event.pageY
  })

  return { x, y }
}
```

# 四，约定和最佳实践
## 1，组合式函数的命名
组合式函数的命名应该以`use`开头，这是一个约定俗成的规范。

赢按照它们所提供的功能来命名，例如`useMouse`、`useWindowSize`、`useToggle`等等。

并按照具体功能划分放入不同的功能文件中，例如：
- 将 `useProgress`、`usePageLoading` 等与页面加载相关的组合式函数放入 `useLoading.js` 文件中。
- 将 `useVlidate`、`useDebounce` 等与表单验证相关的组合式函数放入 `useForm.js` 文件中。

最后将所有的文件统一放入根目录的 `hooks` 文件夹中。

## 2，组合式函数的参数
组合式函数可以像普通函数一样接收参数，这些参数应该尽可能地简单，这样它们就可以更容易地被复用。

特别要注意的是，如果传入的参数是响应式的，且创建了响应式副作用，那么就需要


## 3，组合式函数的返回值
在组合式函数中使用 `ref()` 而不是 `reactive()`。
且始终返回一个包含多个 ref 的普通的非响应式对象，这样该对象在组件中被解构为 ref 之后仍可以保持响应性。

如果你更希望以对象属性的形式来使用组合式函数中返回的状态，你可以将返回的对象用 `reactive()` 包装一次.
这样其中的 ref 会被自动解包，例如：
```javascript
const mouse = reactive(useMouse())
// mouse.x 链接到了原来的 x ref
console.log(mouse.x)
```
```vue
<template>
  <p>Mouse position is at: {{ mouse.x }}, {{ mouse.y }}</p>
</template>
```










