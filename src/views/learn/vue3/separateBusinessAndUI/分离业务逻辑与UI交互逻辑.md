# 一，为什么要进行业务逻辑与UI交互逻辑的分离

我们谈分层，大多是在这类有比较复杂的业务逻辑的系统中去谈👍。
这类系统可能在具体界面的呈现上实现起来并不复杂，甚至没有什么交互上的难度。
但是，这类系统中的前端开发者们，常常还是很抓狂，因为一个逻辑可能被折腾死，
最后一定会思考，**😮我们如何才能合理地区分哪些代码是业务的，哪些代码是交互的，应该如何组织代码才能高效的解决自己遇到的烦恼？
**

到目前为止的境况是，前端在开发一个业务的时候：

1. 从界面出发，看着界面想我这里要怎么做怎么做;
2. 等把界面交互大致写出来之后，再把产品文档里面的业务逻辑作为一些判断条件加入到写好的交互代码中;
3. 完成功能测试后，最终交付。

举个例子——计算商品总价：

```vue

<template>
  <el-form
      :model="form"
      :rules="rules"
      label-width="120px"
      v-loading="loading"
      element-loading-text="正在处理..."
  >
    <el-form-item label="单价" prop="price">
      <el-input v-model="form.price" style="width: 200px" @input="handleChangePrice"/>
    </el-form-item>
    <el-form-item label="数量" prop="count">
      <el-input v-model="form.count" style="width: 200px" @input="handleChangeCount"/>
    </el-form-item>
    <el-form-item v-if="save">
      <span>可优惠10%</span>
    </el-form-item>
    <el-form-item v-if="save" label="优惠码" prop="code">
      <el-input v-model="form.code" @change="handleChangeCode" style="width: 200px"/>
      <el-button type="primary" @click="handleCheckCode">查询</el-button>
      <span v-if="codeChecked">优惠码有效</span>
    </el-form-item>
    <el-form-item label="总价" v-if="total > 0">
      <span>{{ total }}</span>
    </el-form-item>
  </el-form>
  <el-button type="primary" @click="handleSubmit">提交</el-button>
</template>

<script setup>
import {computed, reactive, ref} from "vue";

const loading = ref(false)
const codeChecked = ref(false)
const form = reactive({
  price: null,
  count: null,
  total: null,
  code: ''
})
const rules = {
  price: [
    {required: true, message: '请输入单价', trigger: 'blur'},
    // 正数
    {pattern: /^\d+(\.\d+)?$/, message: '请输入正数', trigger: 'blur'}
  ],
  count: [
    {required: true, message: '请输入数量', trigger: 'blur'},
    // 正整数
    {pattern: /^[1-9]\d*$/, message: '请输入正整数', trigger: 'blur'}
  ]
}

// 是否有折扣：满100减10
const save = computed(() => {
  return form.price * form.count > 100 ? 10 : 0
})

// 计算总价
const total = computed(() => {
  let t = Number(form.price) * Number(form.count) * (codeChecked.value ? (1 - save.value / 100) : 1)
  form.total = t
  console.log('总价', t)
  return t
})

const handleChangePrice = () => {
  form.total = total.value
}

const handleChangeCount = () => {
  form.total = total.value
}

const handleChangeCode = () => {
  codeChecked.value = false
}

const handleCheckCode = () => {
  codeChecked.value = true
}

const handleSubmit = () => {
  loading.value = true

  const {price, count, code} = form
  const requestData = {price, count}
  if (codeChecked) {
    requestData.code = code
  }

  setTimeout(() => {
    console.log(requestData)
    loading.value = false
  }, 1000)
}
</script>

<style scoped>

</style>
```

也就简简单单几个字段，就让代码开始有点点混乱了，要搞清楚每一个字段与其他字段之间的关联，你需要通读整个组件的代码。
而随着业务的越来越积累，这个看似简单的组件，会慢慢撑开，字段从这几个慢慢撑到10多个，甚至20、30多个，字段与字段之间的关联性，以及每一个字段和它的提示语在什么情况下才展示出来，等等，越来越复杂。
当这个业务持续增长超过 1 年后，你发现这个**组件已经满目全非，根本不敢改一行代码，因为你怕一改就影响整个业务！**

😰是什么东西，冥冥中让我们的代码走向不可维护呢？！

一个重要原因在于：**我们的代码同时承载了业务的逻辑和界面的交互逻辑！**

1. 比如上面的 codeChecked 对于整个业务而言，是非必需的，但是对于交互而言是必须的，你必须用一个状态去控制提示语是不是要展示出来。因此，用于完成业务目标的price,
   count, code，和用于完成交互任务的codeChecked被放在一起管理。
2. 在 handleSubmit 中，用于交互的 codeChecked 却成为了控制code字段是否提交的开关，这直接让业务逻辑和交互逻辑耦合在一起，在未来的开发中，你不可能把这两部分解耦开，因为这个逻辑写死了。
3. ...

**正因为这种线性的开发思维，让我们写的组件随着业务的扩展，越来越难以高效的维护，直到最后不敢修改一行。**
就像无论你的耳机线材质多有韧性，只要直接塞在裤兜里，一定会打结。
那么怎么避免呢？
就像避免耳机线打结一样，我们需要用一个耳机线盒把规整的线圈管理起来，有了盒子的约束和隔离，耳机线打结的几率微乎其微。
同样的道理，我们**需要对我们的代码重新进行管理，让原本线性的逻辑表达，按照一定的结构重新梳理，并把这些结构用合理的文件结构进行框定
**，从而做到不打结。

