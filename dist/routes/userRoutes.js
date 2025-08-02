"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_validator_1 = require("express-validator");
const User_1 = __importDefault(require("../models/User"));
const inputValidation_1 = require("../validators/inputValidation");
const router = (0, express_1.Router)();
router.post('/register', inputValidation_1.registerValidator, async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password, username, isAdmin } = req.body;
    if (await User_1.default.exists({ email })) {
        return res.status(403).json({ message: 'Email in use.' });
    }
    try {
        const hash = await bcryptjs_1.default.hash(password, 10);
        const newUser = await User_1.default.create({
            email,
            password: hash,
            username,
            isAdmin: !!isAdmin
        });
        return res.json(newUser);
    }
    catch (err) {
        return next(err);
    }
});
router.post('/login', inputValidation_1.loginValidator, async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        const user = await User_1.default.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        const valid = await bcryptjs_1.default.compare(password, user.password);
        if (!valid) {
            return res.status(401).json({ message: 'Incorrect password.' });
        }
        const token = jsonwebtoken_1.default.sign({ _id: user.id, username: user.username, isAdmin: user.isAdmin }, process.env.SECRET, { expiresIn: '1h' });
        return res.json({ token });
    }
    catch (err) {
        return next(err);
    }
});
exports.default = router;
