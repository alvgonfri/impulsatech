import { z } from "zod";

export const createFinancialDonationSchema = z.object({
    amount: z
        .number()
        .int({ message: "La cantidad debe ser un número entero" })
        .min(1, {
            message: "La cantidad debe ser de al menos 1 €",
        })
        .max(1000000, {
            message: "La cantidad no puede ser mayor de 1.000.000 €",
        }),
    anonymous: z.boolean(),
});

export const updateFinancialDonationSchema = z.object({
    anonymous: z.boolean(),
});
