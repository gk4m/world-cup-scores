<template>
  <div class="groups-view">
    <group-table
      v-if="groups"
      v-for="(group, index) in groups"
      :key="index"
      :group="group"/>

    <loading-spinner v-if="!groups"/>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import GroupTable from '@/components/GroupTable';
  import LoadingSpinner from '@/components/LoadingSpinner'

  export default {
    name: 'GroupsView',

    components: {
      GroupTable,
      LoadingSpinner
    },

    computed: {
      ...mapGetters(
        'app', {
          groups: 'getGroups',
        }
      ),
    },

    methods: {
      ...mapActions({
        fetchGroups: 'app/fetchGroups',
      }),
    },

    created() {
      this.fetchGroups();
    }
  }
</script>

<style lang="sass" scoped>
  +breakpoint(medium)
    .groups-view
      display: flex
      flex-wrap: wrap
      justify-content: space-around

      > div
        margin: 0 15px

</style>
