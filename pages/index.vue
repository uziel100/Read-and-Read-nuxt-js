<template>
  <div>
    <!-- BANNER -->
    <v-container fluid class="pa-0 section banner py-md-16">
      <v-container>
        <v-row>
          <v-col class="pt-2 pt-md-16" cols="12" sm="5">
            <h1
              class="text-lg-h4 text-xs-h6 font-weight-black white--text text-center text-sm-left pr-md-16"
            >
              Un libro es un regalo que puedes abrir una y otra vez
            </h1>
            <nuxt-link class="text-decoration-none" to="/unirse/registro">
              <v-btn
                class="mt-8 btn-primary d-none d-sm-block text-none"
                rounded
                color="secondary"
                large
                dark
              >
                Comienza ahora
              </v-btn>
            </nuxt-link>
          </v-col>
          <v-col
            class="d-flex justify-center align-center img-mancha"
            cols="12"
            sm="7"
          >
            <img
              width="320px"
              src="@/assets/img/img-index.svg"
              alt="Persona leyendo"
            />
          </v-col>
          <v-col class="d-sm-none d-block" cols="12">
            <nuxt-link class="mt-8 text-decoration-none" to="/unirse/registro">
              <v-btn class="text-none" rounded color="secondary" dark block>
                Comienza ahora
              </v-btn>
            </nuxt-link>
          </v-col>
        </v-row>
      </v-container>
    </v-container>

    <v-container class="mt-10">
      <!-- CARACTERISTICAS -->
      <section>
        <h2 class="text-center">Encuentra lo mejor de tus lecturas</h2>
        <v-row class="pa-0">
          <v-col cols="12" sm="4">
            <v-hover v-slot:default="{ hover }" open-delay="50">
              <v-card
                :elevation="hover ? 2 : 0"
                class="mx-auto my-sm-3 pa-2"
                max-width="330"      
                color="cards"          
              >
                <v-img
                  contain
                  aspect-ratio="1.7"
                  src="/img/caracteristica1.svg"
                ></v-img>
                <v-card-text class="mt-4">
                  <div
                    class="text-center text-h6 text-md-h6"
                  >
                    Disfruta de una gran variedad de libros
                  </div>
                </v-card-text>
              </v-card>
            </v-hover>
          </v-col>
          <v-col cols="12" sm="4">
            <v-hover v-slot:default="{ hover }" open-delay="50">
              <v-card
                :elevation="hover ? 2 : 0"
                class="mx-auto my-sm-3 pa-2"
                max-width="330"
                color="cards"          
              >
                <v-img
                  contain
                  aspect-ratio="1.7"
                  src="/img/caracteristica2.svg"
                ></v-img>
                <v-card-text class="mt-4">
                  <div class="text-center text-h6">
                    Accede a la plataforma desde cualquier dispositivo
                  </div>
                </v-card-text>
              </v-card>
            </v-hover>
          </v-col>
          <v-col cols="12" sm="4">
            <v-hover v-slot:default="{ hover }" open-delay="50">
              <v-card
                :elevation="hover ? 2 : 0"
                class="mx-auto my-sm-3 pa-2"
                max-width="330"
                color="cards"          
              >
                <v-img
                  contain
                  aspect-ratio="1.7"
                  src="/img/caracteristica3.svg"
                ></v-img>
                <v-card-text class="mt-4">
                  <div class="text-center text-h6">
                    Administra tu propio perfil y guarda tus libros favoritos
                  </div>
                </v-card-text>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>
      </section>

      <!-- NUEVOS LIBROS -->
      <section class="mt-10">
        <h2>Nuevos libros</h2>
        <v-divider class="mb-4"></v-divider>
        <v-slide-group class="pa-0" show-arrows>
          <v-slide-item v-for="n in 10" :key="n">
            <item-book
              title="lorem insum lore insum letra com..."
              img="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
              :price="450"
              :width="200"
              margin="mx-1"
              max-width="350"
            ></item-book>
          </v-slide-item>
        </v-slide-group>
      </section>

      <!-- PRINCIPALES CATEGORIAS -->
      <section class="mt-10">
        <h2>Principales Categorias</h2>
        <v-divider class="mb-4"></v-divider>

        <v-row class="d-none d-sm-flex">
          <v-col
            v-for="(category, idx) in categories"
            :key="idx"
            cols="12"
            sm="4"
            md="3"
          >
            <v-card outlined class="mx-auto" max-width="300" color="cards">
              <v-img :src="category.img" height="300px"></v-img>
              <v-card-title>{{ category.title }}</v-card-title>
            </v-card>
          </v-col>
        </v-row>

        <!-- MOVIL ONLY -->
        <div class="d-block d-sm-none">
          <v-btn
            v-for="(category, idx) in categories"
            :key="idx"
            class="ma-2"
            outlined
            rounded
            color="primary"
            style="text-transform: none !important"
            >{{ category.title }}</v-btn
          >
        </div>
      </section>
    </v-container>

    <!-- CONTADOR DE USUARIOS -->
    <v-container class="section-users section2 mt-16" fluid>
      <section class="container text-center text-sm-left d-block d-sm-flex">
        <nuxt-link class="mt-8 text-decoration-none" to="/unirse/registro">
          <v-btn
            class="btn-primary text-none"
            rounded
            color="secondary"
            large
            dark
            elevation="0"
          >
            ¡Uneté ahora!
          </v-btn>
        </nuxt-link>
        <div class="mt-6 ml-0 ml-sm-3 text-center" style="width: 200px">
          <h3 class="text-center txt-white">
            forma parte de los 100,000 lectores
          </h3>
        </div>
      </section>
    </v-container>
  </div>
</template>

<script>
export default {
  scrollToTop: true,
  transition: "home",
  head: {
    title: "Disfruta de tus lecturas",
  },
  data() {
    return {
      categories: [
        {
          title: "Ciencia ficción",
          img: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",
        },
        {
          title: "Matematicas",
          img: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
        },
        {
          title: "Romance",
          img: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
        },
        {
          title: "Tecnologia",
          img: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",
        },
        {
          title: "Cuentos",
          img: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
        },
        {
          title: "Arte",
          img: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
        },
        {
          title: "Fantastica",
          img: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",
        },
        {
          title: "Poesia",
          img: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
        },
      ],
    };
  },

  methods: {},
};
</script>


<style scoped>

.banner {
  background-image: url(../assets/img/mancha.png);
  background-repeat: no-repeat;
  /* background-position-x: 560px; */
  background-position-x: calc(76% + 100px );
  background-position-y: -100px;
}


.card-feature {
  border-top: 5px solid #48d77a;
  overflow: hidden;
}

.section-users {
  width: 100%;
  height: 150px;
}

@media (max-width: 1024px) {
  .banner {
    background-image: none;
  }
}
</style>