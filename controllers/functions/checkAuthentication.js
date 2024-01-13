const { userModel } = require("../../models/userModel")
const jwt = require('jsonwebtoken')

const checkAuthenticate = async(token) => {
    try {
        const decode = jwt.verify(token, 'AZQ,PI)0(');
        // const decode = jwt.decode(token, 'AZQ,PI)0(');
        const userData = await userModel.where("email").equals(decode.email).limit(1);
        if (userData.length) {
            return {
                decode: decode,
                status: 200,
            };
        } else return {
            status: 404
        };
    } catch (error) {
        // console.log("error:", error);
        return {
            status: 404
        }
    }
}

module.exports = { checkAuthenticate }