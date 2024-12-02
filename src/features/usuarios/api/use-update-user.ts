import { useMutation } from "@tanstack/react-query";
import { BASE_URL } from "@/core/environment";
import axios from "axios";
import { User } from "../types/user";
import { UpdateUser } from "../types/update-user";


export const useUpdateUser = () => {

    const mutation = useMutation({
        mutationFn: async (newUser: UpdateUser) => {
            const response = await axios.put(`${BASE_URL}/usuarios/${newUser.id_usuario}`, newUser);
            console.log(response.data)
            return response.data as User[];
        },
    }
    );

    return mutation;
};