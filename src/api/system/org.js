import service from "@/utils/request";

/**
 * 获取机构数据列表
 */
export async function GetOrgList() {
    try {
        return await service.request({
            url: "/framework/organizations/getOrganizationList",
            method: "get",
        });
    } catch (error) {
        console.log(error);
    }
}

/**
 * 获取机构数据详情
 */
export async function GetOrgDetail(id) {
    return await service.request({
        url: "/framework/organizations/getOrganization",
        method: "get",
        params: { id: id },
    });
}

/**
 * 保存机构信息
 */
export async function CreateOrg(formData) {
    "use strict";
    try {
        return await service.request({
            url: "/framework/organizations/createOrganization",
            method: "post",
            data: formData,
        });
    } catch (error) {
        console.log(error);
    }
}


/**
 * 更新机构信息
 */
export async function UpdateOrg(formData) {
    "use strict";
    try {
        return await service.request({
            url: "/framework/organizations/updateOrganization",
            method: "post",
            data: formData,
        });
    } catch (error) {
        console.log(error);
    }
}

/**
 * 删除机构信息
 */
export async function DeleteOrg(id) {
    "use strict";
    try {
        return await service.request({
            url: "/framework/organizations/deleteOrganization",
            method: "post",
            data: { id: id },
        });
    } catch (error) {
        console.log(error);
    }
}
