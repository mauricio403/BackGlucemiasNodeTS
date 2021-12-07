"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.revalidarToken = exports.loginUsuario = exports.crearUsuario = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const Usuario_1 = __importDefault(require("../models/Usuario"));
const jwt_1 = require("../helpers/jwt");
const crearUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { dni, password } = (req.body);
    try {
        let usuario = yield Usuario_1.default.findOne({ dni });
        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un usuario con ese numero de Cedula / Pasaporte'
            });
        }
        usuario = new Usuario_1.default(req.body);
        //encriptar contraseña
        const salt = bcryptjs_1.default.genSaltSync();
        usuario.password = bcryptjs_1.default.hashSync(password, salt);
        yield usuario.save();
        //genera jwt
        const token = yield (0, jwt_1.generarJWT)(usuario.id, usuario.dni, usuario.name);
        res.status(201).json({
            usuario: {
                uid: usuario.id,
                dni: usuario.dni,
                name: usuario.name,
                phone: usuario.phone,
                rol: usuario.rol,
                password: usuario.password,
            },
            token,
            msg: 'Usuario creado correctamente!'
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el admin'
        });
    }
});
exports.crearUsuario = crearUsuario;
const loginUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { dni, password } = (req.body);
    try {
        const usuario = yield Usuario_1.default.findOne({ dni });
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Cedula / Pasaporte o contraseña incorrectos'
            });
        }
        //confirmar contraseñas
        const validPassword = bcryptjs_1.default.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no valida'
            });
        }
        //generar jwt
        const token = yield (0, jwt_1.generarJWT)(usuario.id, usuario.dni, usuario.name);
        res.status(201).json({
            usuario: {
                uid: usuario.id,
                dni: usuario.dni,
                name: usuario.name,
                phone: usuario.phone,
                password: usuario.password,
                rol: usuario.rol,
            },
            token,
            msg: 'Acceso correcto, bienvenido!'
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el admin'
        });
    }
});
exports.loginUsuario = loginUsuario;
const revalidarToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uid = req.uid;
    const dni = req.dni;
    const name = req.name;
    //generar un nuevo jwt y retornarlo
    //generar jwt
    const token = yield (0, jwt_1.generarJWT)(uid, dni, name);
    res.json({
        usuario: {
            uid: uid,
            dni: dni,
            name: name
        },
        token
    });
});
exports.revalidarToken = revalidarToken;
//# sourceMappingURL=authController.js.map