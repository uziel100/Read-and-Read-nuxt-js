<template>
  <section>
    <p class="caption">Libros en la lista de deseos</p>
    <v-divider></v-divider>
    <v-row v-if="!wishlist.length">
      <v-col>
        <div class="d-block text-center">
          <img
            width="60%"
            src="@/assets/img/wishlist-empty.svg"
            alt="El usuario no tiene agregado ningun libro a su lista de deseos"
          />
          <p class="text-body-1">No hay ningún libro agregado</p>
        </div>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col
        v-for="(book, idx) in wishlist"
        :key="idx + '_' + book.bookId._id"
        cols="6"
        sm="4"
        md="3"
      >
        <item-book-2
          :title="book.bookId.title"
          :img="`${baseUrl.images + book.bookId.imgUrl}`"
          :to="`/libro/${ book.bookId._id }`"
          :isWishlist="true"
        ></item-book-2>
      </v-col>
    </v-row>
  </section>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      list: [],
    };
  },

  computed: {
    ...mapState(["baseUrl"]),
    ...mapState("user", ["wishlist"]),
  },
};
</script>

