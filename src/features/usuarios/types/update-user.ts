export interface UpdateUser {
    correo: string;
    nombre: string;
    apellido: string;
    contrasena?: string;
    estado: boolean;
    id_rol: string;
    id_usuario?: string;
}