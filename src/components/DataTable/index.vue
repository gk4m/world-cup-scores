<template>
  <table class="table">

    <thead v-if="headers" class="table__head">
      <tr>
        <th
          class="table__th"
          :class="isShortcut"
          v-for="(item, index) in headers"
          :key="index"
          @click="sortBy(item.value, $event)">

          <span class="table__th__normal">{{item.text}}</span>
          <span v-if="item.short" class="table__th__short">{{item.short}}</span>

        </th>
      </tr>
    </thead>

    <tbody class="table__body">
      <tr v-for="(item, index) in rows" :key="index">
        <slot name="items" :item="item"></slot>
      </tr>
    </tbody>

  </table>
</template>

<script>
  export default {
    name: 'DataTable',

    props: {
      headers: {
        required: false,
        type: Array,
        default: () => []
      },
      items: {
        required: true
      },
      headerShortcuts: {
        required: false,
        type: Boolean,
        default: false
      }
    },

    data() {
      return {
        rows: null,
        reverse: false
      }
    },

    computed: {
      isShortcut () {
        return {
          'table__th--shortcut': this.headerShortcuts
        }
      }
    },

    methods: {
      sortBy(key, event) {
        this.rows = _.orderBy(this.rows, key, this.reverse ? 'desc' : 'asc');
        this.reverse = !this.reverse;
      }
    },

    watch: {
      items() {
        this.rows = this.items;
      }
    },

    created() {
      this.rows = this.items;
    },
  }
</script>

<style lang="sass">
  .table
    width: 100%
    border:
      spacing: 0
      collapse: collapse
    text-align: center
    font-size: 10px

    &__head
      background: $c-gray-light

    &__th
      height: 36px
      padding: 5px 3px
      text-transform: uppercase
      cursor: pointer

      &__short
        display: none

      &--shortcut
        .table__th__normal
          display: none

        .table__th__short
          display: block

    &__body
      tr
        border-top: 1px solid $c-gray-light

      td
        height: 70px

    &__player
      width: 110px

      &__img
        position: relative
        display: inline-block

      &__avatar
        max-width: 50px

      &__flag
        position: absolute
        right: -5px
        bottom: -5px
        width: 25px

      &__name
        font-weight: bold
        margin: 5px 0


  +breakpoint(medium)
    .table
      font-size: 12px

      &__th
        padding: 5px 11px

        &--shortcut
          .table__th__normal
            display: block

          .table__th__short
            display: none

      &__player
        &__avatar
          max-width: 70px

</style>
