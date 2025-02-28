// src/shared/utils/validation.ts
import { z } from "zod";

/**
 * A reusable function for validating form data against a Zod schema.
 * 
 * @param schema The Zod schema to validate against
 * @param data The data to validate
 * @returns An object containing isValid flag and formatted errors
 */
export function validateWithZod<T>(schema: z.ZodType<T>, data: any): {
  isValid: boolean;
  errors: { [key: string]: string };
} {
  try {
    schema.parse(data);
    return { isValid: true, errors: {} };
  } catch (err) {
    if (err instanceof z.ZodError) {
      const formattedErrors: { [key: string]: string } = {};
      err.errors.forEach((error) => {
        const path = error.path[0]?.toString() || "form";
        formattedErrors[path] = error.message;
      });
      return { isValid: false, errors: formattedErrors };
    }
    return { 
      isValid: false, 
      errors: { form: "Wystąpił nieznany błąd walidacji." } 
    };
  }
}