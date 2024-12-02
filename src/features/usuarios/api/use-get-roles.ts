import { useMutation } from "@tanstack/react-query";
import { BASE_URL } from "@/core/environment";
import axios from "axios";
import { User } from "../types/user";
import { Rol } from "../types/rol";


export const useGetRoles = () => {

    const mutation = useMutation({
        mutationFn: async () => {
            const response = await axios.get(`${BASE_URL}/roles`);
            console.log(response.data)
            return response.data as Rol[];
        },
    }
    );

    return mutation;
};