const mongoose = require('mongoose')

// 插入数据库内的数据，不需先在模型内定义
// 用户集合
const user  = new mongoose.Schema({
    // 定义数据的格式以及属性
    username:String,
    // nickname:String,
    email:{
        type:String,
        required:true, //属性，必须
        unique:true  //属性设置为唯一值
        // default：默认值
        // min:数据类型为Number的限制，最小值，max最大值
        // index：true/false是否设置索引
        // match: /[a-z]/：正则表达式
    },
    password:String,
    des:String,//个人描述
    avatar:{ 
        type:String,
        // default: "/images/404.jpg" //设置默认值
    }
},{versionKey:false,timestamps:{createdAt:"create_time",updatedAt:"update_time"}})
// timestamps：给数据自动加上时间戳

// mongoose.model('user(数据库名称，在数据库内会自动转换为复数)',user(定义的模型的名字)))
module.exports = mongoose.model('user',user)