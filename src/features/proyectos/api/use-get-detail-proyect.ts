import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "@/core/environment";
import { ProjectDetail } from "../types/project-detail";


const fetchProjectDetail = async (id: string): Promise<ProjectDetail> => {
    const response = await axios.get(`${BASE_URL}/proyectos/${id}`);
    return response.data;
};

export const useGetProjectDetail = (id: string) => {
    return useQuery<ProjectDetail, Error>({
        queryKey: ["project"], // Clave única para identificar la consulta
        queryFn: () => fetchProjectDetail(id), // Función para obtener los datos
    });
};