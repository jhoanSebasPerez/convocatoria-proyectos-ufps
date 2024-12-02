"use client"

import { useGetProjects } from "@/features/proyectos/api/use-get-projects";
import ProjectsTable from "@/features/proyectos/components/projects-table";
import { useEffect } from "react";
import { ClipLoader } from "react-spinners";

export default function ProyectosPage() {

    const { mutate, data, isPending } = useGetProjects();

    useEffect(() => {
        mutate();

    }, [mutate]);

    if (isPending) {
        return (
            <div className="w-full flex justify-center mt-10">
                <ClipLoader color="#333" size={50} />
            </div>
        );
    }

    if (data) {
        return (
            <ProjectsTable projects={data} />
        );
    }
}