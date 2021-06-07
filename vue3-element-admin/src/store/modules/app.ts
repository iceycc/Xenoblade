import { Size } from '@/plugins/element'
import { ActionTree, Module, MutationTree } from 'vuex'
import { IRootState } from '../index'

// 定义app里state类型
export interface IAppState {
  sidebar: {
    opened: boolean
  },
  size: Size
}

// 定义mutations
const mutations: MutationTree<IAppState> = {
  TOGGLE_SIDEBAR(state) {
    state.sidebar.opened = !state.sidebar.opened
  },
  SET_SIZE(state, size: Size) {
    state.size = size
  }
}

// 定义actions
const actions: ActionTree<IAppState, IRootState> = {
  toggleSidebar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  setSize({ commit }, size: Size) {
    commit('SET_SIZE', size)
  }
}

// 定义module
const app: Module<IAppState, IRootState> = {
  namespaced: true,
  state: {
    sidebar: {
      opened: true
    },
    size: 'medium'
  },
  mutations,
  actions
}

export default app
