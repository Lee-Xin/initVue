import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
    userInfo: null,
    token: null
}

const getters = {
    userInfo(state){
        return state.userInfo
    },
    token(state){
        return state.token
    }
}

const mutations = {
    SET_USER_INFO(state, userInfo) {
        state.userInfo = userInfo
    },
    SET_TOKEN(state,token){
        state.token = token
    }
}

const actions = {
    setUserInfo({commit}, userInfo){
        commit('SET_USER_INFO', userInfo)
    },
    setToken({commit}, token){
        commit('SET_TOKEN', token)
    }
}

const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})

export default store