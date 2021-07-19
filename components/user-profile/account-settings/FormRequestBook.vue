<template>
  <v-form v-model="form.valid" ref="form">
    <div class="py-8 px-2 px-md-16">
      <h2 class="text-center text-h5 title--text">No encontraste tu libro</h2>
      <p class="mt-4 mb-4">
        Nos disculpamos por no contar con el libro buscado, pero nos ayudaría si
        lo solicita llenando el siguiente formulario
      </p>
      <v-divider class="my-3"></v-divider>
      <v-text-field
        label="Titulo del libro"
        outlined
        dense
        required
        v-model="book.title"
        :rules="[form.required]"
      ></v-text-field>
      <v-text-field
        label="Autor"
        outlined
        dense
        required
        v-model="book.author"
        :rules="[form.required]"
      ></v-text-field>
      <v-text-field
        label="Editorial"
        outlined
        dense
        required
        v-model="book.publisher"
        :rules="[form.required]"
      ></v-text-field>

      <div class="text-right mt-2">
        <v-btn
          text
          color="error"
          class="mr-0 mr-md-4 text-none"
          @click="$emit('update:show', false)"
          >Cancelar</v-btn
        >
        <v-btn
          color="accent"
          class="mr-0 mr-md-4 text-none"
          :disabled="!form.valid"
          @click="handleRequestBook"
          >Enviar</v-btn
        >
      </div>
    </div>
  </v-form>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "FormRequestBook",
  props: ["show", "loading"],

  mounted() {
    this.resetValidation();
  },

  data() {
    return {
      form: {
        valid: false,
        required: (val) => !!val || "Campo obligatorio",
      },
      book: {
        title: "",
        author: "",
        publisher: "",
      },
    };
  },

  methods: {
    ...mapActions(["showNotification"]),

    async handleRequestBook() {
      try {
        this.loadingForm(true);
        await this.$axios.$post("book-request", this.book);
        this.loadingForm(false);
        this.clearFields();
        this.showNotification({
          active: true,
          type: "accent",
          msg: "La solicitud del libro se realizado con exito",
        });
        this.$emit("update:show", false);
      } catch (error) {
        console.log(error);
        const msg = err?.response
          ? err?.response?.data?.message
          : "Ha ocurrido un error";
        this.showNotification({ active: true, type: "error", msg });
      }
    },

    clearFields() {
      this.book.title = "";
      this.book.author = "";
      this.book.publisher = "";
    },

    loadingForm(value) {
      this.$emit("update:loading", value);
    },

    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
};
</script>

<style>
</style>