const {Router} = require('express')
const router  = Router()
const userModel = require('../database/model/user')

router.post('/user',async (req,res,next) => {
    try{
        const {username, password, email} = req.body
        // 随机图片
        const avatarNumber = Math.ceil(Math.random()*9)
        const avatar = `http://pbl.yaojunrong.com/avatar${avatarNumber}.jpg` 
        // 判断
        const userData = await userModel.find({email})
        if(userData != ""){
            throw '邮箱已注册！'
        }else{
            if(password && password.length >= 5){
                // 插入数据
                const data = await userModel.create({username, password, email,avatar})
                res.json({
                    code:200,
                    msg:'注册成功！',
                    // data
                })
            }else{
                throw '密码长度不符合要求！'  
            }
        }
    }catch(err){
        res.json({
            code:400,
            msg:'参数出现错误！',
            err
        })
        // next(err)
    }
})

router.post('/login',async (req,res,next) => {
    try{
        const {email, password} = req.body
        const userData = await userModel.find({email})
        if(!userData){
            res.json({
                code:400,
                msg:'用户不存在！'
            })
        }else{
            if(password || password == userData.password){
                req.session.user = userData
                res.json({
                    code: 200,
                    msg: '登陆成功！',
                    // userData,
                    data: {
                        username: userData[0].username,
                        // nickname: userData.nickname,
                        email: userData[0].email,
                        des: userData[0].des,
                        avatar: userData[0].avatar,
                }
            })
            }else{
                throw '参数数错误！' 
            }
        }
    }catch(err){
        res.json({
            code: 400,
            err
        })
    }
})


router.delete('/loyout',(req,res) => {
    if(req.session.user) {
        req.session.user = null
        res.json({
            code:200,
            msg: "退出登录成功！"
        })
    }else{
        res.json({
            code:403,
            msg: "登录状态已失效！"
        })
    }
})
module.exports = router