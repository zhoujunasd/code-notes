const mongoose = require('mongoose')

// 分类集合
const category = new mongoose.Schema({
    name: {
        type: String,
        unique: true //设置唯一值
    }
}, {versionKey: false})

module.exports = mongoose.model("category", category) 