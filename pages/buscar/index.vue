<template>
  <v-container class="mt-8 pb-16">
    <h1 class="font-weight-medium mb-4">
      Buscaste "{{ this.$route.query.q }}"
    </h1>
    <p class="font-weight-light">
      Se han encontrado {{ books.length }} coincidencias
    </p>
    <v-sheet color="white" min-width="auto" max-width="450">
      <v-expansion-panels :disabled="false" multiple flat>
        <v-expansion-panel class="pa-0">
          <v-expansion-panel-header>
            Abrir busqueda avanzada</v-expansion-panel-header
          >
          <v-expansion-panel-content>
            <v-form v-model="form.valid" ref="form">
              <v-text-field
                label="Titulo del libro"
                outlined
                type="text"
                color="accent"
                dense
                required
                v-model="form.title"
                :rules="[form.titleRequired]"
              ></v-text-field>

              <v-select
                dense
                v-model="form.author"
                :rules="[form.authorRequired]"
                :items="authors"
                item-text="name"
                item-value="_id"
                label="Selecciona autor"
                persistent-hint
                menu-props="auto"
                return-object
                single-line
                outlined
              ></v-select>

              <v-select
                dense
                v-model="form.category"
                :items="getAllSubcategories"
                :rules="[form.categoryRequired]"
                item-text="name"
                item-value="category._id"
                label="Selecciona categoria"
                persistent-hint
                menu-props="auto"
                return-object
                single-line
                outlined
              ></v-select>
            </v-form>
            <v-btn
              :disabled="!form.valid"
              @click="doAdvancedSearch"
              color="primary"
              class="text-none"
            >
              Realizar busqueda
            </v-btn>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-sheet>

    <v-divider class="mb-4"></v-divider>

    <v-row v-if="loading" class="d-flex">
      <v-col class="ma-0" v-for="i in 6" :key="i" cols="6" sm="4" md="3">
        <v-skeleton-loader
          class="mx-auto"
          max-width="300"
          type="image, list-item-three-line"
        ></v-skeleton-loader>
      </v-col>
    </v-row>

    <v-row v-else class="d-flex mb-16">
      <v-col
        class=""
        v-for="book in books"
        :key="book._id"
        cols="6"
        sm="4"
        md="3"
      >
        <v-card
          @click="goDetailBook(book._id)"
          outlined
          class="mx-auto"
          max-width="300"
          :title="book.title"
          color="cards"
        >
          <v-img
            :src="baseUrl.images +  book.imgUrl"
            height="300px"
          ></v-img>
          <v-card-text>{{ book.title | spliceText }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  name: "Buscar",
  head: {
    title: "Busca tu libro fav",
  },
  watchQuery: ["q"],

  async asyncData({ $axios, query, error }) {
    
    const textSearch = query.q;
    if (textSearch) {
      try {
        const res = await $axios.$get(`book/search/${textSearch}`);
        const resAuthor = await $axios.$get(`author`);
        const books = res.books;
        return {
          books,
          authors: resAuthor.authors,
        };
      } catch (err) {
        error({ statusCode: err.response.status });
      }
    } else {
      error({ statusCode: 400 });
    }
  },
  data() {
    return {
      disabled: true,
      loading: false,
      form: {
        title: "",
        author: null,
        category: null,
        valid: false,
        titleRequired: (val) => !!val || "Titulo obligatorio",
        authorRequired: (val) => !!val || "Autor obligatorio",
        categoryRequired: (val) => !!val || "Categoria obligatorio",
      },
    };
  },

  methods: {
    goDetailBook(idBook) {
      this.$router.push(`/libro/${idBook}`);
    },

    async doAdvancedSearch() {
      if (this.form.title && this.form.author && this.form.category) {
        this.loading = true;
        try {
          const res = await this.$axios.$get(
            `book/advanceSearch?title=${this.form.title}&author=${this.form.author._id}&category=${this.form.category._id}`
          );
          this.books = res.books;
        } catch (err) {
          console.log(err);
        } finally {
          this.loading = false;
        }
      }
    },
  },

  computed: {
    ...mapState(['baseUrl']),
    ...mapGetters(["getAllSubcategories"]),
  },

  filters: {
    spliceText(value) {
      if (value.length > 32) {
        value = value.slice(0, 32) + "...";
      }
      return value;
    },
  },
};
</script>
