<template>
  <v-hover
    v-slot="{ hover }"
    close-delay="200"
  >
    <v-card    
      :elevation="hover ? 5 : 0"
      :class="{ 'on-hover': hover }"
      height="auto"
      :width="170"    
      :title="title"   
      color="cards"
      flat    
      @click="$router.push( to )"
    >
      <v-img
        :src="img"
        width="170"
        height="180"
        style="cursor: pointer"
        class="miBorde"
      ></v-img>
      <v-card-text  class="pl-2 py-3 text-left"
      >
      {{ title }}
      </v-card-text>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  name: 'itemBook2',
  props: {
    title: {
      type: String,
      required: true
    },  
    
    img: {
      type: String,
      required: true
    },

    to: {
      type: String,
      required: false
    },
  },
};
</script>

<style>
    .miFuente {
      font-size: 18px;
      text-align: left;
      color: black;
      font-weight: bold;
    }

    .miBorde{
      border-radius: 4pt;
    }
</style>


