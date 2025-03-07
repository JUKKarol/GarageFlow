import {z} from 'zod';

export const loginSchema = z.object({
    email: z.string().email('Błędny adres email lub hasło').min(4, 'Błędny adres email lub hasło'),
    password: z.string().min(6, 'Błędny adres email lub hasło').min(1, 'Błędny adres email lub hasło'),
});

export const registerSchema = z.object({
    email: z.string().email({ message: "Nieprawidłowy format adresu email" }),
    password: z.string()
        .min(8, { message: "Hasło musi mieć co najmniej 8 znaków" })
        .regex(/[A-Z]/, { message: "Hasło musi zawierać przynajmniej jedną wielką literę" })
        .regex(/[a-z]/, { message: "Hasło musi zawierać przynajmniej jedną małą literę" })
        .regex(/[0-9]/, { message: "Hasło musi zawierać przynajmniej jedną cyfrę" }),
    passwordConfirmation: z.string()
}).refine((data) => data.password === data.passwordConfirmation, {
    message: "Hasła muszą być takie same",
    path: ["passwordConfirmation"]
});