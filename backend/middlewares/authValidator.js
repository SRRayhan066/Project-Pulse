// external imports
const { check, validationResult } = require('express-validator');
const createError = require('http-errors');

// internal imports

// // register validators
// const registerValidator = [
//     check('email').isEmail().withMessage('Invalid email address.').custom(async (value) => {
//         const user = await User.findOne({ email: value });
//         if (user) {
//             throw createError(400, 'Email already in use.');
//         }
//         return true;
//     }),
// ];

// // register validation handler
// const registerValidationHandler = (req, res, next) => {
//     const errors = validationResult(req);
//     const mappedErrors = errors.mapped();

//     if (Object.keys(mappedErrors).length === 0) {
//         next();
//     } else {
//         res.status(500).json({ errors: mappedErrors });
//     }
// }

// login validators
const loginValidator = [
    check('email').not().isEmpty().withMessage('Email is required.'),
    check('password').not().isEmpty().withMessage('Password is required.')
];

// login validation handler
const loginValidationHandler = (req, res, next) => {
    const errors = validationResult(req);
    const mappedErrors = errors.mapped();

    if (Object.keys(mappedErrors).length === 0) {
        next();
    } else {
        res.status(500).json({ errors: mappedErrors });
    }
}

// export
module.exports = {
    loginValidator,
    loginValidationHandler
};