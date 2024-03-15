import {create} from 'zustand';
import {createJSONStorage, devtools, persist} from 'zustand/middleware';
import type {} from '@redux-devtools/extension';
import {immer} from 'zustand/middleware/immer';

interface NoteState {
    notes: { id?: string, content?: string, createdAt?: string, updatedAt?: string }[],
    addNote: (id: string, content?: string, updatedAt?: string) => void,
}

export const useNoteStore = create<NoteState>()(
    persist(
        (set, get) => ({
            notes: [],
            addNote: (id, content, updatedAt) => set((state) => ({
                    notes: [
                        ...state.notes,
                        {
                            id,
                            content,
                            createdAt: new Date().toISOString(),
                            updatedAt,
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
