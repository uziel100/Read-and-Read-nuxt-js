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
      <v-container class="py-8 px-6 d-flex justify-center" fluid>
        <nuxt></nuxt>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {      
      drawer: true,
    };
  },
  methods: {
    activeMenu(value) {
      this.drawer = value;
    },
  },
};
</script>

