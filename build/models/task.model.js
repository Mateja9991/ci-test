"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const mongoose_1 = require("mongoose");
const user_model_1 = require("./user.model");
const taskSchema = new mongoose_1.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    ownerId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: user_model_1.User
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
exports.Task = (0, mongoose_1.model)('Task', taskSchema);
