import { create } from 'zustand'
import {createJSONStorage, devtools, persist} from 'zustand/middleware'
import type {} from '@redux-devtools/extension'
import {data} from "autoprefixer";

interface NoteState {
    note: Array<string>,
    id: number,
    title: string,
    content?: Array<string>,
    date?: Date,
    addANote: () => void,
    updateData?: () => void,
}

function noteId() {
    return Math.floor(Math.random() * Date.now());
}

export const useNoteStore = create<NoteState>()(
    devtools(
        persist(
            (set, get) => ({
                note: [],
                id: noteId(),
                title: '',
                addANote: () => set({ id: noteId() }),
            }),
            {
                name: 'notes-storage',
                storage: createJSONStorage(() => localStorage),
            },
        ),
    ),
)
/*
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
)*/
