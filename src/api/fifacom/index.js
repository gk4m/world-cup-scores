import request from './request';
import cheerio from 'cheerio';

export default {
  async getPlayersGoalScored(){
    const response = await request.get('statistics/players/goal-scored');
    const $ = cheerio.load(response.data);

    let data = [];

    $('#goal-scored tr').each(function (i, el) {
      const rank = +$(el).find('.fi-table__rank').text();
      const name = $(el).find('.fi-p__name').text().trim();
      const image = $(el).find('.fi-p__picture image').attr('href');
      const countrycode = $(el).find('.fi-p__flag').attr('data-countrycode');
      const goals = +$(el).find('.fi-table__td').eq(0).text();
      const assists = +$(el).find('.fi-table__td').eq(1).text();
      const minutesPlayed = +$(el).find('.fi-table__td').eq(2).text();
      const matchesPlayed = +$(el).find('.fi-table__td').eq(3).text();
      const penaltiesScored = +$(el).find('.fi-table__td').eq(4).text();
      const goalsLeftFoot = +$(el).find('.fi-table__td').eq(5).text();
      const goalsRightFoot = +$(el).find('.fi-table__td').eq(6).text();
      const headGoals = +$(el).find('.fi-table__td').eq(7).text();

      if(name) {
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

  async getPlayersSaves(){
    const response = await request.get('statistics/players/saves');
    const $ = cheerio.load(response.data);

    let data = [];

    $('#savers tr').each(function (i, el) {
      const rank = +$(el).find('.fi-table__rank').text();
      const name = $(el).find('.fi-p__name').text().trim();
      const image = $(el).find('.fi-p__picture image').attr('href');
      const countrycode = $(el).find('.fi-p__flag').attr('data-countrycode');
      const matchesPlayed = +$(el).find('.fi-table__td').eq(0).text();
      const minutesPlayed = +$(el).find('.fi-table__td').eq(1).text();
      const saves = +$(el).find('.fi-table__td').eq(2).text();
      const saveRate = +$(el).find('.fi-table__td').eq(3).text().replace('%','');

      if(name) {
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
  }
};
