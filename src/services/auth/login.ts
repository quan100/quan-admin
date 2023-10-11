// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 发送验证码 POST /api/login/captcha */
export async function getFakeCaptcha(
  params: {
    // query
    /** 手机号 */
    phone?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.FakeCaptcha>('/api/login/captcha', {
    method: 'POST',
    data: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取图片验证码 POST /api/manager/auth/captcha */
export function getImgCaptcha() {
  return request('/api/manager/auth/captcha', {
    method: 'GET',
    ...({}),
    responseType: 'arraybuffer',
  });
}

/** 发送邮箱验证码 POST /api/manager/auth/email/captcha */
export async function getEmailCaptcha(
  params: {
    email?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.Result<string>>('/api/manager/auth/email/captcha', {
    method: 'POST',
    data: {
      ...params,
    },
    ...(options || {}),
  });
}
