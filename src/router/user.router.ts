import Router from '@koa/router'

import { userController } from '@/controller'
import { verifyUser, handlePassword } from '@/middleware/user.middleware'

const userRouter = new Router({ prefix: '/users' })

userRouter.post('/', verifyUser, handlePassword, userController.create)
userRouter.get('/:userId/avatar', userController.avatarInfo)

export default userRouter
