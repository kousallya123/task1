const Users = require('../models/userSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const ctrlRegister = async (req, res) => {
    try {
        const { username, email, password } = req.body

        let newUserName = username.toLowerCase()

        const user_name = await Users.findOne({ username: newUserName })

        if (user_name) return res.json({ message: 'This usrename is already is already exists' })

        const user_email = await Users.findOne({ email })

        if (user_email) return res.json({ message: 'This email is already is already exists' })

        if (password.length < 6) return res.json({ message: 'Password must be atleast 6 characters' })

        const passwordHash = await bcrypt.hash(password, 10)

        const newUser = new Users({
            username:newUserName, email, password: passwordHash
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


module.exports = { ctrlRegister, ctrlLogin ,updatePassword}    