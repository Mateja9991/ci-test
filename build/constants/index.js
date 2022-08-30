"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbProps = exports.dbUrl = void 0;
const db_info_1 = require("./db-info");
Object.defineProperty(exports, "dbUrl", { enumerable: true, get: function () { return db_info_1.dbUrl; } });
const model_props_1 = require("./model_props");
Object.defineProperty(exports, "dbProps", { enumerable: true, get: function () { return model_props_1.dbProps; } });
