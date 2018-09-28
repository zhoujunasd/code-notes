<template>
    <div>
        <label class="chexk_com">
            <input type="checkbox" class="dis_no" v-model="currentValue" >
            <span class="box-warp"></span>
        </label>
    </div>
</template>

<script>
// import checkbox from '@/components/CheckBox'
// checkbox,
// <checkbox v-model="checkbox"></checkbox>
    export default {
        props: {
            value: {
                type: [String, Number,Boolean],
            }
        },
        data(){
            return{
                currentValue:"",
            }
        },
        watch:{
            currentValue(val){
                this.$emit('input',val)
                this.$emit('change',val)
            },
            value(){
                this.currentValue = this.value
            }
        }
    } 
</script>

<style scoped lang='scss'>
.chexk_com{
    width: 16px;
    height: 16px;
    display: inline-block;
    border: 1px solid #e8e8e8;
    border-radius: 4px;

    .box-warp{
        display: inline-block;
        position: relative;
        width: 100%;
        height: 100%;
        transform: scale(0)
    }

    .dis_no:checked + .box-warp{
        background-color: #409eff;
        transform: scale(1);
        transition: transform .2s ease;
    }


    .dis_no:checked + .box-warp::after{
        content: "";
        display: block;
        position: absolute;
        left: 50%;
        top: -10%;
        width: 0;
        height: 0;
        border-top: 4px solid transparent;
        border-right: 16px solid transparent;
        border-bottom: 3px solid #fff;
        border-left: 3px solid #fff;
        transform: rotate(-45deg) translate(-50%, -50%)
    }

    .dis_no{
        display: none;
    }
}
</style>