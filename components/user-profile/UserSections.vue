<template>
  <v-card elevation="1">
    <v-list dense flat>
      <v-list-item-group color="primary">
        <v-list-item @click="$emit('formToggle', item.url )" v-for="(item, idx) in links" :key="idx" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ item.name }}</v-list-item-title>
        </v-list-item>

        <v-divider class="my-4 mt-15"></v-divider>

        <v-list-item @click="$auth.logout()" link>
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Cerrar sesión</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      links: [
        {
          name: "Inicio",
          icon: "mdi-home",
          url: "home",
        },
        {
          name: "Favoritos",
          icon: "mdi-star",
          url: "favorite",
        },
        {
          name: "Lista de deseos",
          icon: "mdi-cards-heart",
          url: "wishlist",
        },
      ],
    };
  },
};
</script>

<style>
</style>