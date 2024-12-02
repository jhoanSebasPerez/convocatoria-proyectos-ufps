import { useMutation } from "@tanstack/react-query";
import { BASE_URL } from "@/core/environment";
import axios from "axios";
import { z } from "zod";
import { signUpSchema } from "../schemas/sign-up-schema";

export const useRegister = () => {
    const mutation = useMutation({
        mutationFn: async (values: z.infer<typeof signUpSchema>) => {
            const loginData = {
                nombre: values.firstName,
                apellido: values.lastName,
                correo: values.email,
                contrasena: values.password
            }
            const response = await axios.post(`${BASE_URL}/auth/register`, loginData);
            return response.data;
        }
    }
    );

    return mutation;
};