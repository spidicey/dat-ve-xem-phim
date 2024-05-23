import create from "zustand";

type State = {
  page: number;
  setPage: (page: number) => void;
};

export const usePage = create<State>((set) => ({
  page: 1,
  setPage: (page) => set({ page }),
  incrementPage: () => set((state) => ({ page: state.page + 1 })),
  decrementPage: () => set((state) => ({ page: state.page - 1 })),
}));
