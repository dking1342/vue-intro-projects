import createPersistedState from 'vuex-persistedstate';
import { createStore } from 'vuex';

const plugin = createPersistedState();

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
  plugins: [plugin],
});
