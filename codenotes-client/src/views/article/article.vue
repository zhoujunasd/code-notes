<template>
    <div class="article">
        <div class="author-msg" v-if="content.author">
            <div class="img-wrap fll">
                <img :src="content.author.avatar">
            </div>
            <div class="author-details">
                <div class="author-name">{{content.author.username}}</div>
            </div>
            <div class="date">
                <span class="form-date">{{content.updated}}</span>
                <span >阅读：{{content.lookunms}}</span>
            </div>
        </div>
        <div class="title">
            {{content.title}}
        </div>
        <div class="content-heml" v-html="content.content"></div>
    </div>
</template>

<script>
export default {
  data() { 
      return{
        content:{}
      }
   },
   methods:{
       getData(){
           console.log(this.$router.params)
           this.$axios.get(`/article/${this.$router.params.id}`).then(res => {
               this.content = res.data
               console.log(res)
           })
       }
   },
   created() {
       this.getData()
   },
};
</script>

<style scoped lang='scss'>
</style>