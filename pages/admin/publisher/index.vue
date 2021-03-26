<template>
    <v-row class="justify-center">
    <v-col cols="12" md="4">
      <h1 class="mb-4">{{ title }}</h1>
      <v-sheet :elevation="2" class="pa-5 rounded-lg">
        <v-form ref="form" v-model="form.valid">
          <v-text-field
            label="Nombre de la editorial"
            placeholder="Ej. ALFAOMEGA"
            outlined
            dense
            v-model="form.name"
            :rules="[ form.fileRequired ]"
          ></v-text-field>          
          <v-btn
            :loading="loading"
            :disabled="!form.valid"
            @click="update ? updatePublisher() : handleSavePublisher()"
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
              <th class="text-left">Opciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="publisher in publishers" :key="publisher._id">
              <td>{{ publisher.name }}</td>              
              <td>
                <v-btn
                  @click="setDataInForm(publisher)"
                  color="primary"
                  class="mr-2"
                  fab
                  small
                  dark
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn
                  @click="deletePublisher(publisher._id)"
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


export default {
  layout: "admin",
  head: {
    title: "Editoriales",
  },

   async asyncData({ error, $axios }) {
    try {
      const res = await $axios.$get("publisher");
      return {
        publishers: res.data,
      };
    } catch (err) {
      error({ statusCode: err.response.status });
    }
  },

  data() {
    return {
      loading: false,
      title: "Editoriales",
      update: false,
      form: {
        id: null,
        name: '',   
        fileRequired: (v) => !!v || "Campo requerido",
        valid: false,                    
      },
    };
  },

  methods: {
    ...mapActions("admin", ["showNotification","setPublisher"]),


    async handleSavePublisher() {
      this.loading = true;
      const { name, about } = this.form;      
      try {
        await this.$axios.$post("publisher", { name, about });        
        this.handleLoading({
          time: true,
          active: true,
          progressBar: false,
          msg: "Editorial agregado :)",
          type: "success",
        });
        this.getPublisher();
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

    async getPublisher() {
      const res = await this.$axios.$get("publisher");
      this.publishers = res.data;
      this.setPublisher( res.data )
    },

    async updatePublisher() {
      try {
        this.loading = true;
        const { name, about, id } = this.form;
        await this.$axios.$put(`publisher/${ id }`, { name, about });       
        this.handleLoading({
          time: true,
          active: true,
          progressBar: false,
          msg: "Editorial actualizado :)",
          type: "success",
        });
        this.getPublisher();
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

    async deletePublisher(id) {
      try {
        await this.$axios.$delete(`publisher/${id}`);
        this.getPublisher();
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
      this.$refs.form.resetValidation();    
    },

    setDataInForm(data) {
      this.update = true;
      this.form.id = data._id
      this.form.name = data.name;       
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