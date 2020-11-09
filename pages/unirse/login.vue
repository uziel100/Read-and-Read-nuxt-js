<template>
  <section class="mb-16 container imagen-login">
    <v-row>
      <v-col cols="12" sm="6" md="4" lg="4">
        <v-card
          :loading="form.loading"
          :disabled="form.disabled"
          elevation="2"
          class="py-5"       
        >
          <v-form v-model="form.valid" ref="form">
            <v-card-text>
              <h2 class="text-center text-h5 mb-8 title--text">
                Inicia sesión y comienza a leer
              </h2>
              <div class="d-flex my-8">
                <v-btn class="text-none" dark outlined color="accent"  rounded block>
                  <v-icon left> mdi-google </v-icon>
                  Continuar con Google
                </v-btn>
              </div>
              <v-text-field
                label="Correo electronico *"
                outlined
                type="email"                
                color="accent"
                required
                v-model="form.email"
                :rules="[form.emailRequired, form.emailRules]"
              ></v-text-field>

              <v-text-field
                label="Contraseña *"
                outlined                
                color="accent"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show ? 'text' : 'password'"
                @click:append="show = !show"
                required
                v-model="form.password"
                :rules="[form.passwordRules]"
              ></v-text-field>

              <v-btn
                @click="handleLogin"
                :disabled="!form.valid"
                color="secondary"
                class="my-3"
                block
                >Iniciar sesión</v-btn
              >
            </v-card-text>
          </v-form>
          <div class="text-center">
            <p class="text-caption ma-1">
              <nuxt-link to="/"> ¿Has olvidado tu contraseña? </nuxt-link>
            </p>
            <p class="text-caption">
              No tienes una cuenta
              <nuxt-link class="accent--text" to="/unirse/registro"
                >Registrate</nuxt-link
              >
            </p>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </section>
</template>

<script>
export default {
  transition: "home",
  head: {
    title: "Comienza a leer ya",
  },
  data() {
    return {
      show: false,
      form: {
        valid: false,
        loading: false,
        disabled: false,
        email: "",
        password: "",
        emailRequired: (val) => !!val || "Correo obligatorio",
        emailRules: (val) => /.+@.+\..+/.test(val) || "Correo debe ser valido",
        passwordRules: (val) => !!val || "Contraseña obligatoria",
      },
    };
  },

  methods: {
    handleLogin() {
      this.validateForm();
    },

    validateForm() {
        this.$refs.form.validate()
    },
  },
};
</script>

<style>
.imagen-login {
  background-image: url(../../assets/img/login.svg) !important;
  background-size: 90% 90%;
  background-position-x: 300px;
  background-position-y: 30px;
}

@media (max-width: 600px) {
  .imagen-login {
    background: none !important;
  }
}
</style>