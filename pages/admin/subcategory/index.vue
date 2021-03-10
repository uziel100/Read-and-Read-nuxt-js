<template>
  <v-row class="justify-center">
    <v-col cols="12" md="4">
      <h1 class="mb-4">{{ title }}</h1>
      <v-sheet :elevation="2" class="pa-5 rounded-lg">
        <v-form ref="form">
          <v-text-field
            label="Nombre"
            placeholder="Ej: Programación funcional"
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
          <v-autocomplete
            label="Categoria"
            :items="categories"
            item-text="name"
            item-value="_id"
            outlined
            dense
            v-model="form.category"
          ></v-autocomplete>
          <v-btn
            :loading="loading"
            @click="update ? updateCategory() : postCategory()"
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
              <th class="text-left">Opciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="subCategory in subcategories" :key="subCategory.name">
              <td>{{ subCategory.name }}</td>
              <td>{{ subCategory.niceName }}</td>
              <td>
                <v-btn
                  @click="setDataInForm(subCategory)"
                  color="primary"
                  class="mr-2"
                  fab
                  small
                  dark
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn @click="deleteCategory(subCategory._id)" color="error" fab small dark>
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
import API from "@/API/index";
const api = new API();

export default {
  layout: "admin",
  head: {
    title: "Subcategorias",
  },

  async asyncData({ error }) {
    try {
      const dataSubcategory = await api.list("subcategory");
      const dataCategory = await api.list('category/only')
      return {
        subcategories: dataSubcategory.subcategories,
        categories: dataCategory.categories
      };
    } catch (err) {
      error({ statusCode: err.response.status });
    }
  },

  data() {
    return {
      loading: false,
      title: "Subcategorias",
      update: false,
      form: {
        id: null,
        name: "",
        niceName: "",
        category: '',
      },
    };
  },

  methods: {
    async getCategories() {
      const res = await api.list("subcategory");
      this.subcategories = res.subcategories;
    },
    async postCategory() {
      try {
        this.loading = true;
        await api.post("subcategory", this.form);
        this.getCategories();
        this.clearFields();
      } catch (err) {
        console.log(err);
      } finally {
        this.loading = false;
      }
    },

    async updateCategory() {
      try {        
        this.loading = true;               
        await this.$axios.$put(`subcategory/${ this.form.id }`, this.form );
        this.getCategories();
        this.clearFields();
      } catch (err) {
        console.log(err);
      } finally {
        this.loading = false;
      }
    },

    async deleteCategory( id ){
      try {
        await this.$axios.$delete(`subcategory/${ id }`)
        this.getCategories();
      } catch (err) {
        console.log(err)
      }
    },

    cancel() {
      this.update = false;
      this.clearFields();
    },

    clearFields() {
      this.form.name = "";
      this.form.niceName = "";
    },

    setDataInForm(data) {
      this.update = true;
      this.form.name = data.name;
      this.form.niceName = data.niceName;
      this.form.id = data._id;
    },
  },
};
</script>

<style>
</style>