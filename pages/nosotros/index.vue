<template>
  <section class="mb-25 container mt-sm-5">
     <v-breadcrumbs class="pl-0 pt-2 pb-4 text-center" :items="breadcumbs"></v-breadcrumbs>
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
              La librería Read&Read tiene como misión, fomentar la lectura y dar una excelente
              experiencia a todos los usuarios de esta plataforma, la empresa está dedicada a todo el
              público en general, está comprometida a mejorar la calidad de sus servicios de acuerdo a las
              necesidades que demanden los usuarios, facilitamos el acceso a libros de gran calidad e
              importancia a un menor costo, teniendo a disposición muchos libros desde los más antiguos
              hasta los más novedosos, resolviendo las problemáticas de las librerías tradicionales y
              transformando la manera de obtener los recursos literarios
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
              Ser una empresa reconocida por su excelente calidad de nuestros productos, y ser
              impulsadora al conocimiento y entretenimiento digital a nivel nacional, gracias al esfuerzo,
              dedicación y profesionalismo de nuestros empleados, tomando en cuenta las necesidades de
              nuestros clientes.
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
  data(){
    return{
      breadcumbs:[
        {
         text: "Inicio",
         disabled: false,
         to: "/",
        },
         {
         text: "Acerca de la empresa",
         disabled: true,
         to: "/nosotros",
        }
      ]
    }
  }
};
</script>

<style>
</style>