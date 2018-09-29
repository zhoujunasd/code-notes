<template>
    <div class="register">
        <div class="register-title">新用户注册</div>
        <div class="input-wrap">
            <el-input type="text" placeholder="用户名" v-model="formData.username"></el-input>
        </div>
        <div class="input-wrap">
            <el-input type="text" placeholder="邮箱" v-model="formData.email"></el-input>
        </div>
        <div class="input-wrap">
            <el-input  type="password" placeholder="密码" v-model="formData.password"></el-input>
        </div>
        <div class="button-wrap">
            <el-button size='' type="primary" @click="register">注册</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                formData:{
                    username:"",
                    email:"",
                    password:"",
                }
            }
        },
        methods:{
            async register(){
                try{
                    const res = await this.$axios.post('/user',this.formData)
                    if(res.code ==200){
                        this.$message.success({
                            message: res.msg,
                            center: true,
                            duration: 1000                     
                        })
                        setTimeout(()=>{
                            this.$router.push('index')
                        },500)
                    }else{
                        this.$message.error({
                            message: res.msg,
                            center: true,
                        })
                    }
                }catch(err){

                }
                
            }
        }
    }
</script>

<style scoped lang='scss'>
.register{
    width: 600px;
    margin: 0 auto;
    padding: 40px;
    background-color: #fff;
    border-radius: 6px;

    .register-title{
        color: #333;
        text-align: center;
        font-size: 24px;
        font-weight: 600;
    }
    .input-wrap{
        width: 360px;
        margin: 30px auto;
    }
    .button-wrap{
        width: 360px;
        margin: 0 auto;
        /deep/ .el-button {
            width: 100%;
        }
    }
}
</style>