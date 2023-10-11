// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

export const api = {
    page: "/api/sys/permission/page",
    details: "/api/sys/permission/details",
    update: "/api/sys/permission/update",
    save: "/api/sys/permission/save",
    remove: "/api/sys/permission/deleteByIds",
    treePermissions: "/api/sys/permission/treePermissions",
    subsetPermissions: "/api/sys/permission/subsetPermissions",
}

/** 获取树形权限列表 GET /api/sys/permission/treePermissions */
export async function treePermissions(
    params?: { [key: string]: any },
    options?: { [key: string]: any },
) {
    return request<any>('/api/sys/permission/treePermissions', {
        method: 'GET',
        params: {
            ...params,
        },
        ...(options || {}),
    });
}

export async function subsetPermissions(
    params: {
        // query
        /** 当前的页码 */
        pageNum?: number;
        /** 页面的容量 */
        pageSize?: number;
    },
    options?: { [key: string]: any },
) {
    return request('/api/sys/permission/subsetPermissions', {
        method: 'GET',
        params: {
            ...params,
        },
        ...(options || {}),
    });
}

/** 获取详细信息 GET /api/sys/permission/details */
export async function permissionDetails(
    params: {
        id?: number;
    },
    options?: { [key: string]: any },
) {
    return request<any>('/api/sys/permission/details', {
        method: 'GET',
        params: {
            ...params,
        },
        ...(options || {}),
    });
}

/** 更新菜单 PUT /api/sys/permission/update */
export async function updatePermission(body: API.SysPermission, options?: { [key: string]: any }) {
    return request<any>('/api/sys/permission/update', {
        method: 'PUT',
        data: body,
        ...(options || {}),
    });
}

/** 新建菜单 POST /api/sys/permission/save */
export async function addPermission(body: API.SysPermission, options?: { [key: string]: any }) {
    return request<any>('/api/sys/permission/save', {
        method: 'POST',
        data: body,
        ...(options || {}),
    });
}

/** 删除规则 DELETE /api/sys/permission/deleteByIds */
export async function removePermission(body: any, options?: { [key: string]: any }) {
    return request<Record<string, any>>('/api/sys/permission/deleteByIds', {
        method: 'DELETE',
        data: body,
        ...(options || {}),
    });
}
