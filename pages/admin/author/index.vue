<template>
  <v-row class="justify-center">
    <v-col cols="12" md="4">
      <h1 class="mb-4">{{ title }}</h1>
      <v-sheet :elevation="2" class="pa-5 rounded-lg">
        <v-form ref="form" v-model="form.valid">
          <v-text-field
            label="Nombre del autor *"
            placeholder="Ej. Uziel Meliton Hernández"
            outlined
            dense
            v-model="form.name"
            :rules="[form.nameRequired, form.onlyLetters]"
          ></v-text-field>

          <v-textarea            
            outlined
            label="Descripción del autor *"
            v-model="form.about"
            :rules="[form.descriptionRequired]"
          ></v-textarea>
          <v-btn
            :loading="loading"            
            :disabled="!form.valid"
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
import { mapActions, mapState } from "vuex";


export default {
  layout: "admin",
  head: {
    title: "Autores",
  },

  async asyncData({ error, redirect, $axios, $auth }) {
    try {      
      $axios.setHeader("token", $auth.strategy.token.get());
      const authors = await $axios.$get("author");
      return {
        authors: authors.data,
      };
    } catch (err) {
      redirect('/admin')      
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
        valid: false,
        disabled: false,
        nameRequired: (val) => !!val || "Nombre requerido",
        descriptionRequired: (val) => !!val || "Descripcion obligatoria",
        onlyLetters: (val) =>
          /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/.test(
            val
          ) || "Solo letras",
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
  computed:{
    ...mapState('admin',['collection'])
  },
  methods: {
    ...mapActions("admin", ["showNotification", "setAuthor"]),

    async handleSaveAuthor() {
      this.loading = true;
      const { name, about } = this.form;
      try {
        await this.$axios.$post("author", { name, about });
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
      const res = await this.$axios.$get("author");
      this.authors = res.data;
      this.setAuthor( res.data )
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
      this.$refs.form.resetValidation();
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