测试代码是确保代码稳定的第一步。能做到这一点的最佳方法之一就是使用单元测试，确保应用程序中的每个较小的功能都按应有的方式运行——尤其是当应用程序接收到极端或无效输入，甚至可能有害的输入时。
# 一，为什么要进行单元测试？
进行单元测试有许多不同的方法，一些主要目的是： 
- 验证功能：单元测试确保代码做正确的事情并且不做任何不应该做的事情——大多数错误发生在这里。 
- 防止代码回归：当我们发现错误时，添加单元测试来检查场景可以防止代码更改在将来重新引入错误。 
- 记录代码：通过正确的单元测试，一套完整的测试和结果提供了应用程序应该如何工作的规范。 
- 保护您的应用程序：单元测试可以检查可利用的漏洞（例如启用恶意 SQL 注入的漏洞）。


# 二，使用 vitesse 进行单元测试
## (一)快速开始
### 1.安装依赖
```shell
npm install -D vitest
```
### 2.创建测试文件
在项目根目录创建 test 目录，然后在 test 目录下创建 sum.js 和 sum.test.js 文件。
```javascript
// util.js
export function sum(a, b) {
  return a + b
}
```
```javascript
// util.test.js
import { expect, test } from 'vitest'
import { sum } from './sum'

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3)
})
```
解释一下：
1，sum.js 是我们要测试的文件，里面有一个 sum 函数，接收两个参数，返回两个参数的和。
2，sum.test.js 是我们的测试文件，里面有一个测试用例，测试 sum 函数是否能正确返回两个参数的和。
3，[test 方法](https://cn.vitest.dev/api/#test)是用于定义测试用例的函数，名称固定为 test，它至少接受两个参数，第一个参数是测试用例的名称，第二个参数是一个函数，函数里面写测试用例的代码。
4，expect方法是用于创建断言的函数——断言是一种用于验证代码的行为和输出是否符合预期的方式。基本语法如下：
`expect(actual).matcher(expected)`
- actual：是一个表达式或变量，表示要检查的实际值。
- matcher 是一个函数，表示要使用的比较方法。
- expected 是一个值或对象，表示期望的结果。
在本例中，expect(sum(1, 2)).toBe(3)表示使用expect方法来测试sum函数是否能正确地将两个数字相加。此处使用 toBe来进行断言，这是Vitest提供的一个匹配器函数，用于比较实际值和期望值是否严格相等。


### 3.添加测试脚本
```json
// package.json
{
  "scripts": {
    "test": "vitest"
  }
}
```
### 4.运行测试
```shell
npm run test
```
执行完毕后，会在控制台输出测试结果。
```shell
D:\DFL\SOFTWARES\node\npm.cmd test

> system-admin@0.0.0 test
> vitest


 DEV  v0.31.0 D:/DFL/PROJECTS/openresource/DDBAdmin/DDBAdminFrontend

 Test Files  2 passed (2)
      Tests  2 passed (2)
   Start at  09:22:32
   Duration  1.48s (transform 41ms, setup 0ms, collect 44ms, tests 6ms, environment 1.52s, prepare 545ms)


 PASS  Waiting for file changes...
       press h to show help, press q to quit
```
解释一下：
1，Test Files 表示测试文件的数量，Test Tests 表示测试用例的数量。


## （二）vitest 的配置
由于vitest是和vite可以结合的，所以这部分配置可以直接写到vite的config里面。
- 前提是要在vite.config.ts 顶部加入三斜线命令` /// <reference types="vitest" />`




# 参考
- [Web 前端单元测试到底要怎么写？看这一篇就够了](https://segmentfault.com/a/1190000015935519)
- 
