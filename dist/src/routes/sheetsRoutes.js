"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sheetsRouter = void 0;
const express_1 = require("express");
const sheetsController_1 = require("../controllers/sheetsController");
exports.sheetsRouter = (0, express_1.Router)();
exports.sheetsRouter.get('/', sheetsController_1.test);
//# sourceMappingURL=sheetsRoutes.js.map