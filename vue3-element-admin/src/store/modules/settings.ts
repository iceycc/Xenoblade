import { MutationTree, ActionTree } from 'vuex'
import variables from '@/styles/variables.scss'
import { IRootState } from '@/store'

export interface ISettingsState {
  theme: string;
  tagsView: boolean;
  originalStyle: string;
  sidebarLogo: boolean;
}

// 定义state
const state: ISettingsState = {
  theme: variables.theme,
  tagsView: true,
  originalStyle: '',
  sidebarLogo: true
}

// 动态key的情况下 根据不同的key 约束对应value
// http://www.voidcn.com/article/p-wtmkdcie-byz.html
type ValueOf<T> = T[keyof T];
interface ISettings { // 约束payload类型
  key: keyof ISettingsState; // 约束为ISettingsState中key
  value: ValueOf<ISettingsState>; // 约束为ISettingsState中value的类型
}
// 定义mutations
const mutations: MutationTree<ISettingsState> = {
  CHANGE_SETTING(state, { key, value }: ISettings) {
    if (key in state) {
      (state[key] as ValueOf<ISettingsState>) = value
    }
  }
}

const actions: ActionTree<ISettingsState, IRootState> = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
