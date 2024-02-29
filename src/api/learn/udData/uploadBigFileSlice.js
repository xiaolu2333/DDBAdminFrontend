import service from "@/utils/request.js";


// 大文件分片上传
export async function uploadBigFileSliceApi(dataForm) {
    try {
        return await service.request({
            method: "post",
            url: "/learn/data_interaction/upload_big_file_slice",
            data: dataForm,
            headers: {
                "Content-Type": "multipart/form-data"
            },
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// 合并文件分片
export async function mergeBigFileSliceApi(data) {
    try {
        return await service.request({
            method: "get",
            url: "/learn/data_interaction/merge_big_file_slice",
            params: data,
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
}