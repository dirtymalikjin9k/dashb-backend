// Generate a random 6-digit number
const generateVerifyCode = () => {
    return Math.floor(100000 + Math.random() * 900000);
}


module.exports = { generateVerifyCode }
