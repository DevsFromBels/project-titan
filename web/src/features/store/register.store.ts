import { create } from 'zustand';

interface RegistrationState {
  name: string;
  setName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  token: string;
  setToken: (token: string) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  error: null | string;
  setError: (error: null | string) => void;
  otp: string;
  setOtp: (otp: string) => void;
  otpDialog: boolean;
  setOtpDialog: (otpDialog: boolean) => void;
  otpLoading: boolean;
  setOtpLoading: (otpLoading: boolean) => void;
  otpError: null | string;
  setOtpError: (otpError: null | string) => void;
}

export const useRegistrationStore = create<RegistrationState>((set) => ({
  name: '',
  setName: (name) => set({ name }),
  email: '',
  setEmail: (email) => set({ email }),
  password: '',
  setPassword: (password) => set({ password }),
  token: '',
  setToken: (token) => set({ token }),
  loading: false,
  setLoading: (loading) => set({ loading }),
  error: null,
  setError: (error) => set({ error }),
  otp: '',
  setOtp: (otp) => set({ otp }),
  otpDialog: false,
  setOtpDialog: (otpDialog) => set({ otpDialog }),
  otpLoading: false,
  setOtpLoading: (otpLoading) => set({ otpLoading }),
  otpError: null,
  setOtpError: (otpError) => set({ otpError }),
}));