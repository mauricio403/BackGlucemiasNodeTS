"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerUsers = void 0;
const express_validator_1 = require("express-validator");
const express_1 = require("express");
const usuariosController_1 = require("../controllers/usuariosController");
const db_validators_1 = require("../helpers/db-validators");
const validar_camposAuht_1 = require("../middlewares/validar-camposAuht");
exports.routerUsers = (0, express_1.Router)();
exports.routerUsers.get('/', usuariosController_1.getUsuarios);
exports.routerUsers.post('/', usuariosController_1.storeUsuarios);
exports.routerUsers.get('/:id', [
    (0, express_validator_1.check)('id', 'No es un ID válido').isMongoId(),
    (0, express_validator_1.check)('id').custom(db_validators_1.existeUsuarioPorUid),
], usuariosController_1.showUsuario);
exports.routerUsers.delete('/:id', [
    (0, express_validator_1.check)('id', 'No es un ID válido').isMongoId(),
    (0, express_validator_1.check)('id').custom(db_validators_1.existeUsuarioPorUid),
], usuariosController_1.deleteUsuarios);
exports.routerUsers.put('/:id', [
    (0, express_validator_1.check)('id', 'No es un ID válido').isMongoId(),
    (0, express_validator_1.check)('id').custom(db_validators_1.existeUsuarioPorUid),
    validar_camposAuht_1.validarCamposAuht
], usuariosController_1.updateUsuarios);
//# sourceMappingURL=usuariosRoutes.js.map