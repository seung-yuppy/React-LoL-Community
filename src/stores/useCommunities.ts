import { create } from "zustand";
import IContent from "../types/content";

interface CommunitiesStore {
  communities: IContent[] | undefined;
  setCommunities: (list: IContent[]) => void;
}

const useCommunities = create<CommunitiesStore>((set) => ({
  communities: [],
  setCommunities: (list) =>
    set(() => ({
      communities: list,
    })),
}));

export default useCommunities;
