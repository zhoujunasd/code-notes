import Vue from "vue";
import Router from "vue-router";

// 进度条方法以及样式引入
import NProgress from "nprogress"
import "nprogress/nprogress.css"

const components = {
  layout:() => import('@/views/Layout.vue'),
  index:() => import('@/views/index/index.vue'),
  register:() => import('@/views/register/register.vue'),
  writeNote:() => import('@/views/writeNote/writeNote.vue'),
  article:() => import('@/views/article/article.vue'),
}

Vue.use(Router);

const router =  new Router({
  mode: 'history',
  routes: [
    {
      path: "/",
      name: "layout",
      component: components.layout,
      redirect:"/index",
      children: [
        {
          path: "index",
          name: "index",
          meta: { title: "首页" },
          component: components.index,
        },{
          path: "register",
          name: "register",
          meta: {title: "注册页面"},
          component: components.register
        },{
          path: "writeNote",
          name: "writeNote",
          meta: {title: "写笔记"},
          component: components.writeNote
        },{
          path: 'article/:id',
          name:'article',
          meta: {title: "文章"},
          component: components.article
        }
      ]
    },
  ]
});

router.beforeEach((to, from, next)=>{
  NProgress.start();
  if(to.meta.title){
    document.title = to.meta.title
  }
  next()
}) 

router.afterEach((to,from) => {
  NProgress.done();
})
export default router