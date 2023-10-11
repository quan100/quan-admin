// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

export const api = {
  restful: "/sys/user/tripartite/account",
  page: "/api/sys/user/tripartite/account/page",
  details: "/api/sys/user/tripartite/account/details",
  update: "/api/sys/user/tripartite/account/update",
  save: "/api/sys/user/tripartite/account/save",
  remove: "/api/sys/user/tripartite/account/deleteByIds",
}

/** 获取列表 */
export async function page(
  params?: { [key: string]: any },
  options?: { [key: string]: any },
) {
  return request<API.Result<API.PageResult<API.SysUserTripartiteAccount>>>(api.page, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取详细信息 GET */
export async function details(
  params: {
    id?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.Result<API.SysUserTripartiteAccount>>(api.details, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 更新 PUT */
export async function update(body: API.SysUserTripartiteAccount, options?: { [key: string]: any }) {
  return request<any>(api.update, {
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}

/** 新建 POST */
export async function save(body: API.SysUserTripartiteAccount, options?: { [key: string]: any }) {
  return request<any>(api.save, {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 删除 DELETE */
export async function remove(body: any, options?: { [key: string]: any }) {
  return request<Record<string, any>>(api.remove, {
    method: 'DELETE',
    data: body,
    ...(options || {}),
  });
}
