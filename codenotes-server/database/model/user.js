const mongoose = require('mongoose')

// 用户集合
const user  = new mongoose.Schema({
    username:String,
    nickname:String,
    email:{
        type:String,
        unique:true  //属性设置为唯一值
    },
    password:String,
    des:String,
    avatar:{
        type:String,
        // default: "../../public/images/404.jpg" //设置默认值
        default: "/images/404.jpg" //设置默认值
    }
},{versionKey:false})

module.exports = mongoose.model('user',user)