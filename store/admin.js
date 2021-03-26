export const state = () => ({
    notification:{
        progressBar: false,
        active: false,
        msg: 'hola :)',
        type: 'success'
    },
    collection: {
        category: [],
        author: [],
        publisher: [],
        languaje: []
    }
});

export const getters = {};

export const mutations = {
    setNotification(state , payload){
        state.notification.active = payload.active || false;
        state.notification.progressBar = payload.progressBar || false;
        state.notification.msg = payload.msg || 'hola :)';
        state.notification.type = payload.type || 'success';
    },

    setCategory(state, payload){
        state.collection.category = payload;
    },

    setAuthor(state, payload){
        state.collection.author = payload;
    },
    setPublisher(state, payload){
        state.collection.publisher = payload;
    },
    setLanguaje(state, payload){
        state.collection.languaje = payload;
    }
};

export const actions = {
    showNotification({ commit }, data){        
        commit('setNotification', data);
    },

    setCategory({ commit }, data){            
        commit('setCategory', data);        
    },

    setAuthor({ commit }, data){        
        commit('setAuthor', data);        
    },

    setPublisher({ commit }, data){        
        commit('setPublisher', data);
    },

    setLanguaje({ commit }, data){        
        commit('setLanguaje', data);
    },

    async initCollections({ commit }){
        const languaje = await this.$axios.$get("languaje");
        const authors = await this.$axios.$get("author");
        const publishers = await this.  $axios.$get("publisher");        
  
        commit('setLanguaje', languaje.data);
        commit('setAuthor', authors.data);
        commit('setPublisher', publishers.data);
    }
};
