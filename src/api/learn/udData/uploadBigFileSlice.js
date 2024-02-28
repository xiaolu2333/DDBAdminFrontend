import service from "@/utils/request.js";


// 大文件分片上传
export async function uploadBigFileSliceApi(dataForm, start, chunkSize, fileSize) {
    try {
        return await service.request({
            method: "post",
            url: "/learn/data_interaction/upload_big_file_slice",
            data: dataForm,
            headers: {
                'Content-Range': `bytes ${start}-${start + chunkSize - 1}/${fileSize}`,
            },
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
}