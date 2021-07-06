<template>
  <v-container class="container">
    <v-row>
      <v-col class="pt-2" cols="12">
        <v-stepper non-linear value="3">
          <v-stepper-header>
            <v-stepper-step step="1" complete>
              Detalles de la orden
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step complete step="2"> Confirmar pago </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step complete step="3"
              >Estado de la orden</v-stepper-step
            >
          </v-stepper-header>
        </v-stepper>
      </v-col>
    </v-row>
    <v-row class="my-16">
      <v-col cols="12" md="6">
        <p class="text-h6 pa-2 primary text-center white--text">
          Tu pago se ha realizado correctamente
        </p>
        <p class="text-h4 mt-10">Hola {{ $auth.user.email }}</p>
        <p class="text-h5">Gracias por realizar tu compra</p>
        <p class="text-h5 mt-10">
          Recuerda que
          <strong
            ><i
              >"Lo que lees cuando no tienes que hacerlo determina lo que serás
              cuando no puedas evitarlo."</i
            ></strong
          >
        </p>
        <v-btn color="accent" class="white--text" large to="/perfil/my-books" >Ir a tus libros</v-btn>
        <v-btn class="title--text" large text  to="/" >Regresar</v-btn>
      </v-col>
      <v-col cols="12" md="6">
        <img
          width="500"
          src="@/assets/img/success-payment.svg"
          alt="pago exitoso"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  transition: "home",
  name: "status",
  head: {
    title: "Estado del pago",
  },
};
</script>
