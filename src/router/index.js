import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import Profile from '@/views/Profile.vue'
import Signin from '@/views/Signin.vue'
import Signup from '@/views/Signup.vue'
import Accounts from '@/views/Accounts.vue'
import Calendary from '@/views/Calendary.vue'
import Categories from '@/views/Categories.vue'
import Charts from '@/views/Charts.vue'
import Deals from '@/views/Deals.vue'
import Refund from '@/views/Refund.vue'
import Settings from '@/views/Settings.vue'
import Summary from '@/views/Summary.vue'
import AuthGuard from './auth-guard'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: AuthGuard
    },
    {
      path: '/Summary',
      name: 'Summary',
      component: Summary,
      beforeEnter: AuthGuard
    },
    {
      path: '/Calendary',
      name: 'Calendary',
      component: Calendary,
      beforeEnter: AuthGuard
    },
    {
      path: '/Accounts',
      name: 'Accounts',
      component: Accounts,
      beforeEnter: AuthGuard
    },
    {
      path: '/Deals',
      name: 'Deals',
      component: Deals,
      beforeEnter: AuthGuard
    },
    {
      path: '/Refund',
      name: 'Refund',
      component: Refund,
      beforeEnter: AuthGuard
    },
    {
      path: '/Categories',
      name: 'Categories',
      component: Categories,
      beforeEnter: AuthGuard
    },
    {
      path: '/Charts',
      name: 'Charts',
      component: Charts,
      beforeEnter: AuthGuard
    },
    {
      path: '/Settings',
      name: 'Settings',
      component: Settings,
      beforeEnter: AuthGuard
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    }
  ]
})
