"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarCamposAuht = void 0;
const express_validator_1 = require("express-validator");
const validarCamposAuht = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.mapped()
        });
    }
    next();
};
exports.validarCamposAuht = validarCamposAuht;
//# sourceMappingURL=validar-camposAuht.js.map