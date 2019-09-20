<template>
    <div>
    <v-toolbar class="primary" dark>
      <v-toolbar-title>Title</v-toolbar-title>

      <div class="flex-grow-1"></div>

      <v-toolbar-items>
        <v-btn 
          class="primary"
          v-for="item in menuItems"
          :key="item.title"
          :to="item.link">
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}

        </v-btn>

        <v-btn 
          class="primary"
          v-if="userIsAuthenticated"
          @click="onLogout">
          <v-icon left dark>mdi-exit-to-app</v-icon>
          logout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>


<script>
  export default {
    data () {
      return {
        sideNav: false
      }
    },
    computed: {
      menuItems () {
        let menuItems = [
          {icon: 'mdi-face', title: 'Sign up', link: '/signup'},
          {icon: 'mdi-lock-open-variant', title: 'Sign in', link: '/signin'}
        ]
        if (this.userIsAuthenticated) {
          menuItems = [
            {icon: 'mdi-account', title: 'Profile', link: '/profile'}
          ]
        }
        return menuItems
      },
      userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      }
    },
    methods: {
      onLogout () {
        this.$store.dispatch('logout')
      }
    }
  }
</script>