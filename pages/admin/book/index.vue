<template>
  <v-col cols="12" md="6">
    <h1 class="mb-4 ">Agrega nuevos libros</h1>
    <v-form ref="form">
      <v-text-field
        label="ISBN"
        placeholder="Escribe el codigo ISBN"
        outlined
      ></v-text-field>

      <v-text-field
        label="Titulo"
        placeholder="Escribe el titulo del libro"
        outlined
      ></v-text-field>

      <v-btn color="accent" class="mr-4">Agregar</v-btn>
    </v-form>  
  </v-col>
</template>

<script>
export default {
  layout: "admin",
  head:{
      title: 'Libros'
  },
  data(){
    return{
        
    }
  }
};
</script>

<style>
</style>