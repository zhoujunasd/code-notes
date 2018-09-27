const mongoose = require('mongoose')

// 文章内容集合
const article = new mongoose.Schema({
    author: String,
    title: {
        type: String,
        index: 1, // 给title字段，添加升序的索引
         // alias:"titles" //给title字段设置别名
    }, 
    content: String,
    contentText: String,
    looknums: {
        type: Number,
        default: 0
    },
    commontnums: {
        type:Number,
        default: 0
    },
    tags: Array,
    authorMsg: {
        // 关联user集合中的数据
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
},{versionKey:false,timestamps: {createdAt: "created",updatedAt: "updated"}})
// versionKey:false去掉mongoose中的默认设置的_v:0版本控制字段
// timestamps:给数据添加内置时间戳记录,created,updated记录时间的字段名
// 添加索引方式二：article.index({ author: 1, title: -1 }); author字段升序索引，title字段降序索引

module.exports = mongoose.model("article",article)