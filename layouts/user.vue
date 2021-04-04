<template>
  <v-app>
    <user-drawer-navigation :show.sync="drawer" ></user-drawer-navigation>
    <user-navbar :showDrawer.sync="drawer" ></user-navbar>  

    <v-main class="backgrounduser">
      <!-- Notificacion -->
      <v-snackbar :timeout="-1" :value="notification.active" :color="notification.type" elevation="24">
        {{ notification.msg }}
        <template v-slot:action="{ attrs }">
          <v-btn dark text v-bind="attrs" @click="setNotification({ active: false })">
            Cerrar
          </v-btn>
        </template>
      </v-snackbar>
      <!-- /Notificacion -->
      <nuxt />
    </v-main>

    <v-bottom-navigation
      fixed
      class="text-center d-md-none"
      :value="0"
      color="primary"
    >
      <v-btn v-for="item in menuLinks" :key="item.name" @click="item.goTo($router)"  >
        <span>{{ item.name }}</span>
        <v-icon size="20">{{ item.icon }}</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
import { mapActions, mapMutations, mapState, mapGetters } from 'vuex'

export default {
  middleware: ['is-logged', 'is-user-role'],
  transition: "home",
  name: 'User',
  data() {
    return {
      drawer: false,
     
      menuLinks: [
        {
          icon: "mdi-home",
          name: "Inicio",
          goTo: function(route){
            route.push('/perfil')
          }
        },
        {
          icon: "mdi-book-variant",
          name: "Biblioteca",
          goTo: function(route){
            route.push('/perfil/my-books')
          }
        },
        {
          icon: "mdi-account",
          name: "Cuenta",
          goTo: function(route){
            route.push('/perfil/informacion')
          }
        },
      ],
    };
  },

  async created(){  
    await this.init();
    
  },

  computed:{    
    ...mapState(['notification', 'baseUrl']),
    ...mapGetters(['getImageProfile']),
    
  },

  methods: {
    ...mapMutations(['setNotification']),
    ...mapActions(['getUserIfLogged']),
   
    async init(){
      await this.getUserIfLogged()     
      this.$axios.setHeader("token", this.$auth.strategy.token.get());
    },
    goTo(url) {
      this.$router.push(url);
    },
  },
};
</script> 

<style>
.home-enter-active,
.home-leave-active {
  transition: opacity 0.4s;
}
.home-enter,
.home-leave-active {
  opacity: 0;
}

</style>