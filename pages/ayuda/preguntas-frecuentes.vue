<template>
  <section>
    <v-container fluid class="pa-0 primary py-md-5">
      <v-container>
        <h2 class="font-weight-black white--text text-center">
          Preguntas frecuentes
        </h2>
      </v-container>
    </v-container>
    <v-container>
      <v-breadcrumbs  class="pl-0 pt-2 pb-4 text-center" :items="breadcumbs"></v-breadcrumbs>
      <v-row>
        <v-col class="d-none d-sm-block" md="4">
          <v-card>
            <v-card-text>
              <h3 class="font-weight-bold title--text">Preguntas</h3>
              <v-col cols="18">
                <a href="#">
                  <p>¿Qué libros encontraré en Librería Read&Read?</p>
                </a>
                <a href="#">
                  <p>¿Libros digitales o en papel?</p>
                </a>
                <a href="#digital">
                  <p>
                    ¿Es cierto que los libros digitales no cuestan dinero a los
                    autores?
                  </p>
                </a>
                <a href="#dinero"
                  ><p>¿Necesito un e-reader para leer un ebook?</p></a
                >
                <a href="#ebook">
                  <p>¿Hay muchos tipos de archivos de libros digitales?</p>
                </a>
                <a href="#tipo">
                  <p>
                    ¿Estoy obligado a daros los datos de mi tarjeta o cuenta
                    bancaria?
                  </p>
                </a>

                <a href="#tarjeta">
                  <p>
                    ¿Estás seguros los datos de mi tarjeta bancaria?, ¿son
                    visibles para cualquiera?
                  </p>
                </a>
              </v-col>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="8" md="8">
          <v-card>
            <v-card-text class="text-justify">
              <p>
                ¿Tienes preguntas? Aquí tienes las más frecuentes y sus
                respuestas. ¿No está aquí resuelta tu pregunta? Pues contáctanos
                a través de este email: Contacto@ReadRead.com.
              </p>
              <p>
                <a name="libro">
                  <p class="title--text font-weight-medium">
                    ¿Qué libros encontraré en Librería Read&Read?
                  </p>
                  <p>
                    No solo encuentras buena literatura en los sellos
                    editoriales. Entre los escritores autopublicados, indies o
                    emergentes (cada uno los llama de una manera), hallarás
                    auténticas joyas con buena calidad editorial. En Librería
                    Deseos seleccionamos entre los autopublicados los que nos
                    parecen mejores.
                  </p>
                </a>
              </p>

              <p>
                <a name="digital">
                  <p class="title--text font-weight-medium">
                    ¿Libros digitales o en papel?
                  </p>
                  <p>
                    Ambos. La mayor parte de los autores autopublicados publican
                    en ebooks y en papel. Sólo que a veces el libro en papel
                    tarda un poco más en salir. Más que nada porque necesitan
                    mucha más inversión que el digital.
                  </p>
                </a>
              </p>

              <p>
                <a name="dinero">
                  <p class="title--text font-weight-medium">
                    ¿Es cierto que los libros digitales no cuestan dinero a los
                    autores?
                  </p>
                  <p>
                    Totalmente falso. Además del largo e intenso proceso
                    creativo de la escritura, tienen que invertir dinero y
                    tiempo en la maquetación del ebook, diseño de la portada,
                    edición y corrección del libro, promoción…
                  </p>
                </a>
              </p>

              <a name="ebook">
                <p class="title--text font-weight-medium">
                  ¿Necesito un e-reader para leer un ebook?
                </p>
                <p>
                  No. Los e-books también pueden leerse en los smarphone, en las
                  tablet, en los pc… en donde te hayas registrado.
                </p>
              </a>
              <p>
                <a name="tipo">
                  <p class="title--text font-weight-medium">
                    ¿Hay muchos tipos de archivos de libros digitales?
                  </p>
                  <p>
                    Sí, pero el más común (o universal) es el archivo .epub. La
                    mayor parte de los dispositivos digitales utilizan ese
                    archivo (incluido Apple). Existe otro archivo muy extendido:
                    .mobi, popularmente conocido como kindle. Es el que usa
                    Amazon, pero Amazon utiliza DRM. Puedes descargarte nuestros
                    libros digitales en EPUB o MOBI, tú eliges.
                  </p>
                </a>
              </p>

              <a name="tarjeta">
                <p class="title--text font-weight-medium">
                  ¿Estoy obligado a daros los datos de mi tarjeta o cuenta
                  bancaria?
                </p>
                <p>
                  No. Si ya tienes una cuenta abierta en Apple Pay o en Chrome
                  Payment. En el momento que tu dispositivo esté conectado a
                  Safari te dará la posibilidad de pagar con Apple y si el
                  navegador es Chrome, la posibilidad con tu cuenta de Chrome.
                  En la página del producto (ebook), tienes también un botón de
                  pago con Stripe, la pasarela preferida del e-commerce actual y
                  que está sustituyendo incluso a las TPV bancarias.
                </p>
              </a>
              <a name="banca">
                <p class="title--text font-weight-medium">
                  ¿Estás seguros los datos de mi tarjeta bancaria?, ¿son
                  visibles para cualquiera?
                </p>
                <p>
                  Sí, están seguros. Y no, no son accesibles. Están encriptados.
                  Librería Deseos y las pasarelas de pago utilizamos
                  encriptación segura (SSL). El número de la tarjeta bancaria (o
                  de la cuenta) no aparece en ningún lado. En su lugar se genera
                  un código cifrado. Además, estamos ya preparados para admitir
                  la nueva versión de 3D Secure cuando los bancos pongan en
                  práctica la nueva reglamentación.
                </p>
              </a>
            </v-card-text>
          </v-card>
          <br />
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
export default {
  scrollToTop: true,
   head: {
    title: "Preguntas frecuentes",
  },
   data(){
    return{
      breadcumbs:[
        {
         text: "Inicio",
         disabled: false,
         to: "/",
         exact:true
        },
         {
         text: "Preguntas frecuentes",
         disabled: true,
         to: "/ayuda/preguntas-frecuentes",
        }
      ],
    }
   }
}
</script>
