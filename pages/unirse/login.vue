<template>
  <section  class="mb-16 container image1">
    <v-row>
      <v-col cols="12" sm="6" md="4" lg="4">
        <v-card elevation="2" class="py-5" ref="form">
          <v-card-text>
            <h2 class="text-center text-h4 mb-8">Inicia sesión y comienza a leer</h2>
            <div class="d-flex my-8">
              <v-btn elevation="1" large rounded block  color="#fff" >
                <v-icon left> mdi-google </v-icon>
                Continuar con Google
              </v-btn>            
            </div>
            <v-text-field
              label="Correo electronico *"
              outlined
              type="email"
              dense
              color="#2F80ED"
            ></v-text-field>

            <v-text-field
              label="Contraseña *"
              outlined
              dense
              color="#2F80ED"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show ? 'text' : 'password'"
              @click:append="show = !show"
            ></v-text-field>

            <v-btn @click="prueba" color="secondary" class="my-3" block>Iniciar sesión</v-btn>
          </v-card-text>          

          <div class="text-center">
            <p class="text-caption text-black ma-1">
              <nuxt-link to="/"> ¿Has olvidado tu contraseña? </nuxt-link>
            </p>
            <p class="text-caption text-black">
              No tienes una cuenta
              <nuxt-link to="/join/register">Registrate</nuxt-link>
            </p>
          </div>          
        </v-card>
      </v-col>      
    </v-row>
  </section>
</template>

<script>
export default {
  transition: 'home',
  data() {
    return {
      show: false,
    };
  },

  methods: {
    async prueba(){
      try {
        const res = await this.$axios.$get('user')      
        console.log(res);
        
      } catch (err) {
        
      }
    }
  }
};
</script>

<style>

.image1{
    background-image: url(../../assets/img/login.svg) !important;
    background-size: 90% 90% ;
    background-position-x: 300px;
    background-position-y: 30px;
}
</style>