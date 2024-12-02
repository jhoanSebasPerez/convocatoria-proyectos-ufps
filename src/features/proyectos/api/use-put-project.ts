import { useMutation } from "@tanstack/react-query";
import { BASE_URL } from "@/core/environment";
import axios from "axios";
import { CreateProyecto } from "../types/project-create";


export const useUpdatedProyecto = () => {
    const mutation = useMutation({
        mutationFn: async ({ idProyecto, proyectoUpdated }: { idProyecto: string; proyectoUpdated: CreateProyecto }) => {
            const response = await axios.put(`${BASE_URL}/proyectos/${idProyecto}`, proyectoUpdated);
            console.log(response.data);
            return response.data;
        },
    });

    return mutation;
};