<template>
  <v-app>
    <!--  Navigation left movil -->
    <v-navigation-drawer v-model="drawer" temporary fixed>
      <v-list-item v-if="$auth.loggedIn">
        <v-list-item-avatar>
          <v-img src="https://cdn.vuetifyjs.com/images/john.jpg"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ $auth.user.email }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-if="!$auth.loggedIn">
        <nuxt-link
          v-if="!login"
          class="text-decoration-none"
          to="/unirse/login"
        >
          <v-btn class="text-none" outlined color="secondary">
            Iniciar sesión
          </v-btn>
        </nuxt-link>
      </v-list-item>
      <v-list-item v-if="!$auth.loggedIn">
        <nuxt-link class="text-decoration-none" to="/unirse/registro">
          <v-btn class="text-none" depressed color="secondary">
            Registrate
          </v-btn>
        </nuxt-link>
      </v-list-item>
      <v-divider></v-divider>
      <v-list>
        <nuxt-link to="/">
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Inicio</v-list-item-title>
          </v-list-item>
        </nuxt-link>

        <v-list-group :value="false" prepend-icon="mdi-book-variant">
          <template v-slot:activator>
            <v-list-item-title>Categorias</v-list-item-title>
          </template>

          <nuxt-link
            class="pa-0 ma-0"
            v-for="item in categories"
            :key="item.data.niceName"
            :to="'/categoria/' + item.data.niceName"
          >
            <v-list-item class="ml-5" link>
              <v-list-item-content>
                <v-list-item-title v-text="item.data.name"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </nuxt-link>
        </v-list-group>
        <nuxt-link to="/cesta">
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-cart-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Cesta</v-list-item-title>
          </v-list-item>
        </nuxt-link>
      </v-list>
    </v-navigation-drawer>
    <!--  /Navigation left movil -->

    <!-- Navbar -->
    <v-app-bar color="navbar" elevation="3" height="60px" fixed app>
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        class="ma-0 d-block d-sm-block d-md-none"
      ></v-app-bar-nav-icon>

      <v-spacer class="d-block d-sm-none"></v-spacer>

      <nuxt-link to="/">
        <img
          width="160px"
          :src="$vuetify.theme.dark ? '/img/logo-ligth.png' : '/img/logo.svg'"
          alt="logotipo"
        />
      </nuxt-link>

      <v-spacer class="d-none d-sm-block"></v-spacer>

      <div class="input-search ml-5 pl-3 d-none d-sm-none d-md-flex search">
        <input
          type="search"
          name="search"
          id="search"
          class="title--text"
          autocomplete="false"
          placeholder="Buscar por titulo, autor, ISBN"
          v-model="searchText"
          @keypress.enter="goSearch"
        />
        <v-btn @click="goSearch" text>
          <img src="@/assets/img/search-24px.svg" alt="lupa" />
        </v-btn>
      </div>

      <v-spacer></v-spacer>

      <div class="d-flex align-center">
        <div class="d-none d-sm-none d-md-flex mr-5">
          <nuxt-link class="text-decoration-none" to="/">
            <v-btn class="text-none item-menu" text> Inicio </v-btn>
          </nuxt-link>

          <v-menu open-on-hover bottom left offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn class="text-none" text v-bind="attrs" v-on="on">
                Categorias
                <v-icon color="icons" class="ma-0 pa-0" right>
                  mdi-chevron-down
                </v-icon>
              </v-btn>
            </template>
            <div class="d-flex">
              <v-list rounded v-for="(category, i) in categories" :key="i">
                <v-subheader>{{ category.data.name }}</v-subheader>
                <v-divider></v-divider>
                <v-list-item
                  class="ma-0 pa-0"
                  v-for="(subcategory, idx) in category.subcategories"
                  :key="idx"
                >
                  <v-list-item-content class="ma-0 pa-0">
                    <nuxt-link :to="`/${subcategory.niceName}`">
                      <v-btn text color="primary" class="text-none">{{
                        subcategory.name
                      }}</v-btn>
                    </nuxt-link>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item
                  v-if="category.subcategories.length === 0"
                  class="ma-0 pa-0"
                >
                  <v-list-item-content class="ma-0 pa-0">
                    <nuxt-link :to="`/categoria/${category.data.niceName}`">
                      <v-btn text color="primary" class="text-none"
                        >Ver libros</v-btn
                      >
                    </nuxt-link>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </div>
          </v-menu>
        </div>

        <v-badge  left overlap :value="0">
          <v-btn @click="$router.push('/cesta')" text icon>
            <v-icon color="icons" medium>mdi-cart-outline</v-icon>
          </v-btn>
        </v-badge>

        <v-badge class="d-none d-sm-block" v-if="$auth.loggedIn" left overlap :value="0">
          <v-btn  text icon>
            <v-icon color="icons" medium>mdi-heart</v-icon>
          </v-btn>
        </v-badge>

        <v-btn @click="$router.push('/perfil')"  v-if="$auth.loggedIn" class="ml-0 ml-sm-2 " text icon>
          <v-avatar size="36">
            <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
          </v-avatar>
        </v-btn>

        <nuxt-link
          v-if="!$auth.loggedIn"
          class="text-decoration-none d-none d-sm-block"
          to="/unirse/login"
        >
          <v-btn
            v-if="!login"
            class="ma-2 text-none d-none d-sm-block"
            outlined
            color="secondary"
          >
            Iniciar sesión
          </v-btn>
        </nuxt-link>
        <nuxt-link
          v-if="!$auth.loggedIn"
          class="text-decoration-none d-none d-sm-block"
          to="/unirse/registro"
        >
          <v-btn class="text-none" depressed color="secondary">
            Registrate
          </v-btn>
        </nuxt-link>
      </div>
    </v-app-bar>
    <!-- /Navbar -->

    <v-main class="background">
      <nuxt />
    </v-main>

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
            v-bind="attrs"
            v-on="on"
            v-scroll="onScroll"
            v-show="fab"
            elevation="5"
            @click="toTop"
            color="primary"
            dark
            fixed
            bottom
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

    <!-- footer -->
    <v-footer color="footer" padless >
      <v-container>
        <v-row>
          <v-col cols="12" sm="4">
            <figure class="text-center text-sm-left">
              <nuxt-link to="/">
                <img
                  src="../assets/img/logo-ligth.png"
                  width="180px"
                  alt="logotipo"
                />
              </nuxt-link>
            </figure>
          </v-col>
          <v-col
            v-for="(item, idx) in linksFooter"
            :key="idx"
            class="text-center text-sm-left"
            cols="12"
            sm="4"
          >
            <h3 class="mb-4 text-h6 txt-white">{{ item.title }}</h3>
            <v-divider class="mb-2"></v-divider>
            <div>
              <p v-for="(link, i) in item.links" :key="i" class="my-2">
                <nuxt-link class="txt-gray" :to="link.to">
                  {{ link.title}}
                </nuxt-link>
              </p>
            </div>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
      </v-container>
      <v-col class="text-center footer" cols="12">
        <p class="white--text">
          &copy; Read&Read Todos los derechos reservados
        </p>
      </v-col>
    </v-footer>
    <!-- /footer -->
  </v-app>
