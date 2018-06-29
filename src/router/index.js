import Vue from 'vue'
import Router from 'vue-router'
import HomeView from '@/views/HomeView'
import GroupsView from '@/views/GroupsView'
import MatchesView from '@/views/MatchesView'
import StatisticsView from '@/views/StatisticsView'
import NotFoundView from '@/views/NotFound'

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },

    {
      path: '/groups',
      name: 'groups',
      component: GroupsView
    },

    {
      path: '/matches',
      name: 'matches',
      component: MatchesView
    },

    {
      path: '/statistics',
      name: 'statistics',
      component: StatisticsView
    },

    {
      path: '*',
      component: NotFoundView,
    }
  ]
});

export default router;
