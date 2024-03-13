import { create } from 'zustand'
import {createJSONStorage, devtools, persist} from 'zustand/middleware'
import type {} from '@redux-devtools/extension' // required for devtools typing

interface BearState {
    bears: number
    //increase: (by: number) => void
    addABear: () => void
}
interface FileState {
    path: string,
    data: string,
    directory: string,
    newFile: () => void
}

export const useBearStore = create<BearState>()(
    devtools(
        persist(
            //(set) => ({
            //    bears: 0,
            //    increase: (by) => set((state) => ({ bears: state.bears + by })),
            //}),
            (set, get) => ({
                bears: 0,
                addABear: () => set({ bears: get().bears + 1 }),
            }),
            {
                name: 'bear-storage',
                storage: createJSONStorage(() => localStorage),
            },
        ),
    ),
)