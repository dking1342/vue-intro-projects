import createPersistedState from 'vuex-persistedstate';
import { createStore } from 'vuex';
import authentication from "./authentication";
import projects from "./projects";

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  modules: {
    authentication,
    projects,
  },
  strict: debug,
  plugins: debug ? [createPersistedState()] : [],
});
