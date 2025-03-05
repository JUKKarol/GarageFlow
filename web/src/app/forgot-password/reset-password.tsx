'use client'

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useForgotPasswordStore from '@/shared/stores/forgotPasswordStore';
import { postForgotPassword, postResetPassword } from '@/modules/forgot-password/services/forgot-passwordService';
import { useRouter } from 'next/navigation';

const EmailResetForm: React.FC = () => {
  const { 
    email, 
    errors, 
    setEmail, 
    validateEmail, 
    moveToResetStep 
  } = useForgotPasswordStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    
    if (validateEmail()) {
      try {
        await postForgotPassword(email);
        moveToResetStep();
      } catch (error) {
        setError('Nie udało się wysłać kodu resetowania');
        console.error(error);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full text-white max-w-md bg-zinc-950 border-zinc-800">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">GarageFlow</CardTitle>
        <CardDescription className="text-center">Zresetuj swoje hasło</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
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
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
        </CardContent>
        {error && <p className="text-red-500 text-center mb-5">{error}</p>}
        <CardFooter>
          <Button
            className="w-full font-medium bg-blue-700 hover:bg-blue-800"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Wysyłanie...' : 'Wyślij kod resetowania'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

const ResetPasswordForm: React.FC = () => {
  const { 
    email, 
    resetCode, 
    newPassword, 
    errors,
    setResetCode,
    setNewPassword,
    validateResetPassword,
  } = useForgotPasswordStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    
    if (validateResetPassword()) {
      try {
        await postResetPassword(email, resetCode, newPassword);
        router.push('/login'); 
      } catch (error) {
        setError('Nie udało się zresetować hasła');
        console.error(error);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full text-white max-w-md bg-zinc-950 border-zinc-800">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">GarageFlow</CardTitle>
        <CardDescription className="text-center">Ustaw nowe hasło</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="resetCode">Kod resetowania</Label>
            <Input
              id="resetCode"
              type="text"
              placeholder="Wprowadź kod resetowania"
              value={resetCode}
              onChange={(e) => setResetCode(e.target.value)}
              required
            />
            {errors.resetCode && (
              <p className="text-red-500 text-sm mt-1">{errors.resetCode}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="newPassword">Nowe hasło</Label>
            <Input
              id="newPassword"
              type="password"
              placeholder="Wprowadź nowe hasło"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            {errors.newPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>
            )}
          </div>

        </CardContent>
        {error && <p className="text-red-500 text-center mb-5">{error}</p>}
        <CardFooter>
          <Button
            className="w-full font-medium bg-blue-700 hover:bg-blue-800"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Resetowanie...' : 'Ustaw nowe hasło'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export { EmailResetForm, ResetPasswordForm };