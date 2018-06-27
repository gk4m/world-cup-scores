<template>
  <div id="app" class="app">
    <notification
      v-for="notification in notifications"
      :key="notification.id"
      :message="notification.message"
      :type="notification.type"
      :duration="notification.duration"
      v-on:close-notification="removeNotification(notification)">
    </notification>

    <offline-detector/>
    <header-bar/>
    <main-nav/>

    <div class="app__content">
      <router-view/>
      <back-to-top/>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import OfflineDetector from '@/components/OfflineDetector/'
  import HeaderBar from '@/components/HeaderBar/'
  import MainNav from '@/components/MainNav/'
  import Notification from '@/components/Notification/'
  import BackToTop from '@/components/BackToTop/'

  export default {
    name: 'app',

    components: {
      OfflineDetector,
      Notification,
      HeaderBar,
      MainNav,
      BackToTop
    },

    computed: {
      ...mapGetters({
        notifications: 'notification/getNotifications'
      })
    },

    methods: {
      ...mapActions({
        init: 'app/init',
      })
    },
    mounted() {
      this.init();
    }
  }
</script>

<style lang="sass">
  @import url('https://fonts.googleapis.com/css?family=Open+Sans')
  @import '~normalize-scss/sass/normalize'

  +normalize

  html
    box-sizing: border-box
    font-family: 'Open Sans', sans-serif

  // Set box-sizing globally to handle padding and border widths
  *,
  *::before,
  *::after
    box-sizing: inherit

  body
    background: $c-gray-light

  button
    background: none
    border: 0
    padding: 0

  ul
    margin: 0
    padding: 0
    list-style: none

  a
    text-decoration: none

  .app
    &__content
      max-width: 960px
      min-height: calc(100vh - 147px)
      overflow-y: auto
      margin: 10px auto
      padding: 15px 10px
      background: $c-white

  +breakpoint(small only)
    .app
      &__content
        padding-bottom: 70px

      .main-nav
        position: fixed
        left: 0
        right: 0
        bottom: 0
        margin: 0 auto

</style>