</template>
 
<script>

import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  name: 'Default',
  transition: "home",
  created(){    
    this.init()
  },
  
  data() {
    return {
      searchText: '',
      snackbar:{
        active: false
      },
      hidden: false,
      drawer: false,
      rightDrawer: true,
      login: false,
      isNotification: false,
      selectedItem: 0,
      fab: false,
      modeTheme: "mdi-white-balance-sunny",
      linksFooter: [
        {
          title: "Nosotros",
          links: [
            {
              title: "Quienes somos",
              to: "/nosotros",
            },
            {
              title: "Misión, visión",
              to: "/nosotros",
            },
          ],
        },
        {
          title: "Ayuda",
          links: [
            {
              title: "Contacto",
              to: "/ayuda/contacto",
            },
            {
              title: "Preguntas frecuentes",
              to: "/ayuda/preguntas-frecuentes",
            },
            {
              title: "Politica de privacidad",
              to: "/ayuda/politica-de-privacidad",
            },
          ],
        },
      ],
    };
  }, 

  
  computed:{
    ...mapState(['notification','categories']),
  },

  methods: {
    ...mapMutations(['setNotification']),
    ...mapActions(['getUserIfLogged', 'getCategories']),
    
    async init(){
      try {
        await Promise.all([this.getUserIfLogged(), this.getCategories()])
      } catch (error) {
        console.log(error)
      }
    },

    goSearch(){
      if(this.searchText.trim().length > 0){
        this.$router.push({ path: '/buscar', query: { q: this.searchText }})
        this.searchText = ''
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
      this.fab = top > 20;
    },

    toTop() {
      this.$vuetify.goTo(0);
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

