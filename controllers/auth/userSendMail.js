const sha1 = require('sha1');
const jwt = require('jsonwebtoken')
const { sendMail } = require("../functions/sendMail");
const { userModel } = require("../../models/userModel")


const userSendMail = async(req, res, next) => {
    const { token } = req.body;

    //Check email exist in database
    const userData = await userModel.where("token").equals(token).limit(1) // ? | Any Item you Want

    if(userData.length){
        const to = userData[0].email;
        if (sendMail(to, token)) {
            res.status(200).json({
                status: 200,
                msg: 'Sent Verification Email'
            })
            console.log("Verification Email Send , Check Your Email/Spam")
        } else {
            res.status(404).json({
                status: 404,
                msg: 'An Error Accourd When Sending Verification Email'
            })
        }
    } else {
        res.status(404).json({
            status: 404,
            msg: 'Not Found'
        })
    }
}


module.exports = { userSendMail }