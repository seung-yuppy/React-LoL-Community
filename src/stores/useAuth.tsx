import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthState {
    isLogin: boolean;
    login: () => void;
    logout: () => void;
}

const useAuth = create(
    persist<AuthState>(
        (set) => ({
            isLogin: false,
            login: () => set(() => ({ isLogin: true })),
            logout: () => set(() => ({ isLogin: false })),
        }),
        {
            name: "isLogin",
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default useAuth;