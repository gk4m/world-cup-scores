<template>
  <nav class="main-nav">
    <ul class="main-nav__list">

      <router-link active-class="active" tag="li" :to="{name:'home'}" exact>
        <icon name="home"></icon>
        <div>Home</div>
      </router-link>

      <router-link active-class="active" tag="li" :to="{name:'matches'}">
        <icon name="calendar-alt"></icon>
        <div>Matches</div>
      </router-link>

      <router-link active-class="active" tag="li" :to="{name:'groups'}">
        <icon name="table"></icon>
        <div>Groups</div>
      </router-link>

      <router-link active-class="active" tag="li" :to="{name:'statistics'}">
        <icon name="chart-bar"></icon>
        <div>Statistics</div>
      </router-link>

    </ul>
  </nav>
</template>

<script>
  export default {
    name: 'MainNav',

    data() {
      return {
        $header: null,
      }
    },

    methods: {
      onScroll() {
        if (window.innerWidth > 768) {
          if (window.pageYOffset > (this.$header.offsetTop + this.$header.offsetHeight)) {
            this.$header.classList.add('main-nav--sticky');
          } else {
            this.$header.classList.remove('main-nav--sticky');
          }
        }
      }
    },

    created() {
      window.addEventListener('scroll', this.onScroll);
    },

    mounted() {
      this.$header = document.getElementsByClassName('main-nav')[0];
    },

    destroyed() {
      window.removeEventListener('scroll', this.onScroll)
    }
  }
</script>

<style lang="sass" scoped>
  .main-nav
    position: relative
    z-index: 600
    width: 100%
    border-top: 1px solid $c-gray-light
    background: $c-blue

    &__list
      display: flex
      margin: 0 auto
      max-width: 960px
      color: $c-white
      text-align: center

      .fa-icon
        width: 20px
        height: 20px
        margin-bottom: 3px

      li
        position: relative
        width: 100%
        padding: 10px 0
        font-size: 12px
        cursor: pointer

        &.active,
        &:hover
          background: $c-blue-dark

  +breakpoint(medium)
    .main-nav
      border: 0

      &--sticky
        position: fixed
        top: 0

      &__list
        text-align: left

        .fa-icon
          display: none

        li
          width: auto
          padding: 10px 15px

</style>
