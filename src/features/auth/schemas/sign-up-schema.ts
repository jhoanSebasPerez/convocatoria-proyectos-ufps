import { z } from "zod";

export const signUpSchema = z.object({
    firstName: z.string().min(1, "El nombre es requerido."),
    lastName: z.string().min(1, "El apellido es requerido."),
    email: z.string()
        .email({ message: "El correo debe ser válido." }),
    //.endsWith(`@${allowedDomain}`, `El correo debe ser con extención @${allowedDomain}.`),
    password: z.string().min(1, "La contraseña es requerida."),
});
