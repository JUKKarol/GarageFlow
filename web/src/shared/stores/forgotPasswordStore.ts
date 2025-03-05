import { create } from 'zustand';
import { ResetPasswordSchema, EmailSchema } from '../schemas/forgotPassword.schema';
import { z } from 'zod';

interface ForgotPasswordState {
  step: 'email' | 'reset';
  email: string;
  resetCode: string;
  newPassword: string;
  confirmPassword: string;
  errors: {
    email?: string;
    resetCode?: string;
    newPassword?: string;
    confirmPassword?: string;
  };
  setEmail: (email: string) => void;
  setResetCode: (code: string) => void;
  setNewPassword: (password: string) => void;
  setConfirmPassword: (password: string) => void;
  validateEmail: () => boolean;
  validateResetPassword: () => boolean;
  resetState: () => void;
  moveToResetStep: () => void;
}

// Zustand store
const useForgotPasswordStore = create<ForgotPasswordState>((set, get) => ({
  step: 'email',
  email: '',
  resetCode: '',
  newPassword: '',
  confirmPassword: '',
  errors: {},

  setEmail: (email) => set({ email, errors: {} }),
  
  setResetCode: (resetCode) => set({ resetCode, errors: {} }),
  
  setNewPassword: (newPassword) => set({ newPassword, errors: {} }),
  
  setConfirmPassword: (confirmPassword) => set({ confirmPassword, errors: {} }),
  
  validateEmail: () => {
    try {
      EmailSchema.parse({ email: get().email });
      set({ errors: {} });
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        set({ errors: { email: error.errors[0].message } });
      }
      return false;
    }
  },
  
  validateResetPassword: () => {
    try {
      ResetPasswordSchema.parse({
        email: get().email,
        resetCode: get().resetCode,
        newPassword: get().newPassword,
      });
      set({ errors: {} });
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages: { [key: string]: string } = {};
        error.errors.forEach(err => {
          errorMessages[err.path[0] as string] = err.message;
        });
        set({ errors: errorMessages });
      }
      return false;
    }
  },
  
  moveToResetStep: () => set({ step: 'reset' }),
  
  resetState: () => set({
    step: 'email',
    email: '',
    resetCode: '',
    newPassword: '',
    confirmPassword: '',
    errors: {}
  })
}));

export default useForgotPasswordStore;