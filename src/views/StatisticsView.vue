<template>
  <div class="stats-view">

    <tabs v-if="playersGoalScored && playersSaves" :options="{ useUrlFragment: false }">
      <tab name="Goals scored">
        <data-table
          :headers="headersGoals"
          :items="playersGoalScored"
          :headerShortcuts="true"
        >
          <template slot="items" slot-scope="props">
            <td>{{ props.item.rank }}</td>
            <td class="table__player">
              <div class="table__player__img">
                <img class="table__player__avatar" :src="props.item.image"/>
                <img class="table__player__flag"
                     :src="require(`@/assets/img/flags/${props.item.countrycode.toLowerCase()}.png`)" alt=""/>
              </div>
              <div class="table__player__name">
                {{props.item.name}}
              </div>
            </td>
            <td>{{props.item.goals}}</td>
            <td>{{props.item.assists}}</td>
            <td>{{props.item.minutesPlayed}}</td>
            <td>{{props.item.matchesPlayed}}</td>
            <td>{{props.item.penaltiesScored}}</td>
            <td>{{props.item.goalsLeftFoot}}</td>
            <td>{{props.item.goalsRightFoot}}</td>
            <td>{{props.item.headGoals}}</td>
          </template>
        </data-table>

      </tab>
      <tab name="Top saves">
        <data-table
          :headers="headersSaves"
          :items="playersSaves"
          :headerShortcuts="true"
        >
          <template slot="items" slot-scope="props">
            <td>{{ props.item.rank }}</td>
            <td class="table__player">
              <div class="table__player__img">
                <img class="table__player__avatar" :src="props.item.image"/>
                <img class="table__player__flag"
                     :src="require(`@/assets/img/flags/${props.item.countrycode.toLowerCase()}.png`)" alt=""/>
              </div>
              <div class="table__player__name">
                {{props.item.name}}
              </div>
            </td>
            <td>{{props.item.matchesPlayed}}</td>
            <td>{{props.item.minutesPlayed}}</td>
            <td>{{props.item.saves}}</td>
            <td>{{props.item.saveRate}}%</td>
          </template>
        </data-table>
      </tab>
    </tabs>

    <loading-spinner v-if="!playersGoalScored && !playersSaves"/>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import DataTable from '@/components/DataTable'
  import LoadingSpinner from '@/components/LoadingSpinner'

  export default {
    name: 'StatisticsView',

    components: {
      DataTable,
      LoadingSpinner
    },

    data() {
      return {
        headersGoals: [
          {
            text: '#',
            short: '#',
            value: 'rank'
          },
          {
            text: 'Player',
            short: 'Player',
            value: 'name'
          },
          {
            text: 'Goals scored',
            short: 'gs',
            value: 'goals'
          },
          {
            text: 'Assists',
            short: 'Ass',
            value: 'assists'
          },
          {
            text: 'Minutes played',
            short: 'MinP',
            value: 'minutesPlayed'
          },
          {
            text: 'Matches Played',
            short: 'MP',
            value: 'matchesPlayed'
          },
          {
            text: 'Penalties scored',
            short: 'PS',
            value: 'penaltiesScored'
          },
          {
            text: 'Goals left foot',
            short: 'Left',
            value: 'goalsLeftFoot'
          },
          {
            text: 'Goals right foot',
            short: 'Right',
            value: 'goalsRightFoot'
          },
          {
            text: 'Head goals',
            short: 'Head',
            value: 'headGoals'
          }
        ],
        headersSaves: [
          {
            text: '#',
            short: '#',
            value: 'rank'
          },
          {
            text: 'Player',
            short: 'Player',
            value: 'name'
          },
          {
            text: 'Matches Played',
            short: 'MP',
            value: 'matchesPlayed'
          },
          {
            text: 'Minutes played',
            short: 'MinP',
            value: 'minutesPlayed'
          },
          {
            text: 'Saves',
            short: 'S',
            value: 'saves'
          },
          {
            text: 'Save rate',
            short: 'SR',
            value: 'saveRate'
          }
        ]
      }
    },

    computed: {
      ...mapGetters(
        'app', {
          playersGoalScored: 'getPlayersGoalScored',
          playersSaves: 'getPlayersSaves',
        }
      ),
    },

    methods: {
      ...mapActions({
        fetchPlayersGoalScored: 'app/fetchPlayersGoalScored',
        fetchPlayersSaves: 'app/fetchPlayersSaves',
      }),
    },

    created() {
      this.fetchPlayersGoalScored();
      this.fetchPlayersSaves();
    }
  }
</script>

<style lang="sass">
  .stats-view
    .tabs-component-tabs
      display: flex
      margin-bottom: 10px

    .tabs-component-tab
      display: flex

      &.is-active
        border-bottom: 2px solid $c-blue

      a
        padding: 6px 8px
        font-size: 12px
        color: $c-blue

</style>
