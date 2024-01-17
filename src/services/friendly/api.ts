// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

export const api = {
    page: "/api/friendly/link/page",
    details: "/api/friendly/link/details",
    update: "/api/friendly/link/update",
    save: "/api/friendly/link/save",
    remove: "/api/friendly/link/deleteByIds",
}

/** 获取列表 GET */
export async function page(
    params?: { [key: string]: any },
    options?: { [key: string]: any },
) {
    return request<any>(api.page, {
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
    return request<any>(api.details, {
        method: 'GET',
        params: {
            ...params,
        },
        ...(options || {}),
    });
}

/** 更新 PUT */
export async function update(body: API.Friendly, options?: { [key: string]: any }) {
    return request<any>(api.update, {
        method: 'PUT',
        data: body,
        ...(options || {}),
    });
}

/** 新建 POST */
export async function save(body: API.Friendly, options?: { [key: string]: any }) {
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
