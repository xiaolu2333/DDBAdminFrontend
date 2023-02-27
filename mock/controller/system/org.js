/* jshint esversion: 6 */

import Mock from 'mockjs';

let orgList = [
  {
    id: 1,
    name: '机构1',
    code: 'JG1',
    status: 1,
    desc: "1111111111"
  },
  {
    id: 2,
    name: '机构2',
    code: 'JG2',
    status: 1,
    desc: "1111111111"
  },
  {
    id: 3,
    name: '机构3',
    code: 'JG3',
    status: 0,
    desc: "1111111111"
  },
  {
    id: 4,
    name: '机构4',
    code: 'JG4',
    status: 1,
    desc: "1111111111"
  },
  {
    id: 5,
    name: '机构5',
    code: 'JG5',
    status: 0,
    desc: "1111111111"
  },
  {
    id: 6,
    name: '机构6',
    code: 'JG6',
    status: 1,
    desc: "1111111111"
  },
  {
    id: 7,
    name: '机构7',
    code: 'JG7',
    status: 0,
    desc: "1111111111"
  },
  {
    id: 8,
    name: '机构8',
    code: 'JG8',
    status: 1,
    desc: "1111111111"
  },
  {
    id: 9,
    name: '机构9',
    code: 'JG9',
    status: 0,
    desc: "1111111111"
  },
  {
    id: 10,
    name: '机构10',
    code: 'JG10',
    status: 0,
    desc: "1111111111"
  }
];

// /*
//  * 模拟后端列表请求接口
//  * version: 1
//  */
// Mock.mock('/org/list', 'get', {
//   code: 200,
//   datalist: orgList
// });

/*
 * 模拟后端列表请求接口
 * version: 2
 */
Mock.mock('/org/list', 'post', (options) => {
  "use strict";
  // console.log("打印请求相关信息：", options);
  // 使用JSON.parse(options.body)将请求体解析为一个对象
  const requestBody = JSON.parse(options.body);
  // console.log("post 请求体：", requestBody);

  const hasName = requestBody.hasOwnProperty('name');
  const hasStatus = requestBody.hasOwnProperty('status');
  const bothExist = hasName && hasStatus;
  const onlyHasName = hasName && !hasStatus;
  const onlyHasStatus = !hasName && hasStatus;
  const bothNotExist = !hasName && !hasStatus;
  if (bothNotExist) {
    // console.log("name和status都没有");
    return {
      code: 200,
      data: {
        datalist: orgList,
      },
    };
  } else if (onlyHasName) {
    // console.log("只有name");
    return {
      code: 200,
      data: {
        datalist: orgList.filter(org => org.name === requestBody.name)
      },
    };
  } else if (onlyHasStatus) {
    // console.log("只有status");
    return {
      code: 200,
      data: {
        datalist: orgList.filter(org => org.status === requestBody.status)
      },
    };
  } else if (bothExist) {
    // console.log("既有name又有status");
    return {
      code: 200,
      data: {
        datalist: orgList.filter(org => org.name === requestBody.name && org.status === requestBody.status)
      },
    };
  }
});

Mock.mock('/org/list', 'get', (options) => {
  "use strict";
  // console.log("打印请求相关信息：", options);
  // // 使用JSON.parse(options.params)将查询参数解析为一个对象
  // const requestBody = JSON.parse(options.params);
  // console.log("get 查询参数：", requestBody);
  // 使用JSON.parse(options.body)将查询参数解析为一个对象
  const requestBody = JSON.parse(options.body);
  // console.log("get 请求体：", requestBody);

  return {
    code: 200,
    data: {
      datalist: orgList,
    },
  };
});