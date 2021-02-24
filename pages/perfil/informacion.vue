<template>
  <div>
    <v-container
      fluid
      class="bannerProfile py-md-16 d-none d-sm-none d-md-block"
    >
    </v-container>
    <v-container>
      <v-row class="d-flex justify-center">
        <v-col cols="12" md="3" d-sm="6" class="mx-auto">
          <v-card class="mt-md-n16 mt-0" elevation="3">
            <v-card-text>
              <v-row justify="center">
                <v-avatar class="ma-3" size="100">
                  <img
                    :src="$auth.user.photo? $auth.user.photo : 'https://cdn.vuetifyjs.com/images/john.jpg'"
                    alt="John"
                  />
                </v-avatar>
              </v-row>
              <v-row align-content="center" justify="center">
                <p class="text-center  title--text pa-1 mb-8">{{ this.$auth.user.email  }}</p>
              </v-row>
              <v-divider class="d-md-block d-none mb-14"></v-divider>
              <v-btn
                block
                color="accent"
                class="ma-0 text-none btn-block"
              >
                <!-- v-show="showButtonEdit"
                @click="showFormEditUser" -->
                Editar perfil
              </v-btn>
              <v-row class="d-sm-none">
                <div class="contenido mt-3 ml-4">
                  <a href="#"><p class="title--text">Comentarios</p></a>
                  <a href="#"><p class="title--text">Seguridad de la cuenta</p></a>
                  <a href="#"><p class="title--text">Metodo de pago</p></a>
                  <a href="#"><p class="title--text">Privacidad</p></a>
                  <a href="#"><p class="title--text">Cerrar sesion</p></a>
                </div>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
            <v-card              
              class="pt-6"
              min-height="500px"
              elevation="1"
            >
              <update-information />
            </v-card>
        </v-col>
        <v-col cols="12" md="3">
          <v-card class="text-right d-none d-md-flex">
            <v-card-text>
              <div class="contenido mt-3 ml-2">
                <a href="#"><p class="title--text">Comentarios</p></a>
                <a href="#"><p class="title--text">Seguridad de la cuenta</p></a>
                <a href="#"><p class="title--text">Metodo de pago</p></a>
                <a href="#"><p class="title--text">Privacidad</p></a>
                <a href="#"><p class="title--text">Cerrar sesion</p></a>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>


<script>

export default {
  layout: "user",
  transition: "home",
  head: {
    title: "Perfil",
  },

  data() {
    return {
     
    };
  },


};
</script>

<style scoped>
.bannerProfile {
  background-image: url(../../assets/img/patron-1.png) !important;
  background-repeat: repeat-x, repeat-y;
}
</style>
