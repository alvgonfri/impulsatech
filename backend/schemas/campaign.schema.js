import { z } from "zod";
import {
    checkIfDateIsFuture,
    checkIfDateIsTodayOrFuture,
    checkIfIbanIsValid,
} from "../libs/checks.js";

export const createCampaignSchema = z.object({
    title: z
        .string({ required_error: "El título es requerido" })
        .min(1, {
            message: "El título no debe estar vacío",
        })
        .max(60, {
            message: "El título no debe tener más de 60 caracteres",
        }),
    description: z
        .string({ required_error: "La descripción es requerida" })
        .min(1, {
            message: "La descripción no debe estar vacía",
        })
        .max(1000, {
            message: "La descripción no debe tener más de 1.000 caracteres",
        }),
    timeGoal: z
        .number()
        .int({ message: "El objetivo de tiempo debe ser un número entero" })
        .min(5, {
            message: "El objetivo de tiempo debe de al menos 5 horas",
        })
        .max(5000, {
            message: "El objetivo de tiempo no puede ser mayor de 5.000 horas",
        })
        .optional(),
    timeGoalPeriod: z
        .object({
            startDate: z
                .string({
                    required_error:
                        "La fecha de inicio del periodo de recibimiento es requerida",
                })
                .refine((value) => checkIfDateIsFuture(value), {
                    message:
                        "La fecha de inicio del periodo de recibimiento debe ser una fecha futura",
                }),
            endDate: z
                .string({
                    required_error:
                        "La fecha de fin del periodo de recibimiento es requerida",
                })
                .refine((value) => checkIfDateIsFuture(value), {
                    message:
                        "La fecha de fin del periodo de recibimiento debe ser una fecha futura",
                }),
        })
        .optional(),
    financialGoal: z
        .number()
        .int({ message: "El objetivo financiero debe ser un número entero" })
        .min(10, {
            message: "El objetivo financiero debe de al menos 10 €",
        })
        .max(100000000, {
            message:
                "El objetivo financiero no puede ser mayor de 100.000.000 €",
        })
        .optional(),
    iban: z
        .string()
        .refine((value) => checkIfIbanIsValid(value), {
            message: "El IBAN no es válido",
        })
        .optional(),
    deadline: z
        .string()
        .refine((value) => checkIfDateIsTodayOrFuture(value), {
            message: "La fecha límite no puede ser anterior a hoy",
        })
        .optional(),
});

export const updateCampaignSchema = z.object({
    title: z
        .string()
        .min(1, {
            message: "El título no debe estar vacío",
        })
        .max(60, {
            message: "El título no debe tener más de 60 caracteres",
        })
        .optional(),
    description: z
        .string()
        .min(1, {
            message: "La descripción no debe estar vacía",
        })
        .max(1000, {
            message: "La descripción no debe tener más de 1.000 caracteres",
        })
        .optional(),
    timeGoal: z
        .number()
        .int({ message: "El objetivo de tiempo debe ser un número entero" })
        .min(5, {
            message: "El objetivo de tiempo debe de al menos 5 horas",
        })
        .max(5000, {
            message: "El objetivo de tiempo no puede ser mayor de 5.000 horas",
        })
        .optional(),
    financialGoal: z
        .number()
        .int({ message: "El objetivo financiero debe ser un número entero" })
        .min(10, {
            message: "El objetivo financiero debe de al menos 10 €",
        })
        .max(100000000, {
            message:
                "El objetivo financiero no puede ser mayor de 100.000.000 €",
        })
        .optional(),
    deadline: z
        .string()
        .refine(
            (value) => {
                const deadline = new Date(value).toISOString().slice(0, 10);
                return deadline >= new Date().toISOString().slice(0, 10);
            },
            { message: "La fecha límite no puede ser anterior a hoy" }
        )
        .optional(),
});
