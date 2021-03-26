<template>
  <v-row class="justify-center">
    <v-col cols="12" md="5">
      <h1 class="mb-4">Actualiza la información</h1>
      <v-sheet :elevation="6" class="pa-5 rounded-lg">
        <v-form ref="form" v-model="form.valid">
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
            outlined
            dense
            v-model.number="form.numPages"
            type="number"
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

          <v-text-field
            label="Precio"
            placeholder="Ejemplo: 199.99"
            outlined
            dense
            v-model.number="form.price"
            :rules="[form.fileRequired]"
            type="number"
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
            accept="image/*"
            outlined
            label="Solo si quiere cambiar la imagen"
            v-model="file"
          ></v-file-input>

          <v-file-input
            chips
            truncate-length="16"
            outlined
            label="Solo si quiere cambiar el archivo"
            v-model="fileBook"
          ></v-file-input>

          <v-btn
            :disabled="!form.valid"
            @click="handleUpload"
            color="accent"
            class="mr-4"
            >Actualizar</v-btn
          >
        </v-form>
      </v-sheet>
    </v-col>
    <v-col>
      <v-simple-table fixed-header width="200px" height="300px">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">ISBN</th>
              <th class="text-left">Titulo</th>
              <th class="text-left">Precio</th>
              <th class="text-left">Categoria</th>
              <th class="text-left">Autor(s)</th>
              <th class="text-left">Opciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="book in books" :key="book._id">
              <th>{{ book.ISBN }}</th>
              <th>{{ book.title }}</th>
              <th>{{ book.price }}</th>
              <th>
                {{ book.category.name }}
                <br />
                - {{ book.subCategory.name }}
              </th>
              <th>
                {{ book.author.map((author) => author.name).join(", ") }}
              </th>
              <th>
                <v-btn
                  @click="setDataInForm(book)"
                  color="primary"
                  class="mr-2"
                  fab
                  small
                  dark
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </th>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  layout: "admin",
  head: {
    title: "Todos los libros",
  },
  async asyncData({ error, redirect, $axios, store }) {
    try {
      const books = await $axios.$get("book");

      return {
        books: books.books,
      };
    } catch (err) {
      redirect("/admin");
    }
  },
  data() {
    return {
      snackbar: false,
      loading: false,
      titleLoading: "",
      form: {
        id: "",
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
        fileRequired: (v) => !!v || "Campo requerido",
        valid: false,
      },
      chagedImg: false,
      chagedFile: false,
      subcategories: [],
      file: null,
      fileBook: null,
      loadingImg: false,
    };
  },
  computed: {
    ...mapState(["categories"]),
    ...mapState("admin", ["collection"]),
  },
  methods: {
    ...mapActions("admin", ["showNotification"]),

    setDataInForm(book) {
      this.form.id = book._id;
      this.form.ISBN = book.ISBN;
      this.form.title = book.title;
      this.form.summary = book.summary;
      this.form.lang = book.lang._id;
      this.form.numPages = book.numPages;
      this.form.sizeFile = book.sizeFile;
      this.form.price = book.price;
      this.form.author = book.author.map((author) => author._id);
      this.form.publisher = book.publisher.map((publis) => publis._id);
      this.form.category = book.category._id;
      this.form.subCategory = book.subCategory._id;
    },

    clearFields() {
      this.form.id = null;
      this.form.ISBN = null;
      this.form.title = null;
      this.form.summary = null;
      this.form.lang = null;
      this.form.numPages = null;
      this.form.sizeFile = null;
      this.form.price = null;
      this.form.author = null;
      this.form.publisher = null;
      this.file = null;
      this.fileBook = null;
      this.$refs.form.resetValidation();
    },

    async handleUpload() {
      try {
        this.handleLoading({
          time: false,
          active: true,
          progressBar: true,
          msg: "Enviando datos del libro",
          type: "accent",
        });
        const { id } = this.form;
        await this.updateBook(id, this.form);
        let imgUrl = null,
          fileName = null;
        if (this.file) {
          imgUrl = await this.uploadImgCoverBook(id);
        }
        if (this.fileBook) {
          fileName = await this.uploadFileBook(id);
        }
        if (this.fileName || this.file) {
          await this.updateBookFile(id, { imgUrl, fileName });
        }

        this.handleLoading({
          time: true,
          active: true,
          progressBar: false,
          msg: "Libro actualizado :)",
          type: "accent",
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

    async uploadImgCoverBook(id) {
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

    async uploadFileBook(id) {
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
      return await this.$axios.$put(`book/${id}`, data);
    },

    async updateBookFile(id, data) {
      return await this.$axios.$put(`book/file/${id}`, data);
    },
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