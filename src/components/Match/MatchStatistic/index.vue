<template>
  <div class="match-statistic" v-if="homeTeam && awayTeam">
    <stats-item
      label="Goals Attempts"
      :away-val="homeTeam.attempts_on_goal"
      :home-val="awayTeam.attempts_on_goal"/>

    <stats-item
      label="Shots on target"
      :away-val="homeTeam.on_target"
      :home-val="awayTeam.on_target"/>

    <stats-item
      label="Shots off target"
      :away-val="homeTeam.off_target"
      :home-val="awayTeam.off_target"/>

    <stats-item
      label="Possession %"
      :away-val="homeTeam.ball_possession"
      :home-val="awayTeam.ball_possession"/>

    <stats-item
      label="Balls recovered"
      :away-val="homeTeam.balls_recovered"
      :home-val="awayTeam.balls_recovered"/>

    <stats-item
      label="Corners"
      :away-val="homeTeam.corners"
      :home-val="awayTeam.corners"/>

    <stats-item
      label="Passes"
      :away-val="homeTeam.num_passes"
      :home-val="awayTeam.num_passes"/>

    <stats-item
      label="Passes completed"
      :away-val="homeTeam.passes_completed"
      :home-val="awayTeam.passes_completed"/>

    <stats-item
      label="Fouls"
      :away-val="homeTeam.fouls_committed"
      :home-val="awayTeam.fouls_committed"/>

    <stats-item
      label="Yellow cards"
      :away-val="homeTeam.yellow_cards"
      :home-val="awayTeam.yellow_cards"/>

    <stats-item
      label="Red cards"
      :away-val="homeTeam.red_cards"
      :home-val="awayTeam.red_cards"/>

    <stats-item
      label="Offsides"
      :away-val="homeTeam.offsides"
      :home-val="awayTeam.offsides"/>
  </div>
</template>

<script>
  import StatsItem from './StatsItem'

  export default {
    name: 'MainStatistic',

    components: {
      StatsItem
    },

    props: {
      homeTeam: {
        required: true
      },
      awayTeam: {
        required: true
      }
    }
  }
</script>

<style lang="sass" scoped>
  .match-statistic
    .stats-item
      margin-bottom: 5px

</style>
