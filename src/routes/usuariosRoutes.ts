import { check } from 'express-validator';
import { Router } from 'express';
import { getUsuarios, updateUsuarios } from '../controllers/usuariosController';
import { existeUsuarioPorUid } from '../helpers/db-validators';
import { validarCamposAuht } from '../middlewares/validar-camposAuht';

export const routerUsers = Router();


routerUsers.get('/', getUsuarios);

routerUsers.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorUid),
    validarCamposAuht
], updateUsuarios);