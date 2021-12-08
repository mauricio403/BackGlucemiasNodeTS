import { Request, Response } from "express";
import bcryptjs from 'bcryptjs';
import Usuario from "../models/Usuario";


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
    const usuarioId = req.params.id;
    try {
        const isThereUser = await Usuario.findById(usuarioId);
        if (isThereUser) {
            throw new Error("Ya existe un usuario con ese id");

        }
        const usuario = await Usuario.create(req.body);
        await usuario.save();
        return res.status(201).json({
            msg: 'Usuario creado correctamente',
            data: usuario
        });

    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: error
        });
    }
}

export const updateUsuarios = async (req: Request, res: Response) => {

    const usuarioId = req.params.id;

    try {

        const usuario = await Usuario.findById(usuarioId);

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

        const usuarioActualizado = await Usuario.findByIdAndUpdate(usuarioId, nuevoUsuario, { new: true });

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

export const deleteUsuarios = async (req: Request, res: Response) => {
    const usuarioId = req.params.id;

    try {
        const usuario = await Usuario.findById(req.body.usuarioId);
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
    const usuarioId = req.params.id;

    try {
        const usuario = await Usuario.findById(req.body.usuarioId);
        if (!usuario) {
            throw new Error("No existe un usuario con ese id");
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