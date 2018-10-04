// 引入express中间件的路由方法
var express = require('express');
var router = express.Router();

// 引入路由文件
const user = require('../controller/user')
const article = require('../controller/article')
const category = require('../controller/category')
const upload = require('../controller/upload')

// 将路由文件挂载到router上
router.use(user)
router.use(article)
router.use(category)
router.use(upload)

module.exports = router;
