require('dotenv').config();
const fs = require('fs');
const path = require('path');
const sgMail = require('@sendgrid/mail');
const { userModel } = require('../../models/userModel');
const VerifyPath = path.join(__dirname, "..", "..", "view", "verify.html");
const verifyPage = fs.readFileSync(VerifyPath, { encoding: "utf-8" })

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMail = async(to, token) => {

    const replacedVerifyPage = verifyPage.replace("SET_TOKEN", `https://automatrix.network/verify/${token}`)

    console.log("to = ", to)
    console.log("token = ", token)

    if(to === undefined)
    {
        const userData = await userModel.where('token').equals(token).limit(1);
        if( userData.length ){
            to = userData[0].email;
        } else {
            return false;
        }
    }
    
    const msg = {
        to: to,
        from: 'no-reply@automatrix.network',
        subject: 'Verification mail',
        text: 'verify email',
        html: replacedVerifyPage,
    };

    sgMail.send(msg);

    return true;
}



module.exports = { sendMail }