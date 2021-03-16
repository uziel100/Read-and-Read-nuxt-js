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
                {{
                  isLogin
                    ? "Inicia sesión y comienza a leer"
                    : "¿Eres nuevo en Read&Read?"
                }}
              </h2>
              <h2 v-if="!isLogin" class="text-center text-h5 mb-8 accent--text">
                Únete ahora
              </h2>
              <div class="d-flex my-8">
                <g-signin-button
                  :params="googleSignInParams"
                  @success="onSuccess"
                  @error="onFailure"
                >
                  {{
                    isLogin ? "Continuar con Google" : "Registrarse con Google"
                  }}
                </g-signin-button>
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
                v-if="isLogin"
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
                  form.passwordRul,
                  form.passwordPattern,
                ]"
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
            <v-btn
              @click="showOptions"
              class="text-none text-caption ma-1"
              text
              color="primary"
            >
              ¿Has olvidado tu contraseña?
            </v-btn>
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
import { mapActions } from "vuex";

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

    onForgotPasssword: {
      type: Function,
      required: false,
    },
  },

  data() {
    return {
      dialog: false,      
      googleSignInParams: {
        client_id:
          "451024139586-ngq240pmq03op37iro4o8d73o64g641f.apps.googleusercontent.com",
      },
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
        passwordMatch: (v) =>
          v === this.form.password || "Las contraseñas no coinciden",
        passwordRul: (val) => val.length >= 8 || "Minimo 8 a 16 caracteres",
        passwordPattern: (val) =>
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&,.-_;(){}¡<>])([A-Za-z\d$@$!%*?&,.-_;(){}¡<>]|[^ ]){8,15}$/.test(
            val
          ) ||
          "Coloque al menos un numero, una letra minúscula, mayúscula, 1 caracter especial y sin espacios en blanco.",
      },           
    };
  },

  methods: {
    ...mapActions(["showNotification", "setLoggedIn"]),

    async onSuccess(googleUser) {
      const idtoken = googleUser.getAuthResponse().id_token;

      try {
        this.isLoadingForm(true);
        const res = await this.$axios.$post("google", { idtoken });        
        this.saveUserDataPersist(res);
        this.$router.push("/perfil");
      } catch (err) {        
        const msg = err.response
          ? err.response.data.message
          : "Ha ocurrido un error";
        this.showNotification({ active: true, type: "error", msg });
      } finally {
        this.isLoadingForm(false);
      }
    },
    onFailure(error) {
      console.log(error);
    },

    saveUserDataPersist(data) {
      this.$auth.$storage.setLocalStorage("_user", data.user, true);
      this.$auth.setUser(data.user);
      this.$auth.strategy.token.set(data.token);
      this.setLoggedIn(true);
    },

    isLoadingForm(value) {
      this.form.loading = value;
      this.form.disabled = value;
    },
    openDialogEmail(){
      this["dialog2"] = false;
      setTimeout(() => {
        this.dialog = true;      
      }, 1000);
    },

    showOptions(){
      this.$emit('showModalToOptionsRecoverPassword', true)
    }
  },

  computed: {
    backgroundFill() {
      return this.isLogin ? "imagen-login" : "imagen-registro";
    },
  },
};
</script>

<style>
.g-signin-button {
  display: inline-block;
  padding: 10px 8px;
  border-radius: 3px;
  background-color: #3c82f7;
  color: #fff;
  box-shadow: 0 5px 0 #1461e6;
  width: 100%;
  cursor: pointer;
  text-align: center;
  transition: all 0.3s;
}
.hover-pointer{
  overflow: hidden;
}
.hover-pointer:hover{  
  transition: 300ms;  
  box-shadow: 3px 3px  rgb(32, 129, 219)  !important;
  cursor: pointer;
}
.hover-pointer:hover img{
  transform: scale(1.2);
}
</style>