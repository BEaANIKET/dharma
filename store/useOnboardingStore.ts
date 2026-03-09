import { create } from "zustand";

export type GenderOption = "Male" | "Female" | "Other";

type OnboardingState = {
  phone: string;
  name: string;
  email: string;
  dateOfBirth: Date | null;
  gender: GenderOption | null;
  city: string;
  completed: boolean;

  setPhone: (phone: string) => void;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setDateOfBirth: (date: Date) => void;
  setCity: (city: string) => void;
  setGender: (gender: GenderOption) => void;

  markCompleted: () => void;
  reset: () => void;
};

export const useOnboardingStore = create<OnboardingState>((set) => ({
  phone: "",
  name: "",
  email: "",
  dateOfBirth: null,
  gender: null,
  city: "",
  completed: false,

  setPhone: (phone) => set({ phone }),
  setName: (name) => set({ name }),
  setEmail: (email) => set({ email }),
  setCity: (city) => set({city}),
  setDateOfBirth: (date) => set({ dateOfBirth: date }),

  setGender: (gender) => set({ gender }),

  markCompleted: () => set({ completed: true }),

  reset: () =>
    set({
      phone: "",
      name: "",
      email: "",
      dateOfBirth: null,
      gender: null,
      completed: false,
    }),
}));
