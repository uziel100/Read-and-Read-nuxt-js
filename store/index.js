
export const state = () => ({  
  notification: { 
    active: false,   
    type: "success",      
    msg: "Bienvenido"
  },  
  categories: [],
  newBooks: [],
  baseUrl:{
    images: 'https://d3a1k1s7tqtsjr.cloudfront.net/imageBook/',
    files: 'https://d3a1k1s7tqtsjr.cloudfront.net/fileBook/'
  }
});

export const getters = {
  getAllSubcategories(state) {
    return state.categories.reduce( (list, currentSubcategory) => {
      list.push( currentSubcategory.subcategories );
      return list
    }, []).flat();
  }
}

export const mutations = {  
  setNotification(state, payload) {       
    state.notification.active =  payload.active;
    state.notification.msg = payload.msg || '';
    state.notification.type = payload.type || 'success';       
  },

  setUserRole(state, payload){
    state.userRole = payload
  },

  setCategories(state, payload){
    state.categories = payload
  },

  setNewBooks(state, payload){
    state.newBooks = payload
  },

  setLoggedUser(state, payload){
    state.auth.loggedIn = payload
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
        // clear data for user at localStorage
        this.$auth.$storage.setLocalStorage('_user', {}, true);
      }
    },

    async getCategories({ state,  commit }){
      if(!state.categories.length){
        const data = await this.$axios.$get('category');
        commit('setCategories', data.categories)
      }
    },

    async getNewBooks({  commit }){
      const data = await this.$axios.$get('book/new');
      commit('setNewBooks', data.books )
    },

    setLoggedIn({ commit }, status){
      commit('setLoggedUser', status)
    },

    setUserRole({ commit }, role){
      commit('setUserRole', role)
    }
}
