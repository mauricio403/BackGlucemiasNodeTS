//rutas de autenticacion
//host + api/auth

import { Router } from 'express';
import { crearUsuario, loginUsuario, revalidarToken } from '../controllers/authController';
import { check } from 'express-validator'
import { validarCamposAuht } from '../middlewares/validar-camposAuht';
import { validarJWT } from '../middlewares/validar-jwt';

const router = Router();


router.post('/register',
    [
        //midlewares

        check('dni', 'Cedula o Pasaporte obligatorio').not().isEmpty(),
        check('name', 'Nombre obligatorio').not().isEmpty(),
        check('phone', 'Numero de contacto obligatorio').not().isEmpty(),
        check('password', 'Contraseña debe ser de 6 caracteres').isLength({ min: 6 }),
        validarCamposAuht

    ],
    crearUsuario
);


router.post('/login'
    , [
        check('dni', 'Cedula o Pasaporte obligatorio').not().isEmpty(),
        check('password', 'Contraseña debe ser de 6 caracteres').isLength({ min: 6 }),
        validarCamposAuht
    ],
    loginUsuario
);

router.get('/renew',validarJWT, revalidarToken);

export default router;