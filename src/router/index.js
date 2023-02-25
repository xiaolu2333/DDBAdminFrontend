/* jshint esversion: 11 */

import { createRouter, createWebHashHistory } from "vue-router";

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
          title: "机构管理",
        },
        component: () => import("@/views/system/org/index.vue"),
      },
      {
        path: "/department",
        name: "Department",
        meta: {
          title: "部门管理",
        },
        component: () => import("@/views/system/dept/index.vue"),
      },
      {
        path: "/user",
        name: "User",
        meta: {
          title: "用户管理",
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
      }
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});

export default router;
