"use strict";
//rutas de autenticacion
//host + api/auth
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const express_validator_1 = require("express-validator");
const validar_camposAuht_1 = require("../middlewares/validar-camposAuht");
const validar_jwt_1 = require("../middlewares/validar-jwt");
const router = (0, express_1.Router)();
router.post('/register', [
    //midlewares
    (0, express_validator_1.check)('dni', 'Cedula o Pasaporte obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('name', 'Nombre obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('phone', 'Numero de contacto obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('password', 'Contraseña debe ser de 6 caracteres').isLength({ min: 6 }),
    validar_camposAuht_1.validarCamposAuht
], authController_1.crearUsuario);
router.post('/login', [
    (0, express_validator_1.check)('dni', 'Cedula o Pasaporte obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('password', 'Contraseña debe ser de 6 caracteres').isLength({ min: 6 }),
    validar_camposAuht_1.validarCamposAuht
], authController_1.loginUsuario);
router.get('/renew', validar_jwt_1.validarJWT, authController_1.revalidarToken);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map