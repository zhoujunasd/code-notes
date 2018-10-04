const mongoose = require('mongoose')

// 文章内容集合
const article = new mongoose.Schema({ 
    // author: String,
    title: {
        type: String,
        // 设置索引，降低相应数据的检索速度，但是会相应的降低整体的性能，个人理解，在需要多次按顺序查找的数据后添加索引
        // 索引在必要时再设置符合索引（！！！必要时，因为会降低性能）
        index: -1, // 二级索引，创建索引会对性能造成重大影响，给title字段，添加升序的索引
         // alias:"titles" //给title字段设置别名
        //  禁止索引的两种方式，一、设置禁止行为autoIndex的模式来的选项false
        autoIndex:false
        // 二、在全局定义 mongoose.connect('mongodb://localhost:port/database', { autoIndex: false });
        // 三、在模型上设置 new Schema({..}, { autoIndex: false });
    }, 
    content: String,
    contentText: String,//非富文本
    looknums: {
        type: Number,
        default: 0
    },
    commontnums: {
        type:Number,
        default: 0
    },
    tags: Array,
    author: {
        // 关联user集合中的数据
        // 在查询数据时，可以直接根据ObjectId，关联所查询到的数据
        type: mongoose.Schema.Types.ObjectId,
        // 关联的数据库
        ref: 'user'
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category"
    }
},{versionKey:false,timestamps: {createdAt: "created",updatedAt: "updated"},})
// versionKey:false去掉mongoose中的默认设置的_v:0版本控制字段
// timestamps:给数据添加内置时间戳记录,created,updated记录时间的字段名
// 添加索引方式二：article.index({ author: 1, title: -1 }); author字段升序索引，title字段降序索引

const Animal= mongoose.model("article",article)

// index当索引构建完成或发生错误时，Mongoose将在模型上发出事件。
Animal.on('index', function(error) {
    // "_id index cannot be sparse"
    console.log(error.message);
});

module.exports = Animal