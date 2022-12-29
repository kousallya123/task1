const router=require('express').Router()
const {ctrlRegister,ctrlLogin,updatePassword}=require('../controllers/userCtrl')

router.post('/register',ctrlRegister)

router.post('/login',ctrlLogin)

router.put('/updatePassword/:userId',updatePassword)

module.exports=router