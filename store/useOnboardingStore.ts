import { create } from "zustand";

type Gender = "Male" | "Female" | "Other" | null;

type OnboardingState = {
  phone: string;
  name: string;
  age: string;
  gender: Gender;
  completed: boolean;
  setPhone: (phone: string) => void;
  setName: (name: string) => void;
  setAge: (age: string) => void;
  setGender: (gender: Gender) => void;
  markCompleted: () => void;
  reset: () => void;
};

export const useOnboardingStore = create<OnboardingState>((set) => ({
  phone: "",
  name: "",
  age: "",
  gender: null,
  completed: false,
  setPhone: (phone) => set({ phone }),
  setName: (name) => set({ name }),
  setAge: (age) => set({ age }),
  setGender: (gender) => set({ gender }),
  markCompleted: () => set({ completed: true }),
  reset: () =>
    set({
      phone: "",
      name: "",
      age: "",
      gender: null,
      completed: false,
    }),
}));
