const {Router} = require('express')
const router = Router()
const db = require('../database/model/user')
var validator = require('validator');

router.post('/register',(req,res) => {
    let{username, email, password, avatar, nickname, des} = req.body
    db.findOne({$or:[{email},{username}]}).then(data => {
        // validator.isEmail
        // res.json({
        //     code:200,
        //     data
        // })
        if(data){
           res.json({
               code: 401,
               msg: '用户名或邮箱已注册！'
           })
        }else if(validator.isEmail(email)){
            db.create({username, email, password, avatar, nickname, des}).then(data => {
                // console.log(data)
                res.json({
                    code: 200,
                    // data,
                    msg: '注册成功'
                })
            })
        }else{
            res.json({
                code:401,
                msg: '邮箱格式不正确！'
            })
        }
    })
})

module.exports = router