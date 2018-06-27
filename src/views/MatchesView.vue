<template>
  <div class="matches-view">
    <template v-if="matches" v-for="(match, index) in matches">
      <info-bar v-if="checkDate(index)" :date="match.datetime"></info-bar>
      <match :match="match"/>
    </template>

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

<style scoped lang="sass">
  .matches-view
    .header-bar
      margin-top: 10px

</style>
