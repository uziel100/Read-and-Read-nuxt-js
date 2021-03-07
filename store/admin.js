export const state = () => ({
    notification:{
        progressBar: false,
        active: false,
        msg: 'hola :)',
        type: 'success'
    }
});

export const getters = {};

export const mutations = {
    setNotification(state , payload){
        state.notification.active = payload.active || false;
        state.notification.progressBar = payload.progressBar || false;
        state.notification.msg = payload.msg || 'hola :)';
        state.notification.type = payload.type || 'success';
    }
};

export const actions = {
    showNotification({ commit }, data){        
        commit('setNotification', data);
    }
};
