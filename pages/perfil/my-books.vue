<template>
  <v-container>       
      <v-card min-height="500px"  elevation="2" class="ma-0">
        <v-card-text>          
          Todos tus libros          
          <v-divider></v-divider>
        </v-card-text>                          
        <v-row>
          <v-col class="ma-3" v-for="(libro, idx) in 15" :key="idx" >
            <item-book-2
              title="Programación"
              img="https://cdn.vuetifyjs.com/images/cards/road.jpg"            
            ></item-book-2>
          </v-col>
        </v-row>        
      </v-card>               
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