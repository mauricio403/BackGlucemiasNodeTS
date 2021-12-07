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
exports.dniExiste = exports.existeUsuarioPorUid = void 0;
const Usuario_1 = __importDefault(require("../models/Usuario"));
const existeUsuarioPorUid = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // Verificar si el correo existe
    const existeUsuario = yield Usuario_1.default.findById(id);
    if (!existeUsuario) {
        throw new Error(`El id no existe ${id}`);
    }
});
exports.existeUsuarioPorUid = existeUsuarioPorUid;
const dniExiste = (dni) => __awaiter(void 0, void 0, void 0, function* () {
    // Verificar si el dni existe
    const dniExiste = yield Usuario_1.default.findOne({ dni });
    if (dniExiste) {
        throw new Error(`El dni: ${dni}, ya está registrado`);
    }
});
exports.dniExiste = dniExiste;
//# sourceMappingURL=db-validators.js.map