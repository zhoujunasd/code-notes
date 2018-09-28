<template>
    <div class="index">
        <div class="w1170 clearfix">
            <banner></banner>
            <userBox></userBox>
        </div>
        <div class="article-wrap">
            <router-link to="#" class="article-item">
                <div class="article-msg clearfix">
                    <div class="top">
                        <div class="avatar fll">
                            <img src="~@/assets/images/banner.jpg">
                        </div>
                            <div class="author-msg fll">
                                <strong class="author-name">作者</strong>
                                <span class="divide"> | </span>
                                <span class="article-title">书名</span>
                            </div>
                        </div>
                        <div class="middle fll">
                            <span class="strong">浏览：0</span>
                            <span class="strong">回复：0</span>
                            <span class="strong">分类：未知</span>
                        </div>
                        <div class="bottom fll">
                            <span>文章详情。</span>
                        </div>
                    </div>
            </router-link>
        </div>
    </div>
</template>

<script>
import banner from "@/components/Banner.vue";
import userBox from "@/components/userBox.vue";
export default {
  components: {
    banner,
    userBox
  }
};
</script>

<style scoped lang='scss'>
.article-wrap {
  margin-top: 30px;
  width: 750px;
  background: #fff;
  border-radius: 6px;
  overflow: hidden;

  .article-item {
    display: block;
    text-decoration: none;
    color: #333;

    .top {
      padding: 24px;

      .avatar {
        width: 70px;
        height: 70px;

        img {
          display: block;
          height: 100%;
          width: 100%;
          border-radius: 5px;
        }
      }
      .author-msg {
        margin-left: 12px;

        .author-name {
          font-size: 18px;
          font-weight: 800;
          color: #409eff;
        }

        .article-title {
          font-size: 16px;
          font-weight: 700;
        }
      }
    }
    .middle {
      margin: 10px;
      background: #ccc;
      width: 360px;
      border-radius: 3px;
      line-height: 20px;
      height: 20px;
      
      .strong {
        margin-left: 16px;
        font-size: 14px;
      }
    }

    .bottom {
      margin: 16px 30px;
      width: 750px;
      font-size: 12px;
      font-weight: 600;
    }
  }
}
</style>