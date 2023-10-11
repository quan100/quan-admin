// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

export const api = {
    page: "/api/article/category/page",
    details: "/api/article/category/details",
    update: "/api/article/category/update",
    save: "/api/article/category/save",
    remove: "/api/article/category/deleteByIds",
}

/** 获取列表 GET /api/article/category/page */
export async function page(
    params?: { [key: string]: any },
    options?: { [key: string]: any },
) {
    return request<API.Result<API.PageResult<API.ArticleCategory>>>(api.page, {
        method: 'GET',
        params: {
            ...params,
        },
        ...(options || {}),
    });
}

/** 获取详细信息 GET /api/article/category/details */
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

/** 更新 PUT /api/article/category/update */
export async function update(body: API.Article, options?: { [key: string]: any }) {
    return request<any>(api.update, {
        method: 'PUT',
        data: body,
        ...(options || {}),
    });
}

/** 新建 POST /api/article/category/save */
export async function save(body: API.Article, options?: { [key: string]: any }) {
    return request<any>(api.save, {
        method: 'POST',
        data: body,
        ...(options || {}),
    });
}

/** 删除 DELETE /api/article/category/deleteByIds */
export async function remove(body: any, options?: { [key: string]: any }) {
    return request<Record<string, any>>(api.remove, {
        method: 'DELETE',
        data: body,
        ...(options || {}),
    });
}
