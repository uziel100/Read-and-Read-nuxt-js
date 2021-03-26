<template>
  <v-app id="inspire">
    <admin-navigation-drawer
      @activeDrawer="activeMenu"
      :active="drawer"
    ></admin-navigation-drawer>
    <admin-bar-header
      @activeDrawer="activeMenu"
      :active="drawer"
    ></admin-bar-header>
    <v-main>
      <v-container class="py-6 px-6">
        <admin-notification-bar></admin-notification-bar>      
          <nuxt></nuxt>        
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  middleware: ['is-logged','is-admin-role'],
  data() {
    return {      
      drawer: true,
    };
  },
  created(){
    this.init();    
  },
  methods: {
    ...mapActions(["getCategories", "getUserIfLogged"]),
    ...mapActions('admin', ["initCollections"]),

    async init(){
      this.$axios.setHeader("token", this.$auth.strategy.token.get());
      await Promise.all(
        [
          this.getCategories(),
          this.getUserIfLogged(),
          this.initCollections()
        ]
      );
    },

    activeMenu(value) {
      this.drawer = value;
    },
  },
};
</script>

