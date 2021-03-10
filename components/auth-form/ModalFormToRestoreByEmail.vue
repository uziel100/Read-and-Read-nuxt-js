<template>
  <v-dialog
    @input="$emit('update:show', false)"
    :value="show"
    transition="dialog-top-transition"
    max-width="600"
  >
    <v-card>
      <v-toolbar color="primary" dark>Recuperación de contraseña</v-toolbar>
      <p class="text-center my-4">
        <img width="150px" src="../../assets/img/unirse/mail.svg" />
      </p>
      <v-card-text>
        <v-form class="mt-4" v-model="form.valid" ref="form">
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
        </v-form>
        <p class="text-center text-h6">{{ form.message }}</p>
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
          v-if="form.status"
          @click="handleEmailSend"
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
export default {
  props: ["show"],
  data() {
    return {
      form: {
        valid: false,
        email: "",
        message: "",
        status: true,
        emailRequired: (val) => !!val || "Correo obligatorio",
        emailRules: (val) => /.+@.+\..+/.test(val) || "Correo debe ser valido",
      },
    };
  },
  methods: {
    async handleEmailSend() {
      const { email } = this.form;
      this.form.message = "Enviando email...";
      console.log(email)
      try {
        await this.sendEmail({ email });
        this.form.message = "Email enviado, por favor revisa tu bandeja";
        this.form.status = false;
      } catch (err) {
        const msg = err.response
          ? err.response.data.message
          : "Ha ocurrido algun error";
        this.form.message = msg;
      }
    },

    async sendEmail(data) {
      await this.$axios.$post("forgotPassword", data);
    },
  },
};
</script>

<style>
</style>