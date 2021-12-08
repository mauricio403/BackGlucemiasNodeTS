import { Request, Response } from "express";
import jwt from 'jsonwebtoken';

export interface PayloadData extends Request {
    uid: string,
    dni: number,
    name: string,
    token: string,
    iat: number,
    exp: number
}

export const validarJWT = (req: Request, res: Response, next: any) => {



    //x-token headers

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        });
    }

    try {

        const payload = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED as string
        );


        req.uid = (payload as PayloadData).uid
        req.dni = (payload as PayloadData).dni
        req.name = (payload as PayloadData).name

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        })
    }


    next();

}