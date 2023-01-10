const router=require('express').Router()
const {ctrlRegister,ctrlLogin,updatePassword,sendPasswordLink,updatePasswordMail, genOtp, confirmOtp}=require('../controllers/userCtrl')
// const stripe = require("stripe")(process.env.STRIPE_KEY);
const KEY = process.env.STRIPE_KEY
const stripe = require("stripe")(KEY);

router.post("/payment", (req, res) => {
  console.log(req.body,'kkkkkkkkkkkkkk');
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "INR",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        console.log(stripeErr,'stripeErr');
        res.status(500).json(stripeErr);
      } else {
        console.log(stripeRes,'stripeRes');
        res.status(200).json(stripeRes);
      }
    }
  );
});



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