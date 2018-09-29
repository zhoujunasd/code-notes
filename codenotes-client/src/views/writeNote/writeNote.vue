<template>
    <div class="write-note">
        <div class="main-content w1170">
            <div class="title">标题：</div>
            <div class="input-wrap">
                <el-input v-model="formData.title" placeholder="标题"></el-input>
            </div>
            <div class="title">内容：</div>
            <quill-editor 
                v-model="formData.content" 
                ref="myQuillEditor" 
                :options="editorOption"
                @change="handlechange">
            </quill-editor>
            <div class="category"><span>分类：</span>
                <el-radio-group v-model="formData.category">
                    <div v-for="(item,index) in categories" :key='index'>
                        <el-radio border size='mini' :label="item._id">{{item.name}}</el-radio>
                    </div>
                </el-radio-group>
            </div>
            <el-button size='small' @click="subArticle" type='primary'>发布笔记</el-button>
        </div>
    </div>
</template>

<script>
import {quillEditor, Quill} from 'vue-quill-editor'
import {container, ImageExtend, QuillWatch} from 'quill-image-extend-module'

Quill.register('modules/ImageExtend', ImageExtend)

import {mapState} from 'vuex'
export default {
  components: { quillEditor },
  data() {
    return {
        formData:{
            title:"",
            content: "",
            contentText:"",
            category:""
        },
        categories: [],
      // 富文本框参数设置
      editorOption: {
        modules: {
          ImageExtend: {
            loading: true,
            name: "img",
            action: 'https://qiniu.com',
            response: res => {
              return res.info;
            }
          },
          toolbar: {
            container: container,
            handlers: {
              image: function() {
                QuillWatch.emit(this.quill.id);
              }
            }
          }
        }
      }
    };
  },
  methods:{
      subArticle(){
          this.$axios.post('/article',this.formData).then(res => {
            //   console.log(res)
              if(res.code ==200){
                  this.$message.success({
                      message:res.msg,
                      duration:1500,
                      center: true
                  })
                  setTimeout(()=>{
                      this.$router.push('/index')
                  },500)
              }else if(res.code == 403){
                let userInfo = {
                    avatar: "",
                    email: "",
                    username: "",
                }
                  this.$message.info({
                      message:res.msg,
                      duration:1500,
                      center: true
                  })
                  this.$store.commit('CHANGE_INFO',userInfo)
                  this.$store.commit('CHANGE_ARTICLE',formData)
                  setTimeout(()=>{
                      this.$router.push('/index')
                  },500)
              }
          })
      },
      handlechange({quill,html,text}){
           this.formData.contentText = text
           this.formData.contentText = this.formData.contentText.substring(0,200)+'...'
      },
      getcategories(){
          this.$axios.get('/category').then(res => {
              this.categories = res.data
          })
      }
  },
  computed:{
    ...mapState(['ArticleData'])
  },
  watch:{
      ArticleData(val){
        this.formData = val
      }
  },
  created() {
      this.getcategories()
  },
};
</script>

<style>
.ql-container{
    min-height: 280px
}
</style>
<style scoped lang='scss'>
.main-content{
    background: #fff;
    border-radius: 6px;
    padding: 10px 30px 20px;

    .title{
        font-size: 20px;
        font-weight: 700;
        line-height: 1.5;
    }
    
    .category{
        color: #409eff;
        font-weight: 600;
        font-size: 16px;
        line-height: 2.5;
        display: flex;
        /deep/ .el-radio-group{
            display: flex;
            margin: auto 0;

            /deep/.el-radio{
                margin-left:5px
            }
        }
    }
}
</style>