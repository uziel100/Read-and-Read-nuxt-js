<template>
  <v-form v-model="form.valid" ref="form">
    <v-divider></v-divider>
    <div class="py-8 px-2 px-md-16">
      <v-text-field
        label="Nombre"
        v-model="user.name"
        outlined
        type="text"
        dense
        color="accent"
        required
        :rules="[form.nameRequired, form.onlyLetters]"
      ></v-text-field>
      <v-text-field
        label="Apellidos"
        v-model="user.lastName"
        outlined
        type="text"
        dense
        color="accent"
        required
        :rules="[form.lastNameRequired, form.onlyLetters]"
      ></v-text-field>
      <v-combobox
        dense
        label="Genero"
        v-model="user.gender"
        :items="genres"
        clearable
        outlined
        small-chips
        :rules="[form.genresRequired]"
      ></v-combobox>
      <v-text-field
        label="Domicilio"
        v-model="user.address"
        outlined
        type="text"
        dense
        color="accent"
        required
        :rules="[form.addressRequired]"
      ></v-text-field>
      <v-text-field
        dense
        label="Telefono"
        outlined
        clearable
        type="number"
        v-model="user.phone"
        :rules="[form.phoneRequired, form.phoneRul]"
      ></v-text-field>
      <v-dialog
        ref="dialog"
        v-model="modal"
        :return-value.sync="user.birthDate"
        persistent
        width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="user.birthDate"
            label="Fecha de nacimiento"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
            :rules="[form.dateRequired]"
          ></v-text-field>
        </template>
        <v-date-picker v-model="user.birthDate" scrollable>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="modal = false"> Cancel </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.dialog.save(user.birthDate)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-dialog>

      <div class="text-right mt-2">
        <v-btn
          small
          text
          color="error"
          class="mr-0 mr-md-4 text-none"
          @click="$emit('update:show', false)"
          >Cancelar</v-btn
        >
        <v-btn
          small
          :disabled="!form.valid"
          @click="saveData"
          color="accent"
          class="mr-0 mr-md-4 text-none"
          >Guardar cambios</v-btn
        >
      </div>
    </div>
  </v-form>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: ["show","loading"],
  created(){    
    this.init();
  },
  data() {
    return {
      modal: false,
      form: {
        valid: false,
        loading: false,
        disabled: false,
        nameRequired: (val) => !!val || "Nombre obligatorio",
        lastNameRequired: (val) => !!val || "Apellido obligatorio",
        onlyLetters: (val) =>
          /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/.test(
            val
          ) || "Solo letras",
        genresRequired: (val) => !!val || "Genero obligatorio",
        addressRequired: (val) => !!val || "Apellido obligatorio",
        phoneRequired: (val) => !!val || "Número de telefono obligatorio",
        phoneRul: (val) => val.length == 10 || "Solo se aceptan 10 digitos",
        dateRequired: (val) => !!val || "Fecha de nacimiento obligatorio",
      },
      user: {
        name: "",
        lastName: "",
        address: "",
        phone: "",
        birthDate: new Date().toISOString().substr(0, 10),
        gender: "",
      },
      genres: ["Masculino", "Femenino"],
    };
  },
  methods: {
    ...mapActions(["showNotification"]),
    async init() {
      this.loadingForm(true);      
      await this.getDataUser();
      this.loadingForm(false);      
    },

    async getDataUser() {    
      const dataUser = await this.$axios.$get(`user/${this.$auth.user._id}`);
      this.fillFields(dataUser);
    },

    fillFields(data) {
      this.user.name = data.user.name ? data.user.name : "";
      this.user.lastName = data.user.lastName ? data.user.lastName : "";
      this.user.birthDate = data.user.birthDate ? data.user.birthDate : "";
      this.user.phone = data.user.phone ? data.user.phone : "";
      this.user.gender = data.user.gender ? data.user.gender : "";
      this.user.address = data.user.address ? data.user.address : "";
    },

    async saveData() {
      try {
        this.loadingForm(true);
        const res = await this.$axios.$put(
          `user/${this.$auth.user._id}`,
          this.user
        );
        this.$emit('update:show', false);
        this.showNotification({
          active: true,
          type: "accent",
          msg: res.message,
        });                
      } catch (err) {        
        const msg = err.response
          ? err.response.data.message
          : "Ha ocurrido un error";
        this.showNotification({ active: true, type: "error", msg });
      }finally{
        this.loadingForm(false);    
      }
    },

    loadingForm(value) {
      this.$emit('update:loading', value);      
    },
  },
};
</script>

<style>
</style>