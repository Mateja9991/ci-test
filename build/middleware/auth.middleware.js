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
exports.jwtAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const models_1 = require("../models");
function jwtAuth(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (req.header('Authorization') || '').replace('Bearer ', '');
            console.log(token);
            const { _id } = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'nbtn');
            const user = yield models_1.User.findById(_id, null, { populate: ['tasks'] });
            if (!user) {
                throw new Error('User not found(jwt');
            }
            req.user = user;
            next();
        }
        catch (err) {
            console.log(err);
            res.status(400).send(err);
        }
    });
}
exports.jwtAuth = jwtAuth;
