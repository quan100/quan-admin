// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

export const api = {
    page: "/api/dictionary/page",
    details: "/api/dictionary/details",
    update: "/api/dictionary/update",
    save: "/api/dictionary/save",
    remove: "/api/dictionary/deleteByIds",
}

/** 获取列表 GET /api/dictionary/page */
export async function page(
    params?: { [key: string]: any },
    options?: { [key: string]: any },
) {
    return request<any>('/api/dictionary/page', {
        method: 'GET',
        params: {
            ...params,
        },
        ...(options || {}),
    });
}

/** 获取详细信息 GET /api/dictionary/details */
export async function details(
    params: {
        id?: number;
    },
    options?: { [key: string]: any },
) {
    return request<any>('/api/dictionary/details', {
        method: 'GET',
        params: {
            ...params,
        },
        ...(options || {}),
    });
}

/** 更新 PUT /api/dictionary/update */
export async function update(body: API.Dictionary, options?: { [key: string]: any }) {
    return request<any>('/api/dictionary/update', {
        method: 'PUT',
        data: body,
        ...(options || {}),
    });
}

/** 新建 POST /api/dictionary/save */
export async function save(body: API.Dictionary, options?: { [key: string]: any }) {
    return request<any>('/api/dictionary/save', {
        method: 'POST',
        data: body,
        ...(options || {}),
    });
}

/** 删除 DELETE /api/dictionary/deleteByIds */
export async function remove(body: any, options?: { [key: string]: any }) {
    return request<Record<string, any>>('/api/dictionary/deleteByIds', {
        method: 'DELETE',
        data: body,
        ...(options || {}),
    });
}

/** 根据字典编码获取字典值 GET /api/dictionary/value */
export async function value(
    code: string,
    options?: { [key: string]: any },
) {

    const params = {
        code: code,
    };

    return request<API.Result<any>>('/api/dictionary/value', {
        method: 'GET',
        params: {
            ...params,
        },
        ...(options || {}),
    });
}
