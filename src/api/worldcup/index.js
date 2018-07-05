import request from './request';

export default {

  getTeamsGroupResults: function () {
    return request.get('teams/group_results')
  },

  getAllMatches: function () {
    return request.get('matches')
  },

  getTodayMatches: function () {
    return request.get('matches/today')
  },

  getTomorrowMatches: function () {
    return request.get('matches/tomorrow')
  },
};
