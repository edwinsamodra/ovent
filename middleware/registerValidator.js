const validator = require("email-validator");

const registerValidator = (req, res, next) => {
    const { email, pass, name } = req.body
    const isValidEmail = (email) => validator.validate(email);
    const isValidPass = (pass) => {
        const tester = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
        return pass.match(tester) == null ? false : true;
    }
    try {
        if(!email || !pass || !name) {
            throw 'Please insert all fields'
        }
        if (!isValidEmail(email)) {
            throw 'Email tidak valid!'
        }   
        if(!isValidPass(pass)) {
            throw 'Password must have lower case, upper case, number, and minimal 8 digits'
        }
        next()
    } catch (error) {
        res.json({
            status: 'error',
            message: error,
            data: null
        })
    }
}

module.exports = { registerValidator }