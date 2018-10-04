const {Router} = require('express')
const router  = Router()
const categoryModel = require('../database/model/category')

// 获取全部分类
router.get('/category',(req,res) => {
    categoryModel.find().then(data => {
        res.json({
            code:200,
            data
        })
    })
})

// 获取单个分类 
router.get('/category/:id',(req,res) => {
    // 从req.parsms(动态路由)获取传递的数据，
    let id = req.params
    
    categoryModel.findById(id).then(data => {
        res.json({
            code:200,
            data
        })
    })
})

// 添加分类
router.post('/category',async (req,res,next) => {
    try{
        const {name} = req.body
        const data = await categoryModel.find({name})
        if(data != ''){
            throw `分类已存在！`
        }else{
            const data = await categoryModel.create({name})
            res.json({
                code:200,
                msg:'分类创建成功！',
                // data
            })
        }
    }catch(err){
        res.json({
            code:400,
            msg:err
        })
    }
} )

module.exports = router