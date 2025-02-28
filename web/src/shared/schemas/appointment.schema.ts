import { z } from "zod";

export const AppointmentSchema = z.object({
    plannedStartAt: z.string().min(1, "Data rozpoczęcia jest wymagana"),
    plannedFinishAt: z.string().min(1, "Data zakończenia jest wymagana"),
    description: z.string().min(3, "Opis musi zawierać co najmniej 3 znaki"),
    customerName: z.string().min(2, "Imię klienta musi zawierać co najmniej 2 znaki"),
    customerPhoneNumber: z.string().min(9, "Wprowadź poprawny numer telefonu").max(15, "Numer telefonu jest za długi"),
    customerEmail: z.string().email("Wprowadź poprawny adres email")
})