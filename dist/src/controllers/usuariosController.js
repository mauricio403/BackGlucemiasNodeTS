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
exports.showUsuario = exports.deleteUsuarios = exports.updateUsuarios = exports.storeUsuarios = exports.getUsuarios = void 0;
const Usuario_1 = __importDefault(require("../models/Usuario"));
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };
    const [total, usuarios] = yield Promise.all([
        Usuario_1.default.countDocuments(query),
        Usuario_1.default.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);
    res.json({
        total,
        usuarios
    });
});
exports.getUsuarios = getUsuarios;
const storeUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarioId = req.params.id;
    try {
        const isThereUser = yield Usuario_1.default.findById(usuarioId);
        if (isThereUser) {
            throw new Error("Ya existe un usuario con ese id");
        }
        const usuario = yield Usuario_1.default.create(req.body);
        yield usuario.save();
        return res.status(201).json({
            msg: 'Usuario creado correctamente',
            data: usuario
        });
    }
    catch (error) {
        return res.status(400).json({
            ok: false,
            msg: error
        });
    }
});
exports.storeUsuarios = storeUsuarios;
const updateUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarioId = req.params.id;
    try {
        const usuario = yield Usuario_1.default.findById(usuarioId);
        if (!usuario) {
            res.status(404).json({
                ok: false,
                msg: 'No existe usuario con ese id'
            });
        }
        const nuevoUsuario = Object.assign(Object.assign({}, req.body), { usuario: usuario === null || usuario === void 0 ? void 0 : usuario.id });
        const usuarioActualizado = yield Usuario_1.default.findByIdAndUpdate(usuarioId, nuevoUsuario, { new: true });
        res.status(200).json({
            msg: 'actualizado exitosamente!',
            usuario: usuarioActualizado
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        });
    }
});
exports.updateUsuarios = updateUsuarios;
const deleteUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarioId = req.params.id;
    try {
        const usuario = yield Usuario_1.default.findById(req.body.usuarioId);
        if (!usuario) {
            throw new Error("No existe un usuario con ese id");
        }
        yield (usuario === null || usuario === void 0 ? void 0 : usuario.deleteOne());
        return res.status(200).json({
            msg: 'OK',
            data: usuario
        });
    }
    catch (error) {
        return res.status(400).json({
            ok: false,
            msg: error
        });
    }
});
exports.deleteUsuarios = deleteUsuarios;
const showUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarioId = req.params.id;
    try {
        const usuario = yield Usuario_1.default.findById(req.body.usuarioId);
        if (!usuario) {
            throw new Error("No existe un usuario con ese id");
        }
        return res.status(200).json({
            msg: 'OK',
            data: usuario
        });
    }
    catch (error) {
        return res.status(400).json({
            ok: false,
            msg: error
        });
    }
});
exports.showUsuario = showUsuario;
//# sourceMappingURL=usuariosController.js.map