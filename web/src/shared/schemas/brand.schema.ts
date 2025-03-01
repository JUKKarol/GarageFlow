import { z } from 'zod';

export const BrandSchema = z.object({
  name: z.string()
  .min(1, "Nazwa marki nie może być pusta")
  .max(10, "Nazwa marki nie może być dłuższa niż 10 znaków")
});