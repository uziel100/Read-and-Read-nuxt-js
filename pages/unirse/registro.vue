<template>
  <section class="mb-16 mt-2 container imagen-registro">
    <v-row>
      <v-spacer></v-spacer>
      <v-col cols="12" sm="6" md="4" lg="4">
        <v-card :loading="form.loading" :disabled="form.disabled" elevation="2">
          <v-form ref="form" v-model="form.valid">
            <v-card-text>
              <h2 class="text-center text-h5 title--text">
                ¿Eres nuevo en Read&Read?
              </h2>
              <h2 class="text-center text-h5 mb-8 accent--text">Únete ahora</h2>
              <div class="d-flex my-8">
                <v-btn outlined color="accent" rounded block>
                  <v-icon left> mdi-google </v-icon>
                  Continuar con Google
                </v-btn>
              </div>
              <v-text-field
                label="Correo electronico *"
                outlined
                type="email"
                dense
                color="accent"
                :rules="form.emailRules"
                required
                v-model="user.email"
              ></v-text-field>

              <v-text-field
                label="Contraseña *"
                outlined
                dense
                color="accent"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show ? 'text' : 'password'"
                @click:append="show = !show"
                :rules="form.passwordRules"
                required
                v-model="user.password"
              ></v-text-field>

              <v-text-field
                label="Confirmar contraseña *"
                outlined
                dense
                color="accent"
                :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show2 ? 'text' : 'password'"
                @click:append="show2 = !show2"
                required
                :rules="form.passwordMatch"
                v-model="user.confirmPassword"
              ></v-text-field>

              <v-btn
                name="createAccount"
                :disabled="!form.valid"
                @click="handleRegister"
                color="secondary"
                class="my-3"
                block
                >Crear cuenta</v-btn
              >
            </v-card-text>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </section>
</template>

<script>
import { mapActions } from "vuex";

export default {
  head: {
    title: "Comienza ahora",
  },
  data() {
    return {
      show: false,
      show2: false,
      user: {
        email: undefined,
        password: undefined,
        confirmPasssword: undefined,
      },
      form: {
        valid: false,
        loading: false,
        disabled: false,
        emailRules: [
          (v) => !!v || "Correo obligatorio",
          (v) => /.+@.+\..+/.test(v) || "Correo debe ser valido",
        ],
        passwordRules: [(v) => !!v || "Constraseña obligatoria"],
        passwordMatch: [
          (v) => !!v || "Constraseña obligatoria",
          (v) => v === this.user.password || "Contraseñas no coinciden",
        ],
      },
    };
  },
  methods: {
    ...mapActions(["showNotification"]),

    async handleRegister() {
      try {
        this.validateForm();
        this.isLoadingForm(true);
        const res = await this.register();
        this.isLoadingForm(false);
        this.clearInputs();
        this.showNotification({
          active: true,
          msg: res.message,
          type: "success",
        });
      } catch (err) {
        this.desactiveLoadingForm();
        const msg = err.response.data.message || 'Ha ocurrido un error';
        this.showNotification({ active: true, msg, type: "error" });
      }
    },

    async register() {
      // logica de registro
      const resp = await this.$axios.$post("user", this.user);
      return resp;
    },

    isLoadingForm(value) {
      this.form.loading = value;
      this.form.disabled = value;
    },    

    validateForm() {
      this.$refs.form.validate();
    },

    clearInputs() {
      this.$refs.form.reset();
    },
  },
};
</script>

<style>
.imagen-registro {
  background-image: url(../../assets/img/unirse/img-registro.svg) !important;
  background-size: 90% 90%;
  background-position-x: -100px;
  background-position-y: 30px;
}

@media (max-width: 600px) {
  .imagen-registro {
    background: none !important;
  }
}
</style>