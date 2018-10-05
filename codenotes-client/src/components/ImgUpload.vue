<template>
    <div>
        <label class="upload-wrap">
            <div v-show="!imgUrl">
                <i class="el-icon-plus"></i>
                <input type="file" style="display: none" @change="upload">
            </div>
                <img :src="imgUrl" class="upload-img" v-show="imgUrl">
        </label>
            </div>
</template>

<script>
import axios from "axios";
export default {
  props: {
    value: {
      type: String
    }
  },
  data() {
    return {
      token: "",
      imgUrl: ""
    };
  },
  methods: {
    getToken() {
      this.$axios.get("/getToken").then(res => {
        this.token = res.token;
      });
      // axios.get('http://upload.yaojunrong.com/getToken').then(res => {
      //     console.log(res)
      //     this.token = res.data.data
      // })
    },
    upload(event) {
      let file = event.target.files[0];
      // event.target.files[0];图片文件的地址
      // 将file以及token存进formData内，传给服务器
      let formData = new FormData();
      formData.append("file", file, file.name);
      formData.append("token", this.token);
      axios
        .post("https://upload-z1.qiniup.com", formData, {
          // 在上传数据以及图片时，需要注意传递的头部格式设置
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
          // console.log(res)
          this.$emit("input", res.data.url);
        });
    }
  },
  watch: {
    value(val) {
      this.imgUrl = val;
    }
  },
  created() {
    this.getToken();
  }
};
</script>

<style scoped lang='scss'>
.upload-wrap {
  position: relative;
  display: block;
  width: 80px;
  height: 80px;
  border: 1px dashed #f1f1f1;
  border-radius: 5px;
  cursor: pointer;

  .el-icon-plus {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #aaa;
    font-size: 16px;
  }
  .upload-img {
    display: block;
    width: 100%;
    height: 100%;
  }
}
</style>