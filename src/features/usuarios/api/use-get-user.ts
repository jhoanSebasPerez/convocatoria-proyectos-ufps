import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "@/core/environment";
import { User } from "../types/user";

const fetchUser = async (id: string): Promise<User> => {
    const response = await axios.get(`${BASE_URL}/usuarios/${id}`);
    return response.data;
};

export const useGetUser = (id: string) => {
    return useQuery<User, Error>({
        queryKey: ["user"], // Clave única para identificar la consulta
        queryFn: () => fetchUser(id), // Función para obtener los datos
    });
};