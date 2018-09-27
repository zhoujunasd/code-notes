import Vue from "vue";
import Router from "vue-router";
// import Home from "./views/Home.vue";
import Login from "./views/Login"

// const components = {
//   login:() => import('@/views/Login')
// }

Vue.use(Router);

const router =  new Router({
  mode: 'history',
  routes: [
    {
      path: "/",
      redirect:"/login",
    },{
      path: "/login",
      name: "login",
      meta: {
        title: "Login"
      },
      component: Login
    },
    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () =>
    //     import(/* webpackChunkName: "about" */ "./views/About.vue")
    // }
  ]
});

router.beforeEach((to, from, next)=>{
  if(to.meta.title){
    document.title = to.meta.title
  }
  next()
}) 

export default router