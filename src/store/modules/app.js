import api from "@/api";
import axios from "axios";
import _ from "lodash";

const checkLastUpdate = function(lastUpdate, expired = 20) {
  if (lastUpdate) {
    const currentDate = new Date();
    const lastUpdateDate = new Date(lastUpdate);
    const diff = parseInt((currentDate - lastUpdateDate) / 1000) / 60; //minutes

    return diff > expired;
  } else {
    return true;
  }
};

const resources = {
  GROUPS: 0,
  MATCHES: 1,
  MATCHES_TOMORROW: 2,
  PLAYER_GOAL_SCORED: 3,
  PLAYER_SAVES: 4
};

const state = {
  online: window.navigator.onLine,
  groups: null,
  matches: null,
  todayMatches: null,
  tomorrowMatches: null,
  playersGoalScored: null,
  news: null,
  resourcesUpdates: []
};

const getters = {
  getGroups: state => state.groups,
  getMatches: state => state.matches,
  getTodayMatches: state => state.todayMatches,
  getTomorrowMatches: state => state.tomorrowMatches,
  getPlayersGoalScored: state => state.playersGoalScored,
  getResourcesUpdates: state => state.resourcesUpdates,
  getNews: state => state.news,
  isOnline: state => state.online
};

const mutations = {
  SET_GROUPS(state, groups) {
    state.groups = groups;
  },

  SET_MATCHES(state, matches) {
    matches = _.orderBy(matches, ["datetime"], ["asc"]);
    state.matches = matches;
  },

  SET_TODAY_MATCHES(state, matches) {
    state.todayMatches = matches;
  },

  SET_TOMORROW_MATCHES(state, matches) {
    state.tomorrowMatches = matches;
  },

  SET_PLAYER_GOAL_SCORED(state, data) {
    state.playersGoalScored = data;
  },

  SET_NEWS(state, data) {
    state.news = data;
  },

  SET_RESOURCE_UPDATE(state, resource) {
    state.resourcesUpdates[resource] = new Date();
  },

  SET_APP_STATUS(state, status) {
    state.online = status;
  }
};

const actions = {
  async fetchMatches({ commit, getters }) {
    const lastUpdate = getters.getResourcesUpdates[resources.MATCHES];

    if (navigator.onLine && checkLastUpdate(lastUpdate)) {
      try {
        const response = await api.worldCup.getAllMatches();

        commit("SET_MATCHES", response.data);
        commit("SET_RESOURCE_UPDATE", resources.MATCHES);
      } catch (e) {
        console.log(e);
      }
    }
  },

  async fetchTodayMatches({ commit }) {
    if (navigator.onLine) {
      try {
        const response = await api.worldCup.getTodayMatches();
        commit("SET_TODAY_MATCHES", response.data);
      } catch (e) {
        console.log(e);
      }
    }
  },

  async fetchTomorrowMatches({ commit, getters }) {
    const lastUpdate = getters.getResourcesUpdates[resources.MATCHES_TOMORROW];

    if (navigator.onLine && checkLastUpdate(lastUpdate, 240)) {
      try {
        const response = await api.worldCup.getTomorrowMatches();

        commit("SET_TOMORROW_MATCHES", response.data);
        commit("SET_RESOURCE_UPDATE", resources.MATCHES_TOMORROW);
      } catch (e) {
        console.log(e);
      }
    }
  },

  async fetchGroups({ commit, getters }) {
    const lastUpdate = getters.getResourcesUpdates[resources.GROUPS];

    if (navigator.onLine && checkLastUpdate(lastUpdate)) {
      try {
        const response = await api.worldCup.getTeamsGroupResults();

        commit("SET_GROUPS", response.data);
        commit("SET_RESOURCE_UPDATE", resources.GROUPS);
      } catch (e) {
        console.log(e);
      }
    }
  },

  async fetchPlayersGoalScored({ commit, getters }) {
    const lastUpdate =
      getters.getResourcesUpdates[resources.PLAYER_GOAL_SCORED];

    if (navigator.onLine && checkLastUpdate(lastUpdate, 60)) {
      try {
        const data = await api.fifacom.getPlayersGoalScored();

        commit("SET_PLAYER_GOAL_SCORED", data);
        commit("SET_RESOURCE_UPDATE", resources.PLAYER_GOAL_SCORED);
      } catch (e) {
        console.log(e);
      }
    }
  },

  async fetchNews({ commit }) {
    if (navigator.onLine) {
      try {
        const response = await axios.get(
          "https://fifa-2018-apis.herokuapp.com/fifa/news"
        );

        commit("SET_NEWS", response.data.data.slice(0, 5));
      } catch (e) {
        console.log(e);
      }
    }
  },

  setAppStatus({ commit }, status) {
    commit("SET_APP_STATUS", status);
  },

  init({ dispatch }) {}
};

const module = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};

export default module;
