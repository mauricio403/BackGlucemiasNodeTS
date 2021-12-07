import {Schema, model} from 'mongoose';


export interface IUser extends Document{
    dni: number,
    name: string,
    phone: number,
    rol:string,
    password: string
}


const usuarioSchema = new Schema({

    dni: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        
    },
    phone: {
        type: Number,
        required: true,
    },
    rol: {
        type: String,
        required: true,
        default: 'USER_ROLE',
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    password: {
        type: String,
        required: true
    }



});

export default model<IUser>('Usuario', usuarioSchema);
