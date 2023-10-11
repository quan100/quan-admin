// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

export const api = {
    page: "/api/tools/page",
    details: "/api/tools/details",
    update: "/api/tools/update",
    save: "/api/tools/save",
    remove: "/api/tools/deleteByIds",
}

/** 获取列表 GET /api/tools/page */
export async function page(
    params?: { [key: string]: any },
    options?: { [key: string]: any },
) {
    return request<any>('/api/tools/page', {
        method: 'GET',
        params: {
            ...params,
        },
        ...(options || {}),
    });
}

/** 获取详细信息 GET /api/tools/details */
export async function details(
    params: {
        id?: number;
    },
    options?: { [key: string]: any },
) {
    return request<any>('/api/tools/details', {
        method: 'GET',
        params: {
            ...params,
        },
        ...(options || {}),
    });
}

/** 更新 PUT /api/tools/update */
export async function update(body: API.Dictionary, options?: { [key: string]: any }) {
    return request<any>('/api/tools/update', {
        method: 'PUT',
        data: body,
        ...(options || {}),
    });
}

/** 新建 POST /api/tools/save */
export async function save(body: API.Dictionary, options?: { [key: string]: any }) {
    return request<any>('/api/tools/save', {
        method: 'POST',
        data: body,
        ...(options || {}),
    });
}

/** 删除 DELETE /api/tools/deleteByIds */
export async function remove(body: any, options?: { [key: string]: any }) {
    return request<Record<string, any>>('/api/tools/deleteByIds', {
        method: 'DELETE',
        data: body,
        ...(options || {}),
    });
}
