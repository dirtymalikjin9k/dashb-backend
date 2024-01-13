const sgMail = require('@sendgrid/mail');
const { userModel } = require("../../../models/userModel")
const { generateVerifyCode } = require('../../functions/generateVerifyCode');

const UserResendVerifyCode = async(req, res, next) => {
    const { token } = req.body;

    //Check email exist in database
    const userData = await userModel.where("token").equals(token).limit(1) // ? | Any Item you Want

    if(userData.length){
        const verifyCode = generateVerifyCode();
        console.log("verifyCode = ", verifyCode);
        userData[0].verifyCode = verifyCode;

        await userData[0].save();   

        const msg = {
            to: userData[0].email,
            from: 'no-reply@automatrix.network',
            subject: 'Verify Code',
            text: 'Verify Code',
            html: `<strong>${verifyCode}</strong>`,
        };

        sgMail.send(msg);

        res.status(200).json({
            status: 200,
            msg: 'Resent verify Code'
        })
    } else {
        res.status(404).json({
            status: 404,
            msg: 'Not Found User'
        })
    }
}

module.exports = { UserResendVerifyCode }