# 二，用什么方式进行分离

解决代码逻辑打结的第一个杀手锏是**领域建模**。

领域建模是指，我们先抛开软件的界面、实现逻辑、运行环境等应用层面的东西，转换自己的角色，把自己当作一个业务人员，问自己我用这套系统要完成什么业务目的，梳理出业务流程，指明不同角色在业务流程中的责任，画出业务的示意图，并最终用代码把它表达出来。

DD提供的沟通方法论，在开始编码之前，建立领域模型。
领域模型包含两个部分：

- 一部分叫统一语言，在你的业务部门里任何人都能看的懂。
- 一部分是与图纸等效的建模代码，这部分代码是你的领域模型的代码表达。

这个过程主要设计3类对象：

- 一类是描述业务的实体对象，是业务所围绕的核心概念，你的公司所做的业务，本质上就是在创建和处理这些对象。
- 一类是描述工作流程的服务对象，它们主要是对实体对象的处理过程、逻辑、事件，是使得业务产生实际效果的非实体对象。
- 一类是用于辅助完成编程任务的程序对象，用以解决在特定编程语言下面，怎么让你的业务的部分能够反馈到计算机系统中，用计算机系统的方式运行起来。

进行领域建模，主要针对第一类和第二类。

从实现方面来说，面向对象是DDD的核心方法，我们在具体编程时，通过创建和关联各种class完成模型。

## （一）定义领域模型

根据上面的思想，我们可以定义一个领域模型：

```js
class Order {
    price = 0
    count = 0
    code = ''
    total = 0
}
```

这种简单的抽象就是所谓的贫血模型，它只能告诉你有什么。

但实际上，前端面对的问题就在于，我们的代码同时承载了业务的逻辑和界面的交互逻辑！
这就需要对这个模型的定义进行一定的扩展，来为前端的交互留足空间，可以这样：
```javascript
import { Model, meta, state, Int, Validator } from 'tyshemo'

class Order extends Model {
  @meta({
    type: Number,
    label: '单价',
    required: true,
    validators: [
      Validator.required('单价必填'),
    ],
  })
  price = 0

  @meta({
    type: Int,
    label: '数量',
    required: true,
    validators: [
      Validator.required('数量必填'),
    ],
  })
  count = 0

  @meta({
    type: String,
    label: '优惠码',
    checked: false,
    checking: false,
    watch() {
      const view = this.use('code')
      view.checked = false
      view.checking = true
      ajax.post('...', this.code).then(res => {
        view.checked = !!res
      }).finally(() => {
        view.checking = false
      })
    },
    drop() {
      return this.use('code').checked
    },
    // validators: [
    //   determine(code) {
    //     return !!code && !this.use('code').checking = false
    //   },
    //   validate() {
    //     return this.use('code').checked
    //   },
    //   message: '优惠码无效',
    // ],
  })
  code = ''

  @meta({
    type: Number,
    label: '总额',
    compute() {
      const {save} = this.use('total')
      const {checked} = this.use('code')
      return this.price * this.count * (1 - save) * (checked ? 0.9 : 1)
    },
    save() {
      return this.price * this.count > 100 ? 10 : 0
    },
    saveMessage() {
      return this.save ? '折扣10%' : ''
    },
    disabled: true,
    drop: true, // 由后台计算，这个字段仅前端展示，不提交
  })
  total = 0
}
```

这个模型完整地描述了对应业务实体的所有字段，以及每个字的的具体业务阐释，因为基于这一模型设计，我们可以从meta信息中，阅读每一个字段关于自己的全部逻辑。
这种设计的思路很清晰，就是字段本身的逻辑应该放在字段的旁边，集合在一起，阅读关于字段本身的业务逻辑，只需要关注这一处代码（必要的时候，需要阅读整个模型的相关方法，找出多个字段有关联逻辑的业务），而不需要跨多个上下文去理解。
阅读这段代码，你不仅能理解代码本身的意思，而且还能掌握业务的知识。


到目前为止，我们只关心业务，不关心界面和交互。

## （二）领域服务
领域模型帮我们描绘了有关这个业务的核心对象的各种逻辑。
但是，我们的这个业务实体会面对很多场景，每一个场景下，可能存在有些特定的转化逻辑，这就需要我们在领域模型的基础上，提供对应场景的服务。







# 参考

- [前端分层：把业务逻辑从交互代码中解救出来](https://cloud.tencent.com/developer/article/1915979)
- [Vue3下业务逻辑分离 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/558632274)
- [【工作小记】关于业务组件的思考](https://juejin.cn/post/7046263753213968421)
- [前端开发中业务代码和视图分离的思考](https://juejin.cn/post/6914222524700196872)
- [谈谈react hooks UI与业务逻辑分离的必要性与技术方案](https://segmentfault.com/a/1190000042779477)
- [Service - 业务与 UI 分离](https://nosaid.com/article/service-separate-logic-ui#%E4%B8%9A%E5%8A%A1%E4%B8%8E%20UI%20%E5%88%86%E7%A6%BB)




