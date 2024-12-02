import { useMutation } from "@tanstack/react-query";
import { BASE_URL } from "@/core/environment";
import axios from "axios";
import { RegisterUser } from "../types/register-user";

export const useRegisterUser = () => {
    const mutation = useMutation({
        mutationFn: async (newUser: RegisterUser) => {
            const response = await axios.post(`${BASE_URL}/usuarios`, newUser);
            console.log(response.data);
            return response.data;
        }
    }
    );

    return mutation;
};