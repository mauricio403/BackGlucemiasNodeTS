import express, { Application } from 'express';
import cors from 'cors';
import authRoutes from '../routes/authRoutes';
import { dbConnection } from '../database/config';
import { routerUsers } from '../routes/usuariosRoutes';
import { sheetsRouter } from '../routes/sheetsRoutes';

class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        authentication:'/api/auth',
        usuarios:   '/api/usuarios',
        sheets:   '/api/sheets',
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8002';
        this.conectarDB();
        this.middlewares();
        this.routes();
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
        this.app.use(this.apiPaths.usuarios, routerUsers);
        this.app.use(this.apiPaths.sheets, sheetsRouter);
    }

}

export default Server;