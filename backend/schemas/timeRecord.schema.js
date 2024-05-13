import { z } from "zod";

export const createTimeRecordSchema = z.object({
    amount: z
        .number()
        .int({ message: "La cantidad debe ser un número entero" })
        .min(1, {
            message: "La cantidad debe ser de al menos 1 hora",
        })
        .max(24, {
            message: "La cantidad no puede ser mayor de 24 horas",
        }),
    date: z.string({ required_error: "La fecha es requerida" }),
    description: z
        .string()
        .max(200, {
            message: "La descripción no puede tener más de 200 caracteres",
        })
        .optional(),
});
