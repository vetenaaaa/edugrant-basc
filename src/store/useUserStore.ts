import { create } from "zustand";
import { UserProfileTypes } from "@/lib/types";

type UserStore = {
  user: UserProfileTypes | null;
  loading: boolean;
  error: string | null;
  setUser: (user: UserProfileTypes) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  loading: false,
  error: null,
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));
