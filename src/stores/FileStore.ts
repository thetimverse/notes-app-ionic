import { create } from 'zustand';
import {createJSONStorage, devtools, persist} from 'zustand/middleware';
import type {} from '@redux-devtools/extension';
import {immer} from 'zustand/middleware/immer';

interface NoteState {
    notes: { id: string, content: string, createdAt: string, updatedAt: string }[],
    addANote: (id: string) => void,
}

export const useNoteStore = create<NoteState>() (
    persist(
            (set, get) => ({
                // TODO: set note information from getData() in Note
                notes: [],
                addANote: (id) => set((state) => ({
                    notes: [
                        ...state.notes,
                        {
                            id,
                            content: '',
                            createdAt: new Date().toISOString(),
                            updatedAt: new Date().toISOString(),
                        }
                    ],
                })
                ),
            }),
        {
            name: 'notes-storage',
            storage: createJSONStorage(() => localStorage),
        },
        )
)
