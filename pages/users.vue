<template>
  <v-container>
    <v-row>
      <v-spacer></v-spacer>
      <v-col cols="12" sm="10" lg="10">
        <v-simple-table fixed-header height="300px">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Nombre</th>
                <th class="text-left">Email</th>
                <th class="text-left">Contraseña</th>
                <th class="text-left">Dirección</th>
                <th class="text-left">Telefono</th>
                <th class="text-left">Fecha Nacimiento</th>
                <th class="text-left">Sexo</th>

                
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user._id">
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.password }}</td>
                <td>{{ user.address }}</td>
                <td>{{ user.phone }}</td>
                <td>{{ user.date }}</td>
                <td>{{ user.sexo }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </v-container>
</template>

<script>
export default { 

  async created() {
    try {        
      const data = await this.$axios.$get("user");      
      this.users = data.users;            
    } catch (err) {
      console.log(err.response);
    }
  },

  data() {
    return {
      users: [],
    };
  },
};
</script>

<style>
</style>