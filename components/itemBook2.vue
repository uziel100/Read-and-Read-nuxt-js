<template>
  <v-hover v-slot="{ hover }" close-delay="200">
    <v-card
      :elevation="hover ? 5 : 0"
      :class="{ 'on-hover': hover }"
      height="auto"
      :width="170"
      color="cards"
      flat
    >
      <v-img
        @click="goToReadBook"
        :title="title"
        :src="img"
        width="170"
        height="180"
        style="cursor: pointer"
        class="miBorde"
      ></v-img>
      <v-card-text class="pl-2 py-1 text-left">
        {{ title | spliceText }} ----
      </v-card-text>
      <v-card-actions v-if="!isWishlist" class="pa-0 ma-0">
        <v-spacer></v-spacer>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              :loading="loading"
              @click="handleFavorites(isFavorite)"
              icon
              color="orange"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>{{ isFavorite ? "mdi-star" : "mdi-star-outline" }}</v-icon>
            </v-btn>
          </template>
          <span>
            {{ isFavorite ? "Quitar de favoritos" : "Agregar a favoritos" }}</span
          >
        </v-tooltip>
      </v-card-actions>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  name: "itemBook2",
  props: {
    id: {
      type: String,
      require: true,
    },
    title: {
      type: String,
      required: true,
    },

    img: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: false,
    },
    file:{
      type: String,
      required: false
    },
    favorite: {
      type: Boolean,
      required: false,
      default: false,
    },
    isWishlist: {
      type: Boolean,
      required: false,
      default: false,
    }
  },

  data() {
    return {
      loading: false,
      isFavorite: this.favorite
    };
  },

  methods: {

    goToReadBook(){
      // if(!isWishlist){
        console.log(this.file) 
        this.$router.push({ path: this.to, query: { q: this.file } });
      // }
    },

    handleFavorites(itWasFavorite) {
      this.loading = true;

      try {
        if (!itWasFavorite) {
          this.addToFavorites(this.id);
        } else {
          this.removeToFavorites(this.id);
        }
        this.loading = false;        
      } catch (error) {
        this.loading = false;
      } 
    },

    async addToFavorites(id) {
      const data = {
        id,
        isFavorite: true,
      };
      await this.$axios.$put("/user-book/favorite", data);      
      this.isFavorite = true;
    },

    async removeToFavorites(id) {
      const data = {
        id,
        isFavorite: false,
      };
      await this.$axios.$put("/user-book/favorite", data);
      this.isFavorite = false;
    },
  },

  filters: {
    spliceText(value) {
      let large = 16;
      if (value.length > large) {
        value = value.slice(0, large) + "...";
      }
      return value;
    },
  },
};
</script>

<style>
.miBorde {
  border-radius: 4pt;
}
</style>


