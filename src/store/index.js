import Vue from 'vue';
import Vuex from 'vuex';
import vuexPersistedstate from 'vuex-persistedstate';

import app from './modules/app';
import notification from './modules/notification';

const debug = process.env.NODE_ENV !== 'production';

Vue.use(Vuex);

const persistedState = vuexPersistedstate({
  key: 'world_cup_app_state',
  reducer: state => ({
    app: state.app,
  }),
});

export default new Vuex.Store({
  modules: {
    app,
    notification
  },
  plugins: [persistedState],
  strict: debug
});
