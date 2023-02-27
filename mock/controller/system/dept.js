/* jshint esversion: 6 */

import Mock from "mockjs";

// 提供部门树形结构数据
Mock.mock('/dept/tree', 'post', (options) => {
  "use strict";
  // const requestBody = JSON.parse(options.body);

  return {
    code: 200,
    data: [
        {
          id: 1,
          name: "A省环保局",
          parentId: "root",
          orderNum: 1,
          children: [
            {
              id: 2,
              name: "A市环保局",
              parentId: 1,
              orderNum: 1,
              children: [
                {
                  id: 3,
                  name: "a1县环保局",
                  parentId: 2,
                  orderNum: 1,
                  children: [
                    {
                      id: 4,
                      name: "a1乡环保局",
                      parentId: 3,
                      orderNum: 1,
                      children: []
                    },
                    {
                      id: 11,
                      name: "a1乡环保局2",
                      parentId: 3,
                      orderNum: 2,
                      children: []
                    }
                  ],
                },
                {
                  id: 5,
                  name: "a2县环保局",
                  parentId: 2,
                  orderNum: 2,
                  children: []
                }
              ]
            },
            {
              id: 6,
              name: "B市环保局",
              parentId: 1,
              orderNum: 2,
              children: [
                {
                  id: 7,
                  name: "b1县环保局",
                  parentId: 6,
                  orderNum: 1,
                  children: []
                }
              ]
            }
          ]
        },
        {
          id: 8,
          name: "B省环保局",
          parentId: "root",
          orderNum: 2,
          children: [
            {
              id: 9,
              name: "C市环保局",
              parentId: 8,
              orderNum: 1,
              children: [
                {
                  id: 12,
                  name: "c1县环保局",
                  parentId: 9,
                  orderNum: 1,
                  children: []
                }
              ]
            }
          ]
        },
        {
          id: 10,
          name: "C省环保局",
          parentId: "root",
          orderNum: 3,
          children: []
        }
      ],
  };
});