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
    <v-container class="mt-10">
      <p class="text-h6 mb-2">Categorias</p>
      <v-divider class="mb-2"></v-divider>
      <div class="subcategories">
        <v-btn
          v-for="currentCategory in selectedSubcategories"
          :key="currentCategory.niceName"
          class="ma-2"
          color="accent"
          :outlined="currentCategory.active"
          rounded
          >{{ currentCategory.name }}</v-btn
        >
      </div>

      <v-row class="d-flex">
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
            img="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
            :price="book.price"
            :width="250"
            :idBook="book._id"
            max-width="350"
          ></item-book>
        </v-col>
        <p class="text-center ml-3 my-10" v-if="books.length === 0">No hay libros en esta categoria</p>
      </v-row>
      <div v-if="books.length > 0" class="text-center my-5">
        <v-btn class="text-none" color="blue" outlined block rounded
          >Ver más</v-btn
        >
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  scrollToTop: true,
  transition: "home",
  head: {
    title: "Selecciona tu libro favorito",
  },
  data() {
    return {
      selectedSubcategories: null,
      currentSubcategory: null,
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
    this.setCurrentSubcategory();
    this.selectedSubcategory();
    this.fetchBooksOfSubcategory();
    this.setItemsBreadcumb();
  },

  methods: {
    setItemsBreadcumb() {
      const links = [
        {
          text: "Inicio",
          disabled: false,
          to: "/"
        },
        {
          text: this.currentSubcategory.name,
          disabled: true,
          to: "/" + this.currentSubcategory.niceName,
        },
      ];
      this.breadcumbs = links;
    },
    setCurrentSubcategory() {
      const { name, niceName, _id } = this.subcategory;
      this.currentSubcategory = { name, niceName, _id };
    },
    selectedSubcategory() {
      this.selectedSubcategories = this.subcategories.map((subcate) => {
        let buttonSubcategory = {
          niceName: subcate.niceName,
          name: subcate.name,
          active: true,
        };
        if (subcate.niceName === this.currentSubcategory.niceName) {
          buttonSubcategory.active = false;
        }
        return buttonSubcategory;
      }, {});
    },
    async fetchBooksOfSubcategory() {
      const res = await this.$axios.$get(
        `/booksInCategory/${this.currentSubcategory._id}`
      );
      this.books = res.books;
    },
  },

  computed: {},
};
</script>

<style>
</style>