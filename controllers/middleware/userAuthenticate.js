const jwt = require('jsonwebtoken')
const { checkAuthenticate } = require('../functions/checkAuthentication');

const userAuthenticate = async (req, res) => {
    try{
        const token = req.headers.authorization.split(' ')[1]
        // const decode = jwt.verify(token, 'AZQ,PI)0(');
        const authentication = await checkAuthenticate(token);
        if(authentication.status){
            return res.status(200).json({
                message: 'Authentication Success',
                decode: authentication.decode
            })
        } else {
            return res.status(404).json({
                message: 'Authentication Failed'
            })    
        }
    }catch(error){
        return res.status(404).json({
            message: 'Authentication Failed'
        })
    }
}

module.exports = { userAuthenticate }