<template>
  <section>
    <p class="caption">Leidos recientemente</p>
    <v-divider></v-divider>
    <v-row>
      <!-- <v-col v-for="(book, idx) in recentlyReadBooks" :key="idx" cols="6" sm="4" md="3">
        <item-book-2
          :title="book.title"
          :img="baseUrl.images + 'cover-example-book.jpg'"
          to="/perfil/read"
        ></item-book-2>
      </v-col> -->
    </v-row>
    <p class="caption">Agredados recientemente</p>
    <v-divider></v-divider>
    <v-row>
      <v-col
        v-for="(book, idx) in booksAdded"
        :key="idx"
        cols="6"
        sm="4"
        md="3"
      >
        <item-book-2
          :title="book.book.title"
          :img="baseUrl.images + book.book.imgUrl"
          :to="`/perfil/read/${book.book.fileName}`"
          :favorite="book.favorite || false"
          :id="book._id"
        ></item-book-2>
      </v-col>
    </v-row>
  </section>
</template>

<script>
import { mapState } from "vuex";
export default {

  async mounted() {
    const data = await this.$axios.$get(
      `/user/${this.$auth.user._id}/book?limit=4`
    );
    this.booksAdded = data.books;
  },

  data() {
    return {
      booksReading: [{ title: "Javascript" }],
      booksAdded: [] 
    };
  },
  computed: {
    ...mapState(["baseUrl"]),
  },
};
</script>

<style>
</style>