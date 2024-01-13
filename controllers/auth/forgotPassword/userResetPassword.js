const sha1 = require('sha1');
const { userModel } = require("../../../models/userModel")

const UserResetPassword = async (req, res, next) => {
    try{
        const { encode_token, new_password } = req.body;

        const decode_token = atob(encode_token);
        
        const token = String(decode_token.slice(0, decode_token.length - 6));
        const code = String(decode_token.slice(-6));

        console.log("token = ", token);
        console.log("code = ", code);

        
        //Check email exist in database
        const userData = await userModel.where("token").equals(token).where('code').equals(code).limit(1); // ? | Any Item you Want

        if(userData.length){
            userData[0].password = sha1(new_password);
            userData[0].save();
            
            res.status(200).json({
                status: 200,
                msg: 'Reset Password'
            })
        } else {
            res.status(404).json({
                status: 404,
                msg: 'Failed Reset Password'
            })
        }
    } catch(err) {
        res.status(404).json({
            status: 404,
            msg: 'Failed Reset Password'
        })
    }
}

module.exports = { UserResetPassword }