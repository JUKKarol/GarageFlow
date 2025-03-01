import { z } from 'zod';

export const CarSchema = z.object({
    registrationNumber: z.string()
        .min(1, "Numer rejestracyjny nie może być pusty")
        .max(10, "Numer rejestracyjny nie może być dłuższy niż 10 znaków"),
    vin: z.string()
        .length(17, "VIN nie jest poprawny"),
    modelId: z.string()
        .nonempty("Model nie może być pusty")
        .uuid("Wybierz model"),
    fuelType: z.number().int().min(0, "Niepoprawny typ paliwa"),
    yearOfProduction: z.number()
        .int()
        .min(1900, "Rok produkcji nie może być wcześniejszy niż 1900")
        .max(new Date().getFullYear(), `Rok produkcji nie może być późniejszy niż ${new Date().getFullYear()}`),
    engine: z.string().min(1, "Silnik jest wymagany")
});