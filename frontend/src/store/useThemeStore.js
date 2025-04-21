import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("light") || "light",
  setTheme: (theme) => {
    localStorage.setItem("chat-theme", theme);
    set({ theme });
  },
}));
