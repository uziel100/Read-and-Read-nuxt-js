<template>
  <div class="pb-16">
    <v-container fluid class="pa-0 primary">
      <v-container>
        <v-row>
          <v-col class="pt-2 pt-md-5" cols="12" sm="10">
            <h1 class="white--text text-sm-left text-center">
              {{ subcategory.category.name }}
            </h1>
          </v-col>
        </v-row>
      </v-container>
    </v-container>
    <v-container>
      <v-breadcrumbs class="pl-0 py-2" :items="breadcumbs"></v-breadcrumbs>
    </v-container>
    <v-container class="mt-3">
      <p class="text-h6 mb-2">Categorias</p>
      <v-divider class="mb-2"></v-divider>
      <div>
        <v-btn
          v-for="subcategory1 in selectedSubcategories"
          :key="subcategory1.niceName"
          class="ma-2 text-none"
          color="accent"
          :outlined="subcategory1.active"
          rounded
          small
          @click="toggleSubcategory(subcategory1._id)"
          >{{ subcategory1.name }}</v-btn
        >
      </div>
      <v-row v-if="loading" class="d-flex">
        <v-col class="ma-0" v-for="i in 8" :key="i" cols="6" sm="4" md="3">
          <v-skeleton-loader
            class="mx-auto"
            max-width="300"
            type="image, list-item-three-line"
          ></v-skeleton-loader>
        </v-col>
      </v-row>
      <v-row v-else class="d-flex">        
          <v-col
            class="ma-0"
            v-for="book in books"
            :key="book._id"
            cols="6"
            sm="4"
            md="3"
          >
            <item-book
              :title="book.title"
              :img="
                book.imgUrl
                  ? baseUrl.images + book.imgUrl
                  : 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg'
              "
              :price="book.price"
              :width="250"
              :idBook="book._id"
              max-width="350"
            ></item-book>
          </v-col>
          <p class="text-center ml-3 my-10" v-if="books.length === 0">
            No hay libros en esta categoria
          </p>        
      </v-row>
      <!-- <div v-if="books.length > 0" class="text-center my-5">
        <v-btn class="text-none" color="blue" outlined block rounded
          >Ver más</v-btn
        >
      </div> -->
    </v-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  scrollToTop: true,
  transition: "home",
  head: {
    title: "Selecciona tu libro favorito",
  },
  data() {
    return {
      loading: true,
      selectedSubcategories: null,
      books: [],
      breadcumbs: [],
    };
  },

  async asyncData({ $axios, route, error }) {
    try {
      const data = await $axios.$get(`subcategory/${route.params.categoria}`);
      return {
        subcategory: data.subcategory,
        subcategories: data.subcategories,
      };
    } catch (err) {
      error({ statusCode: err.response.status });
    }
  },

  created() {
    this.toggleSubcategory(this.subcategory._id);
    this.setItemsBreadcumb();
    this.loading = false;
  },

  methods: {
    setItemsBreadcumb() {
      const links = [
        {
          text: "Inicio",
          disabled: false,
          to: "/",
        },
        {
          text: this.currentSubcategory.name,
          disabled: true,
          to: "/" + this.currentSubcategory.niceName,
        },
      ];
      this.breadcumbs = links;
    },

    selectedSubcategory(idSubcategory) {
      this.selectedSubcategories = this.subcategories.map((subcategory) => {
        let buttonSubcategory = {
          _id: subcategory._id,
          niceName: subcategory.niceName,
          name: subcategory.name,
          active: true,
        };
        if (subcategory._id === idSubcategory) {
          buttonSubcategory.active = false;
        }
        return buttonSubcategory;
      }, []);
    },

    toggleSubcategory(idSubcategory) {
      this.loading = true;
      this.selectedSubcategory(idSubcategory);
      this.fetchBooksOfSubcategory(idSubcategory);
    },

    async fetchBooksOfSubcategory(idSubcategory) {
      const res = await this.$axios.$get(`/book/subcategory/${idSubcategory}`);
      this.books = res.books;
      this.loading = false;
    },
  },

  computed: {
    ...mapState(["baseUrl"]),
    currentSubcategory() {
      const { _id, name, niceName } = this.subcategory;
      return { _id, name, niceName };
    },
  },
};
</script>

<style>
</style>