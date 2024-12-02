"use client";

import { useMutation } from "@tanstack/react-query";
import { BASE_URL } from "@/core/environment";
import axios from "axios";
import { ProjectList } from "../types/project-list";

// Asegurarte de que localStorage solo se accede en el cliente
const getUserId = () => {
    if (typeof window !== "undefined") {
        return localStorage.getItem("userId") || "";
    }
    return ""; // Valor por defecto para el servidor
};

const filtrarPorIntegrante = (proyectos: ProjectList[], userId: string) => {
    return proyectos.filter(proyecto =>
        proyecto.integrantes.some(integrante => integrante.id_usuario === userId)
    );
};

export const useGetMyProjects = () => {
    const mutation = useMutation({
        mutationFn: async () => {
            const response = await axios.get(`${BASE_URL}/proyectos`);
            const userId = getUserId();
            return filtrarPorIntegrante(response.data, userId) as ProjectList[];
        },
    });

    return mutation;
};