<template >
  <div class="contact"> 
    <section class="pa-0 accent">
      <v-container>
        <v-row>
          <v-col class="pt-2 pt-md-5" cols="12" sm="10">
            <h2 class="text-center text-sm-left font-weight-bold white--text">Contacto</h2>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <v-container class="mb-16">
      <v-row>          
        <v-col class="ml-0 ml-sm-10" cols="12" sm="7" md="4" lg="4">
          <v-card
            elevation="2"
            class="py-5"
            :loading="form.loading"
            :disabled="form.disabled"
            width="400px"
          >
            <v-form v-model="form.valid" ref="form">
              <v-card-text>
                <h2 class="text-center mb-8 font-weight-bold">
                  ¿Que puedo hacer por ti?
                </h2>

                <v-text-field
                  label="Nombre *"
                  outlined
                  type="text"
                  dense
                  color="accent"
                  v-model="form.name"
                  :rules="[form.nameRequired]"
                ></v-text-field>

                <v-text-field
                  label="Correo electronico *"
                  outlined
                  type="email"
                  dense
                  color="#2F80ED"
                  v-model="form.email"
                  :rules="[form.emailRequired, form.emailRules]"
                ></v-text-field>

                <v-text-field
                  label="Numero de telefono *"
                  outlined
                  type="number"
                  dense
                  color="accent"
                  v-model="form.number"
                  :rules="[form.numberRequired, form.numberRules]"
                ></v-text-field>

                <v-textarea
                  color="accent"
                  outlined                  
                  name="input-7-4"
                  label="Comentario *"
                  v-model="form.coment"
                  :rules="[form.comentRequired]"
                ></v-textarea>

                <v-btn :disabled="!form.valid" color="secondary" class="my-3" block>Enviar</v-btn>
              </v-card-text>
            </v-form>
          </v-card>
        </v-col>
        <v-spacer></v-spacer>
        <v-col          
          cols="12"
          sm="4"
          md="3"
        >
          <v-card elevation="2">
            <v-card-text>
              <p class="text-subtitle-1 mb-0 title--text font-weight-bold">Telefonos: </p>
              <v-divider></v-divider>
              <p class="text-subtitle-2 mt-2">+521 7712068008</p>
              <p class="text-subtitle-1 mb-0 mt-4 title--text font-weight-bold">Email de ayuda: </p>
              <v-divider></v-divider>
              <p class="text-subtitle-2 mt-2">Read&Read@gmail.com</p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>        
  </div>
</template>

<script>
export default {
  scrollToTop: true,
  transition: "home",
  head: {
    title: "Contacto",
  },
  data() {
    return {
      show: false,
      form: {
        valid: false,
        loading: false,
        disabled: false,
        name: "",
        number: "",
        email: "",
        password: "",
        coment: "",
        emailRequired: (val) => !!val || "Correo obligatorio",
        emailRules: (val) => /.+@.+\..+/.test(val) || "Correo debe ser valido",
        passwordRules: (val) => !!val || "Contraseña obligatoria",
        nameRequired: (val) => !!val || "Nombre obligatorio",
        numberRequired: (val) => !!val || "Numero telefonico obligatorio",
        numberRules: (val) =>
          val.length <= 10 || " El Numero telefonico excede los 10 digitos",
        comentRequired: (val) => !!val || "Texto obligatorio",
      },
    };
  },

  methods: {
    handleLogin() {
      this.validateForm();
    },

    validateForm() {
      this.$refs.form.validate();
    },
  },
};
</script>

<style>
.contact {
  background-image: url(../../assets/img/img-contacto.svg) !important;
  background-size: 70% 70%;  
  background-position: bottom center;
  background-position-x: calc(73% + 100px);
  background-position-y: 190px;  
}


@media (max-width: 768px) {
  .contact {
    background-image: none !important;    
  }
}
</style>