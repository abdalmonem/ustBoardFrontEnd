import data from '../../api/notifications';

const mutations = {
  setNotifications: (state, payload) => {
    state.notifications = payload;
  },
};

const actions = {
  initNotifications: ({ commit }) => {
    commit('setNotifications', data);
  },
};

const getters = {
  notifications: (state) => state.notifications,
};

const state = {
  notifications: [],
};

export default {
  state,
  mutations,
  actions,
  getters,
};
