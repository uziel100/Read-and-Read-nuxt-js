<template>
  <v-app>
    <!--  Navitation left movil -->
    <v-navigation-drawer v-model="drawer" temporary fixed>
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>John Leider</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
    </v-navigation-drawer>
    <!--  /Navitation left movil -->

    <!-- Navbar -->
    <v-app-bar color="#fff" flat height="75px" fixed app>
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        class="ma-0 d-block d-sm-block d-md-none"
      ></v-app-bar-nav-icon>

      <v-spacer class="d-block d-sm-none"></v-spacer>

      <nuxt-link to="/">
        <img width="160px" src="../assets/img/logo.svg" alt="logotipo" />
      </nuxt-link>

      <v-spacer class="d-none d-sm-block"></v-spacer>

      <div class="input-search ml-5 pl-3 d-none d-sm-none d-md-flex">
        <input
          type="search"
          name="search"
          id="search"
          autocomplete="false"
          placeholder="Buscar por titulo, autor, ISBN"
        />
        <v-btn text>
          <!-- <div class="icon-search"> -->
          <img src="@/assets/img/search-24px.svg" alt="" />
          <!-- </div> -->
        </v-btn>
      </div>

      <v-spacer></v-spacer>

      <div class="d-flex align-center">
        <div class="d-none d-sm-none d-md-flex mr-5">
          <div class="item-menu px-4">
            <nuxt-link class="text-decoration-none" to="/">
              <p color="textTitle" class="subtitle-1 mb-0">Inicio</p>
            </nuxt-link>
          </div>
          <div class="item-menu px-4">
            <nuxt-link class="text-decoration-none" to="/category">
              <p color="textTitle" class="subtitle-1 mb-0">Categorias</p>
            </nuxt-link>
          </div>
        </div>

        <v-badge left overlap :value="0">
          <v-btn class="" text icon color="primary">
            <v-icon medium>mdi-cart</v-icon>
          </v-btn>
        </v-badge>

        <v-badge v-if="login" left overlap :value="0">
          <v-btn class="" text icon color="primary">
            <v-icon medium>mdi-heart</v-icon>
          </v-btn>
        </v-badge>

        <v-btn v-if="login" class="ml-2" text icon>
          <v-avatar size="40">
            <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
          </v-avatar>
        </v-btn>

        <nuxt-link
          v-if="!login"
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
          v-if="!login"
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

    <v-main>
      <nuxt />
    </v-main>

    <!-- Notificacion -->
    <v-snackbar v-model="isNotification" color="success" elevation="24">
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem, magnam.

      <template v-slot:action="{ attrs }">
        <v-btn dark text v-bind="attrs" @click="isNotification = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <!-- /Notificacion -->

    <!-- footer -->
    <v-footer color="primary" padless>
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
          <v-col v-for="(item, idx) in linksFooter" :key="idx" class="text-center text-sm-left" cols="12" sm="4">
            <h3 class="mb-4 text-h6 txt-white">{{ item.title }}</h3>
            <v-divider class="mb-2"></v-divider>
            <div>
              <p v-for="(link, i) in item.links" :key="i" class="my-2">
                <nuxt-link class="txt-gray" :to="link.to"
                  >{{ link.title }}</nuxt-link
                >
              </p>             
            </div>
          </v-col>          
          <v-spacer></v-spacer>
        </v-row>
      </v-container>
      <v-col class="text-center subtitle-2 bk-primary-bold txt-white" cols="12">
        &copy; Read&Read Todos los derechos reservados
      </v-col>
    </v-footer>
  </v-app>
</template>
 
<script>
export default {
  transition: "home",
  data() {
    return {
      drawer: false,
      rightDrawer: true,
      login: false,
      isNotification: true,
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

.item-menu:hover p {
  border-bottom: 2px solid #062146 !important;
}

a.nuxt-link-exact-active p {
  border-bottom: 2px solid #062146 !important;
  color: #555;
}

.custom-input .v-text-field__details {
  display: none !important;
  overflow: hidden !important;
}
</style>

