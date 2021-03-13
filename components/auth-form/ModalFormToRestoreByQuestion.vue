<template>
  <v-dialog
    @input="$emit('update:show', false)"
    :value="show"
    transition="dialog-top-transition"
    max-width="500"
  >
    <v-card>
      <v-toolbar color="primary" dark>Recuperación de contraseña</v-toolbar>
      <p class="text-center my-4">
        <img v-if="!success" width="150px" src="../../assets/img/unirse/mail.svg" />
        <img v-else width="200px" src="../../assets/img/unirse/success.svg" alt="Proceso de restablecer contraseña exitoso">
      </p>
      <v-card-text>
        <v-form v-if="!success" class="mt-4" v-model="form.valid" ref="form">
          <p class="my-3">Coloca el correo electronico de tu cuenta</p>
          <v-text-field
            label="Correo electronico *"
            outlined
            type="email"
            color="accent"
            dense
            required
            v-model="form.email"
            :rules="[form.emailRequired, form.emailRules]"
          ></v-text-field>
          <v-select
            :items="form.questions"
            label="Pregunta *"
            placeholder="Selecciona..."
            dense
            outlined
            item-text="name"
            item-value="_id"
            v-model="form.question"
          ></v-select>
          <v-text-field
            label="Respuesta *"
            outlined
            type="text"
            color="accent"
            dense
            required
            v-model="form.answer"
            :rules="[form.fieldRequired]"
          ></v-text-field>          
        </v-form>
        <div v-else>            
            <p>Se ha restablecido tu contraseña, no olvides cambiarlo lo mas pronto posible</p>
            <h2 class="text-center text-h3">{{ form.newPassword }}</h2>
        </div>
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn
          class="text-none"
          color="error"
          text
          @click="$emit('update:show', false)"
          >Cerrar</v-btn
        >
        <v-btn
          :loading="form.loading"
          @click="handleCheckQuestion"
          v-if="!success"
          :disabled="!form.valid"
          class="text-none"
          color="accent"
          >Continuar</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: ["show"],

  created() {
    this.init();
  },

  data() {
    return {
      success: false,
      form: {
        valid: false,
        email: "",
        question: "",
        answer: "",        
        questions: [],
        loading: false,
        newPassword: '',
        fieldRequired: (val) => !!val || "Campo obligatorio",
        emailRequired: (val) => !!val || "Correo obligatorio",
        emailRules: (val) => /.+@.+\..+/.test(val) || "Correo debe ser valido",
      },
    };
  },
  methods: {
    ...mapActions(["showNotification"]),
    async init() {
      const res = await this.$axios.$get("question");
      this.form.questions = res.data;
    },

    async handleCheckQuestion() {
      try {
        this.form.loading = true;
        const { email, question, answer } = this.form;        
        const res = await this.$axios.$post('restorePasswordWithQuestionSecret', { email, question, answer });
        this.success = true;
        this.form.newPassword = res.password;
        this.showNotification({ active: true, type: "success", msg: res.message });
      } catch (err) {
        const msg = err.response
          ? err.response.data.message
          : "Ha ocurrido un error";
        this.showNotification({ active: true, type: "error", msg });
      } finally {
        this.form.loading = false;
      }
    },
  },
};
</script>

<style>
</style>