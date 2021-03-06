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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const authRoutes_1 = __importDefault(require("../routes/authRoutes"));
const config_1 = require("../database/config");
const usuariosRoutes_1 = require("../routes/usuariosRoutes");
const sheetsRoutes_1 = require("../routes/sheetsRoutes");
const validar_jwt_1 = require("../middlewares/validar-jwt");
const SpreadSheetContainer_1 = require("./googleSpreadSheet/SpreadSheetContainer");
class Server {
    constructor() {
        this.apiPaths = {
            authentication: '/api/auth',
            usuarios: '/api/usuarios',
            sheets: '/api/sheets',
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '8002';
        this.conectarDB();
        this.middlewares();
        this.routes();
        this.initSpreadSheets();
    }
    initSpreadSheets() {
        return __awaiter(this, void 0, void 0, function* () {
            const spreadSheetcontainer = SpreadSheetContainer_1.SpreadSheetContainer.getInstance();
            const doc1 = yield spreadSheetcontainer
                .newDoc('1s3-nyOFuUzLSNEfsIzf5Biq5sCKMu0YFp98EH2uhEaY', 'december');
        });
    }
    conectarDB() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, config_1.dbConnection)();
        });
    }
    middlewares() {
        //cors
        this.app.use((0, cors_1.default)());
        //Lectura del body
        this.app.use(express_1.default.json());
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto ' + this.port);
        });
    }
    routes() {
        this.app.use(this.apiPaths.authentication, authRoutes_1.default);
        this.app.use(this.apiPaths.usuarios, [validar_jwt_1.validarJWT], usuariosRoutes_1.routerUsers);
        this.app.use(this.apiPaths.sheets, sheetsRoutes_1.sheetsRouter);
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map