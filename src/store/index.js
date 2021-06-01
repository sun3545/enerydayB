import Vue from 'vue';
import Vuex from 'vuex';
import { getUserCookie, setCookie, removeUserCookie } from '@/utils/cookie';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    //   左侧导航栏状态切换
    collapsed: false,
    // 用户信息
    user: getUserCookie(),
    // 存储菜单的路由
    menuRoutes: [],
    // 添加商品 和 表单回填
  },
  mutations: {
    setCollapsed(state) {
      state.collapsed = !state.collapsed;
    },
    setUserInfo(state, userInfo) {
      state.user = userInfo;
    },
    logout(state) {
      state.user = {
        username: '',
        role: '',
        email: '',
        appkey: '',
      };
    },
    setMenuRoutes(state, routes) {
      state.menuRoutes = routes;
    },

  },
  actions: {
    changeCollapsed({ commit }) {
      commit('setCollapsed');
    },
    A_setUserInfo({ commit }, userInfo) {
      commit('setUserInfo', userInfo);
      setCookie(userInfo);
    },
    A_logout({ commit }) {
      commit('logout');
      removeUserCookie();
    },
    A_setMenuRoutes({ commit }, routes) {
      commit('setMenuRoutes', routes);
    },
  },
  modules: {
  },
});
