const router=require('express').Router()
const {ctrlLogin,listUsers}=require('../controllers/adminCtrl')
const check= require('../middleware/auth')

router.post('/login',ctrlLogin)

router.get('/users',check,listUsers)

module.exports=router