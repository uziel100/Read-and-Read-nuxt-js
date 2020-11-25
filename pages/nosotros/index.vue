<template>
  <section class="mb-25 container mt-sm-5">
    <v-card elevation="3" class="py-2 my-6">
      <v-row>
        <v-col cols="12" sm="4" md="4" class="text-center">         
          <v-img
            src="/img/somos.png"          
          ></v-img>
        </v-col>
        <v-col cols="12" sm="8" md="8">
          <v-card-text>
            <h2 class="text-center title--text">¿Quienes somos?</h2>
            <p class="mt-5 mt-sm-10">
              "Read&Read" se fundo en Septiembre del 2020. Nuestro publico esta
              compuesto principalmente por hombres y mujeres estudiantes y sobre
              todo por los que sienten interes por la cultura y buscan inofrmación
              y entretenimiento. Estamos muy orgullosos por lo que hemos hecho, y
              por eso nos hemos propuesto continuar nuestro crecimiento, en
              beneficio de la cultura de nuestro país.
            </p>
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>
    <v-card elevation="3" class="py-2 my-6">
      <v-row>
        <v-col cols="12" sm="8" md="8" class="pl-10">
          <v-card-text>
            <h2 class="text-center title--text">Misión</h2>
            <p class="mt-5 mt-sm-10">
              Ser el referente del conocimiento y entretenimiento para enriquecer
              la cultura de las personas, propiciando la transformación de la
              comunidad a la que servimos.
            </p>
          </v-card-text>
        </v-col>
        <v-col cols="12" sm=4 md="4" class="text-center">
          <v-img
            src="/img/mision.png"          
          ></v-img>
        </v-col>
      </v-row>
    </v-card>
    <v-card elevation="3" class="py-2 my-6 text-center">
      <v-row>
        <v-col cols="12" sm="4" md="4">          
          <v-img
            src="/img/vision.png"          
          ></v-img>
        </v-col>
        <v-col cols="12" sm="8" md="8">
          <v-card-text>
            <h2 class="text-center title--text">Visión</h2>
            <p class="mt-5 mt-sm-10 text-left">
              Contribuimos a la difusión de la cultura y el entretenimiento
              creando experiencias para el encuentro con el conocimiento.
            </p>
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>
  </section>
</template>

<script>
export default {
  scrollToTop: true,
  head: {
    title: "Acerca de nosotros",
  },
};
</script>

<style>
</style>