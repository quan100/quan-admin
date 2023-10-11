// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

export const api = {
    page: "/api/sys/user/info/page",
    details: "/api/sys/user/info/details",
    update: "/api/sys/user/info/update",
    save: "/api/sys/user/info/save",
    remove: "/api/sys/user/info/deleteByIds",
}

/** 获取列表 GET /api/sys/user/info/page */
export async function page(
    params?: { [key: string]: any },
    options?: { [key: string]: any },
) {
    return request<API.Result<API.PageResult<API.SysUserInfo>>>('/api/sys/user/info/page', {
        method: 'GET',
        params: {
            ...params,
        },
        ...(options || {}),
    });
}

/** 获取详细信息 GET /api/sys/user/info/details */
export async function details(
    params: {
        id?: number;
    },
    options?: { [key: string]: any },
) {
    return request<API.Result<API.SysUserInfo>>('/api/sys/user/info/details', {
        method: 'GET',
        params: {
            ...params,
        },
        ...(options || {}),
    });
}

/** 更新 PUT /api/sys/user/info/update */
export async function update(body: API.SysUserInfo, options?: { [key: string]: any }) {
    return request<any>('/api/sys/user/info/update', {
        method: 'PUT',
        data: body,
        ...(options || {}),
    });
}

/** 新建 POST /api/sys/user/info/save */
export async function save(body: API.SysUserInfo, options?: { [key: string]: any }) {
    return request<any>('/api/sys/user/info/save', {
        method: 'POST',
        data: body,
        ...(options || {}),
    });
}

/** 删除 DELETE /api/sys/user/info/deleteByIds */
export async function remove(body: any, options?: { [key: string]: any }) {
    return request<Record<string, any>>('/api/sys/user/info/deleteByIds', {
        method: 'DELETE',
        data: body,
        ...(options || {}),
    });
}
