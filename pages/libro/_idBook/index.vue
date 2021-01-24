<template>
  <div>
    <v-container fluid class="pa-0 bannerDetailBook py-md-1">
      <v-container>
        <div class="text-center text-md-left">
          <v-breadcrumbs dark class="pl-0 pt-2 pb-4 text-center" :items="breadcumbs"></v-breadcrumbs>
        </div>
        
        <v-row class="d-flex">
          <v-col
            class="pt-2 pl-0 pt-md-8 order-1 order-md-0"
            cols="12"
            sm="12"
            md="8"
          >
            <h1
              class="text-lg-h4 text-xs-h7 font-weight-black white--text text-center text-sm-left mb-4 d-none d-md-block"
            >
              {{ book.title }}
            </h1>
            <div class="text-center text-md-left">
              <div class="d-sm-flex d-block justify-sm-center justify-md-start">
                <div class="d-flex justify-center">
                  <p class="white--text d-block">4.3</p>
                  <v-rating
                    :value="5"
                    color="warning"
                    readonly
                    size="15px"
                    class="mx-1"
                    dense
                  ></v-rating>
                </div>
                <p class="white--text d-block mt-0">
                  (1,340 calificaciones) 4,342 lectores
                </p>
              </div>
              <div class="text-center text-md-left">
                <p class="white--text">
                  <span class="font-weight-bold"> Autor(s): </span>
                  <span>{{ stringAuthors }}</span> 
                </p>
                <p class="white--text">
                  <span class="font-weight-bold">Editorial:</span> {{ book.publisher }}
                </p>
                <p class="white--text">
                  <span class="font-weight-bold">Idioma: </span>
                  {{ book.lang }}
                </p>
              </div>
              
                <v-btn class="mt-10 text-none" rounded color="error" dark>
                  <v-icon left> mdi-heart </v-icon>
                  Añadir a la lista de deseos
                </v-btn>              
            </div>
          </v-col>
          <v-col
            cols="12"
            sm="12"
            md="4"
            class="text-center order-0 order-md-1"
          >
            <h1
              class="text-h5 font-weight-black white--text text-center mb-4 d-block d-md-none"
            >
              {{ book.title }}
            </h1>
            <div class="d-flex justify-center">
              <v-card color="cards" height="450px" width="300px">
                <v-img src="/img/libro.jpg" height="350px"></v-img>
                <v-card-text>
                  <v-card-title class="pa-0 text-black"
                    >$ {{ book.price }} MX</v-card-title
                  >
                </v-card-text>
                <v-btn color="error" dark class="text-none" block
                  >Agregar al carrito</v-btn
                >
              </v-card>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-container>

    <!-- Detail book -->
    <v-container>
      <!-- Details Book -->
      <v-row>
        <v-col class="pt-2 pt-md-10" cols="12" sm="12" md="8">
          <v-card flat>
            <v-card-text>
              <h2 class="font-weight-black title--text mb-4">
                Descripción de libro
              </h2>
              <v-divider class="mb-2"></v-divider>
              <p class="pa-0">
               {{ book.summary }}
              </p>
              <h2 class="font-weight-black title--text mb-4">
                Detalles del libro
              </h2>
              <v-divider class="mb-2"></v-divider>
              <p>
                <span class="font-weight-black title--text">ISBN: </span>
                {{ book.ISBN }}
              </p>
              <p>
                <span class="font-weight-black title--text">Idioma: </span>
                {{ book.lang }}
              </p>
              <p>
                <span class="font-weight-black title--text">Paginas: </span>
                {{ book.numPages }}
              </p>
              <p>
                <span class="font-weight-black title--text"
                  >Año de publicación:
                </span>
                10 octubre 2018
              </p>
              <p>
                <span class="font-weight-black title--text">Editorial: </span>
                {{ book.publisher }}
              </p>
              <p>
                <span class="font-weight-black title--text">Autores: </span>
                Van Der Meer Rémy Bastien
              </p>
            </v-card-text>
          </v-card>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>

      <v-row>
        <v-col class="pt-2" cols="12" sm="12" md="8">
          <v-card flat>
            <v-card-text>
              <h2 class="font-weight-bold title--text mb-4">
                Comentarios del los lectores
              </h2>
              <v-row>
                <v-col col="12" sm="3" md="4" class="text-center pt-5">                  
                  <p class="font-weight-bold text-h4">4.5</p>
                  <v-rating
                    :value="4.5"
                    color="warning"
                    readonly
                    size="15px"
                    half-increments
                    dense
                  ></v-rating>
                  <p>Valoración del libro</p>
                </v-col>
                <v-col sm="9" md="8" class="d-none d-sm-block" >   
                  <div class="d-flex align-center">
                    <v-progress-linear
                      color="primary"
                      rounded
                      value="80"                      
                      height="6"
                    ></v-progress-linear>
                    <v-rating
                      :value="5"
                      color="warning"
                      readonly
                      size="15px"                       
                    ></v-rating>                  
                  </div>                
                  <div class="d-flex align-center">
                    <v-progress-linear
                      color="primary"
                      rounded
                      value="50"
                      height="6"
                    ></v-progress-linear>
                    <v-rating
                      :value="4"
                      color="warning"
                      readonly
                      size="15px"                      
                    ></v-rating>                  
                  </div>                
                  <div class="d-flex align-center">
                    <v-progress-linear
                      color="primary"
                      rounded
                      value="30"
                      height="6"
                    ></v-progress-linear>
                    <v-rating
                      :value="3"
                      color="warning"
                      readonly
                      size="15px"                      
                    ></v-rating>                  
                  </div>                
                  <div class="d-flex align-center">
                    <v-progress-linear
                      color="primary"
                      rounded
                      value="20"
                      height="6"
                    ></v-progress-linear>
                    <v-rating
                      :value="2"
                      color="warning"
                      readonly
                      size="15px"                      
                    ></v-rating>                  
                  </div>                
                  <div class="d-flex align-center">
                    <v-progress-linear
                      color="primary"
                      rounded
                      value="10"
                      height="6"
                    ></v-progress-linear>
                    <v-rating
                      :value="1"
                      color="warning"
                      readonly
                      size="15px"
                      height="6"
                    ></v-rating>                  
                  </div>                
                </v-col>
              </v-row>  
              
              <div class="text-center text-sm-left">
                <v-btn class="text-none" rounded  color="accent" >Escribir mi opinión</v-btn>                                                              
              </div>
              
            </v-card-text>
          </v-card>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>

      <v-row>
        <v-col class="pt-2 pt-md-10" cols="12" sm="12" md="8">
          <v-card color="cards" v-for="(user, i) in 8" :key="i" flat>
            <v-card-text>
              <div class="d-flex">
                <v-avatar>
                  <img src="@/assets/img/senora.jpg" alt="señora" />
                </v-avatar>
                <div class="ml-3">
                  <p class="font-weight-black title--text ma-0">
                    Danna Sofía Hernandez Alonso
                  </p>
                  <v-rating
                    :value="4"
                    color="warning"
                    readonly
                    size="18px"
                    dense
                  ></v-rating>
                  <v-card-text class="pa-0">
                    Este libro es exelente, lo recomiendo mucho, a mi hijo le
                    encanta que le cuente un cuento diferenente cada noche antes
                    de dormir.
                  </v-card-text>
                </div>
              </div>
            </v-card-text>
            <v-divider></v-divider>
          </v-card>

          <v-btn
            class="mt-16 d-sm-block text-none"
            rounded
            outlined
            color="primary"
            dark
            block
          >
            Ver mas comentarios
          </v-btn>
        </v-col>
      </v-row>
    </v-container> 
  </div>
</template>

<script>
export default {
  head: {
    title: "Un libro es el mejor regalo",
  },
  

  async asyncData({ $axios, route, error }){
     try {
      const res = await $axios.$get(`book/${ route.params.idBook }`);
      return { 
        book: res.book
      }
      
    } catch (err) {
      error({ statusCode: err.response.status })
    }
  },

  data(){
    return {
      breadcumbs: []
    }
  },

  created(){
    this.setItemsBreadcumb();
  },

  methods:{
     setItemsBreadcumb() {
      const links = [
        {
          text: "Inicio",
          disabled: false,
          to: "/",
        },
        {
          text: this.book.subCategory.name,
          disabled: false,
          to: "/" + this.book.subCategory.niceName,
        },
        {
          text: this.book.title.length > 40? this.book.title.slice(0, 40) + "..." : this.book.title,
          disabled: true,
          to: "/libro/" + this.book._id,
        },
      ];
      this.breadcumbs = links;
    },
  },

  computed:{
    stringAuthors(){
      return this.book.author.map( author => author.name ).join(', ')
    }
  }
};
</script>


<style scoped>
.bannerDetailBook {
  background-image: url(../../../assets/img/bannerDetailBook4.png) !important;
  background-size: cover;
}
</style>