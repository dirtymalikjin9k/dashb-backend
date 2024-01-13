const { userModel } = require("../../../models/userModel")

const UserVerifyCode = async(req, res, next) => {
    const { token, code } = req.body;

    console.log(req.body)

    //Check email exist in database
    const userData = await userModel.where("token").equals(token).where('code').equals(code).limit(1) // ? | Any Item you Want

    if(userData.length){
        const encode_token = btoa(token + code);
        console.log(encode_token)
        // Convert the combined string to a hexadecimal representation
        res.status(200).json({
            status: 200,
            token: encode_token,
            msg: 'Verify Code'
        })
    } else {
        res.status(404).json({
            status: 404,
            msg: 'Failed Verify Code'
        })
    }
}

module.exports = { UserVerifyCode }