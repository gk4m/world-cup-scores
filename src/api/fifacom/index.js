import request from './request';
import cheerio from 'cheerio';

export default {

  async getPlayersGoalScored() {
    const response = await request.get('statistics/players/goal-scored');
    const $ = cheerio.load(response.data);

    let data = [];

    $('#goal-scored tr').each(function (i, el) {
      const rank = +$(el).find('.fi-table__rank').text();
      const name = $(el).find('.fi-p__name').text().trim();
      const image = $(el).find('.fi-p__picture image').attr('href');
      const countrycode = $(el).find('.fi-p__flag').attr('data-countrycode');

      const $td = $(el).find('.fi-table__td');

      const goals = +$td.eq(0).text();
      const assists = +$td.eq(1).text();
      const minutesPlayed = +$td.eq(2).text();
      const matchesPlayed = +$td.eq(3).text();
      const penaltiesScored = +$td.eq(4).text();
      const goalsLeftFoot = +$td.eq(5).text();
      const goalsRightFoot = +$td.eq(6).text();
      const headGoals = +$td.eq(7).text();

      if (name) {
        data.push({
          rank,
          name,
          image,
          countrycode,
          goals,
          assists,
          minutesPlayed,
          matchesPlayed,
          penaltiesScored,
          goalsLeftFoot,
          goalsRightFoot,
          headGoals
        });
      }
    });

    return data;
  },

  async getPlayersSaves() {
    const response = await request.get('statistics/players/saves');
    const $ = cheerio.load(response.data);

    let data = [];

    $('#savers tr').each(function (i, el) {
      const rank = +$(el).find('.fi-table__rank').text();
      const name = $(el).find('.fi-p__name').text().trim();
      const image = $(el).find('.fi-p__picture image').attr('href');
      const countrycode = $(el).find('.fi-p__flag').attr('data-countrycode');

      const $td = $(el).find('.fi-table__td');

      const matchesPlayed = +$td.eq(0).text();
      const minutesPlayed = +$td.eq(1).text();
      const saves = +$td.eq(2).text();
      const saveRate = +$td.eq(3).text().replace('%', '');

      if (name) {
        data.push({
          rank,
          name,
          image,
          countrycode,
          matchesPlayed,
          minutesPlayed,
          saves,
          saveRate
        });
      }
    });

    return data;
  },

  async getNews(limit = 5) {
    try {
      const response = await request.get('news');
      const $ = cheerio.load(response.data);
      let data = [];

      $('.fi-newslist .d3-o-media-object').each(function (i, el) {
        const title = $(el).find('.d3-o-media-object__title').text();
        const date = $(el).find('.d3-o-media-object__date').text();
        const url = $(el).find('.fi-o-media-object__link').attr('href');

        data.push({
          title,
          date,
          url
        });
      });

      return data.slice(0, limit);

    } catch (e) {
      console.log(e);
    }
  }
};
