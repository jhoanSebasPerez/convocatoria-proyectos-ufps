export interface CreateProyecto {
    titulo: string;
    descripcion: string;
    estado: string;
    fecha_inscripcion: string;
    calificacion_final: number;
    id_categoria: string;
    id_usuario: string;
    integrantes: string[];
}
