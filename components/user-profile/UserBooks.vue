<template>
  <section>
    <p class="caption">Leidos recientemente</p>
    <v-divider></v-divider>
    <v-row>
      <v-col v-for="(book, idx) in recentlyReadBooks" :key="idx" cols="6" sm="4" md="3">
        <item-book-2
          :title="book.title"
          :img="baseUrl.images + 'cover-example-book.jpg'"
          to="/perfil/read"
        ></item-book-2>
      </v-col>
    </v-row>
    <p class="caption">Agredados recientemente</p>
    <v-divider></v-divider>
    <v-row>
      <v-col v-for="(book, idx) in recentlyAddBooks" :key="idx" cols="6" sm="4" md="3">
        <item-book-2
          :title="book.title"
          :img="baseUrl.images + 'cover-example-book.jpg'"
          to="/perfil/read"
        ></item-book-2>
      </v-col>
    </v-row>
  </section>
</template>

<script>
import { mapState } from 'vuex'
export default {
    props:{
        recentlyReadBooks: {
            type: Array,
            required: true
        },
        recentlyAddBooks:{
            type: Array,
            required: true
        }
    },
    computed:{
      ...mapState(['baseUrl'])
    }
};
</script>

<style>
</style>