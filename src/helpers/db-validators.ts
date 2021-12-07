import Usuario from "../models/Usuario";

export const existeUsuarioPorUid = async (id:string) => {

    // Verificar si el correo existe
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`El id no existe ${id}`);
    }
}

export const dniExiste = async( dni :number ) => {

    // Verificar si el dni existe
    const dniExiste = await Usuario.findOne({ dni });
    if ( dniExiste ) {
        throw new Error(`El dni: ${ dni }, ya está registrado`);
    }
}