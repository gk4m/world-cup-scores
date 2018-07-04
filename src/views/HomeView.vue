<template>
  <div class="home-view">
    <div class="home-view__row">
      <div class="home-view__left">
        <section class="home-view__section">
          <info-bar
            title="Today matches"
            :date="new Date()"/>
          <div v-if="todayMatches" v-for="(match, index) in todayMatches" :key="index">
            <match :match="match"/>
          </div>
          <p  v-if="!todayMatches">There are no matches today</p>
        </section>

        <section class="home-view__section">
          <info-bar
            title="Tomorrow matches"
            :date="new Date() | moment('add', '1 days')"/>

          <div v-if="tomorrowMatches" v-for="(match, index) in tomorrowMatches" :key="index">
            <match :match="match"/>
          </div>

          <p v-if="!todayMatches">There are no matches today</p>
        </section>
      </div>

      <div class="home-view__right">
        <news-widget class="home-view__section"/>
      </div>
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
  import NewsWidget from '@/components/NewsWidget'
  import LoadingSpinner from '@/components/LoadingSpinner'

  export default {
    name: 'HomeView',

    components: {
      VideosWidget,
      NewsWidget,
      Match,
      InfoBar,
      LoadingSpinner
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
      )
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
    &__row
      display: flex
      flex-wrap: wrap

    &__left
      width: 100%

    &__right
      width: 100%

    &__section
      margin: 5px 5px 20px

  +breakpoint(medium)
    .home-view
      &__row
        flex-wrap: nowrap

      &__left
        width: 60%
        margin-right: 15px

      &__right
        width: 40%

</style>
