// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

export const api = {
  upload: "/api/file/upload",
  download: "/api/file/download",
  delete: "/api/file/delete",
  preview: "/api/file/preview",
}

/** 文件上传 */
export async function upload(body: any, options?: { [key: string]: any }) {
  return request<API.Result<API.FileVO>>(api.upload, {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 文件下载 */
export async function download(
  fileName: string,
) {
  return request<any>(api.download, {
    method: 'GET',
    params: {
      fileName: fileName,
    },
    responseType: 'arraybuffer',
  });
}

/** 文件预览 */
export async function preview(
  fileName: string,
  options?: { [key: string]: any },
) {
  return request<any>(api.preview, {
    method: 'GET',
    params: {
      fileName: fileName,
    },
    ...(options || {}),
  });
}

/** 删除 DELETE */
export async function remove(body: any, options?: { [key: string]: any }) {
  return request<Record<string, any>>(api.delete, {
    method: 'DELETE',
    data: body,
    ...(options || {}),
  });
}