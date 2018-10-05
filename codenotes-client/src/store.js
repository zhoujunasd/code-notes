import Vue from "vue";
import Vuex from "vuex";
// 引入vuex-persistedstate
// 将store存进浏览器本地数据库，
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo:{
      avatar: "",
      email: "",
      username: "",
    },
    ArticleData:{
      title:"",
      content: "",
      contentText:"",
      category:""
    },
  },
  mutations: {
    CHANGE_INFO(state,value){
      state.userInfo = value
    },
    CHANGE_ARTICLE(state,value){
      state.ArticleData = value
    }
  },
  actions: {},
  // vuex-persistedstate设置，存进sessionStorage，在浏览器关闭时，数据清除
  // cookieStorage,与cookie的生存期一致
  plugins: [createPersistedState({
    storage: {
      getItem: key =>  sessionStorage.getItem (key),
      setItem: (key, value) => sessionStorage.setItem(key, value,),
      removeItem: key => sessionStorage.removeItem(key),
    },
  })],
});
