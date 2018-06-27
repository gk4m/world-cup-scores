<template>
  <div class="home-view">
    <div class="home-view__row">
      <section class="home-view__section">
        <info-bar
          v-if="todayMatches"
          title="Today matches"
          :date="todayMatches[0].datetime"/>

        <div v-for="(match, index) in todayMatches" :key="index">
          <match :match="match"/>
        </div>
      </section>

      <section class="home-view__section">
        <info-bar
          v-if="tomorrowMatches"
          title="Tomorrow matches"
          :date="tomorrowMatches[0].datetime"/>

        <div v-for="(match, index) in tomorrowMatches" :key="index">
          <match :match="match"/>
        </div>
      </section>
    </div>

    <videos-widget v-if="todayMatches && tomorrowMatches"/>

    <loading-spinner v-if="!todayMatches && !tomorrowMatches"/>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import Match from '@/components/Match'
  import InfoBar from '@/components/InfoBar'
  import VideosWidget from '@/components/VideosWidget'
  import LoadingSpinner from '@/components/LoadingSpinner'

  export default {
    name: 'Home',

    components: {
      VideosWidget,
      Match,
      InfoBar,
      LoadingSpinner
    },

    data() {
      return {
        videos: ''
      }
    },

    computed: {
      ...mapGetters(
        'app', {
          todayMatches: 'getTodayMatches',
          tomorrowMatches: 'getTomorrowMatches',
        }
      ),
    },

    methods: {
      ...mapActions(
        'app', [
          'fetchTodayMatches',
          'fetchTomorrowMatches'
        ]
      ),
    },

    created() {
      this.fetchTodayMatches();
      this.fetchTomorrowMatches();

      setInterval(() => {
        this.fetchTodayMatches();
      }, 20 * 1000)
    }
  }
</script>

<style scoped lang="sass">
  .home-view
    &__section
      margin: 5px 5px 20px

</style>
