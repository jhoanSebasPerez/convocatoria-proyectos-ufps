import { useMutation } from "@tanstack/react-query";
import { BASE_URL } from "@/core/environment";
import axios from "axios";
import { signInFormSchema } from '../schemas/sign-in-schema';
import { z } from "zod";

export const useLogin = () => {

    const mutation = useMutation({
        mutationFn: async (values: z.infer<typeof signInFormSchema>) => {
            const loginData = {
                correo: values.email,
                contrasena: values.password
            }
            const response = await axios.post(`${BASE_URL}/auth/login`, loginData);
            return response.data as LoginResponseType;
        },
    }
    );

    return mutation;
};