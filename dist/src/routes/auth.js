"use strict";
//rutas de autenticacion
//host + api/auth
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const router = (0, express_1.Router)();
router.post('/register', authController_1.crearUsuario);
router.post('/login', authController_1.loginUsuario);
router.get('/renew', authController_1.revalidarToken);
exports.default = router;
//# sourceMappingURL=auth.js.map