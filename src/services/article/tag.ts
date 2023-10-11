// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

export const api = {
    page: "/api/article/tag/page",
    details: "/api/article/tag/details",
    update: "/api/article/tag/update",
    save: "/api/article/tag/save",
    remove: "/api/article/tag/deleteByIds",
}

/** 获取列表 GET /api/article/tag/page */
export async function page(
    params?: { [key: string]: any },
    options?: { [key: string]: any },
) {
    return request<API.Result<API.PageResult<API.ArticleTag>>>('/api/article/tag/page', {
        method: 'GET',
        params: {
            ...params,
        },
        ...(options || {}),
    });
}

/** 获取详细信息 GET /api/article/tag/details */
export async function details(
    params: {
        id?: number;
    },
    options?: { [key: string]: any },
) {
    return request<API.Result<API.ArticleTag>>('/api/article/tag/details', {
        method: 'GET',
        params: {
            ...params,
        },
        ...(options || {}),
    });
}

/** 更新 PUT /api/article/tag/update */
export async function update(body: API.ArticleTag, options?: { [key: string]: any }) {
    return request<any>('/api/article/tag/update', {
        method: 'PUT',
        data: body,
        ...(options || {}),
    });
}

/** 新建 POST /api/article/tag/save */
export async function save(body: API.ArticleTag, options?: { [key: string]: any }) {
    return request<any>('/api/article/tag/save', {
        method: 'POST',
        data: body,
        ...(options || {}),
    });
}

/** 删除 DELETE /api/article/tag/deleteByIds */
export async function remove(body: any, options?: { [key: string]: any }) {
    return request<Record<string, any>>('/api/article/tag/deleteByIds', {
        method: 'DELETE',
        data: body,
        ...(options || {}),
    });
}
