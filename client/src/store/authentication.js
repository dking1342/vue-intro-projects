
const state = {
    token: null,
    isLoggedIn: false,
}

const mutations = {
    setToken(state,token) {
        state.token = token;
    },
    setIsLoggedIn(state,isLoggedIn) {
        state.isLoggedIn = isLoggedIn;
    },
    setLogout(state) {
        state.token = null;
        state.isLoggedIn = false;
    }
    
}

export default {
    namespaced:true,
    state,
    mutations
}