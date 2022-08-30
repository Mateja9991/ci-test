"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateFields = exports.jwtAuth = void 0;
const auth_middleware_1 = require("./auth.middleware");
Object.defineProperty(exports, "jwtAuth", { enumerable: true, get: function () { return auth_middleware_1.jwtAuth; } });
const update_middleware_1 = require("./update.middleware");
Object.defineProperty(exports, "validateUpdateFields", { enumerable: true, get: function () { return update_middleware_1.validateUpdateFields; } });
