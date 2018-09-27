<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <layout></layout>
  </div>
</template>
<script>
import layout from '@/components/Layout.vue'

export default {
  components:{
    layout
  }
}
</script>
<style lang="scss">
body{
  background-color: #f1f1f1;
}

*{
  margin: 0;
  padding: 0;
}

.clearfix::after {
  content: '';
  display: block;
  clear: both;
}

li {
  list-style: none;
}

.w980{
  width: 980px;
}

.w1170{
  width: 1170px;
  margin: 0 auto;
}
// #app {
//   font-family: "Avenir", Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
// }
// #nav {
//   padding: 30px;
//   a {
//     font-weight: bold;
//     color: #2c3e50;
//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
</style>
