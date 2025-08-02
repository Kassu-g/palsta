"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const topicSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    username: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});
exports.default = (0, mongoose_1.model)('Topic', topicSchema);
