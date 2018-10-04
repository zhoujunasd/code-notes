const {Router} = require('express')
const router  = Router()
const articleModel = require('../database/model/article')
const categoryModel = require('../database/model/category')
const userModel = require('../database/model/user')

// 若只有数据查询操作，使用同步查询（articleModel.find().then()），若有数据判断以及其他操作，使用异步查询（async，await）

// 发表文章
router.post('/article',async (req,res,next) => {
    try{
        if(req.session.user){
            const {title,content,contentText,category} = req.body
            console.log(req.session)
            const data = await articleModel.create({
                title,
                content,
                contentText,
                category,
                // 从session中获取数据
                author: req.session.user[0]._id
            })
            res.json({
                code: 200,
                msg: '文章发布成功!',
                data
            })
        }else{
            res.json({
                code:400,
                msg:'未登录状态不可发表文章！'
            })
        }
    }catch(err){
        res.json({
            code:400,
            msg: err
        })
    }
})

// 获取全部文章
router.get('/article',(req,res) => {
    let {pn=1,size=5} = req.body
    pn = parseInt(pn)
    size = parseInt(size)
    articleModel
        .find()
        // 设置数据的顺序,只有-1以及1两个数据,-1：倒序 1：正序，
        .sort({_id:-1})
        // 通过limit以及skip设置分页功能
        // limit限制数据条数
        .limit(size)
        // 跳过数据条数
        .skip((pn-1)*size)
        // 关联数据查询,
        // 设置关联数据时，需要将所关联的数据库导入，const userModel = require('../database/model/user')
        .populate({
            path: 'author',
            // 设置不显示数据
            select: '-password -email', 
        })
        // 
        .populate({
            path: 'category',
        }).then(data => {
            res.json({
                code:200,
                data
            })
        })
})

// 获取单篇文章内容
router.get('/article/:id',(req,res) => {
    const {id} = req.params
    // 直接通过id来查询数据，
    articleModel.findById(id)
    .populate({
        path: 'author',
        select: '-password -email',  
    })
    .populate({
        path: 'category',
    }).then(data => {
        res.json({
            code:200,
            data
        })
    })
})
module.exports = router