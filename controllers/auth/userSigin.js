const sha1 = require('sha1');
const jwt = require('jsonwebtoken')
const { userModel } = require("../../models/userModel")


const userSign = async(req, res, next) => {
    const { email, password } = req.body
    const hashedPassword = sha1(password)
    const userData = await userModel.where("email").equals(email).where("password").equals(hashedPassword).where("active").equals(true).limit(1) // ? | Any Item you Want
    if (userData.length) {
        console.log(userData[0]);
        let data = {
            first_name: userData[0].first_name,
            last_name: userData[0].last_name,
            email: userData[0].email
        };
        console.log(data);
        let token = 'Bearer' + jwt.sign(data, 'AZQ,PI)0(', { expiresIn: '1h' })
        res.status(200).json({
            message: 'Login Successful!',
            token: token,
            userData: userData
        })
    } else {
        res.status(404).json({ staus: 404, msg: "User not Found" })
    }

}


module.exports = { userSign }