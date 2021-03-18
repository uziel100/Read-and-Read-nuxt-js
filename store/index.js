
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
    files: 'https://d3a1k1s7tqtsjr.cloudfront.net/fileBook/',
    category: 'https://d3a1k1s7tqtsjr.cloudfront.net/imgCategory/',
    avatar: 'https://d3a1k1s7tqtsjr.cloudfront.net/avatar/'
  }
});

export const getters = {
  getAllSubcategories(state) {
    return state.categories.reduce( (list, currentSubcategory) => {
      list.push( currentSubcategory.subcategories );
      return list
    }, []).flat();
  },

  getImageProfile(state){
    const url = state.baseUrl.avatar;  
    try {
      if(state.auth.user){
        if( !state.auth.user.photo){
          return url + 'avatar-default.png'
        }else if(state.auth.user.photo.startsWith('https://') ){
          return state.auth.user.photo;
        }else{      
          return url + state.auth.user.photo;
        }            
      }
      return url + 'avatar-default.png'      
    } catch (err) {     
      return url + 'avatar-default.png'
    }       
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

    async getUserIfLogged({ commit, dispatch }){      
      if(this.$auth.loggedIn){
        // user logged 
        const wishlist = await this.$auth.$storage.getLocalStorage('_list');  
        const data = await this.$auth.$storage.getLocalStorage('_user');        
        await this.$auth.setUser( data )  
        dispatch('user/setWishList', wishlist )      
      }else{
        // clear data for user at localStorage
        this.$auth.$storage.setLocalStorage('_list', {}, true);
        this.$auth.$storage.setLocalStorage('_user', {}, true);
      }
    },

    async getCategories({ state,  commit }){
      if(!state.categories.length){
        const data = await this.$axios.$get('category');
        commit('setCategories', data.categories)
      }
    },

    async getNewBooks({ state, commit }){
      if(!state.newBooks.length){
        const data = await this.$axios.$get('book/new');
        commit('setNewBooks', data.books )
      }
    },

    setLoggedIn({ commit }, status){
      commit('setLoggedUser', status)
    },

   

    setUserRole({ commit }, role){
      commit('setUserRole', role)
    }
}
