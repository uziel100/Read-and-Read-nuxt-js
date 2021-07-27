<template>
  <section>
    <p class="caption">Leidos recientemente</p>
    <v-divider></v-divider>
    <v-row>
      <v-col v-for="(book, idx) in recentlyReadBooks" :key="idx" cols="6" sm="4" md="3">
        <item-book-2
          :title="book.book.title"
          :img="baseUrl.images + book.book.imgUrl"
          :to="`/perfil/read/${book._id}`"
          :favorite="book.favorite || false"
          :id="book._id"
          :file="book.book.fileName"
        ></item-book-2>
      </v-col>
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
          :to="`/perfil/read/${book._id}`"
          :favorite="book.favorite || false"
          :id="book._id"
          :file="book.book.fileName"
        ></item-book-2>
      </v-col>
    </v-row>
  </section>
</template>

<script>
import { mapState } from "vuex";
export default {
  async mounted() {
    const response = await this.$axios.$get(
      `user-book/${this.$auth.user._id}/recentlyViewed?limit=4`
    );
    const data = await this.$axios.$get(
      `/user/${this.$auth.user._id}/book?limit=4`
    );
    this.booksAdded = data.books;
    this.recentlyReadBooks = response.books;
  },

  data() {
    return {
      recentlyReadBooks: [],
      booksAdded: [],
    };
  },
  computed: {
    ...mapState(["baseUrl"]),
  },
};
</script>

<style>
</style>