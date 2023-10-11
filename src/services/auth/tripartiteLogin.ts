import { request } from '@umijs/max';

/** 第三方登录授权接口 **/
export function auth(url: string) {
  return request(url, {
    method: 'get',
    ...({}),
  });
}

/** 钉钉登录绑定接口 **/
export function dingtalkBound(
  authId: string,
  options?: { [key: string]: any },
) {
  const params = {
    authId: authId
  }
  return request('/api/dingtalk/login/bound', {
    method: 'post',
    data: {
      ...params,
    },
    ...(options || {}),
  });
}
