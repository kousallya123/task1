const router=require('express').Router()
const {ctrlRegister,ctrlLogin,updatePassword,sendPasswordLink,updatePasswordMail, genOtp, confirmOtp}=require('../controllers/userCtrl')


// CREDENTIALS 

router.post('/register',ctrlRegister)

router.post('/login',ctrlLogin)


// RESET PASSWORD 

router.put('/updatePassword/:userId',updatePassword)

router.post('/sendPasswordLink',sendPasswordLink)

router.put('/updatePasswordmail/:id',updatePasswordMail)

// GENERATE OTP

router.post('/genOtp',genOtp)

router.post('/confirmOtp',confirmOtp)


module.exports=router