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