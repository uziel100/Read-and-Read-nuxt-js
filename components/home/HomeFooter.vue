<template>
  <v-footer color="footer" padless>
    <v-container>
      <v-row>
        <v-col cols="12" sm="4">
          <figure class="text-center text-sm-left">
            <nuxt-link to="/">
              <img
                src="@/assets/img/logo-ligth.png"
                width="180px"
                alt="logotipo"
              />
            </nuxt-link>
          </figure>
        </v-col>
        <v-col
          v-for="(item, idx) in linksFooter"
          :key="idx"
          class="text-center text-sm-left"
          cols="12"
          sm="4"
        >
          <h3 class="mb-4 text-h6 txt-white">{{ item.title }}</h3>
          <v-divider class="mb-2"></v-divider>
          <div>
            <p v-for="(link, i) in item.links" :key="i" class="my-2">
              <nuxt-link class="txt-gray" :to="link.to">
                {{ link.title }}
              </nuxt-link>
            </p>
          </div>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
    </v-container>
    <v-col class="text-center footer" cols="12">
      <p class="white--text">&copy; Read&Read Todos los derechos reservados</p>
    </v-col>
  </v-footer>
</template>

<script>
export default {
  data() {
    return {
      linksFooter: [
        {
          title: "Nosotros",
          links: [
            {
              title: "Quienes somos",
              to: "/nosotros",
            },
            {
              title: "Misión, visión",
              to: "/nosotros",
            },
          ],
        },
        {
          title: "Ayuda",
          links: [
            {
              title: "Contacto",
              to: "/ayuda/contacto",
            },
            {
              title: "Preguntas frecuentes",
              to: "/ayuda/preguntas-frecuentes",
            },
            {
              title: "Politica de privacidad",
              to: "/ayuda/politica-de-privacidad",
            },
          ],
        },
      ],
    };
  },
};
</script>

<style>
</style>