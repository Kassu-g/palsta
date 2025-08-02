"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const topicRoutes_1 = __importDefault(require("./routes/topicRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
mongoose_1.default.connect(process.env.MONGODB_URI);
app.use('/api/user', userRoutes_1.default);
app.use('/api', topicRoutes_1.default);
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
