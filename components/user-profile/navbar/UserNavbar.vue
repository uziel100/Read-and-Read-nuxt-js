<template>
  <v-app-bar color="navbar" app flat>
    <v-app-bar-nav-icon
      @click.stop="$emit('update:showDrawer', !showDrawer)"
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

    <v-tabs class="d-none d-sm-none d-md-block ml-n9" centered color="primary">
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

    <v-badge  left overlap :value="0" class="mr-0 mr-sm-2 mr-md-2">
      <v-btn @click="$router.push('/cesta')" text icon>
        <v-icon color="icons" medium>mdi-cart-outline</v-icon>
      </v-btn>
    </v-badge>

    <v-btn class="ml-2" text icon>
      <v-avatar size="32">
        <img
          :src="getImageProfile"
          :alt="'Foto de perfil del usuario con el email ' + $auth.user.email"
        />
      </v-avatar>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapGetters } from "vuex";
let routeUser = "/perfil";
export default {
  props: ["showDrawer"],
  data() {
    return {
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
          link: routeUser + "/informacion",
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["getImageProfile"]),
  },

  methods: {
    goTo(url) {
      this.$router.push(url);
    },
  },
};
</script>