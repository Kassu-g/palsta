import { body } from 'express-validator';

export const registerValidator = [
  body('email')
    .trim().escape()
    .isEmail().withMessage('Must be a valid email'),
  body('username')
    .trim().escape()
    .isLength({ min: 3, max: 25 })
    .withMessage('Username must be 3–25 chars'),
  body('password')
    .isStrongPassword({
      minLength: 8, minLowercase: 1,
      minUppercase: 1, minNumbers: 1,
      minSymbols: 1
    })
    .withMessage('Password not strong enough')
];

export const loginValidator = [
  body('email').trim().escape(),
  body('password').trim()
];
