import Router from '@koa/router'
import { loginController, registerController, userInfoController } from '../controller/auth'

const router = new Router({
  prefix: '/api/auth'
})

/**
* 测试接口
**/

router.get('/test', async ctx => {
  ctx.body = '只是个测试接口'
})

/**
 * 用户注册接口
 * /auth/register
 */
router.post('/register', async ctx => {
  ctx.body = await registerController(ctx.request.body)
})

/**
 * 用户登录
 * /auth/login
 */
router.post('/login', async ctx => {
  const { username, password } = ctx.request.body
  ctx.body = await loginController({ username, password })
})

/**
* /auth/info
* 根据token获取用户信息
*/

router.post('/info', async ctx => {
  const token = ctx.header.authorization || ctx.request.body.token
  ctx.body = await userInfoController(token)
})

export default router
