import service from "@/utils/request";

/**
 * 获取部门数据列表
 */
export async function GetDeptList(orgId) {
    try {
        return await service.request({
            url: "/framework/departments/getDepartmentList",
            method: "get",
            params: { orgId: orgId },
        });
    } catch (error) {
        console.log(error);
    }
}

/**
 * 获取部门数据详情
 */
export async function GetDeptDetail(id) {
    return await service.request({
        url: "/framework/departments/getDepartment",
        method: "get",
        params: { id: id },
    });
}

/**
 * 保存部门信息
 */
export async function CreateDept(formData) {
    "use strict";
    try {
        return await service.request({
            url: "/framework/departments/createDepartment",
            method: "post",
            data: formData,
        });
    } catch (error) {
        console.log(error);
    }
}


/**
 * 更新部门信息
 */
export async function UpdateDept(formData) {
    "use strict";
    try {
        return await service.request({
            url: "/framework/departments/updateDepartment",
            method: "post",
            data: formData,
        });
    } catch (error) {
        console.log(error);
    }
}

/**
 * 删除部门信息
 */
export async function DeleteDept(id) {
    "use strict";
    try {
        return await service.request({
            url: "/framework/departments/deleteDepartment",
            method: "post",
            data: { id: id },
        });
    } catch (error) {
        console.log(error);
    }
}
