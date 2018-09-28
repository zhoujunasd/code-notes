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
                :options="editorOption">
            </quill-editor>
            <div class="category">分类：</div>
            <el-button size='small' type='primary'>发布笔记</el-button>
        </div>
    </div>
</template>

<script>
import {quillEditor, Quill} from 'vue-quill-editor'
import {container, ImageExtend, QuillWatch} from 'quill-image-extend-module'

Quill.register('modules/ImageExtend', ImageExtend)

export default {
  components: { quillEditor },
  data() {
    return {
        formData:{
            title:"",
            content: "",
        },
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
  }
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
    padding: 20px 30px;
    .title{
        font-size: 20px;
        font-weight: 700;
        line-height: 1.5;
    }
    .category{
        color: #409eff;
        font-weight: 600;
        font-size: 16px;
        line-height: 2;
    }
}
</style>