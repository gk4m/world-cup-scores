import request from './request';

export default {

  getTeams: function () {
    return request.get('teams')
  },

  getTeamsResults: function () {
    return request.get('teams/results')
  },

  getTeamsGroupResults: function () {
    return request.get('teams/group_results')
  },

  getTeamMatches: function (code) {
    return request.get(`matches/country?fifa_code=${code}`)
  },

  getAllMatches: function () {
    return request.get(`matches`)
  },

  getTodayMatches: function () {
    return request.get(`matches/today`)
  },

  getTomorrowMatches: function () {
    return request.get(`matches/tomorrow`)
  },
};
