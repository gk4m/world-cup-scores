import request from './request';

export default {

  getVideosFromPlaylist: function (playlistId, maxResults = 2, pageToken) {
    return request.get('playlistItems', {
      params: {
        playlistId,
        maxResults,
        pageToken
      }
    })
  },
};
