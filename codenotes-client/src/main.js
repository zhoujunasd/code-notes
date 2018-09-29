import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 清除样式
import 'normalize.css/normalize.css'
//引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 将$axios挂载在Vue原型上
import $axios from './axios'
Vue.prototype.$axios = $axios

// 引入富文本编辑器以及样式文件
import VueQuillEditor from 'vue-quill-editor'
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor, /* { default global options } */)


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
