import { z } from 'zod';

export const ModelSchema = z.object({
  name: z.string()
  .min(1, "Nazwa modelu nie może być pusta")
  .max(10, "Nazwa modelu nie może być dłuższa niż 10 znaków")
});