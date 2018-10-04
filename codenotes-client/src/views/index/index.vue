<template>
  <div class="index">
    <div class="w1170 clearfix">
      <banner></banner>
      <userBox></userBox>
    </div>
    <!-- 文章列表 -->
    <div class="article-wrap">
      <router-link :to="{name:'article',params:{id:item._id}}" class="article-item" v-for='(item,index) in article' :key='index'>
        <div class="article-msg clearfix">
          <div class="top">
            <div class="avatar fll">
              <img :src="item.author.avatar">
                        </div>
              <div class="author-msg fll">
                <strong class="author-name" v-text="item.author.username">作者</strong>
                <span class="divide"> | </span>
                <span class="article-title" v-text="item.title">书名</span>
              </div>
            </div>
            <div class="middle fll">
              <span class="strong">浏览：{{item.looknums}}</span>
              <span class="strong">回复：{{item.commontnums}}</span>
              <span class="strong">分类：{{item.category.name}}</span>
            </div>
            <div class="bottom fll">
              <span v-text="item.contentText">{{item.contentText}}</span>
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
  },
  data() {
    return {
      article: []
    };
  },
  methods: {
    getData() {
      this.$axios.get("/article").then(res => {
        if (res.code == 200) {
          this.article = res.data;
          // console.log(this.article)
        }
      });
    }
  },
  created() {
    this.getData();
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
    border: 1px solid #409eff;
    border-radius: 5px;
    margin-bottom: 5px;

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
          border: 1px solid #409eff;
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