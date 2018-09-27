<template>
    <div>
       <div class="w1170 top-box">
           <div class="left-box">
               <h2>img</h2>
           </div>
            <userbox></userbox>
       </div>
    </div>
</template>

<script>
import userbox from '@/components/userBox.vue'

    export default {
        components:{
            userbox
        },
        data(){
            return{
                userData:{
                    username: "",
                    password: "",
                }
            }
        },
        methods:{
            getData(){
                console.log(process.env.NODE_ENV);
                let basePath = process.env.NODE_ENV == 'development' ? '/api' : ''

                // this.$axios.get('/test').then(res =>{
                //     console.log(res)
                // })
            }
        },
        created() {
            this.getData()
        },
    }
</script>

<style scoped lang='scss'>
.top-box{
    .left-box{
        width: 750px;
    }
    margin-top: 50px;
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
}
</style>