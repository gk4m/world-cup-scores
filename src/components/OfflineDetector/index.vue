<template>
  <div style="display: none;"></div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'

  export default {
    name: 'offline-detector',

    data() {
      return {
        notice: {
          type: 'warning',
          message: 'Internet Connection problem. Page working in offline mode.',
          duration: 0
        }
      }
    },

    computed: {
      ...mapGetters({
        notifications: 'notification/getNotifications',
        isOnline: 'app/isOnline'
      })
    },

    methods: {
      ...mapActions({
        addNotification: 'notification/addNotification',
        removeNotification: 'notification/removeNotification',
        setAppStatus: 'app/setAppStatus'
      }),

      check() {
        if (typeof window.navigator.onLine === 'undefined') {
          this.setAppStatus(true);
        } else {
          this.setAppStatus(window.navigator.onLine);
        }

        if (this.isOnline) {
          this.removeNotification(this.notice);
        } else {
          this.addNotification(this.notice);
        }
      },
    },

    mounted() {
      window.addEventListener('online', this.check);
      window.addEventListener('offline', this.check);
    },

    destroyed() {
      window.removeEventListener('online', this.check);
      window.removeEventListener('offline', this.check);
    }
  }
</script>
