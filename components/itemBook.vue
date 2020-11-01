<template>
  <v-card    
    class="ma-4"
    height="auto"
    :width="width"    
    :title="title"    
  >
    <v-img
      :src="img"
      height="240"
      style="cursor: pointer"
    ></v-img>
    <v-card-text>
      <div>{{ title }}</div>
      <v-card-title class="pa-0 text-black">$ {{ price }} MX</v-card-title>
    </v-card-text>
    <v-btn  color="red" dark class="text-none" block>Agregar al carrito</v-btn>
  </v-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },

    price: {
      type: Number,
      required: true
    },    

    active:{
      type: Boolean,
      required: false
    },
    
    img: {
      type: String,
      required: true
    },

    width: {
      type: Number,
      required: false,
      default: 250
    }
  }
};
</script>
