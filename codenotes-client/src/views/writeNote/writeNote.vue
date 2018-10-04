<template>
  <div class="write-note">
    <div class="main-content w1170">
      <div class="title">标题：</div>
      <div class="input-wrap">
        <el-input v-model="formData.title" placeholder="标题"></el-input>
      </div>
      <div class="title">内容：</div>
      <quill-editor v-model="formData.content" ref="myQuillEditor" :options="editorOption" @change="handlechange">
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
// import Quill from 'quill';
import { quillEditor, Quill } from "vue-quill-editor";
import { container, ImageExtend, QuillWatch } from "quill-image-extend-module";
// import {ImageResize} from 'quill-image-resize-module'

Quill.register("modules/ImageExtend", ImageExtend);
// Quill.register('modules/ImageResize', ImageResize)

import { mapState } from "vuex";
export default {
  components: { quillEditor },
  data() {
    return {
      formData: {
        title: "",
        content: "",
        contentText: "",
        category: ""
      },
      categories: [],
      token: "",
      // 富文本框参数设置
      editorOption: {
        modules: {
          // ImageResize:{
          //     toolbarStyles: {
          //         backgroundColor: 'black',
          //         border: 'none',
          //         color: white
          //     },
          // },
          ImageExtend: {
            loading: true,
            name: "file",
            size: 2,
            action: "https://upload-z1.qiniup.com",
            headers: xhr => {},
            change: (xhr, formData) => {
              const headers = { "Content-Type": "multipart/form-data" };
              xhr.setRequestHeader("headers", headers);
              formData.append("token", this.token);
            },
            response: res => {
              // console.log(res)
              return res.url;
              //   if(res.code == 401){
              //     alert('上传的图片格式不符合要求')
              //     return
              //   }
              //   console.log(res)
              //   return res.data.path
              // },
              // sizeError (err) {
              //   alert('图片大小超出限制')
              // }
            }
          },
          toolbar: {
            container: container, //头部设置样式条的内容
            // container: [
            //       [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            //       ['bold', 'italic', 'underline', 'strike'],
            //       ['image'],
            //       [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            //       [{ 'font': [] }],
            //       [{ 'align': [] }],
            //       [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            //       [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
            //       [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
            //       [{ 'direction': 'rtl' }],
            //     ],
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
  methods: {
    getToken() {
      this.$axios.get("/getToken").then(res => {
        this.token = res.token;
      });
    },
    subArticle() {
      this.$axios.post("/article", this.formData).then(res => {
        //   console.log(res)
        if (res.code == 200) {
          this.$message.success({
            message: res.msg,
            duration: 1500,
            center: true
          });
          setTimeout(() => {
            this.$router.push("/index");
          }, 500);
        } else if (res.code == 403) {
          let userInfo = {
            avatar: "",
            email: "",
            username: ""
          };
          this.$message.info({
            message: res.msg,
            duration: 1500,
            center: true
          });
          this.$store.commit("CHANGE_INFO", userInfo);
          this.$store.commit("CHANGE_ARTICLE", formData);
          setTimeout(() => {
            this.$router.push("/index");
          }, 500);
        }
      });
    },
    handlechange({ quill, html, text }) {
      // console.log(html)
      this.formData.contentText = text;
      this.formData.contentText =
        this.formData.contentText.substring(0, 200) + "...";
    },
    getcategories() {
      this.$axios.get("/category").then(res => {
        this.categories = res.data;
      });
    }
  },
  computed: {
    ...mapState(["ArticleData"])
  },
  watch: {
    ArticleData(val) {
      this.formData = val;
    }
  },
  created() {
    this.getToken();
    this.getcategories();
  }
};
</script>

<style lang='scss'>
.ql-container {
  min-height: 280px;
  /deep/ img {
    vertical-align: top;
    border: none;
    max-width: 240px;
    max-height: 180px;
    min-width: 120px;
    min-height: 90px;
  }
}
/* .write-container .el-checkbox-button__inner,
  .write-container .el-checkbox-button:first-child .el-checkbox-button__inner,
  .write-container .el-checkbox-button:last-child .el-checkbox-button__inner
  {
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    margin-right: 20px;
  } */
</style>
<style scoped lang='scss'>
.main-content {
  background: #fff;
  border-radius: 6px;
  padding: 10px 30px 20px;

  .title {
    font-size: 20px;
    font-weight: 700;
    line-height: 1.5;
  }

  .category {
    color: #409eff;
    font-weight: 600;
    font-size: 16px;
    line-height: 2.5;
    display: flex;
    /deep/ .el-radio-group {
      display: flex;
      margin: auto 0;

      /deep/.el-radio {
        margin-left: 5px;
      }
    }
  }
}
</style>