import { useMutation } from "@tanstack/react-query";
import { BASE_URL } from "@/core/environment";
import axios from "axios";
import { Convocatoria } from "../types/convocatoria";


export const useGetDetailConvocatoria = (id: string) => {

    const mutation = useMutation({
        mutationFn: async () => {
            const response = await axios.get(`${BASE_URL}/convocatorias/${id}`);
            return response.data as Convocatoria;
        },
    }
    );

    return mutation;
};