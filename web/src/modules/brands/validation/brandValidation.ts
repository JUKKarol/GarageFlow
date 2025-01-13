import {z} from 'zod';

export const brandSchema = z.object({
    name: z.string().min(3, 'Nazwa marki musi mieć co najmniej 3 znaki'),
});