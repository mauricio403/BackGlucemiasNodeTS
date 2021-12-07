import { Request, Response } from "express";
import bcryptjs from 'bcryptjs';
import Usuario from "../models/Usuario";
import { generarJWT } from '../helpers/jwt';
import { PayloadData } from '../middlewares/validar-jwt';


export const crearUsuario = async (req: Request, res: Response) => {

    const { dni, password } = (req.body);

    try {

        let usuario = await Usuario.findOne({ dni });

        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un usuario con ese numero de Cedula / Pasaporte'
            })
        }
        usuario = new Usuario(req.body);

        //encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync(password, salt);

        await usuario.save();

        //genera jwt
        const token = await generarJWT(usuario.id, usuario.dni, usuario.name);


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
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el admin'
        })
    }
};

export const loginUsuario = async (req: Request, res: Response) => {

    const { dni, password } = (req.body);


    try {

        const usuario = await Usuario.findOne({ dni });

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Cedula / Pasaporte o contraseña incorrectos'
            });
        }

        //confirmar contraseñas

        const validPassword = bcryptjs.compareSync(password, usuario.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no valida'
            });
        }

        //generar jwt
        const token = await generarJWT(usuario.id, usuario.dni, usuario.name);


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

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el admin'
        })
    }
};



export const revalidarToken = async(req: PayloadData, res: Response) => {

    const uid = req.uid;
    const dni = req.dni;
    const name = req.name

    //generar un nuevo jwt y retornarlo

    //generar jwt
    const token = await generarJWT(uid, dni, name);

    res.json({
        usuario: {
            uid: uid,
            dni: dni,
            name: name
        },
       
        token
    })

}
