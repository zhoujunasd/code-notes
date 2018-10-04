// 引入mongoose，连接数据库并对其进行操作，MongoDB对象建模工具
const mongoose = require('mongoose')
// 链接本地数据库
mongoose.connect(
    // 数据库地址
    "mongodb://localhost:27017/note",
    { useNewUrlParser: true},
    {autoIndex: false}
)
const db = mongoose.connection;
// 链接数据库
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function() {
    console.log('success');
});
module.exports = db 