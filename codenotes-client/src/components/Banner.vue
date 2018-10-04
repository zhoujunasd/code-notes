<template>
    <div class="banner fll">
        <div class="banner-title">
            云笔记
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style lang='scss'>
.banner {
  position: relative;
  width: 750px;
  height: 340px;
  // 三种写背景地址方式
  // 1、url('~@/assets/images/banner.jpg')
  // 2、:style="{backgroundImage: 'url(' + bg2 + ')' }"  import Bg2 from '@/../static/images/logo2.png'
  // 3、<img src="~@/../static/images/logo3.png" width="100">
  background: url("~@/assets/images/banner.jpg") no-repeat;
  -webkit-background-size: 100% 100%;
  background-size: 100% 100%;

  .banner-title {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 10px 20px;
    color: #fff;
    font-size: 24px;
    background: rgba(0, 0, 0, $alpha: 0.5);
  }
}
</style>