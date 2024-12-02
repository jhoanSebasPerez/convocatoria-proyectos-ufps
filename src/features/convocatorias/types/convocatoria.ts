export interface Convocatoria {
    id_convocatoria: string;
    nombre_convocatoria: string;
    fecha_inicio_inscripcion: Date;
    fecha_cierre_inscripcion: Date;
    fecha_limite_calificacion: Date;
    fecha_inicio_convocatoria: Date;
    fecha_cierre_convocatoria: Date;
    CategoriaConvocatoria: CategoriaConvocatoria[];
}

export interface CategoriaConvocatoria {
    id_categoria: string;
    nombre_categoria: string;
}
