import express, { Application } from 'express';
import cors from 'cors';
import authRoutes from '../routes/authRoutes';
import { dbConnection } from '../database/config';
import { routerUsers } from '../routes/usuariosRoutes';
import { sheetsRouter } from '../routes/sheetsRoutes';
import { validarJWT } from '../middlewares/validar-jwt';
import { SpreadSheetContainer } from "./googleSpreadSheet/SpreadSheetContainer";

class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        authentication: '/api/auth',
        usuarios: '/api/usuarios',
        sheets: '/api/sheets',
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8002';
        this.conectarDB();
        this.middlewares();
        this.routes();
        this.initSpreadSheets();
    }

    async initSpreadSheets() {
        const spreadSheetcontainer = SpreadSheetContainer.getInstance();
        const doc1 = await spreadSheetcontainer
            .newDoc('1s3-nyOFuUzLSNEfsIzf5Biq5sCKMu0YFp98EH2uhEaY', 'december');
        
    }


    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        //cors
        this.app.use(cors());

        //Lectura del body

        this.app.use(express.json());


    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto ' + this.port)
        })
    }
    routes() {
        this.app.use(this.apiPaths.authentication, authRoutes);
        this.app.use(this.apiPaths.usuarios, [validarJWT], routerUsers);
        this.app.use(this.apiPaths.sheets, sheetsRouter);
    }

}

export default Server;