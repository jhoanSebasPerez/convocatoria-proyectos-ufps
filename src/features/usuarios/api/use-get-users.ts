import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "@/core/environment";
import { User } from "../types/user";

const fetchUsers = async (): Promise<User[]> => {
    const response = await axios.get(`${BASE_URL}/usuarios`);
    return response.data;
};

export const useGetUsers = () => {
    return useQuery<User[], Error>({
        queryKey: ["users"], // Clave única para identificar la consulta
        queryFn: fetchUsers, // Función para obtener los datos
    });
};