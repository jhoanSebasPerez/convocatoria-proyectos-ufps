import { useMutation } from "@tanstack/react-query";
import { BASE_URL } from "@/core/environment";
import axios from "axios";
import { CreateConvocatoria } from "../types/create-convocatoria";

export const useCreateConvocatoria = () => {
    const mutation = useMutation({
        mutationFn: async (newConvocatoria: CreateConvocatoria) => {
            const response = await axios.post(`${BASE_URL}/convocatorias`, newConvocatoria);

            if (response.status !== 201) {
                throw new Error("Error al crear la convocatoria");
            }


            newConvocatoria.categorias.forEach(async (categoria) => {
                await axios.post(`${BASE_URL}/categorias`, {
                    id_convocatoria: response.data.newConvocatoria.id_convocatoria,
                    nombre_categoria: categoria
                });
            });

            return response.data;
        }
    }
    );

    return mutation;
};