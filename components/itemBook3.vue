<template>
  <v-hover
    v-slot="{ hover }"
    close-delay="50"
  >
    <v-card    
      :elevation="hover ? 16 : 0"
      :class="{ 'on-hover': hover }"
      height="170"
      :width="250"    
      :title="title"   
      color="cards"  
      flat  
    >
      <v-img
        :src="img"
        width="250"
        height="135"
        class="miBorde"
      ></v-img>
      <v-card-text 
      class="pl-2 py-3 text-left">
      {{ title }}
      </v-card-text>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    
    img: {
      type: String,
      required: true
    },
  },
};
</script>

<style>
    .miFuente {
      font-size: 8px;
      text-align: left;
      color: black;
    }

    .miBorde{
      border-radius:4pt;
    }
</style>


