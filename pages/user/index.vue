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

      <v-col  cols="12" sm="12" md="9">
        <v-card min-height="500px"  elevation="1">
          
        </v-card>       
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: "user",
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