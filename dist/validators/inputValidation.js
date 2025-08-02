"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidator = exports.registerValidator = void 0;
const express_validator_1 = require("express-validator");
exports.registerValidator = [
    (0, express_validator_1.body)('email')
        .trim().escape()
        .isEmail().withMessage('Must be a valid email'),
    (0, express_validator_1.body)('username')
        .trim().escape()
        .isLength({ min: 3, max: 25 })
        .withMessage('Username must be 3–25 chars'),
    (0, express_validator_1.body)('password')
        .isStrongPassword({
        minLength: 8, minLowercase: 1,
        minUppercase: 1, minNumbers: 1,
        minSymbols: 1
    })
        .withMessage('Password not strong enough')
];
exports.loginValidator = [
    (0, express_validator_1.body)('email').trim().escape(),
    (0, express_validator_1.body)('password').trim()
];
