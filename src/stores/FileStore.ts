import { create } from 'zustand'
import {createJSONStorage, devtools, persist} from 'zustand/middleware'
import type {} from '@redux-devtools/extension'
import {data} from "autoprefixer";

interface NewNoteState {
    notes: number
    addANote: () => void
}
interface NoteState {
    id: number,
    title: string,
    content: Array<string>,
    date: Date,
    updateData: () => void
}

export const useNoteStore = create<NewNoteState>()(
    devtools(
        persist(
            (set, get) => ({
                notes: 0,
                addANote: () => set({ notes: get().notes + 1 }),
            }),
            {
                name: 'notes-storage',
                storage: createJSONStorage(() => localStorage),
            },
        ),
    ),
)
export const useFileStore = create<NoteState>()(
    devtools(
        persist(
            (set, get) => ({
                id: 0,
                title: '',
                content: [],
                date: new Date(),
                updateData: (content?: any) => set(() => ({ content: content })),
            }),
            {
                name: 'note-storage',
                storage: createJSONStorage(() => localStorage),
            },
        ),
    ),
)