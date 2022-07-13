import errorType from '@/constants/error-type'

import type { ParameterizedContext } from 'koa'

const errorHandle = (error: Error, ctx: ParameterizedContext) => {
  let status: number, message: string

  switch (error.message) {
    case errorType.NAME_OR_PASSWORD_IS_REQUIRED:
      status = 400 // bad request
      message = '账号或密码不能为空~'
      break

    case errorType.USER_ALREADY_EXISTS:
      status = 409 // coflict
      message = '用户名已存在~'
      break

    case errorType.USER_DOES_NOT_EXISTS:
      status = 400 // 参数
      message = '用户名不存在~'
      break

    case errorType.PASSWORD_IS_INCORRENT:
      status = 400 // 参数
      message = '密码是错误的~'
      break

    case errorType.UNAUTHORIZATION:
      status = 401 // 未授权
      message = '无效的token~'
      break

    case errorType.NOT_PERMISSION:
      status = 403 // 权限不够
      message = '操作权限不够~'
      break

    default:
      status = 404
      message = 'NOT FOUND~'
      break
  }

  ctx.status = status
  ctx.body = message
}

export default errorHandle
