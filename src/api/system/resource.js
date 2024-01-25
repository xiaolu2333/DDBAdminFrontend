import service from "@/utils/request";

/**
 * 获取菜单数据列表
 */
export async function GetMenuList() {
    try {
        return await service.request({
            url: "/framework/resources/getMenuList",
            method: "get",
        });
    } catch (error) {
        console.log(error);
    }
}

/**
 * 获取菜单数据树
 */
export async function GetMenuTree() {
    try {
        return await service.request({
            url: "/framework/resources/getMenuTree",
            method: "get",
        });
    } catch (error) {
        console.log(error);
    }
}

/**
 * 获取菜单数据详情
 */
export async function GetMenuDetail(id) {
    return await service.request({
        url: "/framework/resources/getMenu",
        method: "get",
        params: { id: id },
    });
}

/**
 * 保存菜单信息
 */
export async function CreateMenu(formData) {
    "use strict";
    try {
        return await service.request({
            url: "/framework/resources/createMenu",
            method: "post",
            data: formData,
        });
    } catch (error) {
        console.log(error);
    }
}


/**
 * 更新菜单信息
 */
export async function UpdateMenu(formData) {
    "use strict";
    try {
        return await service.request({
            url: "/framework/resources/updateMenu",
            method: "post",
            data: formData,
        });
    } catch (error) {
        console.log(error);
    }
}

/**
 * 删除菜单信息
 */
export async function DeleteMenu(id) {
    "use strict";
    try {
        return await service.request({
            url: "/framework/resources/deleteMenu",
            method: "post",
            data: { id: id },
        });
    } catch (error) {
        console.log(error);
    }
}
