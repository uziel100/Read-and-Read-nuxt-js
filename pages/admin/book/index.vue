<template>
  <v-row class="justify-center">
    <v-col cols="12" md="5">
      <h1 class="mb-4 ">Agrega nuevos libros</h1>
      <v-sheet :elevation="6" class="pa-5 rounded-lg">
        <v-form ref="form">
          <v-text-field
            label="ISBN"
            placeholder="Escribe el codigo ISBN"
            outlined
            v-model="form.ISBN"
            dense
          ></v-text-field>

          <v-text-field
            label="Titulo"
            placeholder="Escribe el titulo del libro"
            outlined
            dense
            v-model="form.title"
          ></v-text-field>
                  
          <v-textarea            
            label="Resumen"
            placeholder="Resumén del libro"
            outlined            
            v-model="form.summary"
            dense            
          ></v-textarea>

          <v-select
            :items="languajes"
            label="Idioma"
            placeholder="Selecciona idioma"
            dense
            outlined
            item-text="name"
            item-value="_id"
            v-model="form.lang"
          ></v-select>

          <v-text-field
            label="Num. Páginas"
            placeholder="Escribe un numero"
            outlined
            dense
            v-model.number="form.numPages"
          ></v-text-field>

          <v-text-field
            label="Tamaño del archivo (MB, KB)"
            placeholder="Ejemplo: 4.5MB"
            outlined
            dense
            v-model="form.sizeFile"
          ></v-text-field>

          <v-text-field
            label="Precio"
            placeholder="Ejemplo: 199.99"
            outlined
            dense
            v-model.number="form.price"
          ></v-text-field>

          <v-autocomplete
            label="Autor(s)"
            placeholder="Selecciona autores"
            :items="authors"
            item-text="name"
            item-value="_id"
            outlined
            multiple
            small-chips
            dense
            v-model="form.author"
          ></v-autocomplete>

          <v-autocomplete
            label="Editorial(s)"
            class="pt-3"
            placeholder="Selecciona editorial"
            :items="publishers"
            item-text="name"
            item-value="_id"
            outlined
            multiple
            dense
            small-chips
            v-model="form.publisher"
          ></v-autocomplete>

          <v-autocomplete
            label="Categoria"
            :items="categories"
            item-text="data.name"
            item-value="data._id"
            outlined
            dense
            v-model="form.category"
          ></v-autocomplete>

          <v-autocomplete
            label="Subcategoria"
            :items="subcategories"
            item-text="name"
            item-value="_id"
            outlined
            dense
            v-model="form.subCategory"
          ></v-autocomplete> 

          <v-btn @click="handleUpload" color="accent" class="mr-4"
            >Agregar</v-btn
          >
        </v-form>
      </v-sheet>
    </v-col>
    <v-col class="mt-md-16" cols="12" md="5">
      <v-sheet :elevation="6" class="pa-5 rounded-lg">
        <v-file-input
          :loading="loadingImg"
          chips
          truncate-length="16"
          accept="image/*"
          outlined
          label="Portada del libro"
          v-model="file"
        ></v-file-input>

        <v-file-input
          chips
          truncate-length="16"
          outlined
          label="Documento"
          v-model="fileBook"
        ></v-file-input>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapActions } from "vuex";
import API from "@/API/index";
const api = new API();
export default {
  layout: "admin",
  head: {
    title: "Libros",
  },

  async asyncData({ $axios, route, error, store }) {
    try {
      const languaje = await api.list("languaje");
      const authors = await api.list("author");
      const publishers = await api.list("publisher");
      const categories = await api.list("category");
      store.commit('setCategories', categories.categories);
      return {
        languajes: languaje.data,
        authors: authors.data,
        publishers: publishers.data,
        
      };
    } catch (err) {
      error({ statusCode: err.response.status });
    }
  },
  data() {
    return {
      snackbar: false,
      loading: false,
      titleLoading: "",
      form: {
        ISBN: "",
        title: "",
        summary: "",
        lang: "",
        numPages: 0,
        sizeFile: "",
        price: "",
        author: null,
        publisher: null,
        category: null,
        subCategory: null,
        imgUrl: "",
        fileName: "",
      },
      subcategories: [],
      file: null,
      fileBook: null,
      loadingImg: false,
    };
  },

  methods: {
    ...mapActions("admin", ["showNotification"]),
    async handleUpload() {
      try {
        this.handleLoading({
          time: false,
          active: true,
          progressBar: true,
          msg: "Enviando datos del libro",
          type: "accent",
        });
        const data = await this.sendDataBook();
        const idBook = data.book._id;
        const imgUrl = await this.uploadImgCoverBook(idBook);
        const fileName = await this.uploadFileBook(idBook);
        await this.updateBook(idBook, { imgUrl, fileName });
        this.handleLoading({
          time: true,
          active: true,
          progressBar: false,
          msg: "Libro agregado :)",
          type: "success",
        });
      } catch (err) {
        this.handleLoading({
          time: true,
          active: true,
          progressBar: false,
          msg: "Libro no agregado :(",
          type: "error",
        });
      }
    },

    handleLoading(data) {
      this.showNotification(data);
      if (data.time) {
        setTimeout(() => {
          this.showNotification({ active: false });
        }, 4000);
      }
    },

    async sendDataBook() {
      return await this.$axios.$post("book", this.form);
    },

    async uploadImgCoverBook(id = "jh3h5kkkk3l0023k41j34j2") {
      this.handleLoading({
        time: false,
        active: true,
        type: "accent",
        progressBar: true,
        msg: "Subiendo imagen...",
      });
      const file = new FormData();
      file.append("file", this.file);
      const res = await this.$axios.$post("upload/imageBook/" + id, file, {
        headers: { "content-type": "multipart/form-data" },
      });
      return res.urlName;
    },

    async uploadFileBook(id = "jh3h5kkkk3l0023k41j34j2") {
      this.handleLoading({
        time: false,
        active: true,
        progressBar: true,
        msg: "Subiendo archivo...",
        type: "accent",
      });
      const file = new FormData();
      file.append("file", this.fileBook);
      const res = await this.$axios.$post("upload/fileBook/" + id, file, {
        headers: { "content-type": "multipart/form-data" },
      });
      return res.urlName;
    },

    async updateBook(id, data) {
      return await this.$axios.$put(`book/file/${id}`, data);
    },
  },

  computed: {
    ...mapState(["categories"]),
    ...mapState("admin", ["notification"]),
  },

  watch: {
    "form.category"(id) {
      const currentCategory = this.categories.find(
        (category) => category.data._id === id
      );
      this.subcategories = currentCategory.subcategories;
    },
  },
};
</script>

<style>
</style>