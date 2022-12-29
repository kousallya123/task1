const userSchema = require("../models/userSchema")
const jwt = require('jsonwebtoken')

const ctrlLogin = (req, res) => {
    try {

        const { ADMIN_EMAIL, ADMIN_PWD } = process.env
        const { email, password } = req.body
        if (email === ADMIN_EMAIL) {
            if (password === ADMIN_PWD) {
                const id='12345678'
                res.json({admin:true,auth:true,token:generateToken(id)})
            } else {
                res.json('Incorrect Password')
            }
        } else {
            res.json('Incorrect email id')
        }

    } catch (error) {
        res.json(error)
    }
}

const listUsers = async (req, res) => {
    try {
        const users = await userSchema.find()
        res.json(users)

    } catch (error) {
        res.json(error)
    }

}

const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'30d',
    })

  }


module.exports = { ctrlLogin, listUsers }