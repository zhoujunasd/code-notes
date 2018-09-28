const {Router} = require('express')
const router  = Router()
const userDB = require('../database/model/user')

router.post('/user',async (req,res) => {
    const{username, password, email} = req.body
    
})










// 获取数据（get）
//  /user 获取全部用户的数据 /user/:id 获取单个用户的数据
// 提交一个数据到数据库（post请求）
// /user 直接在请求体中提交
// 修改数据
// （put请求）/user/:id 部分修改数据
// （patch请求）/user/:id 全部替换掉数据
// 删除数据（delete）
// /user/:id  删除指定用户

// router.get('/test',(req,res) => {
//     userDB.find().then(data => {
//         res.json({
//             code:200,
//             data
//         })
//     })
// })

router.post('/login',(req,res) => {
    let {email,password} =req.body
    userDB.findOne({email}).then(data => {
        // console.log(data)

        // if(email ==" " && password == ""){
        //     res.json({
        //         code:200,
        //         msg: '用户名或密码不可为空！'
        //     })
        // }
        if(!data){
            res.json({
                code:401,
                msg:'用户不存在！'
            })
        }else if(data.password != password){
            res.json({
                code:401,
                msg:'密码不正确！'
            })
        }else{
            // 设置session
            req.session.user = data;
            // console.log("session:",req.session)
            let userMsg = {
                username:data.username,
                avatar:data.avatar,
                email:data.email,
            }
            res.json({
                code: 200,
                msg: '登陆成功！',
                data: userMsg
            })
        }
    })
})

router.delete('/logout',(req,res) => {
    // 清除session
    req.session.destroy((err) => {
        if(err){
            console.log(err)
        }else{
            // 清除cookie
            res.clearCookie('asd') 
            res.json({
                code: 200,
                msg: '退出登录！'
            })
        }
    })
})

module.exports = router