import { create } from "zustand";
import IContent from "../types/content";

type CommunityState = {
    communityList: IContent[];
    showModals: {
        alert: boolean;
        like: boolean;
        dupLike: boolean;
    };

    setCommunityList: (list: IContent[]) => void;
    setShowModals: (
        modalName: "alert" | "like" | "dupLike",
        value: boolean
    ) => void;
};

const useCommunity = create<CommunityState>((set) => ({
    communityList: [],
    showModals: {
        alert: false,
        like: false,
        dupLike: false,
    },

    setCommunityList: (list) => set({ communityList: list }),
    setShowModals: (modalName, value) =>
        set((state) => ({
            showModals: {
                ...state.showModals,
                [modalName]: value,
            },
        })),
}));

export default useCommunity;
