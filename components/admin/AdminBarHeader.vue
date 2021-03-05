<template>
  <v-app-bar app color="primary">      
    <v-app-bar-nav-icon
      @click="activeDrawer"
      class="ma-2"
      dark
    ></v-app-bar-nav-icon>
  </v-app-bar>
</template>

<script>
export default {
  props: ['active'],
  data() {
    return {
      drawer: true,      
      breadcrumbs: [],
    };
  },
  methods: {
    activeDrawer(){
      const value = !this.active;
      this.$emit('activeDrawer', value )
    }
  },
};
</script>
