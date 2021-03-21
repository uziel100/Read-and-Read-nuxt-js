<template>
  <v-container>       
      <v-card min-height="500px"  elevation="2" class="pl-3">
        <v-card-text>          
          Todos tus libros          
          <v-divider></v-divider>
        </v-card-text>                          
        <v-row>
          <v-col cols="6" sm="4" md="3"  v-for="(libro, idx) in 1" :key="idx" >
            <item-book-2
              title="Programación"
              :img="baseUrl.images + 'cover-example-book.jpg'"  
              to="/perfil/read"          
            ></item-book-2>
          </v-col>
        </v-row>        
      </v-card>               
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
  export default {
      layout: 'user',
      head: {
        title: "Mis libros",
      },

       computed:{
      ...mapState(['baseUrl'])
    }
  }
</script>

<style>

</style>