import { Module, MutationTree, ActionTree } from 'vuex'
import { RouteRecordRaw } from 'vue-router'
import store, { IRootState } from '../index'
import { asyncRoutes } from '../../router/index'
import { MenuData } from './menu'
import path from 'path'

const generateRouteMap = (menus: Array<MenuData>): Map<string, boolean> => {
  const map = new Map<string, boolean>()
  menus.forEach(menu => {
    map.set(menu.path, true)
  })
  return map
}

const whiteList = ['/:pathMatch(.*)*']
const generateRoutes = (routes: Array<RouteRecordRaw>, routerMap: Map<string, boolean>, basePath = '/') => {
  const routerData: Array<RouteRecordRaw> = []
  routes.forEach(route => {
    const routePath = path.resolve(basePath, route.path)
    if (routerMap.has(routePath) || whiteList.includes(routePath)) {
      if (route.children) {
        route.children = generateRoutes(route.children, routerMap, routePath)
      }
      routerData.push(route)
    }
  })
  return routerData
}

const filterAsyncRoutes = (menus: Array<MenuData>, routes: Array<RouteRecordRaw>) => {
  const routerMap = generateRouteMap(menus)
  const routerList = generateRoutes(routes, routerMap)
  return routerList
}

// 定义state类型
export interface IPermissionState {
  routes: Array<RouteRecordRaw>;
  accessRoutes: Array<RouteRecordRaw>;
}

// mutations类型
type IMutations = MutationTree<IPermissionState>

// actions类型
type IActions = ActionTree<IPermissionState, IRootState>

// 定义state
const state: IPermissionState = {
  routes: [],
  accessRoutes: []
}

// 定义mutation
const mutations: IMutations = {
  SET_ROUTES(state, data: Array<RouteRecordRaw>) {
    state.routes = data
  },
  SET_ACCESS_ROUTES(state, data: Array<RouteRecordRaw>) {
    state.accessRoutes = data
  }
}

// 定义actions
const actions: IActions = {
  generateRoutes({ dispatch }, type?: number) { // 1 针对菜单排序更新
    return new Promise((resolve, reject) => {
      let accessedRoutes: Array<RouteRecordRaw> = []
      if (store.getters.roleNames.includes('super_admin')) { // 超级管理员角色
        accessedRoutes = asyncRoutes
        dispatch('menu/getAllMenuListByAdmin', null, { root: true })
        resolve(accessedRoutes)
      } else { // 根据角色过滤菜单
        const roles = store.getters.roleIds
        dispatch('menu/getAccessByRoles', roles, { root: true }).then(menus => {
          if (type !== 1) { // 菜单重新排序 不需要再过次滤路由
            accessedRoutes = filterAsyncRoutes(menus, asyncRoutes)
          }
          resolve(accessedRoutes)
        }).catch(reject)
      }
    })
  }
}

// 定义user module
const permission: Module<IPermissionState, IRootState> = {
  namespaced: true,
  state,
  mutations,
  actions
}

export default permission
