export const state = () => ({  
  notification: { 
    active: false,   
    type: "success",      
    msg: "Bienvenido"
  }
});

export const mutations = {  
  setNotification(state, payload) {       
    state.notification.active =  payload.active;
    state.notification.msg = payload.msg || '';
    state.notification.type = payload.type || 'success';       
  }
};

export const actions = {
    showNotification({ commit, state }, data ){
      commit('setNotification', data);
      setTimeout(() => {
        commit('setNotification', { 
          active: false, 
          msg: state.notification.msg,
          type: state.notification.type
        });
      }, 4000);
    },

    async getUserIfLogged(){      
      if(this.$auth.loggedIn){
        // user logged 
        const data = await this.$auth.$storage.getLocalStorage('_user')
        await this.$auth.setUser(data)
      }else{
        // clear data for user of localStorage
        this.$auth.$storage.setLocalStorage('_user', {}, true);
      }
    }
}
