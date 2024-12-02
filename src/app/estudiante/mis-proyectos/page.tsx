"use client";

import { useEffect } from "react";
import ProjectsTable from "@/features/proyectos/components/projects-table";
import { ClipLoader } from "react-spinners";
import { useGetMyProjects } from "@/features/proyectos/api/use-get-my-projects";

export default function MisProyectosPage() {
    const { mutate, data, isPending } = useGetMyProjects();

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