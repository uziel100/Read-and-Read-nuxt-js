<template>
  <v-navigation-drawer @input="hideDrawerNavigation" :value="show" fixed>
    <v-list-item v-if="$auth.loggedIn">
      <v-list-item-avatar>
        <v-img :src="getImageProfile"></v-img>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>{{ $auth.user.email }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item v-else>
      <nuxt-link class="text-decoration-none" to="/unirse/login">
        <v-btn class="text-none" outlined color="secondary">
          Iniciar sesión
        </v-btn>
      </nuxt-link>
    </v-list-item>
    <v-list-item v-if="!$auth.loggedIn">
      <nuxt-link class="text-decoration-none" to="/unirse/registro">
        <v-btn class="text-none" depressed color="secondary">
          Registrate
        </v-btn>
      </nuxt-link>
    </v-list-item>
    <v-divider></v-divider>
    <v-list>
      <nuxt-link to="/">
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Inicio</v-list-item-title>
        </v-list-item>
      </nuxt-link>

      <v-list-group :value="false" prepend-icon="mdi-book-variant">
        <template v-slot:activator>
          <v-list-item-title>Categorias</v-list-item-title>
        </template>

        <nuxt-link
          class="pa-0 ma-0"
          v-for="category in menuCategories"
          :key="category.data.niceName"
          :to="'/' + category.subcategories[0].niceName"
        >
          <v-list-item class="ml-5" link>
            <v-list-item-content>
              <v-list-item-title
                v-text="category.data.name"
              ></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </nuxt-link>
      </v-list-group>
      <nuxt-link to="/cesta">
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-cart-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Cesta</v-list-item-title>
        </v-list-item>
      </nuxt-link>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  props: ["show"],
  methods: {
    hideDrawerNavigation(value) {
      this.$emit("update:show", value);
    },
  },
  computed: {
    ...mapState(["categories"]),
    ...mapGetters(["getImageProfile"]),

    menuCategories() {
      const categories = this.categories;
      return categories.filter((category) => category.subcategories.length, []);
    },
  },
};
</script>

<style>
</style>