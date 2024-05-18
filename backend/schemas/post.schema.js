import { z } from "zod";

export const createPostSchema = z.object({
    content: z
        .string({ required_error: "El contenido es requerido" })
        .min(1, {
            message: "El contenido no debe estar vacío",
        })
        .max(400, {
            message: "El contenido no debe tener más de 400 caracteres",
        }),
});
