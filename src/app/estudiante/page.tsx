"use client";

import { useGetConvocatorias } from "@/features/convocatorias/api/use-get-convocatorias";
import ConvocatoriaInfoCard from "@/features/convocatorias/components/convocatoria-info-card";
import { useEffect } from "react";
import { ClipLoader } from "react-spinners";

export default function EstudiantePage() {

    const { refetch, data, isPending } = useGetConvocatorias();

    useEffect(() => {
        refetch();
    }, []);

    if (isPending) {
        return (
            <div className="w-full flex justify-center mt-10">
                <ClipLoader color="#333" size={50} />
            </div>
        );
    }

    return (
        <div>
            <div className="mb-8 mt-3">
                <h1 className="font-bold text-xl">Convocatorias disponibles</h1>
                <span className="text-sm">Encuentra aquí las convocatorias disponibles para participar</span>
            </div>
            <div className="w-full flex flex-wrap gap-4">
                {data?.map((convocatoria) => (
                    <ConvocatoriaInfoCard addProyectoButton key={convocatoria.id_convocatoria} convocatoria={convocatoria} />
                ))}
            </div>
        </div>
    );
}