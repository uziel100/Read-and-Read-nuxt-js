<template>
  <v-form ref="form" v-model="form.valid">
    <v-row class="justify-center">
      <v-col cols="12" md="5">
        <h1 class="mb-4">Agrega nuevos libros</h1>        
        <v-text-field
          label="ISBN"
          placeholder="Escribe el codigo ISBN"
          outlined
          v-model="form.ISBN"
          dense
          :rules="[form.fileRequired]"
        ></v-text-field>

        <v-text-field
          label="Titulo"
          placeholder="Escribe el titulo del libro"
          outlined
          dense
          v-model="form.title"
          :rules="[form.fileRequired]"
        ></v-text-field>

        <v-textarea
          label="Resumen"
          placeholder="Resumén del libro"
          outlined
          v-model="form.summary"
          dense
          :rules="[form.fileRequired]"
        ></v-textarea>

        <v-select
          :items="collection.languaje"
          label="Idioma"
          placeholder="Selecciona idioma"
          dense
          outlined
          item-text="name"
          item-value="_id"
          v-model="form.lang"
          :rules="[form.fileRequired]"
        ></v-select>

        <v-text-field
          label="Num. Páginas"
          placeholder="Escribe un numero"
          type="number"
          outlined
          dense
          v-model.number="form.numPages"
          :rules="[form.fileRequired]"
        ></v-text-field>

        <v-text-field
          label="Tamaño del archivo (MB, KB)"
          placeholder="Ejemplo: 4.5MB"
          outlined
          dense
          v-model="form.sizeFile"
          :rules="[form.fileRequired]"
        ></v-text-field>        
      </v-col>
      <v-col class="mt-md-16" cols="12" md="5">        
        <v-text-field
          label="Precio"
          placeholder="Ejemplo: 199.99"
          type="number"
          outlined
          dense
          v-model.number="form.price"
          :rules="[form.fileRequired]"
        ></v-text-field>
        <v-autocomplete
          label="Autor(s)"
          placeholder="Selecciona autores"
          :items="collection.author"
          item-text="name"
          item-value="_id"
          outlined
          multiple
          small-chips
          dense
          v-model="form.author"
          :rules="[form.fileRequired]"
        ></v-autocomplete>

        <v-autocomplete
          label="Editorial(s)"
          class="pt-3"
          placeholder="Selecciona editorial"
          :items="collection.publisher"
          item-text="name"
          item-value="_id"
          outlined
          multiple
          dense
          small-chips
          v-model="form.publisher"
          :rules="[form.fileRequired]"
        ></v-autocomplete>

        <v-autocomplete
          label="Categoria"
          :items="categories"
          item-text="data.name"
          item-value="data._id"
          outlined
          dense
          v-model="form.category"
          :rules="[form.fileRequired]"
        ></v-autocomplete>

        <v-autocomplete
          label="Subcategoria"
          :items="subcategories"
          item-text="name"
          item-value="_id"
          outlined
          dense
          v-model="form.subCategory"
          :rules="[form.fileRequired]"
        ></v-autocomplete>
        <v-file-input
          :loading="loadingImg"
          chips
          truncate-length="16"
          accept=".jpg, .png, .jpeg"
          outlined
          label="Portada del libro"
          v-model="file"
          :rules="[form.fileRequired]"
        ></v-file-input>

        <v-file-input
          chips
          accept=".pdf"
          truncate-length="16"
          outlined
          label="Documento"
          v-model="fileBook"
          :rules="[form.fileRequired]"
        ></v-file-input>        
      </v-col>
    </v-row>
    <div class="d-flex justify-center">
      <v-btn
        @click="handleUpload"
        :disabled="!form.valid"
        color="accent"        
        right
        >Agregar</v-btn
      >
    </div>
  </v-form>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  layout: "admin",
  head: {
    title: "Libros",
  },

  async asyncData({ $axios, route, error, store }) {
    try {
      const categories = await $axios.$get("category");
      store.commit("setCategories", categories.categories);
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
        fileRequired: (v) => !!v || "Campo requerido",
        valid: false,
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
        this.clearFields();
      } catch (err) {
        const msg = err.response
          ? err.response.data.message
          : "Ha ocurrido un error";
        this.handleLoading({
          time: true,
          active: true,
          progressBar: false,
          msg,
          type: "error",
        });
      }
    },

    clearFields() {
      this.form.ISBN = null;
      this.form.title = null;
      this.form.summary = null;
      this.form.lang = null;
      this.form.numPages = null;
      this.form.sizeFile = null;
      this.form.price = null;
      this.form.author = null;
      this.form.publisher = null;
      this.form.imgUrl = null;
      this.form.fileName = null;
      this.file = null;
      this.fileBook = null;
      this.$refs.form.resetValidation();
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
    ...mapState("admin", ["notification", "collection"]),
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