<template>
  <header class="header-bar">
    <div class="header-bar__inner">
      <router-link :to="{name:'home'}">
        <img class="header-bar__logo" src="@/assets/img/world-cup-logo.png" alt="logo"/>
      </router-link>
    </div>
  </header>
</template>

<script>
  export default {
    name: 'HeaderBar',
  }
</script>

<style lang="sass">
  .header-bar
    padding: 8px
    border-bottom: 1px solid $c-gray-light
    background: $c-white

    &__inner
      max-width: 960px
      margin: 0 auto

    &__logo
      max-width: 110px
      margin-left: 8px

</style>
