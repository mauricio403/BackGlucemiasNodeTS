import mongoose from 'mongoose';

export const dbConnection = async () => {

    try {
        await mongoose.connect(process.env.DB_CNN as string, {
        });

        console.log('Base de datos en Linea');

    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de inicalizar la BD')
    }
}