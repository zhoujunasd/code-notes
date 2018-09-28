<template>
    <div>
        <Header></Header>
        <div class="w1170 content">
            <router-view/>
        </div>
    </div>
</template>

<script>
import Header from '@/components/Header.vue'

    export default {
        components:{
            Header,
        },
        // data(){
        //     return{
        //         userData:{
        //             username: "",
        //             password: "",
        //         }
        //     }
        // },
        // methods:{
        //     getData(){
        //         console.log(process.env.NODE_ENV);
        //         let basePath = process.env.NODE_ENV == 'development' ? '/api' : ''

        //         // this.$axios.get('/test').then(res =>{
        //         //     console.log(res)
        //         // })
        //     }
        // },
        // created() {
        //     this.getData()
        // },
    }
</script>

<style scoped lang='scss'>
.content{
    margin-top: 50px;
}
</style>