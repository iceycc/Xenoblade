/* eslint-disable camelcase */
import { Module, MutationTree, ActionTree } from 'vuex'
import { IRootState } from '../index'
import { addRole, getRoles, removeRole, RoleParams, updateRole } from '../../api/role'

export interface IRoleAccess {
  id: number;
  role_id: number;
  access_id: number;
}

export type IRoleAccessList = IRoleAccess[]

export interface IRole {
  id: number;
  name: string;
  description: string;
  is_default: boolean;
  createdAt: string;
  updatedAt: string;
}

// 定义state类型
export interface IRoleState {
  roles: IRole[];
  count: number;
}

// mutations类型
type IMutations = MutationTree<IRoleState>

// actions类型
type IActions = ActionTree<IRoleState, IRootState>

// 定义state
const state: IRoleState = {
  roles: [],
  count: 0
}

// 定义mutation
const mutations: IMutations = {
  SET_ROLES(state, data: IRoleState['roles']) {
    state.roles = data
  },
  SET_COUNT(state, count: number) {
    state.count = count
  }
}
type ActionRoleParams = IRole & {
  pageSize: number;
  pageNum: number;
}
// 定义actions
const actions: IActions = {
  getRoles({ commit }, params: RoleParams) {
    return new Promise<void>((resolve, reject) => {
      getRoles(params).then(res => {
        const { data } = res
        commit('SET_ROLES', data.roles)
        commit('SET_COUNT', data.count)
        resolve()
      }).catch(reject)
    })
  },
  addRole({ dispatch }, data: ActionRoleParams) {
    return new Promise<void>((resolve, reject) => {
      const { pageSize, pageNum, ...params } = data
      addRole(params).then(res => {
        if (res.code === 0) {
          dispatch('getRoles', {
            pageSize,
            pageNum
          })
        }
        resolve()
      }).catch(reject)
    })
  },
  editRole({ dispatch }, data: ActionRoleParams) {
    return new Promise<void>((resolve, reject) => {
      const { pageSize, pageNum, ...params } = data
      updateRole(params.id, params).then(res => {
        if (res.code === 0) {
          dispatch('getRoles', {
            pageSize,
            pageNum
          })
        }
        resolve()
      }).catch(reject)
    })
  },
  removeRole({ dispatch }, data: ActionRoleParams) {
    return new Promise<void>((resolve, reject) => {
      const { pageSize, pageNum, id } = data
      removeRole(id).then(res => {
        if (res.code === 0) {
          dispatch('getRoles', {
            pageSize,
            pageNum
          })
        }
        resolve()
      }).catch(reject)
    })
  }
}

// 定义menu module
const role: Module<IRoleState, IRootState> = {
  namespaced: true,
  state,
  mutations,
  actions
}

export default role
