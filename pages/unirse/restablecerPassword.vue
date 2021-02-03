<template>
  <v-container>
    <v-card
      :loading="form.loading"
      :disabled="form.disabled"
      elevation="2"
      class="marginPage"
      max-width="450"
      width="auto"
    >
      <v-form class="pa-8" v-model="form.valid" ref="form">
        <h2 class="text-center title--text mb-10">
          {{
            success ? "Has cambiado tu contraseña" : "Restablecer contraseña"
          }}
        </h2>
        <p class="text-center">
          <img
            v-if="success"
            width="280px"
            src="@/assets/img/unirse/success.svg"
            alt="Success operation"
          />
          <img
            v-else
            width="150px"
            src="@/assets/img/unirse/security.svg"
            alt="Security"
          />
        </p>
        <div v-if="!success">
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
          <v-text-field
            label="Contraseña *"
            outlined
            dense
            color="accent"
            v-model="form.password"
            @click:append="form.show = !form.show"
            :append-icon="form.show ? 'mdi-eye' : 'mdi-eye-off'"
            :type="form.show ? 'text' : 'password'"
            :rules="[
              form.passwordRules,
              form.passwordLength,
              form.passwordPattern,
            ]"
            required
          ></v-text-field>
          <v-text-field
            label="Confirmar contraseña *"
            outlined
            dense
            color="accent"
            :append-icon="form.show2 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="form.show2 ? 'text' : 'password'"
            @click:append="form.show2 = !form.show2"
            required
            :rules="[form.passwordRules, form.passwordMatch]"
            v-model="form.confirmPassword"
          ></v-text-field>
        </div>
        <v-card-actions class="ma-0 pa-0">
          <v-btn
            v-if="!success"
            :disabled="!form.valid"
            @click.prevent="handleRestorePassword"
            color="accent"
            class="mr-4 text-none"
          >
            Restablecer
          </v-btn>
          <nuxt-link v-else to="/unirse/login">
            <v-btn color="accent" class="mr-4 text-none">
              Regresar al login
            </v-btn>
          </nuxt-link>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
export default {
  head: {
    title: "Restablecer contraseña",
  },

  asyncData({ query, error }) {
    const hasToken = query.t;
    if (hasToken) {
      const arrLetters = [...hasToken];
      if (!arrLetters.includes(".")) {
        error({ statusCode: 400 });
      }
    } else {
      error({ statusCode: 400 });
    }
  },

  data() {
    return {
      success: false,
      form: {
        email: "",
        password: "",
        show: false,
        valid: false,
        show2: false,
        loading: false,
        disabled: false,
        emailRequired: (val) => !!val || "Correo obligatorio",
        emailRules: (val) => /.+@.+\..+/.test(val) || "Correo debe ser valido",
        passwordRules: (val) => !!val || "Contraseña obligatoria",
        passwordMatch: (v) =>
          v === this.form.password || "Las contraseñas no coinciden",
        passwordLength: (val) => val.length >= 8 || "Minimo 8 a 16 caracteres",
        passwordPattern: (val) =>
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&,.-_;(){}¡<>])([A-Za-z\d$@$!%*?&,.-_;(){}¡<>]|[^ ]){8,15}$/.test(
            val
          ) ||
          "Coloque al menos un numero, una letra minúscula, mayúscula, 1 caracter especial y sin espacios en blanco.",
      },
    };
  },

  methods: {
    ...mapActions(["showNotification"]),

    async handleRestorePassword() {
      this.form.loading = true;
      this.form.disabled = true;
      try {
        await this.restorePassword({
          email: this.form.email,
          password: this.form.password,
        });
        this.success = true;
        this.showNotification({
          active: true,
          msg: "Se ha registrado tu nueva contraseña",
          type: "success",
        });
      } catch (err) {
        this.success = false;
        const msg = err.response
          ? err.response.data.message
          : "Ha ocurrido un error, intentelo de nuevo";
        this.showNotification({ active: true, msg, type: "error" });
      } finally {
        this.form.loading = false;
        this.form.disabled = false;
      }
    },

    async restorePassword(crendentials) {
      const token = "Bearer " + this.$route.query.t;
      this.$axios.setHeader("token", token);
      return await this.$axios.$post("restorePassword", crendentials);
    },
  },
};
</script>

<style>
.marginPage {
  margin: 30px auto 150px;
}
</style>