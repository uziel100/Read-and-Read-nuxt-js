<template>
  <div>
    <h2 class="text-center my-5">Libros solicitados</h2>
    <v-row class="justify-center">
      <v-col cols="12" md="8">
        <v-simple-table fixed-header height="400px">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Titulo del libro</th>
                <th class="text-left">Autor(s)</th>      
                <th class="text-left">Editorial</th>      
                <th class="text-left">Quien lo solicito</th>      
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in books" :key="item._id">
                <td>{{ item.title }}</td>
                <td>{{ item.authors }}</td>
                <td>{{ item.publisher }}</td>
                <td>{{ item.user.email }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "request",
  layout: "admin",
  head: {
    title: "Libros solicitados",
  },

  async asyncData({ error, $axios }) {
    try {
      const res = await $axios.$get("book-request");
      return {
        books: res.data,
      };
    } catch (err) {
      error({ statusCode: err.response.status });
    }
  },

  data() {
    return {      
      test: 'ok'
    };
  },
};
</script>

