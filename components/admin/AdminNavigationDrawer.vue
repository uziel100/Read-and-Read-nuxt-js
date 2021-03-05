<template>
  <v-navigation-drawer @input="catchEventTouch"  :value="active" touchless app >
    <v-sheet dark color="primary" class="pa-4">
      <v-avatar class="mb-4" color="grey darken-1" size="64">
        <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
      </v-avatar>
      <div>Uziel Meliton</div>
    </v-sheet>

    <v-divider></v-divider>

    <v-list>
      <v-list-item
        @click="goTo($router)"
        v-for="[icon, text, goTo] in links"
        :key="text"
        link
      >
        <v-list-item-icon>
          <v-icon>{{ icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ text }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-delete</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Salir</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  props:['active'],
  data() {
    return {
        drawer: true,
      links: [
         [
          "mdi-send",
          "Inicio",
          function (route) {
            route.push("/admin");
          },
        ],
        [
          "mdi-inbox-arrow-down",
          "libros",
          function (route) {
            route.push("/admin/book");
          },
        ],
        ["mdi-send", "Categorias"],
        ["mdi-delete", "Usuarios"],
        ["mdi-alert-octagon", "Ventas"],
      ],
    };
  },

  methods:{
    catchEventTouch( value ){
      // this.active = value;
      this.$emit('activeDrawer', value)
    }
  }
};
</script>

<style>
</style>