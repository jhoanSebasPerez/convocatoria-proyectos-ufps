export interface LoginResponseType {
    token: string;
    success: boolean;
    data: {
        id_usuario: number;
        correo: string;
        estado: boolean;
        contrasena: string;
        Rol: {
            id_rol: number;
            nombre_rol: string;
        }

    }
}