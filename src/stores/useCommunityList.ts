import { create } from "zustand";
import IContent from "../types/content";

type CommunityState = {
  communityList: IContent[];
  setCommunityList: (list: IContent[]) => void;
};

const useCommunityList = create<CommunityState>((set) => ({
  communityList: [],
  setCommunityList: (list) => set({ communityList: list }),
}));

export default useCommunityList;
