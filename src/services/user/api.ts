// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

const api = {
  restful: "/api/sys/user",
}

/** 获取详细信息 GET /api/sys/user */
export async function getUser(
  params: {
    id?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.Result<API.SysUser>>(api.restful, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 更新 PUT /api/sys/user */
export async function updateUser(body: API.SysUser, options?: { [key: string]: any }) {
  return request<any>(api.restful, {
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}

/** 新建 POST /api/sys/user */
export async function saveUser(body: API.SysUser, options?: { [key: string]: any }) {
  return request<any>(api.restful, {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 删除 DELETE /api/sys/user */
export async function removeUser(body: any, options?: { [key: string]: any }) {
  return request<Record<string, any>>(api.restful, {
    method: 'DELETE',
    data: body,
    ...(options || {}),
  });
}
