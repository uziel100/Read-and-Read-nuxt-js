<template>
  <v-row class="justify-center">
    <v-col cols="12" md="4">
      <h1 class="mb-4">{{ title }}</h1>
      <v-sheet :elevation="2" class="pa-5 rounded-lg">
        <v-form ref="form">
          <v-text-field
            label="Nombre del autor *"
            placeholder="Ej. Uziel Meliton Hernández"
            outlined
            dense
            v-model="form.name"
          ></v-text-field>

          <v-textarea            
            outlined
            label="Descripción del autor *"
            v-model="form.about"
          ></v-textarea>
          <v-btn
            :loading="loading"
            @click="update ? updateAuthor() : handleSaveAuthor()"
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
              <th class="text-left">Nombre del author</th>
              <th class="text-left">Descripción</th>
              <th class="text-left">Opciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="author in authors" :key="author._id">
              <td>{{ author.name }}</td>
              <td>{{ author.about | cutLengthString }}</td>
              <td>
                <v-btn
                  @click="setDataInForm(author)"
                  color="primary"
                  class="mr-2"
                  fab
                  small
                  dark
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn
                  @click="deleteAuthor(author._id)"
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
import { mapActions } from "vuex";
import API from "@/API/index";
const api = new API();

export default {
  layout: "admin",
  head: {
    title: "Autores",
  },

  async asyncData({ error }) {
    try {
      const res = await api.list("author");
      return {
        authors: res.data,
      };
    } catch (err) {
      error({ statusCode: err.response.status });
    }
  },

  data() {
    return {
      loading: false,
      title: "Autores",
      update: false,
      form: {
        id: null,
        name: "",
        about: "",
      },
    };
  },
  
  filters:{
    cutLengthString( value ){
      if(value.length > 25){
        value = value.slice(0, 25) + "...";        
      }
      return value;
    }
  },

  methods: {
    ...mapActions("admin", ["showNotification"]),

    async handleSaveAuthor() {
      this.loading = true;
      const { name, about } = this.form;
      try {
        await api.post("author", { name, about });
        this.handleLoading({
          time: true,
          active: true,
          progressBar: false,
          msg: "Author agregado :)",
          type: "success",
        });
        this.getAuthors();
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

    async getAuthors() {
      const res = await api.list("author");
      this.authors = res.data;
    },

    async updateAuthor() {
      try {
        this.loading = true;
        const { name, about, id } = this.form;
        await this.$axios.$put(`author/${id}`, { name, about });
        this.handleLoading({
          time: true,
          active: true,
          progressBar: false,
          msg: "Author actualizado :)",
          type: "success",
        });
        this.getAuthors();
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

    async deleteAuthor(id) {
      try {
        await this.$axios.$delete(`author/${id}`);
        this.getAuthors();
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
      this.form.about = "";
    },

    setDataInForm(data) {
      this.update = true;
      this.form.id = data._id;
      this.form.name = data.name;
      this.form.about = data.about;
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
};
</script>

<style>
</style>