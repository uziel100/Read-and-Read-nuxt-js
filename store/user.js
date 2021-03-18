export const state = () => ({
    wishlist: []
});

export const getters = {
    getWishList(state){
        return state.wishlist.map( book => book.bookId._id )
    }
};

export const mutations = {
    setWishList(state, payload){
        state.wishlist = payload;
    },

    setPushWishList(){

    }
};

export const actions = {
   setWishList({ commit }, wishlist ){
     commit('setWishList', wishlist )
     this.$auth.$storage.setLocalStorage("_list", wishlist, true);
   }
};
