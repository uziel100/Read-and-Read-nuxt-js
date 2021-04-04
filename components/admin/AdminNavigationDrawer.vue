<template>
  <v-navigation-drawer @input="catchEventTouch" :value="active" touchless app>
    <v-sheet dark color="primary" class="pa-4">
      <v-avatar class="mb-4" color="grey darken-1" size="64">
        <img :src="getImageProfile" alt="Foto de perfil" />
      </v-avatar>
      <div>{{ $auth.user.email }}</div>
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
      <v-list-item @click="$auth.logout()" link>
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
import { mapGetters } from "vuex";

export default {
  props: ["active"],
  data() {
    return {
      drawer: true,
      links: [
        ["mdi-home", "Inicio", "/admin"],
        ["mdi-notebook", "Agregar libros", "/admin/book"],
        ["mdi-notebook-edit", "Editar libros", "/admin/allBooks"],
        ["mdi-bookmark", "Categorias", "/admin/category"],
        ["mdi-bookmark", "Subcategorias", "/admin/subcategory"],
        ["mdi-account", "Autores", "/admin/author"],
        ["mdi-bookmark", "Editoriales", "/admin/publisher"],
        ["mdi-account-lock", "Permisos", "/admin/permission"],
        ["mdi-history", "Logs", "/admin/logging"],
      ],
    };
  },

  methods: {
    catchEventTouch(value) {
      this.$emit("update:active", value);
    },

    goTo(url) {
      this.$router.push(url);
    },
  },
  computed: {
    ...mapGetters(["getImageProfile"]),
  },
};
</script>

<style>
</style>