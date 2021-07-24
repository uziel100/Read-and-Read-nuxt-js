<template>
  <v-app>
    <client-only>
      <home-navbar-left-movil
        :show.sync="navbarLeftMovil"
      ></home-navbar-left-movil>
      <home-navbar 
        :showDrawer.sync="navbarLeftMovil"
      ></home-navbar>

      <v-main class="background">
        <!-- Notificacion -->
        <v-snackbar
          :timeout="-1"
          :value="notification.active"
          :color="notification.type"
          elevation="24"
        >
          <p>{{ notification.msg }}</p>
          <p>{{ notification.msg2 }}</p>           
          <template v-slot:action="{ attrs }">
            <v-btn
              dark
              text
              v-bind="attrs"
              @click="setNotification({ active: false })"
            >
              Cerrar
            </v-btn>
          </template>
        </v-snackbar>
        <!-- /Notificacion -->
        <nuxt />
      </v-main>

      <!-- button theme -->
      <v-fab-transition>
        <v-tooltip right>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              elevation="5"
              @click="modeDark"
              v-show="!hidden"
              color="primary"
              dark
              fixed
              bottom
              left
              fab
            >
              <v-icon>{{ modeTheme }}</v-icon>
            </v-btn>
          </template>
          <span>Cambiar tema</span>
        </v-tooltip>
      </v-fab-transition>
      <!-- /button theme -->

      <!-- button scrooll top -->
      <v-fab-transition>
        <v-tooltip left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="mt-16"
              v-bind="attrs"
              v-on="on"
              v-scroll="onScroll"
              v-show="fab"
              elevation="5"
              @click="toTop"
              color="primary"
              dark
              fixed
              top
              right
              fab
            >
              <v-icon>mdi-apple-keyboard-control</v-icon>
            </v-btn>
          </template>
          <span>Ir arriba</span>
        </v-tooltip>
      </v-fab-transition>
      <!-- /button scrooll top -->

      <home-footer></home-footer>      
    </client-only>
  </v-app>
</template>
 
<script>
import { mapState, mapMutations, mapActions } from "vuex";

export default {  
  name: "Default",
  transition: "home",
  head: {
    script: [
      {
        src: "//code.jivosite.com/widget/oihn0z9QfM",
        defer: true,
      },
    ],
  },

  created() {
    this.init();
  },

  data() {
    return {
      navbarLeftMovil: false,      
      hidden: false,      
      fab: false,
      modeTheme: "mdi-white-balance-sunny",    
    };
  },

  computed: {
    ...mapState(["notification"])    
  },

  methods: {
    ...mapMutations(["setNotification"]),
    ...mapActions(["getUserIfLogged", "getCategories", "getNewBooks"]),

    async init() {
      try {
        await Promise.all([
          this.getUserIfLogged(),
          this.getCategories(),
          this.getNewBooks(),
        ]);
      } catch (error) {
        console.log(error);
      }
    },

    modeDark() {
      if ("mdi-white-balance-sunny" === this.modeTheme) {
        this.modeTheme = "mdi-brightness-2";
      } else {
        this.modeTheme = "mdi-white-balance-sunny";
      }
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },

    onScroll(e) {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.fab = top > 800;
    },

    toTop() {
      this.$vuetify.goTo(0);
    }
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

a {
  text-decoration: none;
  color: #878787 !important;
}

.text-black > a {
  color: #000 !important;
}

.input-search {
  border-radius: 5px;
  width: 22.5em;
  background: #eee;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.input-search > input {
  height: 35px;
  outline: none;
  width: calc(100% - 60px);
  color: #fff;
}

.icon-search {
  cursor: pointer !important;
  transition: all 300ms;
}

.icon-search:hover {
  background: rgb(202, 202, 202);
  border-radius: 0 5px 5px 0;
}

.icon-search > img {
  line-height: 34px;
}

.custom-input .v-text-field__details {
  display: none !important;
  overflow: hidden !important;
}
</style>

