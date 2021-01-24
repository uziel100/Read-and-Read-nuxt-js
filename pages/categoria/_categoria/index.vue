<template>
  <div class="pb-16">
    <v-container fluid class="pa-0 primary">
      <v-container>
        <v-row>
          <v-col class="pt-2 pt-md-5" cols="12" sm="10">          
            <h2 class="white--text text-sm-left  text-center">{{ this.$route.params.categoria }}</h2>              
          </v-col>
        </v-row>
      </v-container>
    </v-container>

    <!-- <v-container class="mt-10">
      <p class="text-h6 font-weight-bold">Selecciona</p>
      <v-divider class="mb-4"></v-divider>
      <div class="subcategories">
        <v-btn class="custom-loader" light color="accent" rounded>Base de Datos</v-btn>
        <v-btn class="ma-2" color="accent" outlined rounded>Programacion</v-btn>
        <v-btn class="ma-2" color="accent" outlined rounded>Sistemas Operativos</v-btn>
      </div>

      <v-row class="d-flex">
        <v-col class="ma-0" v-for="(libro, idx) in 18" :key="idx" cols="6" sm="4" md="2">
          <item-book
            title="lorem insum lore insum letra com..."
            img="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
            :price="450"
            :width="200"            
            max-width="350"
          ></item-book>
        </v-col>
      </v-row>
      <div class="text-center my-5">
        <v-btn class="text-none" color="blue" outlined block rounded>Ver más</v-btn>
      </div>
    </v-container> -->
  </div>
</template>

<script>
export default {
  scrollToTop: true,
  transition: "home",
  head: {
    title: "Selecciona tu libro favorito",
  },
  data() {
    return {
      libros: [
        {
          title: "Ciencia ficción",
          img: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",
          pre: 12000.0,
        },
        {
          title: "Matematicas",
          img: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
          pre: 12000.0,
        },
        {
          title: "Romance",
          img: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
          pre: 12000.0,
        },
        {
          title: "Tecnologia",
          img: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",
          pre: 12000.0,
        },
        {
          title: "Cuentos",
          img: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
          pre: 12000.0,
        },
        {
          title: "Arte",
          img: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
          pre: 12000.0,
        },
        {
          title: "Fantastica",
          img: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",
          pre: 12000.0,
        },
        {
          title: "Poesia",
          img: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
          pre: 12000.0,
        },
      ],
    };
  },
  created(){
     console.log( this.$route )
  }
};
</script>

<style>
</style>