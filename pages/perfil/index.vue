<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="3" class="d-none d-sm-none d-md-block">
        <user-sections />
      </v-col>
      <v-col cols="12" sm="12" md="9">
        <user-books 
          :recentlyReadBooks="booksReading"
          :recentlyAddBooks="booksAdded"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: "user",
  head: {
    title: "Bienvenido",  
  },
   data(){
      return{
        booksReading: [{ title: 'Programación' },{ title: 'Sql desde cero' },{ title: 'Algebra lineal' },{ title: 'Ciencia de datos' }],
        booksAdded: [{ title: 'Programación' },{ title: 'Sql desde cero' }]
      }
    }
};
</script>

<style>
</style>