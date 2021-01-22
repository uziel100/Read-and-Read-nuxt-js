<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="3" class="d-none d-sm-none d-md-block">
        <v-card elevation="1">
          <v-list dense flat>
            <v-list-item-group color="primary">
              <v-list-item v-for="(item, idx) in links" :key="idx" link>
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
      </v-col>

      <v-col cols="12" sm="12" md="9">
        <v-card elevation="1" class="pa-3 pl-sm-5 pl-md-6 pt-4">
          <p class="caption">Leidos recientemente</p>
          <v-divider></v-divider>
          <v-row>
            <v-col v-for="(libro, idx) in 2" :key="idx" cols="6" sm="4" md="3">
              <item-book-2
                title="Programación"
                img="https://cdn.vuetifyjs.com/images/cards/road.jpg"
              ></item-book-2>
            </v-col>
          </v-row>
          <p class="caption">Agredados recientemente</p>
          <v-divider></v-divider>
          <v-row>
            <v-col v-for="(libro, idx) in 4" :key="idx" cols="6" sm="4" md="3">
              <item-book-2
                title="Programación"
                img="https://cdn.vuetifyjs.com/images/cards/road.jpg"
              ></item-book-2>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: "user",
  head: {
    title: "Bienvenido",
  },
  data() {
    return {
      links: [
        {
          name: "Favoritos",
          icon: "mdi-star",
          url: "",
        },
        {
          name: "Lista de deseos",
          icon: "mdi-cards-heart",
          url: "",
        },
      ],
    };
  },
};
</script>

<style>
</style>