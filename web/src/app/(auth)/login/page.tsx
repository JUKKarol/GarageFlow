'use client'

import React, { useState } from "react";
import { loginSchema } from "@/modules/auth/login/validation/authValidation";
import { login } from "@/modules/auth/login/services/loginService";
import { z } from "zod";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
export default function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);

        try {

            loginSchema.parse({ email, password });

            try {
                await login(email, password);
                    
                router.push('/admin/dashboard'); 

            } catch (error) {
                setError('Błędny email lub hasło');
                console.error(error);
            }


        } catch (validationError) {
            if (validationError instanceof z.ZodError) {
                setError(validationError.errors[0].message); 
            } else {
                setError('An unexpected error occurred');
            }
        } finally {
            setIsSubmitting(false); 
        }
    };



    return (
        <main className="min-h-screen bg-black flex items-center justify-center">
            <Card className="w-full text-white max-w-md bg-zinc-950 border-zinc-800">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">GarageFlow</CardTitle>
                    <CardDescription className="text-center">Zaloguj się aby kontynuować</CardDescription>
                </CardHeader>
                <form onSubmit={handleLogin}>
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
                            placeholder="Wprowadź swoje hasło"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <Checkbox id="remember-me" className="border-white"></Checkbox>
                                <Label htmlFor="remember-me">Zapamiętaj mnie</Label>
                            </div>
                            <a href="#" className="text-blue-400 hover:underline">Zapomniałeś hasła?</a>
                        </div>
                    </CardContent>
                    {error && <p className="text-red-500 text-center mb-5">{error}</p>} {/* Display error message */}
                    <CardFooter>
                        <Button
                                className="w-full font-medium bg-blue-700 hover:bg-blue-800"
                                type="submit"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Trwa logowanie...' : 'Zaloguj się'}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </main>
    );
}