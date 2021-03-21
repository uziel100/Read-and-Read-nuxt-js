<template>
  <section>
    <p class="caption">Leidos recientemente</p>
    <v-divider></v-divider>
    <v-row>
      <v-col v-for="(book, idx) in recentlyReadBooks" :key="idx" cols="6" sm="4" md="3">
        <item-book-2
          :title="book.title"
          img="https://cdn.vuetifyjs.com/images/cards/road.jpg"
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
          img="https://cdn.vuetifyjs.com/images/cards/road.jpg"
          to="/perfil/read"
        ></item-book-2>
      </v-col>
    </v-row>
  </section>
</template>

<script>
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
    }
};
</script>

<style>
</style>