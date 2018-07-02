<template>
  <div class="matches-view">

    <tabs :options="{ useUrlFragment: false }">
      <tab name="Group phase">
        <template v-for="(match, index) in matches" v-if="matches && match.stage_name === 'First stage'" >
          <info-bar v-if="checkDate(index)" :date="match.datetime"></info-bar>
          <match :match="match"/>
        </template>
      </tab>
      <tab name="1/8 finals">
        <template v-for="(match, index) in matches" v-if="matches && match.stage_name === 'Round of 16'" >
          <info-bar v-if="checkDate(index)" :date="match.datetime"></info-bar>
          <match :match="match"/>
        </template>
      </tab>
      <tab name="Quarter finals">
        <template v-for="(match, index) in matches" v-if="matches && match.stage_name === 'Quarter-finals'" >
          <info-bar v-if="checkDate(index)" :date="match.datetime"></info-bar>
          <match :match="match"/>
        </template>
      </tab>
      <tab name="Semi finals">
        <template v-for="(match, index) in matches" v-if="matches && match.stage_name === 'Semi-finals'" >
          <info-bar v-if="checkDate(index)" :date="match.datetime"></info-bar>
          <match :match="match"/>
        </template>
      </tab>
      <tab name="Final">
        <template v-for="(match, index) in matches" v-if="matches && match.stage_name === 'Final'" >
          <info-bar v-if="checkDate(index)" :date="match.datetime"></info-bar>
          <match :match="match"/>
        </template>
      </tab>
    </tabs>

    <loading-spinner v-if="!matches" />
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import Match from '@/components/Match'
  import InfoBar from '@/components/InfoBar'
  import LoadingSpinner from '@/components/LoadingSpinner'

  export default {
    name: 'MatchesView',

    components: {
      Match,
      InfoBar,
      LoadingSpinner
    },

    computed: {
      ...mapGetters(
        'app', {
          matches: 'getMatches',
        }
      ),
    },

    methods: {
      ...mapActions({
        fetchMatches: 'app/fetchMatches',
      }),

      checkDate(index) {
        if (this.matches[index] && this.matches[index - 1]) {
          let current = this.matches[index].datetime;
          let prev = this.matches[index - 1].datetime;

          current = this.$moment(current).format('MM-DD-YYYY');
          prev = this.$moment(prev).format('MM-DD-YYYY');

          if (current === prev) {
            return false
          }
        }

        return true;
      }
    },

    created() {
      this.fetchMatches()
    }
  }
</script>

<style lang="sass">
  .matches-view
    .header-bar
      margin-top: 10px

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
