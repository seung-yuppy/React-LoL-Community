import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface IRecentArr {
  id: string;
  title: string;
}

interface IRecent {
  recentArr: IRecentArr[];
  setRecentArr: (item: IRecentArr) => void;
}

const useRecent = create(
  persist<IRecent>(
    (set) => ({
      recentArr: [],
      setRecentArr: (item) =>
        set((state) => ({
          recentArr: [
            item,
            ...state.recentArr.filter((i) => i.id !== item.id),
          ].slice(0, 3),
        })),
    }),
    {
      name: "recent",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useRecent;
