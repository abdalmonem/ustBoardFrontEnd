import { createStore } from 'vuex';

export default createStore({
  state: {
    isLogin: false,
    id: null,
    authKey: null,
    myData: {},
  },
  getters: {
    isLogin(state) {
      return state.isLogin;
    },
    id(state) {
      return state.id;
    },
    authKey(state) {
      return state.authKey;
    },
    myData(state) {
      return state.myData;
    },
  },
  mutations: {
    myData(state, { data }) {
      this.state.myData = data;
    },
  },
  actions: {
    init() {
      if (localStorage.getItem('id') !== null && localStorage.getItem('authKey') !== null) {
        this.state.id = localStorage.getItem('id');
        this.state.authKey = localStorage.getItem('authKey');
        this.state.isLogin = true;
      }
    },
    saveLogin(state, { id, authKey }) {
      localStorage.setItem('id', id);
      localStorage.setItem('authKey', authKey);
      this.state.id = id;
      this.state.authKey = authKey;
      this.state.isLogin = true;
    },
    logout() {
      this.state.id = null;
      this.state.authKey = null;
      this.state.isLogin = false;
      this.state.myData = {};
      localStorage.removeItem('id');
      localStorage.removeItem('authKey');
    },
  },
});
