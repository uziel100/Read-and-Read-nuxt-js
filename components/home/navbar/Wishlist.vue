<template>
  <v-menu    
    :value="menu"
    :close-on-content-click="false"
    :nudge-width="280"
    offset-y
    rounded="10"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-badge
        class="d-none d-sm-block"
        left
        overlap
        :value="0"
        @click="menu = !menu"
      >
        <v-btn v-bind="attrs" v-on="on" text icon>
          <v-icon color="icons" medium>mdi-heart</v-icon>
        </v-btn>
      </v-badge>
    </template>

    <v-card max-height="400px">
      <v-list two-line>
        <v-subheader class="text-center">Lista de deseos</v-subheader>
        <div class="d-block text-center" v-if="!wishlist || !wishlist.length">
          <img width="200px" src="@/assets/img/wishlist-empty.svg" />
          <p>No tienes libros agregados :(</p>
        </div>
        <v-list-item
          @click="$router.push(`/libro/${book.bookId._id}`)"
          v-else
          dense
          link
          v-for="(book, idx) in wishlist"
          :key="idx"
        >
          <v-img
            :src="baseUrl.images + book.bookId.imgUrl"
            height="70px"
            max-width="50px"
          ></v-img>

          <v-list-item-content class="ml-4 mt-1">
            <v-list-item-title class="text-body-1">{{
              book.bookId.title
            }}</v-list-item-title>
            <v-list-item-subtitle class="text-h6 mt-2"
              >${{ book.bookId.price }}</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data(){
        return{
            menu: false,
        }
    },

    computed:{
        ...mapState(['baseUrl']),
        ...mapState('user', ['wishlist'])
    }


};
</script>

<style>
</style>