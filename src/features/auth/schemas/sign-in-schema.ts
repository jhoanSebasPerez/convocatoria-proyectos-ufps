import { z } from "zod";

export const signInFormSchema = z.object({
    email: z.string()
        .email({ message: "El correo debe ser válido." }),
    //.endsWith(`@${allowedDomain}`, `El correo debe ser con extención @${allowedDomain}.`),
    password: z.string().min(1, "La contraseña es requerida."),
});
