<template>
  <div class="info-bar">
    {{title}}
    <span v-if="date" class="info-bar__date">{{date | moment("MM-DD-YYYY")}}</span>
  </div>
</template>

<script>
  export default {
    name: 'InfoBar',

    props: {
      title: {
        type: String,
        required: false
      },
      date: {
        required: false
      }
    },
  }
</script>

<style lang="sass">
  .info-bar
    position: relative
    min-height: 32px
    padding: 2px 8px
    line-height: 28px
    font-size: 14px
    color: $c-white
    background: $c-blue-dark
    border-radius: 3px

    &__date
      +vertical-center
      right: 8px
      padding: 3px 5px
      font:
        size: 12px
        weight: bold
      line-height: 12px
      background: $c-blue-light
      border-radius: 3px

  +breakpoint(medium)
    .info-bar
      font-size: 16px

</style>
