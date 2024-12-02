import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "@/core/environment";
import axios from "axios";
import { Convocatoria } from "../types/convocatoria";


const fetchConvocatorias = async (): Promise<Convocatoria[]> => {
    const response = await axios.get(`${BASE_URL}/convocatorias`);
    return response.data;
};

export const useGetConvocatorias = () => {
    return useQuery<Convocatoria[], Error>({
        queryKey: ["convocatorias"], // Clave única para identificar la consulta
        queryFn: fetchConvocatorias, // Función para obtener los datos
    });
};