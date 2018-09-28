<template>
        <div class="user-box flr" >
            <!-- status-icon是否显示验证通过图标 -->
            <el-form class="form" ref="formData" :model="formData" :rules="rule">
                <el-form-item prop="email">
                    <el-input class="input" v-model="formData.email" placeholder="邮箱" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input class="input" v-model="formData.password" type="password" placeholder="密码" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item >
                    <el-button type="primary" @click="submitForm('formData')">登陆</el-button>
                    <el-button @click="$router.push('/register')">注册</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!-- <div >
            @success="upload_img" upload_img(url){this.avatar=url} v-model绑定的数据，在组件内监听input事件，即可
            <imgupload v-model="avatar"></imgupload>
        </div> -->
</template>

<script>
import imgupload from '@/components/ImgUpload'

export default {
    components:{
        imgupload,
    },
    data(){
        var va_email = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入邮箱!'));
            } else {
                callback();
            }
        };
        var va_pass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码!'));
            } else {
                callback();
            }
        };
        return{
            formData:{
                email: "",
                password: "",
            },
            avatar: "",
            checkbox: "",
            rule:{
                email:[
                    { validator: va_email, trigger: 'blur'},
                    { type: 'email', message: '请输入正确的邮箱地址！', trigger: ['blur', 'change'] }],
                password:[
                    { validator: va_pass,trigger: 'blur'},
                    { pattern:/^[a-zA-Z0-9]{3,10}$/, message: '请输入正确格式！',trigger: ['blur', 'change']}],
            }
        }
    },
    methods:{
        submitForm(ruleform) {
          this.$refs[ruleform].validate((valid) => {
            if (valid) {
            //   try{
            //       this.userLogin()
            //   }catch(e){ }
                this.$axios.post('/login',this.formData).then(res => {
                    console.log(res.data)
                    if(res.data.code == 200){
                        this.$store.commit('CHANGE_INFO',res.data.data)
                        this.$message.success({
                            message: res.data.msg,
                            center: true
                        })
                        // this.$router.push('')
                    }
                })
            } else {
              this.$message.error({
                  message: '数据填写错误！',
                  center: true
              })
              return false;
            }
        });
      },

    //   userLogin(){
    //       this.$axios.post('login',this.formData).then(res => {
    //           console.log(res)
    //       })
    //   },
    }
};
</script>

<style scoped lang="scss">
.user-box {
  width: 360px;
  height: 340px;
  padding: 20px 30px;
  border-radius: 6px;
  background-color: #fff;
  box-sizing: border-box;//将盒子的大小限制为360*340，加上padding后会自动换算padding的大小
  .form{
      margin-top: 20px;
      width: 300px;
      height: 250px;
  }

  .input{
    //   outline: none; //去掉input输入框聚焦时的蓝边
  }

    //深度选择器，修改样式   
  /deep/ .el-button{
    width: 100%;
    margin: 10px 0;
  }
}
</style>