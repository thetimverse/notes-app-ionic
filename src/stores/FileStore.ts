import {create} from 'zustand';
import {createJSONStorage, devtools, persist} from 'zustand/middleware';
import type {} from '@redux-devtools/extension';
import {immer} from 'zustand/middleware/immer';

interface NoteState {
    notes: { id: string, title: string, content: string, createdAt?: string, updatedAt: string, tags?: { name: string }[] }[],
    addNote: (id: string, title: string, content: string, updatedAt: string) => void,
    updateNote: (id: string, title: string, content: string, updatedAt?: string) => void,
    deleteNote: (id: string) => void,
}

export const useNoteStore = create<NoteState>()(
    persist(
        (set, get) => ({
            notes: [],
            addNote: (id, title, content, updatedAt) => set((state) => ({
                    notes: [
                        ...state.notes,
                        {
                            id,
                            title,
                            content,
                            createdAt: new Date().toISOString(),
                            updatedAt,
                        }
                    ],
                })
            ),
            updateNote: (id, title, content) => set((state) => {
                const notes = [...state.notes];
                const noteIndex = notes.findIndex((n)=>{
                    return n.id === id;
                });
                const note = notes[noteIndex];
                const updatedAt = new Date().toISOString();
                notes.splice(notes.findIndex((n)=>{
                    return n.id === id;
                }), 1, {...note, title, content, updatedAt});
                return {notes};
            }),
            deleteNote: (id) => set((state) => {
                const notes = [...state.notes];
                notes.splice(notes.findIndex((n)=>{
                     return n.id === id;
                }), 1);
                return {notes};
            })
        }),
        {
            name: 'notes-storage',
            storage: createJSONStorage(() => localStorage),
        },
    )
)
