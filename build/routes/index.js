"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const task_routes_1 = require("./task.routes");
const user_routes_1 = require("./user.routes");
router.use('/tasks', task_routes_1.taskRouter);
router.use('/users', user_routes_1.userRouter);
exports.default = router;
