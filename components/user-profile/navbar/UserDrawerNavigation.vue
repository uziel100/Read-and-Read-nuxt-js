<template>
  <v-navigation-drawer @input="hideDrawerNavigation" :value="show" temporary fixed>
    <v-list color="primary">
      <v-list-item>
        <v-list-item-avatar>
          <v-img :src="getImageProfile"></v-img>
        </v-list-item-avatar>
      </v-list-item>
      <v-list-item link dark>
        <v-list-item-content>
          <v-list-item-title>Bienvenido</v-list-item-title>
          <v-list-item-subtitle>{{
            this.$auth.user.email
          }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>

    <v-list dense>
      <v-list-item
        @click="$router.push(item.link)"
        link
        v-for="(item, idx) in menuMovil"
        :key="idx"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{ item.name }}</v-list-item-title>
      </v-list-item>

      <v-list-item @click="$auth.logout()" link>
        <v-list-item-icon>
          <v-icon>mdi-logout</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Cerrar sesión</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from "vuex";
let routeUser = "/perfil";
export default {
  props: ["show"],

  data() {
    return {
      menuMovil: [
        {
          icon: "mdi-home",
          name: "Inicio",
          link: routeUser,
        },
        {
          icon: "mdi-star",
          name: "Favoritos",
          link: routeUser + "/favorite",
        },
        {
          icon: "mdi-heart",
          name: "Lista de deseos",
          link: routeUser + "/wishlist",
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["getImageProfile"]),
  },
  methods: {        
    hideDrawerNavigation(value) {
      this.$emit("update:show", value);
    },
  },
};
</script>
