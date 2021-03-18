<template>
  <section class="py-4 px-2">
    <h2 class="text-center text-h5 title--text mb-3">
      Libros en los que has comentado
    </h2>
    <v-divider></v-divider>
    <v-list v-if="comments.length" three-line class="mt-3">
      <v-list-item
        v-for="(comment, i) in comments"
        :key="i + '-_' + comment._id"
        link
        @click="$router.push(`/libro/${ comment.book._id }`)"
      >
        <img
          width="60px"
          height="70px"
          :src="baseUrl.images + comment.book.imgUrl"
          :alt="'Libro con el titulo ' + comment.book.title"
        />

        <v-list-item-content class="ml-3">
          <v-list-item-title
            class="text-body-1 font-weight-bold mb-2"
            v-text="comment.book.title"
          ></v-list-item-title>
          <p class="text-body-2">{{ comment.content | spliceText }}</p>
          <v-divider class="mt-2"></v-divider>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <div v-else class="d-block text-center mt-5">
      <img
        class="mt-8"
        width="250px"
        src="@/assets/img/empty-comments.svg"
        alt="No hay ningun comentario"
      />
      <p>Parece que no tienes comentarios :(</p>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
export default {
  created() {
    this.getComments();
  },

  data() {
    return {
      comments: [],
    };
  },

  methods: {
    async getComments() {
      try {
        const res = await this.$axios.$get(
          `comment/user/${this.$auth.user._id}`
        );
        this.comments = res.data;
      } catch (err) {
        console.log(err);
      }
    },
  },

  computed: {
    ...mapState(["baseUrl"]),
  },

  filters: {
    spliceText(val) {
      const tamMax = 100;
      if (val.length > tamMax) {
        return val.slice(0, tamMax) + "...";
      }
      return val;
    },
  },
};
</script>

<style>
</style>