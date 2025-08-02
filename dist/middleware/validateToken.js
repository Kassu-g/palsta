"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = authenticateUser;
exports.authenticateAdmin = authenticateAdmin;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authenticateUser(req, res, next) {
    const auth = req.headers.authorization?.split(' ')[1];
    if (!auth)
        return res.status(401).json({ message: 'Token not found.' });
    try {
        const payload = jsonwebtoken_1.default.verify(auth, process.env.SECRET);
        req.user = payload;
        next();
    }
    catch {
        res.status(401).json({ message: 'Invalid token.' });
    }
}
function authenticateAdmin(req, res, next) {
    authenticateUser(req, res, () => {
        if (!req.user.isAdmin) {
            return res.status(403).json({ message: 'Access denied.' });
        }
        next();
    });
}
