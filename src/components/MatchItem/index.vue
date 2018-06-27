<template>
  <div :class="elClasses">
    <time class="match-item__time">{{match.datetime | moment("H:mm")}}</time>

    <div class="match-item__competitor match-item__competitor--left">
      <template v-if="match.home_team.code === 'TBD'">
        {{match.home_team.team_tbd}}
      </template>
      <template v-else>
        <span>{{match.home_team.country}}</span>
        <img :src="require(`@/assets/img/flags/${match.home_team.code.toLowerCase()}.png`)" alt=""/>
      </template>
    </div>

    <span class="match-item__state">
      <span class="match-item__result">
        <template v-if="match.status !== 'future'">
          {{match.home_team.goals}} : {{match.away_team.goals}}
        </template>
        <template v-else> vs </template>
      </span>
    </span>

    <div class="match-item__competitor match-item__competitor--right">
      <template v-if="match.away_team.code === 'TBD'">
        {{match.away_team.team_tbd}}
      </template>
      <template v-else>
        <img :src="require(`@/assets/img/flags/${match.away_team.code.toLowerCase()}.png`)" alt=""/>
        <span>{{match.away_team.country}}</span>
      </template>
    </div>

    <span class="match-item__progress">
      {{match.time}}
    </span>

    <button class="match-item__angle">
      <icon class="fa-angle-down" name="angle-down"></icon>
      <icon class="fa-angle-up" name="angle-up"></icon>
    </button>

  </div>
</template>

<script>
  export default {
    name: 'MainNav',

    props: {
      match: {
        required: true
      }
    },

    computed: {
      elClasses() {
        return [
          'match-item',
          {
            'match-item--in-progress': this.match.status === 'in progress'
          }
        ]
      }
    }
  }
</script>

<style lang="sass" scoped>
  .match-item
    position: relative
    display: flex
    justify-content: center
    align-items: center
    padding: 4px 0
    border-top: 1px solid $c-gray-light
    font-size: 12px
    line-height: 16px
    text-align: center
    cursor: pointer

    &:hover
      background: $c-gray-light

      .match-item__progress
        background: inherit

    &--not-available-details
      cursor: default

      &:hover
        background: none

      .match-item__angle
        display: none

    &--active-details
      background: $c-gray-light

      .match-item__progress
        background: inherit

      .match-item__angle
        .fa-angle-up
          display: block

        .fa-angle-down
          display: none

    &--in-progress
      .match-item__progress
        display: block


    &__time
      position: absolute
      left: 5px

    &__competitor
      display: flex
      align-items: center
      width: 42%

      &--left
        justify-content: flex-end

      &--right
        justify-content: flex-start

      img
        width: 25px
        height: 25px
        margin: 0 3px
        vertical-align: middle

    &__result
      display: inline-block
      width: 25px
      font-weight: bold

    &__progress
      display: none
      position: absolute
      right: 22px
      padding-left: 3px
      background: $c-white

      &:before
        display: flex
        align-items: center
        width: 7px
        height: 7px
        margin-right: 4px
        background: $c-red
        border-radius: 50%
        animation: blink 0.7s linear infinite
        content: ''

    &__angle
      position: absolute
      right: 8px
      outline: none

      .fa-angle-up
        display: none

  +breakpoint(medium)
    .match-item
      padding: 7px 0
      font-size: 16px

      &__progress
        right: 35px

      &__competitor
        img
          margin: 0 8px

      &__result
        display: inline-block
        width: 35px

  @keyframes blink
    50%
      opacity: 0

</style>
