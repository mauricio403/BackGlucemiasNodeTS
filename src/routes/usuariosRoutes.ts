import { check } from 'express-validator';
import { Router } from 'express';
import { getUsuarios, updateUsuarios, storeUsuarios, deleteUsuario as deleteUsuario, showUsuario } from '../controllers/usuariosController';
import { existeUsuarioPorUid } from '../helpers/db-validators';
import { validarCamposAuht } from '../middlewares/validar-camposAuht';

export const routerUsers = Router();


routerUsers.get('/', getUsuarios);
routerUsers.post('/', storeUsuarios);

routerUsers.get('/:id', showUsuario);

routerUsers.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorUid),
], deleteUsuario);

routerUsers.put('/:id', [
    // check('id', 'No es un ID válido').isMongoId(),
    // check('id').custom(existeUsuarioPorUid),
    validarCamposAuht
], updateUsuarios);