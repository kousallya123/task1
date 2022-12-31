const Users = require('../models/userSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer=require('nodemailer')
const otp = require('../config/otp')
const client=require('twilio')(otp.accountSID,otp.authToken)


const transporter=nodemailer.createTransport({
  service:"gmail",
  auth: {
    user: "deltadelta9595@gmail.com",
    pass: "cfzvwlesenvqltlw",
  },
})



const ctrlRegister = async (req, res) => {
  console.log(req.body);
    try {
        const { username, email, password,phone } = req.body

        let newUserName = username.toLowerCase()

        const user_name = await Users.findOne({ username: newUserName })

        if (user_name) return res.json({ message: 'This usrename is already is already exists' })

        const user_email = await Users.findOne({ email })

        if (user_email) return res.json({ message: 'This email is already is already exists' })

        if (password.length < 6) return res.json({ message: 'Password must be atleast 6 characters' })

        const passwordHash = await bcrypt.hash(password, 10)

        const newUser = new Users({
            username:newUserName, email, password: passwordHash,phone:phone
        })

        const user=newUser.save()

        res.json({message:"User is registerd",user:user,token:generateToken(user._id)})

    } catch (error) {
        return res.json({ message: error.message })
    }
}

const ctrlLogin = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await Users.findOne({email})

        if (!user) return res.json({ message: 'Could not find the user' })

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) return res.json({ message: "Password is incorrect" })

        res.json({message:"Login success",user:user,token:generateToken(user._id)})

    } catch (error) {
        return res.json({ message: error.message })
    }
}

 const updatePassword=async(req,res)=>{
    console.log('reached hereeeeeeeeee');
    console.log(req.body);
    const {password,oldPassword}=req.body
    const user =  await Users.findOne({_id:req.params.userId})
    console.log(user);
    const old=await bcrypt.compare(oldPassword,user.password)
    if(old){
      try {
        const salt=await bcrypt.genSalt(10)
        const newpassword=await bcrypt.hash(password,salt)
        const user=await Users.updateOne({_id:req.params.userId},{
          $set:{password:newpassword},
      })
       const updatedUser=await Users.findById(req.params.userId)
       return res.json(updatedUser)
       } catch (error) {
        return res.json(error)
       }
  
    }else{
      res.json({error:"Something went wrong!!!"})
    }
  }
  

  const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'30d',

    })
  }


  const sendPasswordLink=async(req,res)=>{
    console.log('kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk');
    console.log(req.body);
    const {email}=req.body
    if(!email){
      console.log('mail nbjhj');
      res.json('Enter your Email')
    }
    try {
      console.log('llllllllllllllllllllllllllll');
      const user=await Users.findOne({email:email})
      console.log(user,'llllllllllllll');
      const token=jwt.sign({_id:user._id}, process.env.JWT_SECRET,{
        expiresIn:"120s"
      })
      console.log(token);
      const usertoken=await Users.findByIdAndUpdate({_id:user._id},{token:token},{new:true})
      console.log(usertoken);
      if(usertoken){
          const mailOptions={
          from:"deltadelta9595@gmail.com",
          to:email,
          subject:"Sending a email for password reset",
          text:`Click this link to reset your password http://localhost:3000/reset/${user._id}/${token}`
        }
        transporter.sendMail(mailOptions,(error,info)=>{
          if(error){
            console.log(error);
            res.json('email not sended properly')
          }else{
            console.log('email send',info.response);
            res.json('Email send successfully')
  
          }
        })
      }
      
    } catch (error) {
      res.json(error)
    }
   
  }

  const updatePasswordMail=async(req,res)=>{
    console.log('hellooooooooooooooo');
    console.log(req.body);
    const {password,token}=req.body
    let tok= await Users.findOne({token:token})
    console.log(tok);
    if(tok){
      try {
        const salt=await bcrypt.genSalt(10)
        const newpassword=await bcrypt.hash(password,salt)
        const user=await Users.updateOne({_id:req.params.id},{
          $set:{password:newpassword},
      })
      const updatedUser=await Users.findById(req.params.id)
      res.json(updatedUser)
       } catch (error) {
        return res.json(error)
       }
  
    }else{
      res.json({error:"Something went wrong!!!"})
    }
   
   
  }
  

  const genOtp=async(req,res)=>{

    console.log(req.body);

    const {phone} = req.body

    const Check=await Users.findOne({phone:phone})
    if(Check){

      console.log("raeched");
      // client.verify
      // .services(otp.serviceID)
      // .verifications.create({
      //   to: `+91${req.body.number}`,
      //   channel: "sms",
      // })
      // .then((resp) => {
      //   console.log("response", resp);
      //   res.status(200).json(resp);
      // });
    }
    else{
      console.log("failed");
      res.json("enter valid Mobile Number")
    }
   


  }

module.exports = { ctrlRegister, ctrlLogin ,updatePassword,sendPasswordLink,updatePasswordMail,genOtp}    