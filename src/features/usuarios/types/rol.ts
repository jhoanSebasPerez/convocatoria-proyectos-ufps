export interface Rol {
    id_rol: string;
    nombre_rol: string;
    Permisos: Permiso[];
}

export interface Permiso {
    id_permiso: string;
    nombre_permiso: string;
}
