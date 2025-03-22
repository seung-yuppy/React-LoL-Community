import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import IUserInfo from "../types/userInfo";
import AuthState from "../types/auth";

const useAuth = create(
  persist<AuthState>(
    (set) => ({
      isLogin: false,
      userInfo: null,

      login: () =>
        set(() => ({
          isLogin: true,
        })),

      // 로그아웃 시 모든 정보를 초기화하고 isLogin을 false로 설정한다
      logout: () =>
        set(() => ({
          isLogin: false,
          userInfo: null,
        })),

      // 사용자가 직접 입력한 추가 정보를 저장하는 함수
      setInfo: (infoData: IUserInfo) =>
        set(() => ({
          userInfo: infoData,
        })),
    }),
    {
      name: "auth",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuth;
