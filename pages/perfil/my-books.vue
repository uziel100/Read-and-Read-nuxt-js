<template>
  <v-container>
    <v-card min-height="500px" elevation="2" class="pl-3">
      <v-card-text>
        Todos tus libros
        <v-divider></v-divider>
      </v-card-text>
      <v-row style="gap: 18px" class="pa-4">
          <item-book-2
            v-for="item in books" :key="item.book._id"
            :title="item.book.title"
            :img="baseUrl.images + item.book.imgUrl"
            :to="`/perfil/read/${ item.book.fileName }`"
            :favorite="item.favorite"
            :id="item._id"
          ></item-book-2>          
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  layout: "user",
  head: {
    title: "Mis libros",
  },

  async created() {
    const data = await this.$axios.$get(`/user/${this.$auth.user._id}/book`);
    this.books = data.books;
  },

  data(){
    return{
      books: []
    }
  },

  computed: {
    ...mapState(["baseUrl"]),
  },
};
</script>

<style>
</style>