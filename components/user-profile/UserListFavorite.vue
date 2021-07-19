<template>
  <section>
    <p class="caption">Tus libros favoritos</p>
    <v-divider></v-divider>
    <v-row v-if="!favorites.length">
      <v-col>
        <div class="d-block text-center">
          <img
            width="60%"
            src="@/assets/img/wishlist-empty.svg"
            alt="El usuario no tiene agregado ningun libro a su lista de deseos"
          />
          <p class="text-body-1">No hay ningún libro agregado aún</p>
        </div>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col v-for="book in favorites" :key="book._id" cols="6" sm="4" md="3">
        <item-book-2
          :title="book.book.title"
          :img="`${baseUrl.images + book.book.imgUrl}`"          
          :to="`/perfil/read/${book._id}`"
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
    const favorites = await this.$axios.$get(
      `/user-favorite/${this.$auth.user._id}`
    );    
    this.favorites = favorites.books;
  },

  data(){
      return{       
        favorites: []    
      }
    },

  computed: {
    ...mapState(["baseUrl"]),
  },
};
</script>

