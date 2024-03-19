/* jshint esversion: 11 */

import {createRouter, createWebHashHistory} from "vue-router";


// 静态路由表
const routes = [
    // 默认启动后重定向到根路由 /
    {
        path: "/",
        name: "Root",
        redirect: "/login",
    },

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
                path: "/home/dashboard",
                name: "Dashboard",
                meta: {
                    title: "数据看板",
                },
                component: () => import("@/views/home/dashboard/index.vue"),
                children: []
            },
            {
                path: "/home/console",
                name: "Console",
                meta: {
                    title: "控制台",
                },
                component: () => import("@/views/home/console/index.vue"),
                children: []
            },
        ],
    },

    // System Management
    {
        name: "System",
        path: "/system",
        meta: {
            title: "系统管理",
        },
        component: () => import("@/layout/index.vue"),
        children: [
            {
                name: "Organization",
                path: "/organization",
                meta: {
                    title: "机构管理",
                },
                component: () => import("@/views/system/org/index.vue"),
                children: []
            },
            {
                name: "Department",
                path: "/department",
                meta: {
                    title: "部门管理",
                },
                component: () => import("@/views/system/dept/index.vue"),
                children: []
            },
            {
                name: "Dict",
                path: "/dict",
                meta: {
                    title: "字典管理",
                },
                component: () => import("@/views/system/dict/index.vue"),
                children: []
            },
            {
                name: "User",
                path: "/user",
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
                name: 'Menu',
                path: '/menu',
                component: () => import("@/views/system/menu/index.vue"),
                meta: {
                    title: "菜单管理"
                },
                children: []
            },
            {
                name: 'roleUser',
                path: '/roleUser',
                component: () => import("@/views/system/roleUser/index.vue"),
                meta: {
                    title: "角色用户管理"
                },
            },
            {
                name: 'roleMenu',
                path: '/roleMenu',
                component: () => import("@/views/system/roleMenu/index.vue"),
                meta: {
                    title: "角色菜单管理"
                },
            },
            {
                name: 'serviceAudit',
                path: '/serviceAudit',
                component: () => import("@/views/system/serviceAudit/index.vue"),
                meta: {
                    title: "服务审计"
                },
            },
            {
                name: 'loginAudit',
                path: '/loginAudit',
                component: () => import("@/views/system/loginAudit/index.vue"),
                meta: {
                    title: "访问审计"
                },
            }
        ],
    },

    // Data Management
    {
        name: "DataManage",
        path: "/dataManage",
        meta: {
            title: "数据管理",
        },
        component: () => import("@/layout/index.vue"),
        children: [
            {
                name: "RegisterCenter",
                path: "/dataManage/registerCenter",
                component: () => import("@/views/dataManage/registerCenter/index.vue"),
                meta: {
                    title: "注册中心",
                },
                children: []
            },
            {
                name: "ConfigCenter",
                path: "/dataManage/configCenter",
                component: () => import("@/views/dataManage/configCenter/index.vue"),
                meta: {
                    title: "配置中心",
                },
                children: []
            },
            {
                name: "SubNodeManagement",
                path: "/dataManage/subNodeManagement",
                component: () => import("@/views/dataManage/subNodeManagement/index.vue"),
                meta: {
                    title: "子库管理",
                },
            },
            {
                name: "ProxyManagement",
                path: "/dataManage/proxyConfiguration",
                component: () => import("@/views/dataManage/proxyConfiguration/index.vue"),
                meta: {
                    title: "代理配置",
                },
            }
        ]
    },

    // Data Service
    {
        name: "DataService",
        path: "/dataService",
        meta: {
            title: "数据服务",
        },
        component: () => import("@/layout/index.vue"),
        children: [
            {
                name: "DataOperation",
                path: "/dataService/dataOperation",
                component: () => import("@/views/dataService/dataOperation/index.vue"),
                meta: {
                    title: "数据操作",
                },
                children: []
            },
            {
                name: "ERD",
                path: "/dataService/ERD",
                component: () => import("@/views/dataService/ERD/index.vue"),
                meta: {
                    title: "ERD",
                },
                children: []
            }
        ]
    },

    // 学习
    {
        name: "Learning",
        path: "/learning",
        meta: {
            title: "学习",
        },
        component: () => import("@/layout/index.vue"),
        children: [
            {
                name: "web-api",
                path: "/learning/web-api",
                component: () => import("@/views/learn/web-api/index.vue"),
                meta: {
                    title: "web-api",
                },
                children: [
                    {
                        name: "broadcast",
                        path: "/learning/web-api/broadcast",
                        component: () => import("@/views/learn/web-api/broadcast/index.vue"),
                        meta: {
                            title: "广播",
                        },
                        children: []
                    },
                    {
                        name: "openWindow",
                        path: "/learning/web-api/openWindow",
                        component: () => import("@/views/learn/web-api/openWindow/index.vue"),
                        meta: {
                            title: "打开新窗口",
                        },
                        children: []
                    },
                    {
                        name: '前端埋点与监控',
                        path: '/learning/vue3/monitor',
                        component: () => import("@/views/learn/web-api/monitor/index.vue"),
                        meta: {
                            title: "前端埋点与监控"
                        }
                    },
                    {
                        name: 'DragAndDrop',
                        path: '/learning/web-api/elementDragAndDrop',
                        component: () => import("@/views/learn/web-api/elementDragAndDrop/index.vue"),
                        meta: {
                            title: "元素拖放"
                        }
                    }
                ]
            },
            {
                name: "element-plus",
                path: "/learning/element-plus",
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
                    {
                        name: "headerEditableTable",
                        path: "/learning/element-plus/headerEditableTable",
                        component: () => import("@/views/learn/element-plus/headerEditableTable/index.vue"),
                        meta: {
                            title: "表头可编辑表格"
                        },
                        children: []
                    },
                    {
                        name: 'dynamicTabs',
                        path: '/learning/element-plus/dynamicTabs',
                        component: () => import("@/views/learn/element-plus/dynamicTabs/index.vue"),
                        meta: {
                            title: "动态Tabs"
                        }
                    },
                    {
                        name: 'useSelect',
                        path: '/learning/element-plus/useSelect',
                        component: () => import("@/views/learn/element-plus/useSelect/index.vue"),
                        meta: {
                            title: "使用Select"
                        }
                    },
                    {
                        name: 'uploadFile',
                        path: '/learning/element-plus/uploadFile',
                        component: () => import("@/views/learn/element-plus/uploadFile/index.vue"),
                        meta: {
                            title: "上传文件"
                        }
                    },
                    {
                        name: 'downloadFile',
                        path: '/learning/element-plus/downloadFile',
                        component: () => import("@/views/learn/element-plus/downloadFile/index.vue"),
                        meta: {
                            title: "下载文件"
                        }
                    },
                    {
                        name: 'dateAndTime',
                        path: '/learning/element-plus/dateAndTime',
                        component: () => import("@/views/learn/element-plus/dateAndTime/index.vue"),
                        meta: {
                            title: "日期和时间"
                        }
                    },
                    {
                        name: 'useButton',
                        path: '/learning/element-plus/useButton',
                        component: () => import("@/views/learn/element-plus/useButton/index.vue"),
                        meta: {
                            title: "使用按钮"
                        }
                    },
                    {
                        name: 'useProgress',
                        path: '/learning/element-plus/useProgress',
                        component: () => import("@/views/learn/element-plus/useProgress/index.vue"),
                        meta: {
                            title: "使用进度条"
                        }
                    },
                    {
                        name: 'useMenu',
                        path: '/learning/element-plus/useMenu',
                        component: () => import("@/views/learn/element-plus/useMenu/index.vue"),
                        meta: {
                            title: "使用菜单"
                        }
                    },
                    {
                        name: 'useCheckbox',
                        path: '/learning/element-plus/useCheckbox',
                        component: () => import("@/views/learn/element-plus/useCheckbox/index.vue"),
                        meta: {
                            title: "使用Checkbox"
                        }
                    }
                ]
            },
            {
                name: "vxe-table",
                path: "/learning/vxe-table",
                component: () => import("@/views/learn/vxe-table/index.vue"),
                meta: {
                    title: "vxe-table",
                },
                children: [
                    {
                        name: "tablePerms",
                        path: "/learning/vxe-table/tablePerms",
                        component: () => import("@/views/learn/vxe-table/tablePerms/index.vue"),
                        meta: {
                            title: "数据表授权",
                        },
                        children: []
                    },
                    {
                        name: "saveLocalInVXETable",
                        path: "/learning/vxe-table/saveLocalInVXETable",
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
                        name: "mergeInVXETable",
                        path: "/learning/vxe-table/mergeInVXETable",
                        component: () => import("@/views/learn/vxe-table/mergeInVXETable/index.vue"),
                        meta: {
                            title: "VXETable合并",
                        },
                        children: []
                    },
                    {
                        name: "sortAndFilter",
                        path: "/learning/vxe-table/sortAndFilter",
                        component: () => import("@/views/learn/vxe-table/sortAndFilter/index.vue"),
                        meta: {
                            title: "排序与过滤",
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
                    {
                        name: "useGrid1",
                        path: "/learning/vxe-table/useGrid1",
                        component: () => import("@/views/learn/vxe-table/useGrid1/index.vue"),
                        meta: {
                            title: "使用Grid1",
                        },
                        children: []
                    },
                    {
                        name: "useGrid2",
                        path: "/learning/vxe-table/useGrid2",
                        component: () => import("@/views/learn/vxe-table/useGrid2/index.vue"),
                        meta: {
                            title: "使用Grid2",
                        },
                        children: []
                    }
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
                    {
                        name: "custCompontent",
                        path: "/learning/vue3/custCompontent",
                        component: () => import("@/views/learn/vue3/custCompontent/index.vue"),
                        meta: {
                            title: "自定义组件",
                        }
                    },
                    {
                        name: "useVmodel",
                        path: "/learning/vue3/useVmodel",
                        component: () => import("@/views/learn/vue3/useVmodel/index.vue"),
                        meta: {
                            title: "父子组件传值中的v-model"
                        }
                    },
                    {
                        name: "dataBetweenCompontent",
                        path: "/learning/vue3/dataBetweenCompontent",
                        component: () => import("@/views/learn/vue3/dataBetweenCompontent/index.vue"),
                        meta: {
                            title: "组件间数据传递",
                        }
                    },
                    {
                        name: 'CompositionFunction',
                        path: '/learning/vue3/compositionFunction',
                        component: () => import("@/views/learn/vue3/compositionFunction/index.vue"),
                        meta: {
                            title: "使用组合函数——hooks"
                        }
                    },
                    {
                        name: 'vueuseExample',
                        path: '/learning/vue3/vueuseExample',
                        component: () => import("@/views/learn/vue3/vueuseExample/index.vue"),
                        meta: {
                            title: "vueuse使用示例"
                        }
                    },
                    {
                        name: '分离业务逻辑与UI逻辑',
                        path: '/learning/vue3/separateBusinessAndUI',
                        component: () => import("@/views/learn/vue3/separateBusinessAndUI/index.vue"),
                        meta: {
                            title: "分离业务逻辑与UI逻辑"
                        }
                    },
                    {
                        name: 'watch与watchEffect',
                        path: '/learning/vue3/watchAndWatchEffect',
                        component: () => import("@/views/learn/vue3/watchAndWatchEffect/index.vue"),
                        meta: {
                            title: "watch与watchEffect"
                        }
                    },
                    {
                        name: '单向数据流',
                        path: '/learning/vue3/oneWayDataFlow',
                        component: () => import("@/views/learn/vue3/oneWayDataFlow/index.vue"),
                        meta: {
                            title: "单向数据流"
                        }
                    },
                    {
                        name: '图片资源',
                        path: '/learning/vue3/imageResource',
                        component: () => import("@/views/learn/vue3/imageResource/index.vue"),
                        meta: {
                            title: "图片资源"
                        }
                    },
                    // {
                    //     name: '集成高德地图',
                    //     path: '/learning/vue3/integrateGaodeMap',
                    //     component: () => import("@/views/learn/vue3/integrateGaodeMap/index.vue"),
                    //     meta: {
                    //         title: "集成百度地图"
                    //     }
                    // },
                    {
                        name: '分步复杂表单',
                        path: '/learning/vue3/stepsComplexForm',
                        component: () => import("@/views/learn/vue3/stepsComplexForm/index.vue"),
                        meta: {
                            title: "分步复杂表单"
                        }
                    },
                    {
                        name: '组件抽象一',
                        path: '/learning/vue3/componentAbstraction1',
                        component: () => import("@/views/learn/vue3/componentAbstraction1/index.vue"),
                        meta: {
                            title: "组件抽象——tab下的tables"
                        }
                    }
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
                    {
                        name: "uploadBigFileSlice",
                        path: "/learning/udData/uploadBigFileSlice",
                        component: () => import("@/views/learn/udData/uploadBigFileSlice/index.vue"),
                        meta: {
                            title: "大文件分片上传",
                        },
                    }
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
                    // {
                    //     name: "JavaScriptDA",
                    //     path: "/learning/learnJS/JavaScriptDA",
                    //     component: () => import("@/views/learn/learnJS/JavaScriptDA/index.vue"),
                    //     meta: {
                    //         title: "JavaScript数据结构与算法",
                    //     },
                    //     children: []
                    // }
                    {
                        name: "JavaScript代码片段",
                        path: "/learning/learnJS/JavaScriptCodeSnippet",
                        component: () => import("@/views/learn/learnJS/JavaScriptCodeSnippet/index.vue"),
                        meta: {
                            title: "JavaScript代码片段",
                        },
                        children: []
                    },
                    {
                        name: "JavaScript数组操作",
                        path: "/learning/learnJS/JavaScriptArrayOperation",
                        component: () => import("@/views/learn/learnJS/JavaScriptArrayOperation/index.vue"),
                        meta: {
                            title: "JavaScript数组操作",
                        },
                    },
                    {
                        name: "JavaScriptWebWorker",
                        path: "/learning/learnJS/JavaScriptWebWorker",
                        component: () => import("@/views/learn/learnJS/JavaScriptWebWorker/index.vue"),
                        meta: {
                            title: "Web Worker",
                        },
                    }
                    // {
                    //     name: "JavaScriptDesignPattern",
                    //     path: "/learning/learnJS/JavaScriptDesignPattern",
                    //     component: () => import("@/views/learn/learnJS/JavaScriptDesignPattern/index.vue"),
                    //     meta: {
                    //         title: "JavaScript设计模式",
                    //     },
                    // }
                    // {
                    //     name: "JavaScriptFunctions",
                    //     path: "/learning/learnJS/JavaScriptFunctions",
                    //     component: () => import("@/views/learn/learnJS/JavaScriptFunctions/index.vue"),
                    //     meta: {
                    //         title: "JavaScript函数",
                    //     }
                    // },
                    // {
                    //     name: "unitTest",
                    //     path: "/learning/learnJS/unitTest",
                    //     component: () => import("@/views/learn/learnJS/unitTest/index.vue"),
                    //     meta: {
                    //         title: "javascript单元测试"
                    //     }
                    // },
                    // {
                    //     name: "classInJS",
                    //     path: "/learning/learnJS/classInJS",
                    //     component: () => import("@/views/learn/learnJS/classInJS/index.vue"),
                    //     meta: {
                    //         title: "JavaScript中的类"
                    //     }
                    // }
                ]
            },
            {
                name: "debug",
                path: "/learning/debug",
                component: () => import("@/views/learn/debug/index.vue"),
                meta: {
                    title: "调试与重构",
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
                    },
                    // {
                    //     name: "refactor",
                    //     path: "/learning/debug/refactor",
                    //     component: () => import("@/views/learn/debug/refactor/index.vue"),
                    //     meta: {
                    //         title: "重构概述",
                    //     }
                    // }
                ]
            },
            {
                name: "business",
                path: "/learning/business",
                component: () => import("@/views/learn/business/index.vue"),
                meta: {
                    title: "业务",
                },
                children: [
                    {
                        name: "btnControlByMultiFactor",
                        path: "/learning/business/btnControlByMultiFactor",
                        component: () => import("@/views/learn/business/btnControlByMultiFactor/index.vue"),
                        meta: {
                            title: "多因素控制",
                        }
                    }
                ]
            },
            {
                name: "GoJS",
                path: "/learning/GoJS",
                component: () => import("@/views/learn/GoJS/index.vue"),
                meta: {
                    title: "GoJS",
                },
                children: [
                    {
                        name: "useGoJS",
                        path: "/learning/GoJS/useGoJS",
                        component: () => import("@/views/learn/GoJS/basicConcepts/index.vue"),
                        meta: {
                            title: "基础概念",
                        }
                    },
                    {
                        name: "example1",
                        path: "/learning/GoJS/example1",
                        component: () => import("@/views/learn/GoJS/example1/index.vue"),
                        meta: {
                            title: "示例1-数据库ERD",
                        }
                    },
                    {
                        name: "example2",
                        path: "/learning/GoJS/example2",
                        component: () => import("@/views/learn/GoJS/example2/index.vue"),
                        meta: {
                            title: "示例2-拖入element plus Tree叶节点",
                        }
                    },
                    {
                        name: "example3",
                        path: "/learning/GoJS/example3",
                        component: () => import("@/views/learn/GoJS/example3/index.vue"),
                        meta: {
                            title: "示例3-在节点中添加功能按钮",
                        }
                    },
                    {
                        name: "example4",
                        path: "/learning/GoJS/example4",
                        component: () => import("@/views/learn/GoJS/example4/index.vue"),
                        meta: {
                            title: "示例4-拖动port连线",
                        }
                    }
                ]
            },
            {
                name: "learnHttpRequestAndResponse",
                path: "/learning/learnHttpRequestAndResponse",
                component: () => import("@/views/learn/learnHttpRequestAndResponse/index.vue"),
                meta: {
                    title: "HTTP&HTTPS",
                },
                children: [
                    {
                        name: "axiosBase",
                        path: "/learning/learnHttpRequestAndResponse/axiosBase",
                        component: () => import("@/views/learn/learnHttpRequestAndResponse/axiosBase/index.vue"),
                        meta: {
                            title: "axios基础",
                        }
                    },
                    {
                        name: "handleRepeatRequest",
                        path: "/learning/learnHttpRequestAndResponse/handleRepeatRequest",
                        component: () => import("@/views/learn/learnHttpRequestAndResponse/handleRepeatRequest/index.vue"),
                        meta: {
                            title: "处理重复请求",
                        }
                    }
                ]
            },
            {
                name: '第三方库',
                path: '/learning/thirdPartyLibraries',
                component: () => import("@/views/learn/thirdPartyLibraries/index.vue"),
                meta: {
                    title: "第三方库"
                },
                children: [
                    {
                        name: '使用JsonServer',
                        path: '/learning/thirdPartyLibraries/useJsonServer',
                        component: () => import("@/views/learn/thirdPartyLibraries/useJsonServer/index.vue"),
                        meta: {
                            title: "使用JsonServer"
                        }
                    },
                    {
                        name: '使用axios',
                        path: '/learning/thirdPartyLibraries/useAxios',
                        component: () => import("@/views/learn/thirdPartyLibraries/useAxios/index.vue"),
                        meta: {
                            title: "使用axios"
                        }
                    },
                ]
            }
        ]
    },

    {
        name: "visual",
        path: "/visual",
        meta: {
            title: "visual",
        },
        component: () => import("@/layout/index.vue"),
        children: [
            {
                name: "AircraftPage",
                path: "/visual/AircraftPage",
                component: () => import("@/views/visual/AircraftPage/index.vue"),
                meta: {
                    title: "飞机",
                },
                children: [
                    {
                        name: "aircraftPage",
                        path: "/visual/AircraftPage/aircraftPage",
                        component: () => import("@/views/visual/AircraftPage/index.vue"),
                        meta: {
                            title: "飞机",
                        },
                        children: []
                    },
                ]
            },
            {
                name: "MissilePage",
                path: "/visual/MissilePage",
                component: () => import("@/views/visual/MissilePage/index.vue"),
                meta: {
                    title: "导弹",
                },
                children: [
                    {
                        name: "missilePage",
                        path: "/visual/MissilePage/missilePage",
                        component: () => import("@/views/visual/MissilePage/index.vue"),
                        meta: {
                            title: "导弹",
                        },
                        children: []
                    },
                ]
            },
            {
                name: "StatisticsPage",
                path: "/visual/StatisticsPage",
                component: () => import("@/views/visual/StatisticsPage/index.vue"),
                meta: {
                    title: "统计数据",
                },
                children: [
                    {
                        name: "missilePage",
                        path: "/visual/StatisticsPage/statisticsPage",
                        component: () => import("@/views/visual/StatisticsPage/index.vue"),
                        meta: {
                            title: "统计",
                        },
                        children: []
                    },
                ]
            },
            {
                name: "IncidentEmergencyResponse",
                path: "/visual/IncidentEmergencyResponse",
                component: () => import("@/views/visual/IncidentEmergencyResponse/index.vue"),
                meta: {
                    title: "应急响应",
                },
            },
            {
                name: "GeneralDisposition",
                path: "/visual/GeneralDisposition",
                component: () => import("@/views/visual/GeneralDisposition/index.vue"),
                meta: {
                    title: "通用处置程序",
                },
            },
            {
                name: "IncidentReport",
                path: "/visual/IncidentReport",
                component: () => import("@/views/visual/IncidentReport/index.vue"),
                meta: {
                    title: "速报表",
                },
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
