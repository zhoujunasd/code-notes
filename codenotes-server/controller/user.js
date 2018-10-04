const {Router} = require('express')
const router  = Router()

// 导入mongoose定义的模型
const userModel = require('../database/model/user')

// 获取数据（get）
//  /user 获取全部用户的数据 /user/:id 获取单个用户的数据
// 提交一个数据到数据库（post请求）
// /user 直接在请求体中提交
// 修改数据
// （put请求）/user/:id 部分修改数据
// （patch请求）/user/:id 全部替换掉数据
// 删除数据（delete）
// /user/:id  删除指定用户

// async，await异步从数据库中读取数据，异步读取数据时，
// 需要使用try{ }catch(err){ throw err }来抓取错误信息，因为异步操作不会自动抛出错误信息

// 用户注册
router.post('/user',async (req,res,next) => {
    try{
        // 从req.body中获取传递的数据
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

// 用户登录
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
                        // 当读取的数据不止一组时，会读取到一个数组信息，
                        // 因此在设计数据时，应将用户信息设置为唯一值
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

// 在服务端定义用户是否退出登录===============================================================================
// 退出登录，注销session
router.delete('/loyout',(req,res) => {
     // 注销session的两种方式，将session设置为null即可，或者使用 req.session.destroy()
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
    //  if(req.session.user){
    //     req.session.destroy(err =>{
    //         if(err) throw err 
    //         else{
    //             res.json({
    //                 code:200,
    //                 msg: "退出登录成功！"
    //             })
    //         }
    //     })
    // }else{
    //     res.json({
    //         code:403,
    //         msg: "登录状态已失效！"
    //     })
    // }
})
module.exports = router