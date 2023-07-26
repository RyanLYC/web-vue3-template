import type { AxiosPromise } from 'axios'
import request from '@/utils/request'

export interface LoginParamsI {
  username: string
  password: string
}

export interface IAuthInfo {
  /**token */
  access_token: string
}

/** 使用校验码进行登录 */
export function loginByPasswordWithCode(
  data: LoginParamsI
): AxiosPromise<IAuthInfo> {
  return request({
    url: `/auth/v1/uaa/loginByPasswordWithCode`,
    method: 'post',
    data,
  })
}
