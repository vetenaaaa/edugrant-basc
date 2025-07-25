// store/useUserStore.ts
import { create } from "zustand";

type UserData = {
  userId: number;
  studentId: string;
  studentEmail: string;
  firstName: string;
  middleName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  contactNumber: string;
  address: string;
  studentCourseYearSection: {
    year: string;
    course: string;
    section: string;
  };
};

type UserStore = {
  user: UserData | null;
  setUser: (data: UserData) => void;
  clearUser: () => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (data) => set({ user: data }),
  clearUser: () => set({ user: null }),
}));
