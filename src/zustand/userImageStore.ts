import { create } from 'zustand'

interface userImageInterface {
  imageUrl: string;
  setImageUrl: (payload: string) => void;
}

export const useUserImageStore = create<userImageInterface>()((set) => ({
  imageUrl: "",
  setImageUrl: (payload) => set((state) => ({ imageUrl: payload }))
}))

interface userImageModalInterface {
  isOpen: boolean;
  toggleOpen: () => void;
}

export const useUserImageModalStore = create<userImageModalInterface>()((set) => ({
  isOpen: false,
  toggleOpen: () => set((state) => ({ isOpen: !state.isOpen }))
}))

interface userImagePreLoadInterface {
  isLoaded: boolean;
  toggleLoadFalse: () => void;
  toggleLoadTrue: () => void;
}

export const useUserImagePreLoadStore = create<userImagePreLoadInterface>()((set) => ({
  isLoaded: false,
  toggleLoadFalse: () => set((state) => ({ isLoaded: false })),
  toggleLoadTrue: () => set((state) => ({ isLoaded: true }))
}))
