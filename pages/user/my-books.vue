<template>
  <v-container>
    <div class="pb-16">
      <!--VISTA DE ESCRITORIO-->
      <v-card min-height="500px"  elevation="2" class="ma-0 d-md-block d-none">
        <v-card-text class="d-md-block d-none">
          <p class="d-md-block d-none">
          Todos tus libros
          </p>
          <v-divider class="d-md-block d-none"></v-divider>
        </v-card-text>
        <center>
          <v-row class="d-none d-sm-flex" align="center" justify="center">
              <v-col class="ma-3" v-for="(libro, idx) in 15" :key="idx" cols="3" sm="4" md="2">
                <item-book-2
                  title="Programación"
                  img="https://cdn.vuetifyjs.com/images/cards/road.jpg"            
                ></item-book-2>
              </v-col>
          </v-row>
        </center>
      </v-card>
      
      <!--VISTA DE MOVIL-->
      <p class="d-sm-none font-weight-bold ma-4" text-sm-center>
        Todos tus libros
      </p>
      <v-row class="d-sm-none" align="center" justify="center">
          <v-col class="ma-3 pa-0" v-for="(libro, idx) in 15" :key="idx" cols="3" sm="4" md="2">
            <item-book-3
              title="Programación"
              img="https://cdn.vuetifyjs.com/images/cards/road.jpg"          
            ></item-book-3>
          </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>

  export default {
      layout: 'user',
      head: {
        title: "Mis libros",
      },
  }
</script>

<style>

</style>