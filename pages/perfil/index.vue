<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="3" class="d-none d-sm-none d-md-block">
        <user-sections @formToggle="showSection" />
      </v-col>
      <v-col cols="12" sm="12" md="9">
        <v-card elevation="1" class="pa-3 pl-sm-5 pl-md-6 pt-4">
          <h2 :class="$auth.user.username ? 'mb-8':''">Hola {{ this.$auth.user.username }} 👋</h2>                    
          <p v-if="!this.$auth.user.username" @click="goToProfile" class="link-username">
            Agrega un nombre de usuario
          </p>  
          <user-books v-if="section.home" />
          <user-list-favorite v-else-if="section.favorite"></user-list-favorite>
          <user-wish-list v-else-if="section.wishlist"></user-wish-list>
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
      section: {
        home: true,
        favorite: false,
        wishlist: false,
      },
    };
  },

  methods: {
    showSection(name) {
      const keysSections = Object.keys(this.section);
      keysSections.forEach(
        (sectionName) =>
          (this.section[sectionName] = sectionName === name ? true : false)
      );
    },
    goToProfile(){
      this.$router.push('/perfil/informacion')
    }
  },
};
</script>

<style>
  .link-username{    
    color: rgb(231, 14, 14);
    font-size: 14px;    
    cursor: pointer;
  }
  .link-username:hover{
    text-decoration: underline;
  }
  
</style>