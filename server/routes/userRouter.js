const router=require('express').Router()
const {ctrlRegister,ctrlLogin,updatePassword,sendPasswordLink,updatePasswordMail, genOtp}=require('../controllers/userCtrl')

router.post('/register',ctrlRegister)

router.post('/login',ctrlLogin)

router.put('/updatePassword/:userId',updatePassword)

router.post('/sendPasswordLink',sendPasswordLink)

router.put('/updatePasswordmail/:id',updatePasswordMail)

router.post('/genOtp',genOtp)

module.exports=router