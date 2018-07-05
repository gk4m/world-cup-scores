<template>
  <div v-if="news" class="news-widget">
    <info-bar title="News"/>
    <ul>
      <li v-for="item in news" class="news-widget__list-item">
        <div class="news-widget__date">
          <div class="news-widget__day">{{new Date(item.date) | moment("DD")}}</div>
          <div>{{new Date(item.date) | moment("MMM YY")}}</div>
        </div>
        <a class="news-widget__link" :href="item.news_link" target="_blank" rel="noopener">
          {{item.news_title}}
        </a>
      </li>
    </ul>
    <a
      class="news-widget__see-more"
      href="https://www.fifa.com/worldcup/news/"
      target="_blank"
      rel="noopener">
      See more >
    </a>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import InfoBar from '@/components/InfoBar'

  export default {
    name: 'NewsWidget',

    components: {
      InfoBar
    },

    computed: {
      ...mapGetters(
        'app', {
          news: 'getNews'
        }
      ),
    },

    methods: {
      ...mapActions(
        'app', [
          'fetchNews'
        ]
      ),
    },

    created() {
      this.fetchNews();
    }
  }
</script>

<style lang="sass">

  .news-widget
    &__list-item
      display: flex
      align-items: center
      margin: 7px
      font-size: 12px
      line-height: 16px

    &__link
      color: $c-blue-dark

      &:hover
        text-decoration: underline

    &__date
      display: inline-block
      min-width: 50px
      width: 50px
      margin-right: 10px
      padding: 3px
      border-radius: 5px
      background: $c-blue
      color: $c-white
      text-align: center
      font:
        size: 10px
        weight: bold

    &__day
      padding: 5px
      font-size: 16px
      background: $c-blue-light
      border-radius: 3px

    &__see-more
      display: block
      padding: 8px 0
      text-align: center
      font-size: 12px
      color: $c-blue

</style>
