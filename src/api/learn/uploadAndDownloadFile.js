import service from "@/utils/request.js";


// 一般文件上传
export async function UploadFile(dataForm) {
  try {
    return await service.request({
      method: "post",
      url: "/test_app/upload_file",
      data: dataForm,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// 一般文件下载
export async function DownloadFile() {
  try {
    return await service.request({
      method: "get",
      url: "/test_app/download_file",
      responseType: "blob",
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}