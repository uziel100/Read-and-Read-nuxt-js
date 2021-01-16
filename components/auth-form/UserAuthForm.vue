<template>
  <section class="mb-16 container" :class="backgroundFill">
    <v-row>
      <v-spacer v-if="!isLogin"></v-spacer>
      <v-col cols="12" sm="6" md="4" lg="4">
        <v-card
          :loading="form.loading"
          :disabled="form.disabled"
          elevation="2"
          class="pb-4"
        >
          <v-form class="mt-4" v-model="form.valid" ref="form">
            <v-card-text>
              <h2 class="text-center text-h5 title--text">
                {{ isLogin? 'Inicia sesión y comienza a leer' : '¿Eres nuevo en Read&Read?' }}                
              </h2>
              <h2 v-if="!isLogin" class="text-center text-h5 mb-8 accent--text">Únete ahora</h2>
              <div class="d-flex my-8">
                <v-btn class="text-none" outlined dark color="accent" rounded block>
                  <v-icon left> mdi-google </v-icon>
                  {{ isLogin? 'Continuar con Google' : 'Registrarse con Google' }}                                  
                </v-btn>
              </div>
             
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
                :rules="[form.passwordRules]"
                required
              ></v-text-field>

              <v-text-field
                v-if="!isLogin"
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

              <v-btn
                @click="onSubmit(form)"
                :disabled="!form.valid"
                color="secondary"
                class="my-3"
                block
                >{{ isLogin ? "Iniciar sesión" : "Crear cuenta" }}</v-btn
              >
            </v-card-text>
          </v-form>
          <div v-if="isLogin" class="text-center">
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
  name: "FormSubmit",
  props: {
    isLogin: {
      type: Boolean,
      required: false,
      default: true,
    },
    onSubmit: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {      
      form: {
        show: false,
        show2: false,
        valid: false,
        loading: false,
        disabled: false,
        email: "",
        password: "",
        confirmPassword: "",
        emailRequired: (val) => !!val || "Correo obligatorio",
        emailRules: (val) => /.+@.+\..+/.test(val) || "Correo debe ser valido",
        passwordRules: (val) => !!val || "Contraseña obligatoria",
        passwordMatch: (v) => v === this.form.password || "Las contraseñas no coinciden",                        
      },
    };
  },

  computed: {
    backgroundFill() {
      return this.isLogin ? "imagen-login" : "imagen-registro";
    },  
  },
};
</script>

<style>
</style>