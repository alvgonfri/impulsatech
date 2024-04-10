import { z } from "zod";
import { checkIfEmailExists } from "../libs/checkIfEmailExists.js";

export const registerSchema = z.object({
    name: z
        .string({ required_error: "El nombre es requerido" })
        .min(1, { message: "El nombre no debe estar vacío" }),
    surname: z
        .string({ required_error: "El apellido es requerido" })
        .min(1, { message: "El apellido no debe estar vacío" }),
    email: z
        .string({ required_error: "El correo electrónico es requerido" })
        .email({ message: "El correo electrónico no es válido" })
        .refine(async (value) => !(await checkIfEmailExists(value)), {
            message: "El correo electrónico ya está en uso",
        }),
    password: z
        .string({ required_error: "La contraseña es requerida" })
        .min(8, {
            message: "La contraseña debe tener al menos 8 caracteres",
        }),
    phone: z
        .string()
        .min(9, { message: "El teléfono no es válido" })
        .max(9, { message: "El teléfono no es válido" })
        .optional(),
    bio: z
        .string()
        .max(200, {
            message: "La biografía no debe tener más de 200 caracteres",
        })
        .optional(),
});

export const registerOrganizationSchema = z.object({
    name: z
        .string({ required_error: "El nombre es requerido" })
        .min(1, { message: "El nombre no debe estar vacío" }),
    email: z
        .string({ required_error: "El correo electrónico es requerido" })
        .email({ message: "El correo electrónico no es válido" })
        .refine(async (value) => !(await checkIfEmailExists(value)), {
            message: "El correo electrónico ya está en uso",
        }),
    password: z
        .string({ required_error: "La contraseña es requerida" })
        .min(8, {
            message: "La contraseña debe tener al menos 8 caracteres",
        }),
    phone: z
        .string()
        .min(9, { message: "El teléfono no es válido" })
        .max(9, { message: "El teléfono no es válido" })
        .optional(),
    bio: z
        .string()
        .max(200, {
            message: "La biografía no debe tener más de 200 caracteres",
        })
        .optional(),
});

export const loginSchema = z.object({
    email: z.string({ required_error: "El email es requerido" }).email({
        message: "El email no es válido",
    }),
    password: z.string({ required_error: "La contraseña es requerida" }),
});
