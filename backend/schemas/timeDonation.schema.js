import { z } from "zod";
import { checkIfDateIsFuture } from "../libs/checks.js";

export const createTimeDonationSchema = z.object({
    amount: z
        .number()
        .int({ message: "La cantidad debe ser un número entero" })
        .min(1, {
            message: "La cantidad debe ser de al menos 1 hora",
        })
        .max(1000, {
            message: "La cantidad no puede ser mayor de 1.000 horas",
        }),
    period: z.object({
        startDate: z
            .string({ required_error: "La fecha de inicio es requerida" })
            .refine((value) => checkIfDateIsFuture(value), {
                message: "La fecha de inicio debe ser una fecha futura",
            }),
        endDate: z
            .string({ required_error: "La fecha de fin es requerida" })
            .refine((value) => checkIfDateIsFuture(value), {
                message: "La fecha de fin debe ser una fecha futura",
            }),
    }),
});
