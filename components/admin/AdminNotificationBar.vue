<template>
  <v-snackbar :value="notification.active" :timeout="-1" :color="notification.type" dark top>
      <v-progress-circular
        indeterminate
        color="white"
        class="mr-3"
        v-if="notification.progressBar"
      ></v-progress-circular>      
      {{ notification.msg }}
      <template v-slot:action="{ attrs }">          
        <v-btn @click="showNotification({ active: false })"  color="black" text v-bind="attrs"> Close </v-btn>
      </template>
    </v-snackbar>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {   
    methods:{
        ...mapActions('admin', ['showNotification'])
    }, 
    computed:{
        ...mapState('admin',['notification'])
    }

}
</script>

<style>

</style>