<template>
  <div>
    <h1>Permisos de los usuarios</h1>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Permisos</th>
            <th class="text-left">Usuario (lector)</th>
            <th class="text-left">Administrador</th>
          </tr>
        </thead>
        <tbody>
            <!-- v-for="item in desserts" :key="item.name" -->
          <tr>
            <td>Editar libros</td>
            <td> <v-icon color="error">mdi-checkbox-blank-circle-outline</v-icon> </td>
            <td> <v-icon color="success">mdi-checkbox-marked-circle</v-icon> </td>                        
          </tr>
          <tr >
            <td>Editar categorias</td>
            <td> <v-icon color="error">mdi-checkbox-blank-circle-outline</v-icon> </td>
            <td> <v-icon color="success">mdi-checkbox-marked-circle</v-icon> </td>                        
          </tr>
          <tr >
            <td>Editar subcategorias</td>
            <td> <v-icon color="error">mdi-checkbox-blank-circle-outline</v-icon> </td>
            <td> <v-icon color="success">mdi-checkbox-marked-circle</v-icon> </td>                        
          </tr>
          <tr>
            <td>Ver libros de cada usuario</td>
            <td> <v-icon color="success">mdi-checkbox-marked-circle</v-icon> </td>                        
            <td> <v-icon color="error">mdi-checkbox-blank-circle-outline</v-icon> </td>
          </tr>
           <tr>
            <td>Editar editoriales</td>
            <td> <v-icon color="error">mdi-checkbox-blank-circle-outline</v-icon> </td>
            <td> <v-icon color="success">mdi-checkbox-marked-circle</v-icon> </td>                        
          </tr>
          <tr>
            <td>Editar authores</td>
            <td> <v-icon color="error">mdi-checkbox-blank-circle-outline</v-icon> </td>
            <td> <v-icon color="success">mdi-checkbox-marked-circle</v-icon> </td>                        
          </tr>

        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
export default {
  layout: "admin",
};
</script>

<style>
</style>