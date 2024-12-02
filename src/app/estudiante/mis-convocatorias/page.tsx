"use client";

import { useGetConvocatorias } from "@/features/convocatorias/api/use-get-convocatorias";
import ConvocatoriaInfoCard from "@/features/convocatorias/components/convocatoria-info-card";
import { Convocatoria } from "@/features/convocatorias/types/convocatoria";
import { useGetMyProjects } from "@/features/proyectos/api/use-get-my-projects";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

export default function MisConvocatoriasPage() {
    const [misConvocatorias, setMisConvocatorias] = useState<Convocatoria[]>([]);

    const { refetch: refetchConvocatorias, data: convocatorias, isPending: pendingConv } = useGetConvocatorias();
    const { mutate: fetchMyProjects, data: misProyectos, isPending: pendingMyProj } = useGetMyProjects();

    useEffect(() => {
        // Refetch both convocatorias and projects when the component mounts
        refetchConvocatorias();
        fetchMyProjects();
    }, [refetchConvocatorias, fetchMyProjects]);

    useEffect(() => {
        // Synchronize and compute misConvocatorias when both datasets are available
        if (convocatorias && misProyectos) {
            const myConvocatorias: Convocatoria[] = convocatorias.filter((convocatoria) => {
                const categoriasConv = convocatoria.CategoriaConvocatoria.map((categoria) => categoria.id_categoria);

                return misProyectos.some((proyecto) =>
                    categoriasConv.includes(proyecto.CategoriaConvocatorium.id_categoria)
                );
            });

            setMisConvocatorias(myConvocatorias);
        }
    }, [convocatorias, misProyectos]);

    if (pendingConv || pendingMyProj) {
        return (
            <div className="w-full flex justify-center mt-10">
                <ClipLoader color="#333" size={50} />
            </div>
        );
    }

    return (
        <div>
            <h1 className="font-bold text-xl mb-8">Mis convocatorias</h1>
            <div className="items-start">
                {misConvocatorias.length > 0 ? (
                    misConvocatorias.map((convocatoria) => (
                        <ConvocatoriaInfoCard
                            addProyectoButton={false}
                            key={convocatoria.id_convocatoria}
                            convocatoria={convocatoria}
                        />
                    ))
                ) : (
                    <p className="text-center text-muted-foreground">
                        No se encontraron convocatorias relacionadas con tus proyectos.
                    </p>
                )}
            </div>
        </div>
    );
}