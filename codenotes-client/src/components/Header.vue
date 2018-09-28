<template>
    <header class="header">
        <div class="header-content  w1170 clearfix">
            <div class="header-title fll">
                <router-link to="/">云笔记</router-link>
            </div>
            <!-- <div>
                <el-input></el-input>
                <el-button size="medium"></el-button>
            </div> -->
            <div class="btn-wrap flr">
                <el-button @click="$router.push('writeNote')" size="medium">写笔记</el-button>
            </div>
        </div>
    </header>
</template>

<script>
export default {
  data() {
    return {
      
    };
  }
};
</script>

<style scoped lang='scss'>
.content {
  height: 50px;
  background: #409eff;
  display: flex;
  justify-content: space-between;

  .conten {
    line-height: 50px;
  }

  .left {
    height: 50px;
    line-height: 50px;
    color: #fff;
    font-size: 24px;
    margin: 0 40px;
  }

  .right {
    line-height: 50px;
    margin: 0 40px;
  }
}
.header{
    height: 50px;
    background: #409eff;

    .header-title a{
        color: #fff;
        font-size: 24px;
        font-weight: 500;
        line-height: 50px;
        text-decoration: none;
    }

    .btn-wrap{
        line-height: 50px;
    }
}
</style>