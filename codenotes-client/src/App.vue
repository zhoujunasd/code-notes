<template>
  <div id="app">
    <!-- 在App页面加载路由，不需要引入组件 -->
    <!-- <layout></layout> -->
    <router-view></router-view>
  </div>
</template>
<script>
// import layout from '@/views/Layout.vue'

export default {
  // components:{
  // layout
  // }
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
  width: 0;
  height: 0;
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

.fll{
  float: left;
}
.flr{
  float: right;
}
</style>
