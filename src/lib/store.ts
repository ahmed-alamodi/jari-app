import { create } from 'zustand';

interface UIState {
  isFocusMode: boolean;
  toggleFocusMode: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isFocusMode: false,
  toggleFocusMode: () => set((state) => ({ isFocusMode: !state.isFocusMode })),
}));
