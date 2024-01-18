/* jshint esversion: 11 */

import {createRouter, createWebHashHistory} from "vue-router";


// 静态路由表
const routes = [
    // vue router默认跳转到根路由 / ，这里我们将它重定向到 /home/dashboard
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
            },
            {
                path: "/dataManage/subNodeManagement",
                name: "SubNodeManagement",
                component: () => import("@/views/dataManage/subNodeManagement/index.vue"),
                meta: {
                    title: "子库管理",
                },
            },
            {
                path: "/dataManage/proxyManagement",
                name: "ProxyManagement",
                component: () => import("@/views/dataManage/proxyManagement/index.vue"),
                meta: {
                    title: "代理管理",
                },
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

    // 学习
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
                    }
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
            }
        ]
    },

    {
        path: "/visual",
        name: "visual",
        meta: {
            title: "visual",
        },
        component: () => import("@/layout/index.vue"),
        children: [
            {
                path: "/visual/AircraftPage",
                name: "AircraftPage",
                component: () => import("@/views/visual/AircraftPage/index.vue"),
                meta: {
                    title: "飞机",
                },
                children: [
                    {
                        path: "/visual/AircraftPage/aircraftPage",
                        name: "aircraftPage",
                        component: () => import("@/views/visual/AircraftPage/index.vue"),
                        meta: {
                            title: "飞机",
                        },
                        children: []
                    },
                ]
            },
            {
                path: "/visual/MissilePage",
                name: "MissilePage",
                component: () => import("@/views/visual/MissilePage/index.vue"),
                meta: {
                    title: "导弹",
                },
                children: [
                    {
                        path: "/visual/MissilePage/missilePage",
                        name: "missilePage",
                        component: () => import("@/views/visual/MissilePage/index.vue"),
                        meta: {
                            title: "导弹",
                        },
                        children: []
                    },
                ]
            },
            {
                path: "/visual/StatisticsPage",
                name: "StatisticsPage",
                component: () => import("@/views/visual/StatisticsPage/index.vue"),
                meta: {
                    title: "统计数据",
                },
                children: [
                    {
                        path: "/visual/StatisticsPage/statisticsPage",
                        name: "missilePage",
                        component: () => import("@/views/visual/StatisticsPage/index.vue"),
                        meta: {
                            title: "统计",
                        },
                        children: []
                    },
                ]
            },
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
