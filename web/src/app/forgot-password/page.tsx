'use client'
import { Navbar } from "../_components/navbar"
import { EmailResetForm, ResetPasswordForm } from "./reset-password"
import useForgotPasswordStore from "@/shared/stores/forgotPasswordStore"

export default function ForgotPasswordPage() {
  const { step } = useForgotPasswordStore()

  return (
    <div className="flex flex-col min-h-screen w-full bg-black">
      <Navbar />
      <main className="flex flex-col justify-center w-full flex-grow items-center mx-auto px-4 py-8">

      {step === 'email' ? <EmailResetForm /> : <ResetPasswordForm />}
        </main>
      <footer className="bg-zinc-950 text-gray-400 py-4">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 GarageFlow. Wszelkie prawa zastrzeżone.</p>
        </div>
      </footer>
    </div>
  )
}