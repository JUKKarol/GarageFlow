'use client'

import React, { useState } from "react";
import { z } from "zod";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {register} from "@/modules/auth/login/services/registerService";
import { registerSchema } from "@/modules/auth/login/validation/authValidation";



export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    
    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);

        try {
            registerSchema.parse({ email, password, passwordConfirmation });

            try {
                await register(email, password);
                
                router.push('/login'); 

            } catch (error) {
                setError('Rejestracja nie powiodła się. Spróbuj ponownie.');
                console.error(error);
            }

        } catch (validationError) {
            if (validationError instanceof z.ZodError) {
                setError(validationError.errors[0].message); 
            } else {
                setError('Wystąpił nieoczekiwany błąd');
            }
        } finally {
            setIsSubmitting(false); 
        }
    };

    return (
        <main className="flex flex-col justify-center w-full flex-grow items-center mx-auto px-4 py-8">
            <Card className="w-full text-white max-w-md bg-zinc-950 border-zinc-800">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">GarageFlow</CardTitle>
                    <CardDescription className="text-center">Utwórz nowe konto</CardDescription>
                </CardHeader>
                <form onSubmit={handleRegister}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input 
                                id="email"
                                type="email"
                                placeholder="Wprowadź swój email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required                            
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Hasło</Label>
                            <Input 
                                id="password"
                                type="password"
                                placeholder="Wprowadź hasło"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="passwordConfirmation">Potwierdź hasło</Label>
                            <Input 
                                id="passwordConfirmation"
                                type="password"
                                placeholder="Powtórz hasło"
                                value={passwordConfirmation}
                                onChange={(e) => setPasswordConfirmation(e.target.value)}
                                required
                            />
                        </div>
                    </CardContent>
                    {error && <p className="text-red-500 text-center mb-5">{error}</p>} 
                    <CardFooter>
                        <Button
                            className="w-full font-medium bg-blue-700 hover:bg-blue-800"
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Trwa rejestracja...' : 'Zarejestruj się'}
                        </Button>
                    </CardFooter>
                    <div className="text-center pb-4">
                        <Link className="text-blue-400 hover:underline" href="/login">
                            Masz już konto? Zaloguj się
                        </Link>
                    </div>
                </form>
            </Card>
        </main>
    );
}