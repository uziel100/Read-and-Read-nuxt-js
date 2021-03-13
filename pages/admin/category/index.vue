<template>
  <v-row class="justify-center">
    <v-col cols="12" md="4">
      <h1 class="mb-4">{{ title }}</h1>
      <v-sheet :elevation="2" class="pa-5 rounded-lg">
        <v-form ref="form">
          <v-text-field
            label="Nombre"
            placeholder="Ej. Programación funcional"
            outlined
            dense
            v-model="form.name"
          ></v-text-field>
          <v-text-field
            label="Url"
            placeholder="Ej. programacion-funcional"
            outlined
            dense
            v-model="form.niceName"
          ></v-text-field>
          <p class="text-caption ma-0" v-if="update">
            Solo si deseas cambiar la imagen
          </p>
          <v-file-input
            chips
            truncate-length="16"
            accept="image/*"
            outlined
            label="Imagen de portada"
            v-model="form.file"
            dense
          ></v-file-input>
          <p class="text-center">
            <img width="150px" src="" id="img-demo" />
          </p>
          <v-btn
            :loading="loading"
            @click="update ? updateCategory() : handleSaveCategory()"
            color="accent"
            class="mr-4"
            >{{ update ? "Actualizar" : "Agregar" }}
          </v-btn>
          <v-btn v-if="update" @click="cancel" color="error" outlined
            >Cancelar</v-btn
          >
        </v-form>
      </v-sheet>
    </v-col>
    <v-col>
      <v-simple-table fixed-header height="400px">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Name</th>
              <th class="text-left">Url</th>
              <th class="text-left">Imagen</th>
              <th class="text-left">Opciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="category in categories" :key="category.name">
              <td>{{ category.name }}</td>
              <td>{{ category.niceName }}</td>
              <td>
                <v-img
                  width="50"
                  :src="baseUrl.category + category.img"
                ></v-img>
              </td>
              <td>
                <v-btn
                  @click="setDataInForm(category)"
                  color="primary"
                  class="mr-2"
                  fab
                  small
                  dark
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn
                  @click="deleteCategory(category._id)"
                  color="error"
                  fab
                  small
                  dark
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapState } from "vuex";
import API from "@/API/index";
const api = new API();

export default {
  layout: "admin",
  head: {
    title: "Categorias",
  },

  async asyncData({ error }) {
    try {
      const data = await api.list("category/only");
      return {
        categories: data.categories,
      };
    } catch (err) {
      error({ statusCode: err.response.status });
    }
  },

  data() {
    return {
      loading: false,
      title: "Categorias",
      update: false,

      form: {
        id: null,
        name: "",
        niceName: "",
        file: null,
        loadingImg: "",
      },
    };
  },

  methods: {
    ...mapActions("admin", ["showNotification"]),

    async getCategories() {
      const res = await api.list("category/only");
      this.categories = res.categories;
    },

    async handleSaveCategory() {
      this.loading = true;
      const { name, niceName } = this.form;
      this.handleLoading({
        time: false,
        active: true,
        progressBar: true,
        msg: "Guardando...",
        type: "accent",
      });
      try {
        const res = await api.post("category", { name, niceName });
        const img = await this.uploadImgCategory(res.category._id);
        const data = await this.$axios.$put("category/" + res.category._id, {
          name,
          niceName,
          img,
        });
        this.handleLoading({
          time: true,
          active: true,
          progressBar: false,
          msg: "Categoria agregada :)",
          type: "success",
        });
        this.getCategories();
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
      } finally {
        this.loading = false;
      }
    },

    async postCategory() {
      try {
        this.loading = true;
        await api.post("category", this.form);
        this.getCategories();
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
      } finally {
        this.loading = false;
      }
    },

    async uploadImgCategory(id) {
      this.handleLoading({
        time: false,
        active: true,
        type: "accent",
        progressBar: true,
        msg: "Subiendo imagen...",
      });
      const file = new FormData();
      file.append("file", this.form.file);
      const res = await this.$axios.$post("upload/imgCategory/" + id, file, {
        headers: { "content-type": "multipart/form-data" },
      });
      return res.urlName;
    },

    async updateCategory() {
      try {
        this.loading = true;
        const { name, niceName, id } = this.form;
        await this.$axios.$put(`category/${this.form.id}`, { name, niceName });
        if (this.form.file) {
          await this.uploadImgCategory(id);
          const img = await this.uploadImgCategory(id);
          await this.$axios.$put("category/" + id, { img });
        }
        this.handleLoading({
          time: true,
          active: true,
          progressBar: false,
          msg: "Categoria actualizada :)",
          type: "success",
        });
        this.getCategories();
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
      } finally {
        this.loading = false;
      }
    },

    async deleteCategory(id) {
      try {
        await this.$axios.$delete(`category/${id}`);
        this.getCategories();
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

    cancel() {
      this.update = false;
      this.clearFields();
    },

    clearFields() {
      this.form.id = "";
      this.form.name = "";
      this.form.niceName = "";
      this.form.file = null;
      const output = document.getElementById("img-demo");
      output.src = "";
    },

    setDataInForm(data) {
      this.update = true;
      this.form.name = data.name;
      this.form.niceName = data.niceName;
      this.form.id = data._id;
      this.form.file = null;
      const output = document.getElementById("img-demo");
      output.src = this.baseUrl.category + data.img;
    },

    handleLoading(data) {
      this.showNotification(data);
      if (data.time) {
        setTimeout(() => {
          this.showNotification({ active: false });
        }, 4000);
      }
    },
  },

  computed: {
    ...mapState(["baseUrl"]),
  },

  watch: {
    "form.file"(value) {
      const output = document.getElementById("img-demo");
      if (value) {
        const reader = new FileReader();
        reader.onload = function () {
          const dataURL = reader.result;
          output.src = dataURL;
        };
        reader.readAsDataURL(value);
      } else {
        output.src = "";
      }
    },
  },
};
</script>
