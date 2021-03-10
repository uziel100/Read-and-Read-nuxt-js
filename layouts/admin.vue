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
  data() {
    return {      
      drawer: true,
    };
  },
  created(){
    this.getCategories();  
  },
  methods: {
    ...mapActions(["getCategories"]),
    activeMenu(value) {
      this.drawer = value;
    },
  },
};
</script>

