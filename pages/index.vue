<template>
  <div>
    <!-- BANNER -->
    <v-container fluid class="pa-0 section banner  py-md-16">
      <v-container>
        <v-row>
          <v-col class="pt-2 pt-md-16" cols="12" sm="5">
            <h1
              class="text-lg-h4 text-xs-h6 font-weight-black white--text text-center text-sm-left pr-md-16 animation-toRigh"
            >
              Un libro es un regalo que puedes abrir una y otra vez
            </h1>
            <nuxt-link class="text-decoration-none " to="/unirse/registro">
              <v-btn
                class="mt-8 btn-primary d-none d-sm-block text-none animation-toTop"
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
              class="animation-toLeft"
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
                  src="/img/caracteristica1.png"
                  :class="hover? 'animation-toBottom-fast' : ''"                  
                ></v-img>
                <v-card-text class="mt-4">
                  <p
                    class="text-center text-h6 text-md-h6"
                    :class="hover? 'animation-toTop-fast' : ''"
                  >
                    Disfruta de una gran variedad de libros
                  </p>
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
                  src="/img/caracteristica2.png"
                  :class="hover? 'animation-toBottom-fast' : ''"                  
                ></v-img>
                <v-card-text class="mt-4">
                  <p class="text-center text-h6" :class="hover? 'animation-toTop-fast' : ''">
                    Accede a la plataforma desde cualquier dispositivo
                  </p>
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
                  src="/img/caracteristica3.png"
                  :class="hover? 'animation-toBottom-fast' : ''"                  
                ></v-img>
                <v-card-text class="mt-4">
                  <p class="text-center text-h6" :class="hover? 'animation-toTop-fast' : ''" >
                    Administra tu propio perfil y guarda tus libros favoritos
                  </p>
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
          <v-slide-item v-for="book in newBooks" :key="book._id">
            <item-book
              :title="book.title"
              img="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
              :price="book.price"
              :width="200"
              :idBook="book._id"
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
            <v-card outlined class="mx-auto zoom" max-width="300" color="cards">
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
import { mapState } from 'vuex'

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

  computed:{
    ...mapState(['newBooks'])
  },

  methods: {},
};
</script>


<style scoped>

.zoom:hover{
  transform: scale(1.1);
  transition: transform .5s;
}

.banner {
  background-image: url(../assets/img/mancha.png);
  background-repeat: no-repeat;  
  background-position-x: calc(76% + 100px );
  background-position-y: -100px;
}

.animation-toTop-fast{
  animation: toTop 400ms linear;
}

.animation-toTop{  
  animation: toTop 1s linear;
}

.animation-toLeft-fast{
  animation: toLeft 400ms linear;
}

.animation-toLeft{
  animation: toLeft 1s linear;
}
.animation-toRigh-fast{
  animation: toRigth 400ms  linear;
}
.animation-toRigh{
  animation: toRigth 1s  linear;
}

.animation-toBottom-fast{
  animation: toBottom 600ms linear;
}

.animation-toBottom{
  animation: toBottom 1s  linear;
}

@keyframes toRigth {
   from{
      opacity: 0;
      transform: translateX(-200%);        
    }    
    to{
      opacity: 1;
      transform: translateX(0%);        
    }
}

@keyframes toTop {
   from{
      opacity: 0;
      transform: translateY(200%);        
    }    
    to{
      opacity: 1;
      transform: translateY(0%);        
    }
}

@keyframes toBottom {
   from{
      opacity: 0;
      transform: translateY(-200%);        
    }    
    to{
      opacity: 1;
      transform: translateY(0%);        
    }
}

@keyframes toLeft {
    from{
      opacity: 0;
      transform: translateX(300%);        
    }    
    to{
      opacity: 1;
      transform: translateX(0%);        
    }
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