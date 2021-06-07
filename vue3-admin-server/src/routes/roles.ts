import Router from '@koa/router'
import {
  addRoleController,
  getAllRoleController,
  updateRoleController,
  removeRoleController
} from '../controller/roles'

const router = new Router({
  prefix: '/api/role'
})

/**
* 添加角色
* post /api/role
*/

router.post('/', async ctx => {
  ctx.body = await addRoleController(ctx.request.body)
})

/**
* 获取全部角色
* get /api/role
*/
router.get('/', async ctx => {
  const { pageNum = 0, pageSize = 10 } = ctx.request.query
  ctx.body = await getAllRoleController({
    offset: Number(pageNum),
    limit: Number(pageSize)
  })
})

/**
* 编辑角色
* put /api/role/:id
*/
router.put('/:id', async ctx => {
  const { id } = ctx.params
  ctx.body = await updateRoleController(Number(id), ctx.request.body)
})

/**
* 删除角色
* delete /api/role/:id
*/
router.delete('/:id', async ctx => {
  const { id } = ctx.params
  ctx.body = await removeRoleController(Number(id))
})

export default router
