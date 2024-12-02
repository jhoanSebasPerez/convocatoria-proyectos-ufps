import { useMutation } from "@tanstack/react-query";
import { BASE_URL } from "@/core/environment";
import axios from "axios";
import { CreateProyecto } from "../types/project-create";

export const useCreateProyecto = () => {
    const mutation = useMutation({
        mutationFn: async (newProyecto: CreateProyecto) => {
            const response = await axios.post(`${BASE_URL}/proyectos`, newProyecto);
            return response.data;
        }
    }
    );

    return mutation;
};