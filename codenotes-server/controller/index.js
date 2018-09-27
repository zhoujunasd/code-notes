const {Router} = require('express')
const router  = Router()
const path = require('path')

const login  = require('./login')
const register  =require('./register')
const upload = require('./upload')

router.get('/',(req,res) => {
    res.send('ok')
})

router.use(login)
router.use(register)
router.use(upload)

module.exports = router;