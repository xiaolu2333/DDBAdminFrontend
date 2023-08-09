/* jshint esversion: 11 */

import {createRouter, createWebHashHistory} from "vue-router";


// 静态路由表
const routes = [
    // 登录
    {
        path: "/login",
        name: "Login",
        component: () => import("@/views/system/login/login.vue"),
        meta: {
            title: "登录",
            static: true,
        }
    },
    // 注册
    {
        path: "/register",
        name: "Register",
        component: () => import("@/views/system/login/register.vue"),
        meta: {
            title: "注册",
            static: true,
        }
    },
    // 404
    {
        path: "/404",
        name: "404",
        component: () => import("@/views/system/error/404.vue"),
        meta: {
            title: "404",
            static: true,
        }
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
                children: []
            },
            {
                path: "/console",
                name: "Console",
                meta: {
                    title: "控制台",
                },
                component: () => import("@/views/home/console/index.vue"),
                children: []
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
                children: []
            },
            {
                path: "/department",
                name: "Department",
                meta: {
                    title: "部门管理",
                },
                component: () => import("@/views/system/dept/index.vue"),
                children: []
            },
            {
                path: "/dict",
                name: "Dict",
                meta: {
                    title: "字典管理",
                },
                component: () => import("@/views/system/dict/index.vue"),
                children: []
            },
            {
                path: "/user",
                name: "User",
                meta: {
                    title: "用户管理",
                },
                component: () => import("@/views/system/user/index.vue"),
                children: [],
                hidden: true,
            },
            {
                path: "/role",
                name: "Role",
                meta: {
                    title: "角色管理",
                },
                component: () => import("@/views/system/role/index.vue"),
                children: []
            },
            {
                name: 'Resource',
                path: '/resource',
                component: () => import("@/views/system/resource/index.vue"),
                meta: {
                    title: "资源管理"
                },
                children: []
            }
        ],
    },

    // Data Management
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
                },
                children: []
            },
            {
                path: "/dataManage/registerCenter",
                name: "RegisterCenter",
                component: () => import("@/views/dataManage/registerCenter/index.vue"),
                meta: {
                    title: "注册中心",
                },
                children: []
            },
            {
                path: "/dataManage/configCenter",
                name: "ConfigCenter",
                component: () => import("@/views/dataManage/configCenter/index.vue"),
                meta: {
                    title: "配置中心",
                },
                children: []
            }
        ]
    },

    // Data Service
    {
        path: "/dataService",
        name: "DataService",
        meta: {
            title: "数据服务",
        },
        component: () => import("@/layout/index.vue"),
        children: [
            {
                path: "/dataService/ERD",
                name: "ERD",
                component: () => import("@/views/dataService/ERD/index.vue"),
                meta: {
                    title: "ERD",
                },
                children: []
            }
        ]
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
                path: "/learning/web-api",
                name: "web-api",
                component: () => import("@/views/learn/web-api/index.vue"),
                meta: {
                    title: "web-api",
                },
                children: [
                    {
                        path: "/learning/web-api/broadcast",
                        name: "broadcast",
                        component: () => import("@/views/learn/web-api/broadcast/index.vue"),
                        meta: {
                            title: "广播",
                        },
                        children: []
                    },
                    {
                        path: "/learning/web-api/openWindow",
                        name: "openWindow",
                        component: () => import("@/views/learn/web-api/openWindow/index.vue"),
                        meta: {
                            title: "打开新窗口",
                        },
                        children: []
                    }
                ]
            },
            {
                path: "/learning/element-plus",
                name: "element-plus",
                component: () => import("@/views/learn/element-plus/index.vue"),
                meta: {
                    title: "element-plus",
                },
                children: [
                    {
                        name: "useElTree",
                        path: "/learning/element-plus/useElTree",
                        component: () => import("@/views/learn/element-plus/useElTree/index.vue"),
                        meta: {
                            title: "使用ElTree",
                        },
                        children: []
                    },
                    {
                        name: "useElForm",
                        path: "/learning/element-plus/useElForm",
                        component: () => import("@/views/learn/element-plus/useElForm/index.vue"),
                        meta: {
                            title: "使用ElForm",
                        },
                        children: []
                    },
                    {
                        name: "horizontalScrollBar",
                        path: "/learning/element-plus/horizontalScrollBar",
                        component: () => import("@/views/learn/element-plus/horizontalScrollBar/index.vue"),
                        meta: {
                            title: "水平滚动条",
                        },
                        children: []
                    },
                ]
            },
            {
                path: "/learning/vxe-table",
                name: "vxe-table",
                component: () => import("@/views/learn/vxe-table/index.vue"),
                meta: {
                    title: "vxe-table",
                },
                children: [
                    {
                        path: "/learning/vxe-table/tablePerms",
                        name: "tablePerms",
                        component: () => import("@/views/learn/vxe-table/tablePerms/index.vue"),
                        meta: {
                            title: "数据表授权",
                        },
                        children: []
                    },
                    {
                        path: "/learning/vxe-table/saveLocalInVXETable",
                        name: "saveLocalInVXETable",
                        component: () => import("@/views/learn/vxe-table/saveLocalInVXETable/index.vue"),
                        meta: {
                            title: "VXETable局部更新",
                        },
                        children: []
                    },
                    // {
                    //     path: "/learning/vxe-table/sortableInVXETable",
                    //     name: "sortableInVXETable",
                    //     component: () => import("@/views/learn/vxe-table/sortableInVXETable/login.vue"),
                    //     meta: {
                    //         title: "VXETable排序",
                    //     }
                    // },
                    {
                        path: "/learning/vxe-table/mergeInVXETable",
                        name: "mergeInVXETable",
                        component: () => import("@/views/learn/vxe-table/mergeInVXETable/index.vue"),
                        meta: {
                            title: "VXETable合并",
                        },
                        children: []
                    },
                    {
                        name: "pagination",
                        path: "/learning/vxe-table/pagination",
                        component: () => import("@/views/learn/vxe-table/pagination/index.vue"),
                        meta: {
                            title: "分页",
                        },
                        children: []
                    },
                    {
                        name: "useTable1",
                        path: "/learning/vxe-table/useTable1",
                        component: () => import("@/views/learn/vxe-table/useTable1/index.vue"),
                        meta: {
                            title: "使用Table1",
                        },
                        children: []
                    },
                    {
                        name: "useTable2",
                        path: "/learning/vxe-table/useTable2",
                        component: () => import("@/views/learn/vxe-table/useTable2/index.vue"),
                        meta: {
                            title: "使用Table2",
                        },
                        children: []
                    },
                    {
                        name: "useTable3",
                        path: "/learning/vxe-table/useTable3",
                        component: () => import("@/views/learn/vxe-table/useTable3/index.vue"),
                        meta: {
                            title: "使用Table3",
                        },
                        children: []
                    },
                ]
            },
            {
                name: "vue3",
                path: "/learning/vue3",
                component: () => import("@/views/learn/vue3/index.vue"),
                meta: {
                    title: "vue3",
                },
                children: [
                    {
                        name: "customDirective",
                        path: "/learning/vue3/customDirective",
                        component: () => import("@/views/learn/vue3/customDirective/index.vue"),
                        meta: {
                            title: "自定义指令",
                        },
                        children: []
                    },
                    {
                        name: "apiDebounceAndThrottle",
                        path: "/learning/vue3/apiDebounceAndThrottle&Throttle",
                        component: () => import("@/views/learn/vue3/apiDebounceAndThrottle/index.vue"),
                        meta: {
                            title: "api防抖与节流",
                        },
                        children: []
                    },
                ]
            },
            {
                name: "前后端数据交互",
                path: "/learning/udData",
                component: () => import("@/views/learn/udData/index.vue"),
                meta: {
                    title: "前后端数据交互",
                },
                children: [
                    {
                        name: "udFile",
                        path: "/learning/udData/udFile",
                        component: () => import("@/views/learn/udData/udFile/index.vue"),
                        meta: {
                            title: "前后端文件交互",
                        },
                        children: []
                    },
                    {
                        name: "udPicture",
                        path: "/learning/udData/udPicture",
                        component: () => import("@/views/learn/udData/udPicture/index.vue"),
                        meta: {
                            title: "前后端图片交互",
                        },
                        children: []
                    },
                ]
            },
            {
                name: "learnCSS",
                path: "/learning/learnCSS",
                component: () => import("@/views/learn/learnCSS/index.vue"),
                meta: {
                    title: "学习CSS",
                },
                children: [
                    {
                        name: "dragDivWidth",
                        path: "/learning/learnCSS/dragDivWidth",
                        component: () => import("@/views/learn/learnCSS/dragDivWidth/index.vue"),
                        meta: {
                            title: "拖动div宽度",
                        },
                        children: []
                    },
                    {
                        name: "elementAdaptive",
                        path: "/learning/learnCSS/elementAdaptive",
                        component: () => import("@/views/learn/learnCSS/elementAdaptive/index.vue"),
                        meta: {
                            title: "元素自适应",
                        },
                        children: []
                    },
                    // {
                    //     name: "elementDrag",
                    //     path: "/learning/learnCSS/elementDrag",
                    //     component: () => import("@/views/learn/learnCSS/elementDrag/login.vue"),
                    //     meta: {
                    //         title: "拖拽元素",
                    //     },
                    //     children: []
                    // },
                    {
                        name: "reactiveLayout",
                        path: "/learning/learnCSS/reactiveLayout",
                        component: () => import("@/views/learn/learnCSS/reactiveLayout/index.vue"),
                        meta: {
                            title: "响应式布局",
                        },
                        children: []
                    },
                    {
                        name: "learnSCSS",
                        path: "/learning/learnCSS/learnSCSS",
                        component: () => import("@/views/learn/learnCSS/learnSCSS/index.vue"),
                        meta: {
                            title: "学习SCSS",
                        },
                        children: []
                    },
                    {
                        name: "rotatePicture",
                        path: "/learning/learnCSS/rotatePicture",
                        component: () => import("@/views/learn/learnCSS/rotatePicture/index.vue"),
                        meta: {
                            title: "旋转图片",
                        }
                    },
                    {
                        name: "handleText",
                        path: "/learning/learnCSS/handleText",
                        component: () => import("@/views/learn/learnCSS/handleText/index.vue"),
                        meta: {
                            title: "处理文字",
                        }
                    }
                ]
            },
            {
                name: "数据可视化",
                path: "/learning/dataVisualization",
                component: () => import("@/views/learn/dataVisualization/index.vue"),
                meta: {
                    title: "数据可视化",
                },
                children: [
                    {
                        name: "useEcharts",
                        path: "/learning/dataVisualization/useEcharts",
                        component: () => import("@/views/learn/dataVisualization/useEcharts/index.vue"),
                        meta: {
                            title: "使用Echarts",
                        },
                        children: []
                    },
                ]
            },
            {
                name: "learnJS",
                path: "/learning/learnJS",
                component: () => import("@/views/learn/learnJS/index.vue"),
                meta: {
                    title: "学习JS",
                },
                children: [
                    {
                        name: "JavaScriptObject",
                        path: "/learning/learnJS/JavaScriptObject",
                        component: () => import("@/views/learn/learnJS/JavaScriptObject/index.vue"),
                        meta: {
                            title: "JavaScript对象",
                        },
                        children: []
                    },
                    {
                        name: "JavaScriptSkill",
                        path: "/learning/learnJS/JavaScriptSkill",
                        component: () => import("@/views/learn/learnJS/JavaScriptSkill/index.vue"),
                        meta: {
                            title: "JavaScript技术",
                        },
                        children: []
                    },
                ]
            },
            {
                name: "debug",
                path: "/learning/debug",
                component: () => import("@/views/learn/debug/index.vue"),
                meta: {
                    title: "调试",
                },
                children: [
                    {
                        name: "debugJS",
                        path: "/learning/debug/debugJS",
                        component: () => import("@/views/learn/debug/debugJS/index.vue"),
                        meta: {
                            title: "调试JS",
                        }
                    },
                    {
                        name: "debugPython",
                        path: "/learning/debug/debugPython",
                        component: () => import("@/views/learn/debug/debugPython/index.vue"),
                        meta: {
                            title: "调试Python",
                        }
                    }
                ]
            }
        ]
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes,
});


// 重置路由——用于退出登录时清除除公共路由外的其他路由
export const resetRouter = () => {
    const resetWhiteNameList = ['login', 'register', '404']
    router.getRoutes().forEach((route) => {
        const {name} = route
        if (name && !resetWhiteNameList.includes(name)) {
            router.hasRoute(name) && router.removeRoute(name)
        }
    })
}

// 设置路由——用于登录时设置路由
export const setupRouter = (app) => {
    app.use(router)
}

export default router;
