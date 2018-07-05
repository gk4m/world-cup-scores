<template>
  <div v-if="videos && isOnline" class="videos-widget">
    <h4 class="videos-widget__title">FIFATV Videos</h4>

    <div class="videos-widget__inner">
      <div class="videos-widget__video" v-for="(item, index) in videos.items" :key="index">
        <a class="videos-widget__link" :href="'https://www.youtube.com/watch?v='+ item.contentDetails.videoId" target="_blank" rel="noopener">
          <img class="videos-widget__img" v-lazy="item.snippet.thumbnails.high.url" alt=""/>
          <div class="videos-widget__v-title">{{item.snippet.title}}</div>
        </a>
      </div>
    </div>

    <div class="videos-widget__bottom">
      <button class="js-load-more videos-widget__load-more" @click="onLoadMore">Load more</button>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import api from '@/api';
  import scroll from '@/utils/scroll';

  export default {
    name: 'VideosWidget',

    data() {
      return {
        videos: null,
        playlistId: 'UUpcTrCXblq78GZrTUTLWeBw'
      }
    },

    computed: {
      ...mapGetters({
        isOnline: 'app/isOnline'
      })
    },

    methods: {
      async fetchVideos() {
        if (this.isOnline) {
          try {
            const response = await api.youtube.getVideosFromPlaylist(this.playlistId, 8);
            this.videos = {
              items: response.data.items,
              nextPageToken: response.data.nextPageToken
            };
          } catch (e) {
            if (e.response.status === 403) {
              console.warn('Access to youtube api from this domain is forbidden!')
            }
          }
        }
      },

      async fetchMoreVideos() {
        if (this.isOnline) {
          try {
            const response = await api.youtube.getVideosFromPlaylist(this.playlistId, 4, this.videos.nextPageToken);

            this.videos.items.push(...response.data.items);
            this.videos.nextPageToken = response.data.nextPageToken;

            return Promise.resolve();
          } catch (e) {
            console.log(e);
          }
        }
      },

      async onLoadMore() {
        await this.fetchMoreVideos();

        const $loadMore = document.getElementsByClassName('js-load-more')[0];
        const offset = $loadMore.offsetTop;

        scroll.scrollTo(offset, 1500)
      }
    },

    created() {
      this.fetchVideos();
    }
  }
</script>

<style lang="sass">
  .videos-widget
    &__inner
      display: flex
      flex-wrap: wrap
      justify-content: space-around

    &__title
      display: block
      width: 100%
      margin: 8px 4px

    &__video
      width: 100%
      margin: 5px

    &__link
      color: $c-black

    &__img
        width: 100%

    &__v-title
      margin: 8px 0
      font:
        size: 14px
        weight: bold
      line-height: 16px

    &__bottom
      text-align: center

    &__load-more
      padding: 5px 9px
      background: $c-blue
      color: $c-white
      font-weight: bold
      cursor: pointer

      &:hover
        background: $c-blue-dark

  +breakpoint(480px)
    .videos-widget
      &__inner
        justify-content: space-around

      &__video
        max-width: 220px
        margin: 5px

      &__img
        max-width: 220px

</style>
