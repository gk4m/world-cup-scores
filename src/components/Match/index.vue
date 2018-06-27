<template>
  <div class="match">
    <match-item @click.native="onItemClick" :match="match" :class="itemClass"/>

    <div class="match__details" v-if="detailsActive">
      <tabs :options="{ useUrlFragment: false }">
        <tab name="Match info">
          <match-events
            :homeTeam="match.home_team_events"
            :awayTeam="match.away_team_events"
          />
          <p v-if="!match.home_team_events.length && !match.away_team_events.length">There is no information.</p>
        </tab>
        <tab name="Statistics">
          <match-statistic
            :homeTeam="match.home_team_statistics"
            :awayTeam="match.away_team_statistics"
          />
          <p v-if="!match.home_team_statistics && !match.away_team_statistics">There is no information.</p>
        </tab>
      </tabs>
    </div>
  </div>
</template>

<script>
  import MatchItem from '@/components/MatchItem'
  import MatchEvents from '@/components/MatchEvents'
  import MatchStatistic from '@/components/MatchStatistic'

  export default {
    name: 'Match',

    components: {
      MatchItem,
      MatchEvents,
      MatchStatistic
    },

    props: {
      match: {
        required: true
      }
    },

    data() {
      return {
        detailsActive: false
      }
    },

    computed: {
      itemClass() {
        return {
          'match-item--active-details': this.detailsActive,
          'match-item--not-available-details': !(this.match.home_team_events && this.match.home_team_statistics),
        }
      }
    },

    methods: {
      onItemClick() {
        if (this.match.home_team_events.length || this.match.home_team_statistics) {
          this.detailsActive = !this.detailsActive;
        }
      }
    }
  }
</script>

<style lang="sass">
  .match
    .tabs-component-tabs
      display: flex

    .tabs-component-tab
      display: flex
      width: 100%
      background: $c-blue-dark
      text-align: center

      &.is-active
        background: $c-blue

      a
        width: 100%
        padding: 8px 5px
        font-size: 12px
        color: $c-white

    .tabs-component-panels
      margin: 10px 0

  +breakpoint(medium)
    .match
      .tabs-component-tab
        a
          font-size: 16px

</style>
