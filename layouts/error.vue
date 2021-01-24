<template>
  <!-- <section class="mb-16"> -->
  <v-container>
    <section class="center my-10" v-if="error.statusCode === 400">
      <img src="@/assets/img/400.svg" alt="Página no encontrada" />
      <p class="text-center text-info">
        Parece que el libro que busca no esta aqui.
      </p>
      <nuxt-link to="/">
        <v-btn rounded color="primary" class="text-none" dark>
          Regresar al inicio
        </v-btn>
      </nuxt-link>
    </section>
    <section class="center my-10" v-else-if="error.statusCode === 404">
      <img src="@/assets/img/404.svg" alt="Página no encontrada" />
      <p class="text-center text-info">
        Lo sentimos, pero esta página no esta disponible.
      </p>
      <nuxt-link to="/">
        <v-btn rounded color="primary" class="text-none" dark>
          Regresar al inicio
        </v-btn>
      </nuxt-link>
    </section>
    <section class="center my-10" v-else-if="error.statusCode === 500">
      <img
       src="@/assets/img/500.png"
        alt="Error en el servidor"
      />
      <p class="text-center text-info">
        Lo sentimos, ha ocurrido un error en el servidor.
      </p>

      <nuxt-link class="text-decoration-none" to="/">
        <v-btn rounded color="primary" dark> Regresar </v-btn>
      </nuxt-link>
    </section>
  </v-container>
</template>

<script>
export default {
  layout: "empty",
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  head() {
    const title = 'Ha ocurrido un error'
    return {
      title,
    };
  },
};
</script>

<style scoped>
h1 {
  font-size: 20px;
}
.center {
  text-align: center;
  margin: auto;
}

img {
  width: 55%;
}

.text-info {
  font-size: 20px;
  margin: 20px 0;
}

@media (max-width: 560px) {
  img {
    width: 70%;
  }

  .text-info {
    font-size: 16px;
  }
}
</style>
