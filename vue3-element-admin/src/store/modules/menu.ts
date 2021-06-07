import { Module, MutationTree, ActionTree } from 'vuex'
import { IRootState } from '@/store'
import { getAllMenus } from '@/api/menu'
import generateTree from '@/utils/generateTree'
import generateMenuTree from '@/utils/generateMenuTree'
import { getAccessByRoles } from '@/api/roleAccess'

/* eslint-disable camelcase */
export interface MenuData {
  id: number;
  title: string;
  path: string;
  name: string;
  icon: string;
  parent_id: string | number;
  sort_id: number;
}

export interface ITreeItemData extends MenuData {
  children?: ITreeItemData[]
}

// state类型
export interface IMenusState {
  menuTreeData: Array<ITreeItemData>; // 树形菜单数据
  menuList: Array<MenuData>; // 原始菜单列表数据
  authMenuTreeData: Array<ITreeItemData>; // 树形菜单数据
  authMenuList: Array<MenuData>; // 原始菜单列表数据
}

// mutations类型
type IMutations = MutationTree<IMenusState>

// actions类型
type IActions = ActionTree<IMenusState, IRootState>

// 定义state
const state: IMenusState = {
  menuTreeData: [],
  menuList: [],
  authMenuTreeData: [],
  authMenuList: []
}

// 定义mutations
const mutations: IMutations = {
  SET_MENU_LIST(state, data: IMenusState['menuList']) {
    state.menuList = data
  },
  SET_MENU_TREE_DATA(state, data: IMenusState['menuTreeData']) {
    state.menuTreeData = data
  },
  SET_AUTH_MENU_LIST(state, data: IMenusState['menuList']) {
    state.authMenuList = data
  },
  SET_AUTH_MENU_TREE_DATA(state, data: IMenusState['menuTreeData']) {
    state.authMenuTreeData = data
  }
}

// 定义actions
const actions: IActions = {
  getAllMenuList({ dispatch, commit }) {
    return new Promise<MenuData[]>((resolve, reject) => {
      getAllMenus().then(response => {
        const { data } = response
        dispatch('generateTreeData', [...data])
        commit('SET_MENU_LIST', data)
        resolve([...data])
      }).catch(reject)
    })
  },
  generateTreeData({ commit }, data: IMenusState['menuList']) {
    const treeData = generateTree(data)
    commit('SET_MENU_TREE_DATA', treeData)
  },
  generateAuthTreeData({ commit }, data: IMenusState['menuList']) {
    const treeData = generateMenuTree(data)
    commit('SET_AUTH_MENU_TREE_DATA', treeData)
  },
  getAllMenuListByAdmin({ dispatch, commit }) {
    return new Promise<MenuData[]>((resolve, reject) => {
      getAllMenus().then(response => {
        const { data } = response
        dispatch('generateAuthTreeData', [...data])
        commit('SET_AUTH_MENU_LIST', data)
        resolve([...data])
      }).catch(reject)
    })
  },
  getAccessByRoles({ dispatch, commit }, roles: number[]) {
    return new Promise<MenuData[]>((resolve, reject) => {
      getAccessByRoles(roles).then(response => {
        const { access } = response.data
        dispatch('generateAuthTreeData', [...access])
        commit('SET_AUTH_MENU_LIST', access)
        resolve([...access])
      }).catch(reject)
    })
  }
}

// 定义menu module
const menu: Module<IMenusState, IRootState> = {
  namespaced: true,
  state,
  mutations,
  actions
}

export default menu
