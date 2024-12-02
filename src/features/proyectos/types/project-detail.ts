export interface ProjectDetail {
    id_proyecto: string;
    titulo: string;
    descripcion: string;
    estado: string;
    fecha_inscripcion: Date;
    calificacion_final: string;
    docente_asignado: DocenteAsignado;
    integrantes: DocenteAsignado[];
    CategoriaConvocatorium: CategoriaConvocatorium;
}

export interface CategoriaConvocatorium {
    id_categoria: string;
    nombre_categoria: string;
}

export interface DocenteAsignado {
    id_usuario: string;
    nombre: string;
    apellido: string;
    correo: string;
}
