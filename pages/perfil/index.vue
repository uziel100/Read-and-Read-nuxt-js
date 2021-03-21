<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="3" class="d-none d-sm-none d-md-block">
        <user-sections @formToggle="showSection" />
      </v-col>
      <v-col cols="12" sm="12" md="9">
        <v-card elevation="1" class="pa-3 pl-sm-5 pl-md-6 pt-4">
          <keep-alive>
            <user-books 
              v-if="section.home"
              :recentlyReadBooks="booksReading"
              :recentlyAddBooks="booksAdded"
            />
            <user-list-favorite
              v-else-if="section.favorite"
            ></user-list-favorite>
            <user-wish-list
              v-else-if="section.wishlist"  
            ></user-wish-list>
          </keep-alive>
        </v-card>
      </v-col>
    </v-row> 
  </v-container>
</template>

<script>

export default {
  
  layout: "user",
  head: {
    title: "Bienvenido",  
  },
   data(){
      return{
        booksReading: [{ title: 'Javascript' } ],
        booksAdded: [{ title: 'Javascript' }],
        section:{
          home: true,
          favorite: false,
          wishlist: false,
        }
      }
    },

    methods:{
      showSection( name ){ 
        const keysSections = Object.keys( this.section );        
        keysSections.forEach(  sectionName => this.section[sectionName] = (sectionName === name)? true : false )
      },   
    }
};
</script>

<style>
</style>