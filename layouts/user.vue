<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" temporary fixed>
      <v-list color="primary">
        <v-list-item>
          <v-list-item-avatar>
            <v-img
              src="https://randomuser.me/api/portraits/women/85.jpg"
            ></v-img>
          </v-list-item-avatar>
        </v-list-item>
        <v-list-item link dark>
          <v-list-item-content>
            <v-list-item-title>Fatima Gonzalez Cruz</v-list-item-title>
            <v-list-item-subtitle>fatyta@gmail.com</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>

      <v-list dense>
        <v-list-item link v-for="(item, idx) in menuMovil" :key="idx">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ item.name }}</v-list-item-title>
        </v-list-item>

        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Cerrar sesión</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar color="navbar" app flat>
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        class="ma-0 d-block d-sm-block d-md-none"
      ></v-app-bar-nav-icon>

      <v-spacer class="d-block d-sm-block d-md-none"></v-spacer>

      <nuxt-link to="/">
        <img
          width="160px"
          :src="$vuetify.theme.dark ? '/img/logo-ligth.png' : '/img/logo.svg'"
          alt="logotipo"
          class="d-none d-sm-none d-md-block"
        />
        <p class="d-block d-sm-block d-md-none text-h6 font-weight-bold mt-4">
          Read&Read
        </p>
      </nuxt-link>

      <v-tabs
        class="d-none d-sm-none d-md-block ml-n9"
        centered
        color="primary"
      >
        <v-tab
          class="text-none font-weight-bold"
          @click="goTo(item.link)"
          v-for="item in links"
          :key="item.link"
        >
          {{ item.name }}
        </v-tab>
      </v-tabs>

      <v-spacer class="d-block d-sm-block d-md-none"></v-spacer>

      <v-badge left overlap :value="0" class="mr-0 mr-sm-2 mr-md-2">
        <v-btn text icon>
          <v-icon color="icons" medium>mdi-cart-outline</v-icon>
        </v-btn>
      </v-badge>

      <v-btn class="ml-2" text icon>
        <v-avatar size="32">
          <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
        </v-avatar>
      </v-btn>
    </v-app-bar>

    <v-main class="backgrounduser">
      <nuxt />
    </v-main>

    <v-bottom-navigation
      fixed
      class="text-center d-md-none"
      :value="0"
      color="primary"
    >
      <v-btn v-for="item in menuLinks" :key="item.name">
        <span>{{ item.name }}</span>
        <v-icon size="20">{{ item.icon }}</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
let routeUser = "/user";
export default {
  data() {
    return {
      drawer: false,
      links: [
        {
          name: "Inicio",
          link: routeUser,
        },
        {
          name: "Tus libros",
          link: routeUser + "/my-books",
        },
        {
          name: "Perfil",
          link: routeUser + "/profile",
        },
      ],

      menuMovil: [
        {
          icon: "mdi-home",
          name: "Inicio",
        },
        {
          icon: "mdi-star",
          name: "Favoritos",
        },
        {
          icon: "mdi-heart",
          name: "Lista de deseos",
        },
      ],

      menuLinks: [
        {
          icon: "mdi-home",
          name: "Inicio",
        },
        {
          icon: "mdi-book-variant",
          name: "Biblioteca",
        },
        {
          icon: "mdi-account",
          name: "Cuenta",
        },
      ],
    };
  },

  methods: {
    goTo(url) {
      this.$router.push(url);
    },
  },
};
</script>

<style>
</style>