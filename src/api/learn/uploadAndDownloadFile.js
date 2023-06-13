import service from "@/utils/request.js";


// 一般文件上传
export async function UploadFile(dataForm) {
  try {
    return await service.request({
      method: "post",
      url: "/test_app/upload_file",
      data: dataForm,
      headers: {
        "Content-Type": "multipart/form-data",  // 一般文件上传，使用 multipart/form-data 格式
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
      responseType: "blob", // 一般文件下载，使用 blob 格式
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}


export async function UploadFormFile(formData) {
  try {
    return await service.request({
      method: "post",
      url: "/test_app/upload_form_file",
      data: formData,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}