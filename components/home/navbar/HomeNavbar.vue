<template>
  <v-app-bar color="navbar" elevation="3" height="60px" fixed app>
    <v-app-bar-nav-icon
      @click.stop="$emit('update:showDrawer', !showDrawer)"
      class="ma-0 d-block d-sm-block d-md-none"
    ></v-app-bar-nav-icon>

    <v-spacer class="d-block d-sm-none"></v-spacer>

    <nuxt-link to="/">
      <img
        width="160px"
        :src="$vuetify.theme.dark ? '/img/logo-ligth.png' : '/img/logo.svg'"
        alt="logotipo"
      />
    </nuxt-link>

    <v-spacer class="d-none d-sm-block"></v-spacer>

    <div class="input-search ml-5 pl-3 d-none d-sm-none d-md-flex search">
      <input
        type="search"
        name="search"
        id="search"
        class="title--text"
        autocomplete="false"
        placeholder="Buscar por titulo, autor, ISBN"
        v-model="searchTerm"
        @keypress.enter="goSearch"
      />
      <v-btn @click="goSearch" text>
        <img src="@/assets/img/search-24px.svg" alt="lupa" />
      </v-btn>
    </div>

    <v-spacer></v-spacer>

    <div class="d-flex align-center">
      <div class="d-none d-sm-none d-md-flex mr-5">
        <nuxt-link class="text-decoration-none" to="/">
          <v-btn class="text-none item-menu" text> Inicio </v-btn>
        </nuxt-link>

        <v-menu open-on-hover bottom left offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="text-none" text v-bind="attrs" v-on="on">
              Categorias
              <v-icon color="icons" class="ma-0 pa-0" right>
                mdi-chevron-down
              </v-icon>
            </v-btn>
          </template>
          <div class="d-flex">
            <v-list rounded v-for="(category, i) in menuCategories" :key="i">
              <v-subheader>{{ category.data.name }}</v-subheader>
              <v-divider></v-divider>
              <v-list-item
                class="ma-0 pa-0"
                v-for="(subcategory, idx) in category.subcategories"
                :key="idx"
              >
                <v-list-item-content class="ma-0 pa-0">
                  <nuxt-link :to="`/${subcategory.niceName}`">
                    <v-btn text color="primary" class="text-none">{{
                      subcategory.name
                    }}</v-btn>
                  </nuxt-link>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </div>
        </v-menu>
      </div>

      <v-badge left overlap :value="0">
        <v-btn @click="$router.push('/cesta')" text icon>
          <v-icon color="icons" medium>mdi-cart-outline</v-icon>
        </v-btn>
      </v-badge>
      <wishlist v-if="$auth.loggedIn"></wishlist>
      <v-btn
        @click="goToLayout($auth.user.role)"
        v-if="$auth.loggedIn"
        class="ml-0 ml-sm-2"
        text
        icon
      >
        <v-avatar size="36">
          <img :src="getImageProfile" alt="John" />
        </v-avatar>
      </v-btn>

      <nuxt-link
        v-if="!$auth.loggedIn"
        class="text-decoration-none d-none d-sm-block"
        to="/unirse/login"
      >
        <v-btn
          class="ma-2 text-none d-none d-sm-block"
          outlined
          color="secondary"
        >
          Iniciar sesión
        </v-btn>
      </nuxt-link>
      <nuxt-link
        v-if="!$auth.loggedIn"
        class="text-decoration-none d-none d-sm-block"
        to="/unirse/registro"
      >
        <v-btn class="text-none" depressed color="secondary">
          Registrate
        </v-btn>
      </nuxt-link>
    </div>
  </v-app-bar>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  props: ["showDrawer"],
  data() {
    return {
      searchTerm: "",
    };
  },
  methods: {
    goSearch() {
      if (this.searchTerm.trim().length > 0) {
        this.$router.push({ path: "/buscar", query: { q: this.searchTerm } });
        this.searchTerm = "";
      }
    },
    goToLayout(role) {
      let layout = "";
      switch (role) {
        case "USER_ROLE":
          layout = "/perfil";
          break;
        case "ADMIN_ROLE":
          layout = "/admin";
          break;
        default:
          layout = "/admin";
          break;
      }
      this.$router.push(layout);
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