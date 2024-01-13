const sgMail = require('@sendgrid/mail');
const { userModel } = require("../../../models/userModel")
const { generateVerifyCode } = require('../../functions/generateVerifyCode');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const UserFindAccount = async(req, res, next) => {
    const { email } = req.body;
    
    //Check email exist in database
    const userData = await userModel.where("email").equals(email).limit(1) // ? | Any Item you Want

    if(userData.length){
        const verifyCode = generateVerifyCode();
        console.log("verifyCode = ", verifyCode);
        userData[0].verifyCode = verifyCode;

        await userData[0].save();

        const msg = {
            to: email,
            from: 'no-reply@automatrix.network',
            subject: 'Verify Code',
            text: 'Verify Code',
            html: `<strong>${verifyCode}</strong>`,
        };

        sgMail.send(msg);

        res.status(200).json({
            status: 200,
            token: userData[0].token,
            msg: 'Email exist'
        })
    } else {
        res.status(404).json({
            status: 404,
            msg: 'Not Found'
        })
    }
}

module.exports = { UserFindAccount }