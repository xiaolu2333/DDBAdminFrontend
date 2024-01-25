import service from "@/utils/request";


/**
 * 获取机构部门数据树
 */
export async function GetOrgDeptTree() {
    return await service.request({
        url: "/framework/authentication/getOrgDeptTree/",
        method: "get",
    });
}

/**
 * 获取用户列表
 */
export async function GetUserList(params) {
    try {
        return await service.request({
            url: "/framework/authentication/getUserList",
            method: "get",
            params: params,
        });
    } catch (error) {
        console.log(error);
    }
}