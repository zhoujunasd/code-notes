<template>
  <div class="article w1170">
    <div class="author-msg clearfix" v-if="content.author">
      <div class="img-wrap fll">
        <img :src="content.author.avatar">
            </div>
        <div class="author-details fll">
          <div class="author-name">
            {{content.author.username}}
          </div>
          <div class="date">
            <span class="form-date">时间：{{content.updated}}</span>
            <span>阅读：{{content.looknums}}</span>
          </div>
        </div>
      </div>
      <h2 class="title">
        {{content.title}}
      </h2>
      <div class="content-heml" v-html="content.content">
      </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      content: {}
    };
  },
  methods: {
    getData() {
      this.$axios.get(`/article/${this.$route.params.id}`).then(res => {
        res.data.updated = res.data.updated.substring(0, 10);
        this.content = res.data;
        console.log(res);
      });
    }
  },
  created() {
    this.getData();
  }
};
</script>

<style scoped lang='scss'>
.article {
  width: 980px;
  background: #fff;
  border-radius: 10px;
  margin: 50px auto;
  padding: 30px 40px;
  box-sizing: border-box;

  .author-details {
    margin-left: 15px;
    // display: block;
  }
  .img-wrap img {
    width: 80px;
    height: 80px;
    border: 1px solid #409eff;
    border-radius: 5px;
  }

  .author-name {
    padding: 10px;
    font-size: 18px;
    font-weight: 700;
    color: #409eff;
  }
  .date {
    font-size: 14px;
    font-weight: 600;
    color: #555;
    .form-date {
      margin: 10px;
    }
  }
  .title {
    height: 60px;
    line-height: 60px;
    margin-left: 20px;
  }
}
</style>