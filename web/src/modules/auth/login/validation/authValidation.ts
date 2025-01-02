import {z} from 'zod';

export const loginSchema = z.object({
    email: z.string().email('Błędny adres email lub hasło').min(4, 'Błędny adres email lub hasło'),
    password: z.string().min(6, 'Błędny adres email lub hasło').min(1, 'Błędny adres email lub hasło'),
});