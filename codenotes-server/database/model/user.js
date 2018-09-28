const mongoose = require('mongoose')

// 用户集合
const user  = new mongoose.Schema({
    username:String,
    nickname:String,
    email:{
        type:String,
        required:true, //属性 必须
        unique:true  //属性设置为唯一值
    },
    password:String,
    des:String,
    avatar:{
        type:String,
        // default: "/images/404.jpg" //设置默认值
    }
},{versionKey:false,timestamps:{createdAt:"create_time",updatedAt:"update_time"}})

module.exports = mongoose.model('user',user)