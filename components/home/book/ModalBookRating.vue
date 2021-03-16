<template>
  <v-dialog
    @input="$emit('update:show', false)"
    :value="show"
    transition="dialog-top-transition"
    max-width="500"
    elevation-15
  >
    <v-card class="mx-auto">
      <v-card-title class="headline"> Evalua tu libro favorito </v-card-title>
      <v-card-text>
        Escribe algún comentario
           <v-textarea                       
            outlined            
            v-model="form.content"
            auto-grow
            rows="2"
          ></v-textarea>
        <div class="text-center mt-6">
          <v-rating
            v-model.number="form.score"
            color="yellow darken-3"
            background-color="grey darken-1"
            empty-icon="$ratingFull"
            hover
            large
          ></v-rating>
        </div>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="justify-space-between">
        <v-btn @click="$emit('update:show', false)" color="error" class="text-none" text> No gracias </v-btn>
        <v-btn @click="handleSendComment" class="text-none" color="primary" outlined text> Evaluar ahora </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: ["show","scoreAll"],
  data() {
    return {      
      form:{
        content: '',
        score: 0,
        book: this.$route.params.idBook
      }
    };
  },

  methods:{
    ...mapActions(["showNotification"]),

    async handleSendComment(){
      const { content, score, book } = this.form;
      try {
        const id = this.$auth.user._id;                              
        this.scoreAll[`_${ score }Start`] = this.scoreAll[`_${ score }Start`] + 1; 
        const data = await this.$axios.$post('book/comment/' + id, { content, score, book });
        await this.$axios.$put('book/'+ book, {  score: this.scoreAll  } );        
        this.$emit('updateComment', this.form);
        this.clearFields();
        this.$emit('update:show', false)        
        this.showNotification({ active: true, type: "accent", msg: data.message });
      } catch (err) {
         const msg = err.response
          ? err.response.data.message
          : "Ha ocurrido un error";
        this.showNotification({ active: true, type: "error", msg });
      }
    },

    clearFields(){
      this.form.content = '';
      this.form.score = 0;
    }
  }
};
</script>

<style>
</style>