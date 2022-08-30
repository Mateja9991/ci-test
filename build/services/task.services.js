"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.getTask = exports.getAllTasks = exports.getMyTasks = exports.addTask = void 0;
const models_1 = require("../models");
const mongoose_1 = __importDefault(require("mongoose"));
function addTask(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { query, body } = req;
            const newTask = new models_1.Task(Object.assign(Object.assign({}, body), { ownerId: req.user._id }));
            yield newTask.save();
            res.send(newTask);
        }
        catch (err) {
            console.log(err);
            res.status(400).send(err);
        }
    });
}
exports.addTask = addTask;
function getAllTasks(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { query, body } = req;
            const tasks = yield models_1.Task.find(Object.assign({}, query));
            res.send(tasks);
        }
        catch (err) {
            console.log(err);
            res.status(400).send(err);
            // setImmediate
        }
    });
}
exports.getAllTasks = getAllTasks;
function getMyTasks(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { query, body, user } = req;
            yield user.populate('tasks');
            res.send(user.tasks);
            // res.send(tasks)
        }
        catch (err) {
            console.log(err);
            res.status(400).send(err);
        }
    });
}
exports.getMyTasks = getMyTasks;
function getTask(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { query, body, params: { id } } = req;
            const task = yield models_1.Task.findById(id);
            res.send(task);
        }
        catch (err) {
            console.log(err);
            res.status(400).send(err);
        }
    });
}
exports.getTask = getTask;
function updateTask(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const updates = Object.keys(req.body);
            const allowedUpdates = ['completed', 'description'];
            if (!updates.every(update => allowedUpdates.includes(update)))
                throw new Error('Updating forbidden entry');
            const { query, body, params: { id } } = req;
            const task = yield models_1.Task.findById(new mongoose_1.default.Types.ObjectId(id));
            if (task)
                updates.forEach(key => {
                    task[key] = body[key];
                });
            res.send(task);
        }
        catch (err) {
            console.log(err);
            res.status(400).send(err);
        }
    });
}
exports.updateTask = updateTask;
function deleteTask(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
        }
        catch (err) {
            const { query, body, params: { id } } = req;
            const task = yield models_1.Task.findById(new mongoose_1.default.Types.ObjectId(id));
            if (task)
                task.delete();
            res.send(task);
            console.log(err);
            res.status(400).send(err);
        }
    });
}
exports.deleteTask = deleteTask;
