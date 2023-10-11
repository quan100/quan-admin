// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

export const api = {
  page: "/api/sys/role/page",
  details: "/api/sys/role/details",
  update: "/api/sys/role/update",
  save: "/api/sys/role/save",
  remove: "/api/sys/role/deleteByIds",
  rolePermissionIds: "/api/sys/role/permission/rolePermissionIds",
  authorizeRolePermission: "/api/sys/role/authorizeRolePermission",
}

/** 获取树形权限列表 GET /api/sys/role/page */
export async function page(
  params?: { [key: string]: any },
  options?: { [key: string]: any },
) {
  return request<API.Result<API.PageResult<API.SysRole>>>('/api/sys/role/page', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取详细信息 GET /api/sys/role/details */
export async function details(
  params: {
    id?: number;
  },
  options?: { [key: string]: any },
) {
  return request<any>('/api/sys/role/details', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 更新菜单 PUT /api/sys/role/update */
export async function update(body: API.SysPermission, options?: { [key: string]: any }) {
  return request<any>('/api/sys/role/update', {
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}

/** 新建菜单 POST /api/sys/role/save */
export async function save(body: API.SysPermission, options?: { [key: string]: any }) {
  return request<any>('/api/sys/role/save', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 删除规则 DELETE /api/sys/role/deleteByIds */
export async function remove(body: any, options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/sys/role/deleteByIds', {
    method: 'DELETE',
    data: body,
    ...(options || {}),
  });
}

/** 获取角色对应的权限id列表 GET /api/sys/role/permission/rolePermissionIds */
export async function rolePermissionIds(
  params: {
    id?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.Result<number[]>>('/api/sys/role/permission/rolePermissionIds', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 角色授权 PUT /api/sys/role/authorizeRolePermission */
export async function authorizeRolePermission(body: API.AuthorizeRolePermissionEvent, options?: {
  [key: string]: any
}) {
  return request<API.Result<any>>('/api/sys/role/authorizeRolePermission', {
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}
