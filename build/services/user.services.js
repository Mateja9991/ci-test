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
exports.deleteUser = exports.updateUser = exports.getUser = exports.getAllUsers = exports.loginUser = exports.addUser = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const models_1 = require("../models");
function loginUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { body: { email, password } } = req;
            const user = yield models_1.User.findByCredentials(email, password);
            if (!user) {
                throw new Error('Not authorized');
            }
            const token = yield user.generateJwt();
            yield user.save();
            res.send({ user, token });
        }
        catch (err) {
            console.log(err);
            res.status(400).send(err);
        }
    });
}
exports.loginUser = loginUser;
function addUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { query, body } = req;
            const newUser = new models_1.User(Object.assign({}, body));
            yield newUser.save();
            const token = yield newUser.generateJwt();
            res.send({ user: newUser, token });
        }
        catch (err) {
            console.log(err);
            res.status(400).send(err);
        }
    });
}
exports.addUser = addUser;
function getAllUsers(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { query, body } = req;
            const users = yield models_1.User.find(Object.assign({}, query));
            res.send(users);
        }
        catch (err) {
            console.log(err);
            res.status(400).send(err);
        }
    });
}
exports.getAllUsers = getAllUsers;
function getUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { query, body, params: { id } } = req;
            const user = yield models_1.User.findById(id);
            res.send(user);
        }
        catch (err) {
            console.log(err);
            res.status(400).send(err);
        }
    });
}
exports.getUser = getUser;
function updateUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const updates = Object.keys(req.body);
            const allowedUpdates = ['name', 'age', 'email', 'password'];
            if (!updates.every(update => allowedUpdates.includes(update)))
                throw new Error('Updating forbidden entry');
            const { query, body, params: { id } } = req;
            const user = yield models_1.User.findById(id);
            if (user) {
                Object.keys(body).forEach(key => {
                    user[key] = body[key];
                });
                yield user.save();
            }
            res.send(user);
        }
        catch (err) {
            console.log(err);
            res.status(400).send({ err: err });
        }
    });
}
exports.updateUser = updateUser;
function deleteUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
        }
        catch (err) {
            const { query, body, params: { id } } = req;
            const user = yield models_1.User.findById(new mongoose_1.default.Types.ObjectId(id));
            if (user) {
                yield user.delete();
            }
            res.send(user);
            console.log(err);
            res.status(400).send(err);
        }
    });
}
exports.deleteUser = deleteUser;
