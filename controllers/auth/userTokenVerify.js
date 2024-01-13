const { userModel } = require("../../models/userModel");

const userTokenVerify = async(req, res, next) => {
    if (req.method.toLowerCase() == "get") {
        const { token } = req.params
        console.log(token);
        try {
            const newUser = await userModel.updateOne({ "token": token }, { "active": true })
            newUser.modifiedCount != 0 ? res.status(200).json({ status: 200, msg: "Actived" }) : res.status(404).json({ status: 404, msg: "Not Found" })
        } catch (error) {
            res.status(404).json({ status: 404, msg: "Error Accourd" });
        }
    }
}

module.exports = { userTokenVerify }