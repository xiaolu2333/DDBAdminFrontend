/* jshint esversion: 11 */

import {createRouter, createWebHashHistory} from "vue-router";

const routes = [
  // 根路由
  {
    path: "/",
    // 重定向到名为 Home 的路由
    redirect: "Home",
  },
  // Home
  {
    path: "/home",
    name: "Home", // 命名路由。这样我们就可以在任何组件中使用 $router.push({ name: 'Home' }) 来导航到这个路由，或者使用 <router-link :to="{ name: 'Home' }">Home</router-link> 来创建一个指向这个路由的链接
    meta: {
      title: "首页",
      icon: "home",
    },
    component: () => import("@/layout/index.vue"),
    children: [
      {
        path: "/dashboard",
        name: "Dashboard",
        meta: {
          title: "数据看板",
        },
        component: () => import("@/views/home/dashboard/index.vue"),
      },
      {
        path: "/console",
        name: "Console",
        meta: {
          title: "控制台",
        },
        component: () => import("@/views/home/console/index.vue"),
      },
    ],
  },

  // System Admin
  {
    path: "/system",
    name: "System",
    meta: {
      title: "系统管理",
    },
    component: () => import("@/layout/index.vue"),
    children: [
      {
        path: "/organization",
        name: "Organization",
        meta: {
          title: "机构信息管理",
        },
        component: () => import("@/views/system/org/index.vue"),
      },
      {
        path: "/department",
        name: "Department",
        meta: {
          title: "部门信息管理",
        },
        component: () => import("@/views/system/dept/index.vue"),
      },
      {
        path: "/dict",
        name: "Dict",
        meta: {
          title: "字典管理",
        },
        component: () => import("@/views/system/dict/index.vue"),
      },
      {
        path: "/user",
        name: "User",
        meta: {
          title: "部门用户管理",
        },
        component: () => import("@/views/system/user/index.vue"),
        hidden: true,
      },
      {
        path: "/role",
        name: "Role",
        meta: {
          title: "角色管理",
        },
        component: () => import("@/views/system/role/index.vue"),
      },
    ],
  },

  {
    path: "/learning",
    name: "Learning",
    meta: {
        title: "学习",
    },
    component: () => import("@/layout/index.vue"),
    children: [
      {
        path: "/learning/tablePerms",
        name: "tablePerms",
        component: () => import("@/views/learn/tablePerms/index.vue"),
        meta: {
          title: "数据表授权",
        }
      },
      {
        path: "/learning/openWindow",
        name: "openWindow",
        component: () => import("@/views/learn/openWindow/index.vue"),
        meta: {
            title: "打开新窗口",
        }
      },
      {
        path: "/learning/broadcast",
        name: "broadcast",
        component: () => import("@/views/learn/broadcast/index.vue"),
        meta: {
            title: "广播",
        }
      },
      {
        path: "/learning/saveLocalInVXETable",
        name: "saveLocalInVXETable",
        component: () => import("@/views/learn/saveLocalInVXETable/index.vue"),
        meta: {
            title: "VXETable局部更新",
        }
      },
      {
        path: "/learning/sortableInVXETable",
        name: "sortableInVXETable",
        component: () => import("@/views/learn/sortableInVXETable/index.vue"),
        meta: {
            title: "VXETable排序",
        }
      },
      {
        name: "pagination",
        path: "/learning/pagination",
        component: () => import("@/views/learn/pagination/index.vue"),
        meta: {
            title: "分页",
        }
      },
      {
        name: "useEcharts",
        path: "/learning/useEcharts",
        component: () => import("@/views/learn/useEcharts/index.vue"),
        meta: {
            title: "使用Echarts",
        }
      },
      {
        name: "udFile",
        path: "/learning/udFile",
        component: () => import("@/views/learn/udFile/index.vue"),
        meta: {
            title: "前后端文件交互",
        }
      }
    ]
  },

  // Menu
  {
    path: "/tools",
    name: "Tools",
    meta: {
      title: "工具",
    },
    children: [
      {
        path: "/echarts",
        name: "Echarts",
        component: () => import("@/views/menu/tools/dashboard/index.vue"),
        meta: {
          title: "仪表盘",
        }
      }
    ]
  },

  // Data Admin
  {
    path: "/dataManage",
    name: "DataManage",
    meta: {
      title: "数据管理",
    },
    component: () => import("@/layout/index.vue"),
    children: [
      {
        path: "/dataManage/dataTree",
        name: "DataTree",
        component: () => import("@/views/dataManage/dataTree/index.vue"),
        meta: {
            title: "数据树",
        }
      }
    ]
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});

export default router;
