import router from '@/router';
import Vue from 'vue';

const state = {
    userid: null,
    token: null,
};

const mutations = {
    authUser(state, userData) {
        state.userid = userData.userid;
        state.token = userData.token;
    },
    clearAuthData(state) {
        state.userid = null;
        state.token = null;
    },
};

const getters = {
    isAuthenticated(state) {
        return state.token !== null;
    },
};

const actions = {
    login: ({ commit }, authData) => {

        const data_json = JSON.stringify({
            email: authData.email,
            password: authData.password
        });
        Vue.http.post("http://localhost:5000/Feather/signin", data_json, {
                headers: {
                    "Content-type": "application/json"
                }
            })
            .then(response => {
                console.log(response);
                if (response.body.token) {
                    commit('authUser', { userid: authData.userid, token: response.body.token });
                    localStorage.setItem('token', response.body.token);
                    localStorage.setItem('userid', response.body.userid);
                    router.replace('dashboard'); 

                }
                else {
                    console.log('Login error');
                }
            })
            .catch(error => {
                console.log(`error: ${error}`);
            });

    },
    autoLogin({ commit }) {
        let token = localStorage.getItem('token');
        let userid = localStorage.getItem('userid');

        if (!token || !userid) {
            return;
        }

        commit('authUser', { userid: userid, token: token });
    },
    logout: ({ commit }) => {
        commit('clearAuthData');
        localStorage.removeItem('userid');
        localStorage.removeItem('token');
        router.replace('');
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions,
}