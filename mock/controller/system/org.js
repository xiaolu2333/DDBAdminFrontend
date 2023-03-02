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

let list = [
  {
    id: 1,
    name: '机构1',
    code: 'JG1',
    status: 0,
    desc: "1111111111",
    parentId: "root",
    children: [
      {
        id: 2,
        name: '机构2',
        code: 'JG2',
        status: 1,
        desc: "1111111111",
        parentId: 1,
        children: [
          {
            id: 3,
            name: '机构3',
            code: 'JG3',
            status: 0,
            desc: "1111111111",
            parentId: 2,
            children: [
              {
                id: 4,
                name: '机构4',
                code: 'JG4',
                status: 1,
                desc: "1111111111",
                parentId: 3,
                children: []
              },
              {
                id: 5,
                name: '机构5',
                code: 'JG5',
                status: 0,
                desc: "1111111111",
                parentId: 3,
                children: []
              }
            ]
          },
          {
            id: 6,
            name: '机构6',
            code: 'JG6',
            status: 1,
            desc: "1111111111",
            parentId: 2,
            children: []
          }
        ]
      },
      {
        id: 7,
        name: '机构7',
        code: 'JG7',
        status: 0,
        desc: "1111111111",
        parentId: 1,
        children: [
          {
            id: 8,
            name: '机构8',
            code: 'JG8',
            status: 1,
            desc: "1111111111",
            parentId: 7,
            children: []
          }
        ]
      }
    ]
  },
  {
    id: 9,
    name: '机构9',
    code: 'JG9',
    status: 0,
    desc: "1111111111",
    parentId: "root",
    children: [
      {
        id: 10,
        name: '机构10',
        code: 'JG10',
        status: 1,
        desc: "1111111111",
        parentId: 9,
        children: []
      }
    ]
  },
  {
    id: 11,
    name: '机构11',
    code: 'JG11',
    status: 1,
    desc: "1111111111",
    parentId: "root",
    children: []
  },
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

Mock.mock('/org/tree', 'post', (options) => {
  "use strict";

  return {
    code: 200,
    data: list,
  };
});

Mock.mock('/org/save', 'post', (options) => {
  const requestBody = JSON.parse(options.body);
  console.log("打印请求相关信息：", options);
  // 解析请求体
  console.log("post 请求体：", requestBody);

  // 如果parentId为root，则为根节点
  if (requestBody.parentId === "root") {
    let node = findSelfAndChildrenNode(list, requestBody.id);
    if (node) {
      // 如果存在，则更新
      node = requestBody;
      console.log("添加为根节点：", requestBody);
      return {
        code: 200,
        msg: "更新成功",
      };
    } else {
      requestBody.children = [];
      console.log("添加为根节点：", requestBody);
      // 如果不存在，则添加
      list.push(requestBody);
      return {
        code: 200,
        msg: "添加为根节点成功",
      };
    }
  } else {

    let node = findSelfAndChildrenNode(list, requestBody.id);
    if (node) {
      // 如果存在，则更新
      node.id = requestBody.id;
      node.name = requestBody.name;
      node.code = requestBody.code;
      node.status = requestBody.status;
      node.desc = requestBody.desc;
      node.children = [];
      return {
        code: 200,
        msg: "更新成功",
      };
    }
  }

  // 获取请求体中的parentId
  const parentId = requestBody.parentId;
  console.log("parentId：", parentId);
  // 根据parentId找到对应的父节点
  const parent = findSelfAndChildrenNode(list, parentId);
  // 保存到父节点的children中
  if (parent && parent.children) {
    parent.children.push(requestBody);
  } else {
    // parent添加children属性
    parent.setAttribute("children", []);
    parent.children.push(requestBody);
  }

  return {
    code: 200,
  };
});

// 根据id获取父级对象
function findParentNode(tree, id) {
  let parentNode = null;

  function traverse(node, targetId) {
    if (node.id === targetId) {
      return;
    }

    if (node.children && node.children.length > 0) {
      for (let i = 0; i < node.children.length; i++) {
        let child = node.children[i];

        if (child.id === targetId) {
          parentNode = node;
          return;
        }

        traverse(child, targetId);
      }
    }
  }

  for (let i = 0; i < tree.length; i++) {
    traverse(tree[i], id);

    if (parentNode) {
      break;
    }
  }

  return parentNode;
}

// 根据id获取本身节点和所有子级节点
function findSelfAndChildrenNode(tree, id) {
  let selfAndChildrenNode = null;

  function traverse(node, targetId) {
    if (node.id === targetId) {
      selfAndChildrenNode = node;
      return;
    }

    if (node.children && node.children.length > 0) {
      for (let i = 0; i < node.children.length; i++) {
        let child = node.children[i];

        traverse(child, targetId);
      }
    }
  }

  for (let i = 0; i < tree.length; i++) {
    traverse(tree[i], id);

    if (selfAndChildrenNode) {
      break;
    }
  }

  return selfAndChildrenNode;
}