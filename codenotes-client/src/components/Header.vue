<template>
    <div class="content">
        <div class="left">
            <h2>云笔记</h2>
        </div>
        <div class="w980 conten" >
            <el-input></el-input>
            <el-button size="medium"></el-button>
        </div>
        <div class="right">
            <el-button size="medium">写笔记</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped lang='scss'>
.content{
    height: 50px;
    background: #409eff;
    display: flex;
    justify-content: space-around;

    .conten{
        display: none;
        line-height: 50px;
    }

    .left{
        height: 50px;
        line-height: 50px;
        color: #fff;
        font-size: 24px;
    }

    .right{
        line-height: 50px;
    }
}
</style>