import fs from 'node:fs'

import { momentService, fileService } from '@/service'

import { IMomentController } from './types'
import { PICTURE_PATH } from '@/constants/file-path'

const momentController: IMomentController = {
  async create(ctx, next) {
    // 1.获取参数
    const userId = ctx.user.id
    const { content } = ctx.request.body

    // 2.创建内容
    const result = await momentService.create(userId, content)

    ctx.body = result
  },
  async detail(ctx, next) {
    const momentId = ctx.params.momentId

    // 获取单条内容
    const result = await momentService.getMomentById(momentId)

    ctx.body = result
  },
  async list(ctx, next) {
    const { offset, size } = ctx.query

    // 获取内容列表
    const result = await momentService.getMomentList(
      offset as string,
      size as string
    )

    ctx.body = result
  },
  async update(ctx, next) {
    const { momentId } = ctx.params
    const { content } = ctx.request.body

    // 更新内容
    const result = await momentService.update(momentId, content)

    ctx.body = result
  },
  async remove(ctx, next) {
    const { momentId } = ctx.params

    const result = await momentService.remove(momentId)

    ctx.body = result
  },
  async addLabels(ctx, next) {
    // 1.获取参数
    const { labels } = ctx
    const { momentId } = ctx.params

    // 2.添加所有的标签
    for (const label of labels) {
      // 2.1 判断标签是否和动态有关系
      const isExists = await momentService.hasLabel(momentId, label.id)
      if (!isExists) {
        await momentService.addLabels(momentId, label.id)
      }
    }

    ctx.body = '成功给动态添加标签~'
  },
  async fileInfo(ctx, next) {
    let { filename } = ctx.params

    const fileInfoResult = await fileService.getFileByFilename(filename)

    const { type } = ctx.query
    const types = ['large', 'middle', 'small']
    if (types.some((item) => item === type)) {
      filename += '-' + type
    }

    ctx.response.set('Content-Type', fileInfoResult.mimetype)
    ctx.body = fs.createReadStream(`${PICTURE_PATH}/${filename}`)
  }
}

export default momentController
