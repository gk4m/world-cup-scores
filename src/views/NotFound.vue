<template>
  <div class="not-found-view">
    <div class="not-found-view__content">
      <h1 class="not-found-view__title">404</h1>
      <p>Sorry, it looks like we couldn't find what you're looking for.</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'NotFound',
  }
</script>

<style scoped lang="sass">
  .not-found-view
    text-align: center

    &__title
      margin: 30px
      font-size: 110px
      line-height: 1

</style>
