import {create} from 'zustand';
import {createJSONStorage, devtools, persist} from 'zustand/middleware';
import type {} from '@redux-devtools/extension';
import {immer} from 'zustand/middleware/immer';

interface NoteState {
    notes: { id?: string, title?: string, content?: string, createdAt?: string, updatedAt?: string }[],
    addNote: (id: string, content?: string, updatedAt?: string) => void,
    updateNote: (id: string, title?: string, content?: string, updatedAt?: string) => void,
    deleteNote: (id: string) => void,
}

type NoteUpdate = {
    updateANote?: (notes: { id: string, title: string, content: string, updatedAt: string }[]) => void
}

export const useNoteStore = create<NoteState & NoteUpdate>()(
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
            updateNote: (id, title, content, updatedAt) => set((state) => ({
                    notes: [
                        ...state.notes,
                        {
                            id,
                            title,
                            content,
                            updatedAt,
                        }
                    ],
                })
            ),
            //updateFirstName: (firstName) => set(() => ({ firstName: firstName })),
            deleteNote: (id) => set((state) => ({
                // FIX: splice works but deletes more than 1 note and not the one selected
                // notes: [{id}].splice(0, 1)

                // FIX: works but deletes all the notes
                notes: [].filter((noteId) => noteId !== id),

                // FIX: works but keeps only the note selected
                notes: [{id}].filter((noteId) => noteId !== id),
            }))
        }),
        {
            name: 'notes-storage',
            storage: createJSONStorage(() => localStorage),
        },
    )
)
