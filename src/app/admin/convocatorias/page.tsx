"use client";

import { useGetConvocatorias } from "@/features/convocatorias/api/use-get-convocatorias";
import ConvocatoriaInfoCard from "@/features/convocatorias/components/convocatoria-info-card";
import DialogConvocatoria from "@/features/convocatorias/components/dialog-convocatoria";
import { useEffect } from "react";
import { ClipLoader } from "react-spinners";

export default function ConvocatoriasPage() {

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
            <div className="flex justify-end mb-8">
                <DialogConvocatoria refetch={refetch} />
            </div>
            <div className="flex gap-4">
                {data?.map((convocatoria) => (
                    <ConvocatoriaInfoCard addProyectoButton={false} key={convocatoria.id_convocatoria} convocatoria={convocatoria} />
                ))}
            </div>
        </div>
    );
}