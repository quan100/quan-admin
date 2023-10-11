// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

export const api = {
  refreshGatewayCache: "/api/system/command/refresh/gateway/cache",
  refreshSitemap: "/api/system/command/refresh/sitemap",
}

/** 刷新网关权限缓存 */
export async function refreshGatewayCache(
  params?: {},
  options?: { [key: string]: any },
) {
  return request<any>(api.refreshGatewayCache, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 刷新站点地图配置文件 */
export async function refreshSitemap(
  params?: {},
  options?: { [key: string]: any },
) {
  return request<any>(api.refreshSitemap, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
