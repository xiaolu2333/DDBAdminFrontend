# 一，json-server 的安装、配置与使用

## 1，创建项目目录

创建目录 MyJsonServer

## 2，安装 json server

进入项目目录，执行 `npm init`。
再执行 `npm install json-server`

## 3，创建数据文件

在项目根目录下创建 db.json 文件：

```json
{
  "posts": [
    {
      "id": 1,
      "title": "json测试",
      "body": "json测试",
      "author": "苏苏"
    },
    {
      "id": 2,
      "title": "json测试",
      "body": "json测试",
      "author": "小翎儿"
    }
  ],
  "comments": [
    {
      "id": 1,
      "name": "测试json",
      "email": "test@test.com",
      "body": "测试json"
    },
    {
      "id": 2,
      "name": "测试json",
      "email": "test@test.com",
      "body": "测试json"
    }
  ],
  "profile": {
    "name": "测试json"
  }
}
```

## 启动 json server

在项目根目录下执行 `json-server --watch db.json` 启动服务器。

注意，此时可能遇到报错 “json-server不是内部或外部命令，也不是可运行的程序或批处理文件”：

1. 执行 `npm config ls`，找到输出的第一个 “prefix” 指定的目录。
2. 将该目录路径添加到 Path 环境变量中。
3. 重启计算机，再启动 json server

```bash
$  json-server --watch  db.json
--watch/-w can be omitted, JSON Server 1+ watches for file changes by default
JSON Server started on PORT :3000
Press CTRL-C to stop             
Watching db.json...              
                                 
(˶ᵔ ᵕ ᵔ˶)                        

Index:
http://localhost:3000/

Static files:
Serving ./public directory if it exists

Endpoints:
http://localhost:3000/posts
http://localhost:3000/comments
http://localhost:3000/profile
```

示例：
http://localhost:3000/posts

```json
[
  {
    "id": 1,
    "title": "json测试",
    "body": "json测试",
    "author": "苏苏"
  },
  {
    "id": 2,
    "title": "json测试",
    "body": "json测试",
    "author": "小翎儿"
  }
]
```

示例： http://localhost:3000/posts?id=1

```json
[
  {
    "id": 1,
    "title": "json测试",
    "body": "json测试",
    "author": "苏苏"
  }
]
```

# 二，基础配置

可执行 json-server --help 查看所有配置项

## 1，配置端口号

`json-server -p 6666 db.json`

## 2，配置 host

`json-server --host 0.0.0.0 db.json`

- 这里设置了 0.0.0.0 ，之后通过本机 IP 来访问即可。同一个局域网内的其他设备也可以通过这个地址来访问。

# 三，CRUD

使用API调试工具或前端接口访问。这里以axios为例。

安装 axios：
`npm install axios`
在根目录创建 apiTest.js 文件：

```javascript
import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
});
```

## 1，R——GET方法
```javascript
instance.get('/posts')
    .then(response => {
        console.log('response.data:', response.data);
    })
    .catch(error => {
        console.log(error);
    });
```
打印获取的数据

## 2，C——POST方法
```javascript
instance.post(
    '/posts',
    {
        id: 3,
        name: "测试json3",
        email: "test3@test.com",
        body: "测试json3"
    }
)
    .then(response => {
        console.log('response.data:', response.data);
    })
    .catch(error => {
        console.log(error);
    });
```
打印新增的数据

## 3，U——PUT
```javascript

```


## 4，D——DELETE

# X，引用

[json-server从入门开始](https://juejin.cn/post/7288501749530968124)
[『前端必备』本地数据接口 —— json-server 从入门到膨胀](https://juejin.cn/post/7043424909472563208#heading-0)