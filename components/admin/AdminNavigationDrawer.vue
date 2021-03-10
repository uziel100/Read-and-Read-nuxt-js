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
        @click="goTo(url)"
        v-for="[icon, text, url] in links"
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
          <v-icon>mdi-logout</v-icon>
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
          "mdi-home",
          "Inicio",
          "/admin"
        ],
        [
          "mdi-book",
          "libros",
          '/admin/book', 
        ],
        ["mdi-bookmark", "Categorias",'/admin/category'],
        ["mdi-bookmark", "Subcategorias",'/admin/subcategory'],
        ["mdi-account", "Usuarios"],
        ["mdi-cash", "Ventas"],
      ],
    };
  },

  methods:{
    catchEventTouch( value ){
      // this.active = value;
      this.$emit('activeDrawer', value)
    },

    goTo(url){
      this.$router.push(url)
    }
  }
};
</script>

<style>
</style>