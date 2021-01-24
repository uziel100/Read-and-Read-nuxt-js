<template>
  <div>
      Pagina no existente.
  </div>
</template>

<script>
export default {
  head: {
    title: "Un libro es el mejor regalo",
  },

  asyncData({  error }) {
    error({ statusCode: 400 })
  },
};
</script>


<style scoped>
.bannerDetailBook {
  background-image: url(../../assets/img/bannerDetailBook4.png) !important;
  background-size: cover;
}
</style>