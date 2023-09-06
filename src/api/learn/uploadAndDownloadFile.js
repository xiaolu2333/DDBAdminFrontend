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

// 一般文件流下载
export async function DownloadFileByStream() {
  try {
    return await service.request({
      method: "get",
      url: "/test_app/download_file_by_stream",
      responseType: "blob", // 一般文件下载，使用 blob 格式
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// 一般文件URL下载
export async function DownloadFileByURL() {
  try {
    return await service.request({
      method: "get",
      url: "/test_app/download_file_by_url",
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

// 文件断点续传
export async function UploadFileByBreakpoint(dataForm, start, chunkSize, fileSize) {
  try {
    return await service.request({
      method: "post",
      url: "/test_app/upload_file_by_breakpoint",
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

// 文件分块上传
export async function UploadFileByBlock(dataForm) {
  try {
    return await service.request({
      method: "post",
      url: "/test_app/upload_file_by_block",
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

// 文件夹上传
export async function test(dataForm) {
  try {
    return await service.request({
      method: "post",
      url: "/system/pgadminFile/restoreDir",
      data: {'dataForm':dataForm},
      headers: {
        "Content-Type": "multipart/form-data",  // 一般文件上传，使用 multipart/form-data 格式
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}