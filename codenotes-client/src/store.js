import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo:{
      avatar: "",
      email: "",
      username: "",
    }
  },
  mutations: {
    CHANGE_INFO(state,value){
      state.userInfo = value
    }
  },
  actions: {},
  plugins: [createPersistedState({
    storage: {
      getItem: key => sessionStorage.getItem (key),
      setItem: (key, value) =>
      sessionStorage.setItem(key, value,),
      removeItem: key => sessionStorage.removeItem(key),
    },
  })],
});
