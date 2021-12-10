import { json, Request, Response } from "express";
import bcryptjs from 'bcryptjs';
import Usuario from "../models/Usuario";
import { generarJWT } from "../helpers/jwt";


export const getUsuarios = async (req: Request, res: Response) => {

    const { limite = 5, desde = 0 } = req.query;

    const query = { estado: true }

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        usuarios
    });

}

export const storeUsuarios = async (req: Request, res: Response) => {
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
}


export const updateUsuarios = async (req: Request, res: Response) => {

    let dni = parseInt(req.params.id);

    try {

        const usuario = await Usuario.findOne({ dni });
        if (!usuario) {
            res.status(404).json({
                ok: false,
                msg: 'No existe usuario con ese id'
            });
        }

        const nuevoUsuario = {
            ...req.body,
            usuario: usuario?.id
        }

        const usuarioActualizado = await Usuario.findOneAndUpdate({ dni }, nuevoUsuario, { new: true });

        res.status(200).json({
            msg: 'actualizado exitosamente!',
            usuario: usuarioActualizado
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        })
    }



}

export const deleteUsuario = async (req: Request, res: Response) => {
    let dni = parseInt(req.params.id);
    try {
        const usuario = await Usuario.findOne({ dni });
        if (!usuario) {
            throw new Error("No existe un usuario con ese id");
        }
        await usuario?.deleteOne();
        return res.status(200).json({
            msg: 'OK',
            data: usuario
        });
    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: error
        });
    }
}

export const showUsuario = async (req: Request, res: Response) => {
    let dni = parseInt(req.params.id);
    try {
        const usuario = await Usuario.findOne({ dni });
        if (!usuario) {
            throw new Error("No existe un usuario con ese dni");
        }
        return res.status(200).json({
            msg: 'OK',
            data: usuario
        });
    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: error
        });
    }
} 