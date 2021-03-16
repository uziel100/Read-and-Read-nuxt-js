<template>
  <v-form v-model="form.valid" ref="form">
    <v-divider></v-divider>
    <div class="py-8 px-2 px-md-16">

      <h2 class="text-center text-h5 title--text">
          Configura tu pregunta secreta
      </h2>
      <p class="text-caption text-center mt-2">En caso que olvides tu contraseña esto te permitirá restablecer tus credenciales</p>
      <br>

      <v-autocomplete
          label="Selecciona una pregunta secreta"
          :items="form.questions"
          item-text="name"
          item-value="_id"
          outlined
          dense
          v-model="form.question"
          :rules="[form.questionRequired]"
      ></v-autocomplete>

      <v-text-field
      label="Ingresa la respuesta"
      outlined
      dense
      v-model="form.answer"
      :rules="[ form.answerRequired, form.onlyLetters ]"
      required
      ></v-text-field>

      <v-text-field
      label="Confirma la respuesta"
      outlined
      dense
      v-model="form.answerConfirmation"
      :rules="[ form.answerRequired, form.onlyLetters ]"
      required
      ></v-text-field>
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
          @click="updateAnswer"
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
  props: ["show"],
      

  created(){    
    this.init();
  },

  data() {
    return {
      update: false,
      modal: false,
      loading: false,
      form: {
        valid: false,
        loading: false,
        disabled: false,
        questions: [],
        question: '',
        answer: "",
        answerConfirmation: "",
        questionRequired: (val) => !!val || "Pregunta obligatoria",
        answerRequired: (val) => !!val || "Respuesta obligatoria",
        onlyLetters: (val) =>
          /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/.test(
            val
          ) || "Solo letras",
      },
    };
  },

  methods: {
    ...mapActions(["showNotification"]),

    async init() {
        await this.getQuestions();
        await this.getDataAnswer();
    },

    async getQuestions(){
      const res =  await this.$axios.$get('question')      
      this.form.questions = res.data;
    },

    async getDataAnswer() {        
        const id = this.$auth.user._id;
        const data = { id };
        const dataAnswer = await this.$axios.$get(`question/user/${id}`, data);              
        this.fillFields( dataAnswer.user );        
    },

    fillFields(data) {        
      this.form.question = data.questionSecret ?  data.questionSecret.question : this.questions;
      this.form.answer = data.questionSecret ? data.questionSecret.answer : "";
      this.form.answerConfirmation = data.questionSecret ? data.questionSecret.answer : "";
    },

    async updateAnswer() {
        const { question , answer } = this.form;
        try {                        
            const data = { question, answer};                   
            await this.$axios.$put(`user/question/answer/`, data);
            this.showNotification({
            active: true,
              type: "accent",
              msg: 'Pregunta actualizada :)',
            }); 
            this.$emit('update:show', false);
        } catch (err) {      
        const msg = err.response
          ? err.response.data.message
          : "Ha ocurrido un error";
          this.showNotification({ active: true, type: "error", msg });
        } 
    },
  },
};
</script>

<style>
</style>