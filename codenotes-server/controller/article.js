const {Router} = require('express')
const router  = Router()
const articleModel = require('../database/model/article')
const categoryModel = require('../database/model/category')
const userModel = require('../database/model/user')

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

router.get('/article',(req,res) => {
    let {pn=1,size=5} = req.body
    pn = parseInt(pn)
    size = parseInt(size)
    articleModel
        .find()
        .limit(size)
        .skip((pn-1)*size)
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

router.get('/article/:id',(req,res) => {
    const {id} = req.params
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