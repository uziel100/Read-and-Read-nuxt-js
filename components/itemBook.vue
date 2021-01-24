<template>
  <v-card    
    :class="margin"
    height="auto"
    :width="width"    
    :title="title"   
    color="cards"    
    @click="goDetailBook"       
  >
    <v-img
      :src="img"
      height="240"
      style="cursor: pointer"
    ></v-img>
    <v-card-text>
      <div>{{ title | spliceText }}</div>
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
    idBook: {
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
    margin: {
      type: String,
      required: false,
      default: 'ma-0'
    },

    width: {
      type: Number,
      required: false,
      default: 250
    }
  },
  methods:{
    goDetailBook(){
      this.$router.push(`/libro/${ this.idBook }`)
    }
  },

  filters: {
    spliceText(value){
      if(value.length > 20){
        value = value.slice(0,20) + "..."
      }
      return value;
    }
  }
};
</script>
