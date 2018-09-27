const {Router} = require('express')
const router = Router()
const qiniu = require('qiniu')
const mime = require('mime')
const multer  = require('multer')

// 限制图片上传格式
const accept = [
    mime.getType('jpg'),
    mime.getType('png'),
    mime.getType('gif'),
    mime.getType('webp'),
]

// router.get('/upload')


// 七牛云存储设置，
var accessKey = 'hiaSMM1QqBT-0Q0KywiDrpp_tXbgBz8p1mFXkoil';
var secretKey = 'A4to1dxJHlKuQ_HuoKWhdf34-J3B_dYzt4eIT5tl';
var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
var options = {
    scope: "demo",
    returnBody:  '{"key": $(key), "hash": $(etag), "url": "http://pflqd1edg.bkt.clouddn.com/$(key)"}',
    expires: 3600,
    deadline: Math.round(new Date().getTime()/1000)+3600,
};
var putPolicy = new qiniu.rs.PutPolicy(options);
var uploadToken=putPolicy.uploadToken(mac);

router.get('/getToken',(req,res) => {
    res.json({
        code:200,
        token:uploadToken
    })
})

module.exports = router
