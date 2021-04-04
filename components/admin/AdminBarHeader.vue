<template>
  <v-app-bar app color="primary">      
    <v-app-bar-nav-icon
      @click="activeDrawerBar"
      class="ma-2"
      dark
    ></v-app-bar-nav-icon>
  </v-app-bar>
</template>

<script>
export default {
  props: ['activeDrawer'],
  data() {
    return {
      drawer: true,      
      breadcrumbs: [],
    };
  },
  methods: {
    activeDrawerBar(){      
      this.$emit('update:activeDrawer', !this.activeDrawer )
    }
  },
};
</script>
