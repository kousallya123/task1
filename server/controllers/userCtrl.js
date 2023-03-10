const Users = require('../models/userSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const otp = require('../config/otp')
const client = require('twilio')(otp.accountSID, otp.authToken)


// NODEMAILER INIT

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "deltadelta9595@gmail.com",
    pass: "cfzvwlesenvqltlw",
  },
})

// REGISTER 

const ctrlRegister = async (req, res) => {
  try {
    const { username, email, password, phone } = req.body

    let newUserName = username.toLowerCase()

    const user_name = await Users.findOne({ username: newUserName })

    if (user_name) return res.json({ message: 'This usrename is already is already exists' })

    const user_email = await Users.findOne({ email })

    if (user_email) return res.json({ message: 'This email is already is already exists' })

    if (password.length < 6) return res.json({ message: 'Password must be atleast 6 characters' })

    const passwordHash = await bcrypt.hash(password, 10)

    const newUser = new Users({
      username: newUserName, email, password: passwordHash, phone: phone
    })

    const user = newUser.save()

    res.json({ message: "User is registerd", user: user, token: generateToken(user._id) })

  } catch (error) {
    return res.json({ message: error.message })
  }
}

// LOGIN

const ctrlLogin = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await Users.findOne({ email })

    if (!user) return res.json({ message: 'Could not find the user' })

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) return res.json({ message: "Password is incorrect" })

    res.json({ message: "Login success", user: user, token: generateToken(user._id) })

  } catch (error) {
    return res.json({ message: error.message })
  }
}

// RESET PASSWORD

const updatePassword = async (req, res) => {
  const { password, oldPassword } = req.body
  const user = await Users.findOne({ _id: req.params.userId })
  const old = await bcrypt.compare(oldPassword, user.password)
  if (old) {
    try {
      const salt = await bcrypt.genSalt(10)
      const newpassword = await bcrypt.hash(password, salt)
      const user = await Users.updateOne({ _id: req.params.userId }, {
        $set: { password: newpassword },
      })
      const updatedUser = await Users.findById(req.params.userId)
      return res.json(updatedUser)
    } catch (error) {
      return res.json(error)
    }

  } else {
    res.json({ error: "Something went wrong!!!" })
  }
}


const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',

  })
}


// RESET PASSWORD LINK

const sendPasswordLink = async (req, res) => {
  const { email } = req.body
  if (!email) {
    res.json('Enter your Email')
  }
  try {
    const user = await Users.findOne({ email: email })
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "120s"
    })
    const usertoken = await Users.findByIdAndUpdate({ _id: user._id }, { token: token }, { new: true })
    if (usertoken) {
      const mailOptions = {
        from: "deltadelta9595@gmail.com",
        to: email,
        subject: "Sending a email for password reset",
        text: `Click this link to reset your password http://localhost:3000/reset/${user._id}/${token}`
      }
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          res.json('email not sended properly')
        } else {
          console.log('email send', info.response);
          res.json('Email send successfully')

        }
      })
    }

  } catch (error) {
    res.json(error)
  }

}

// UPDATE PASSWORD

const updatePasswordMail = async (req, res) => {
  const { password, token } = req.body
  let tok = await Users.findOne({ token: token })
  if (tok) {
    try {
      const salt = await bcrypt.genSalt(10)
      const newpassword = await bcrypt.hash(password, salt)
      const user = await Users.updateOne({ _id: req.params.id }, {
        $set: { password: newpassword },
      })
      const updatedUser = await Users.findById(req.params.id)
      res.json(updatedUser)
    } catch (error) {
      return res.json(error)
    }

  } else {
    res.json({ error: "Something went wrong!!!" })
  }


}

// OTP GENERATION

const genOtp = async (req, res) => {

  const { phone } = req.body

  const Check = await Users.findOne({ phone: phone })
  if (Check) {

    client.verify
      .services(otp.serviceID)
      .verifications.create({
        to: `+91${phone}`,
        channel: "sms",
      })
      .then((resp) => {
        res.status(200).json(resp);
      });
  }
  else {
    res.json("enter valid Mobile Number")
  }



}

// VERFIY OTP

const confirmOtp = async (req, res) => {
  const { Otp, phone } = req.body

  const Check = await Users.findOne({ phone: phone })

  client.verify
    .services(otp.serviceID)
    .verificationChecks.create({
      to: `+91${phone}`,
      code: Otp,
    })
    .then((resp) => {
      console.log("otp res", resp);
      if (resp.valid) {
        res.json({ resp, message: "Welcome", user: Check });
      }
      res.json({ resp, message: "Expire Otp" });
    });
}



module.exports = { ctrlRegister, ctrlLogin, updatePassword, sendPasswordLink, updatePasswordMail, genOtp, confirmOtp}    