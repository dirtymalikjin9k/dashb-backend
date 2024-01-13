const Validr = require('validr');
const sha1 = require('sha1');
const {
    userModel
} = require("../../models/userModel")
const { sendMail } = require("../functions/sendMail");

const userCreation = async(req, res, next) => {
    try {
        if (req.method.toLowerCase() == "post") {
            const {
                first_name,
                last_name,
                email,
                birthday,
                gender,
                password,
            } = req.body
    
            console.log('request = ', req.body);
    
            const token = sha1(email) + Date.now();
    
            //Create an instance of Validr.
            var validr = new Validr(req.body);
            validr.validate('first_name', 'Please enter your first name.').isLength(1);
            validr.validate('last_name', 'Please enter your last name.').isLength(1);
    
            validr.validate('email', { isLength: 'Please enter a email.', isEmail: 'Email must be valid.' }).isLength(1).isEmail();
    
            validr.validate('password', 'Please enter a password.').isLength(1);
    
            validr.validate('gender', 'Please make a selection').isLength(1);
    
            var errors = validr.validationErrors();
            var errorObject = {};
    
            if (errors)
                errors.forEach(error => {
                    errorObject[error.param] = error.msg;
                });
    
            if((new Date().getFullYear()) - new Date(birthday).getFullYear() <= 13) {
                errorObject['birthday'] = 'You must be at least 13 years old to register.';
            }
    
            //Check email exist in database
            const userData = await userModel.where("email").equals(email).limit(1) // ? | Any Item you Want
            if (userData.length) {
                errorObject['email'] = 'Email already exists';
            }
    
            if (Object.keys(errorObject).length !== 0) {
                // console.log(errorObject)
                return res.status(401).json({
                    status: 401,
                    error: errorObject
                });
            } else {
                try {
                    const newUser = await userModel.create({
                        first_name: first_name,
                        last_name: last_name,
                        email: email,
                        birthday: new Date(birthday),
                        password: sha1(password),
                        gender: gender,
                        token: token,
                    })
                    const user = await newUser.save();
                    res.status(200).json({
                        status: 200,
                        token: token,
                        msg: "Record Created"
                    });
                } catch (error) {
                    res.status(404).json({
                        status: 404,
                        error: errorObject,
                        msg: "Error Accourd"
                    });
                }
                if (sendMail(email, token)) console.log("Verification Email Send , Check Your Email/Spam")
                else console.log("An Error Accourd When Sending Verification Email")
            }
        }
    } catch(error) {
        var errorObject = {};
        console.log("error = ", error);
        return res.status(404).json({
            status: 404,
            error: errorObject
        });
    }
}


module.exports = {
    userCreation
}